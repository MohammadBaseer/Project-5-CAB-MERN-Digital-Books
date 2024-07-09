import { ChangeEvent, useContext, useRef, useState } from "react";
import styles from "./InsertBookModal.module.scss";
import add from "../../../../../../assets/img/dashboard/addbook.png";
import { FetchApiContext } from "../../../../../../Context/FetchApiContext";
import { BaseURL } from "../../../../../../Utils/URLs/ApiURL";
import { NotOkType } from "../../../../../../@Types/Types";
import { Toast } from "primereact/toast";

const InsertBookModal = () => {
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);
  const { ApiFetchDataFun } = useContext(FetchApiContext);
  const selectedFile = useRef<File | null>(null);

  const toast = useRef<Toast>(null);

  const [image, setImage] = useState<string | null | any>(null);
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookInput, setBookInput] = useState({ title: "", authors: "" });

  const addBookHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!bookInput.title.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Title is missing!", life: 3000 });
      return;
    }

    let authorsString = bookInput.authors
      .split(",")
      .map((author) => author.trim())
      .join(", ");

    if (!authorsString) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Author is missing", life: 3000 });
      return;
    }

    if (!image) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Please select an image", life: 3000 });
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("title", bookInput.title);
    formdata.append("authors", authorsString);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    if (selectedFile.current) {
      formdata.append("image", selectedFile.current);
    }

    try {
      const response = await fetch(`${BaseURL}/api/books`, requestOptions);
      if (response.ok) {
        await response.json();
        setBookInput({ title: "", authors: "" });
        selectedFile.current = null;
        setImage(null);
        setDisplayToggle(false);
        toast.current?.show({ severity: "success", summary: "Success", detail: "New Book Inserted", life: 3000 });
        ApiFetchDataFun();
      }
      if (!response.ok) {
        const data = (await response.json()) as NotOkType;
        toast.current?.show({ severity: "error", summary: "Error", detail: data.error, life: 3000 });
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
      setImage(null); //test
    }
  };

  //! ----------------------------------------
  const formToggle = () => {
    if (displayToggle) {
      setDisplayToggle(false);
      setBookInput({ title: "", authors: "" });
      selectedFile.current = null;
      setImage(null);
    } else {
      setDisplayToggle(true);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <button onClick={formToggle}>
        <span className="pi pi-plus"></span> Add New Book{" "}
      </button>
      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={formToggle}>
            {" "}
            &times;{" "}
          </span>
          <h2>Insert New Book</h2>
          <hr />

          <div className={styles.container}>
            <form className={styles.form} onSubmit={addBookHandler}>
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

                  <input type="file" id="file" name="image" style={{ display: "none" }} onChange={handleFileChange} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label className={styles.elements_label} htmlFor="title">
                    Book Title:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input className={styles.inputs} type="text" id="title" name="title" placeholder="Book title.." value={bookInput.title} onChange={getInputValues} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label className={styles.elements_label} htmlFor="authors">
                    Book Authors:{" "}
                  </label>
                </div>
                <div className={styles.col_75}>
                  <textarea className={styles.text_area} id="authors" name="authors" placeholder="Author1, Author2, Author3..." value={bookInput.authors} onChange={getInputValues} />

                  <div className={styles.error}>{errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}</div>
                </div>
              </div>

              <br />
              <div className={styles.row}>
                <input className={styles.submit_btn} type="submit" value="Submit" />
              </div>
            </form>
          </div>

          {/* //! */}
        </div>
      </div>
    </>
  );
};

export default InsertBookModal;
