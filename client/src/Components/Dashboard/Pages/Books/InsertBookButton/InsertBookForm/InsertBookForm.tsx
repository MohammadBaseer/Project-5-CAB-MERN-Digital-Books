import styles from "./InsertBookForm.module.scss";
import add from "../../../../../../assets/img/dashboard/addbook.png";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { NotOkType } from "../../../../../../@Types/Types";
import { BaseURL } from "../../../../../../Utils/URLs/ApiURL";

type DisplayToggleProps = {
  setDisplayToggle: Dispatch<SetStateAction<boolean>>;
};

const InsertBookForm = ({ setDisplayToggle }: DisplayToggleProps) => {
  const selectedFile = useRef<File | null>(null);

  const [image, setImage] = useState<File | null | any>(null);
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookInput, setBookInput] = useState({ title: "", authors: "" });

  const addProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();
    if (!bookInput.title.trim()) {
      setErrorHandler("Title is missing");
      return;
    }
    if (!bookInput.authors.trim()) {
      setErrorHandler("Author is missing");
      return;
    }
    if (!image) {
      setErrorHandler("Please select an image");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", bookInput.title);
    formdata.append("authors", bookInput.authors);

    if (selectedFile.current) {
      formdata.append("image", selectedFile.current);
    }

    try {
      const response = await fetch(`${BaseURL}/api/books`, { method: "POST", body: formdata });
      console.log("response", response);
      if (response.ok) {
        await response.json();
        setBookInput({ title: "", authors: "" });
        selectedFile.current = null;
        setImage(null);
        setDisplayToggle(false);
      }
      if (!response.ok) {
        const data = (await response.json()) as NotOkType;
        setErrorHandler(data);
      }
    } catch (error: any) {
      setErrorHandler(error.message || "An unknown error occurred");
      setErrorHandler(error);
    }
  };

  //! OnChange Fun

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setBookInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // ! image preview

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (image) {
      URL.revokeObjectURL(image);
    }
    if (e.target.files && e.target.files.length > 0) {
      selectedFile.current = e.target.files[0];
      const tempURL = URL.createObjectURL(e.target.files[0]);
      setImage(tempURL);
    } else {
      if (image) {
        URL.revokeObjectURL(image);
      }
    }
  };

  //! ----------------------------------------
  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={addProductHandler}>
          <div className={`${styles.row} ${styles.flex}`}>
            <div className={styles.col_25}>
              <label htmlFor="file" className={styles.file}>
                Book Photo:
              </label>
            </div>
            <div className={styles.col_75}>
              <label htmlFor="file" className={styles.file}>
                <img className={styles.image} src={image !== null ? image : add} alt="" />
                <span>Add an Image</span>
              </label>

              <input type="file" id="file" name="image" placeholder="Your last name.." style={{ display: "none" }} onChange={handleFileChange} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col_25}>
              <label className={styles.elements_label} htmlFor="title">
                Book Title:
              </label>
            </div>
            <div className={styles.col_75}>
              <input type="text" id="title" name="title" placeholder="Book title.." value={bookInput.title} onChange={getInputValues} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col_25}>
              <label className={styles.elements_label} htmlFor="authors">
                Book Authors:{" "}
              </label>
            </div>
            <div className={styles.col_75}>
              <textarea id="authors" name="authors" placeholder="Author1, Author2, Author3..." value={bookInput.authors} onChange={getInputValues} />

              <div className={styles.error}>
                 {errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}
              </div>
              
            </div>
            
          </div>
         
          <br />
          <div className={styles.row}>
            <input className={styles.submit_btn} type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default InsertBookForm;
