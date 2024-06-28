import { Link } from "react-router-dom";
import styles from "./UpdateBookModal.module.scss";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { FetchApiContext } from "../../../../../../../Context/FetchApiContext";
import { NotOkType } from "../../../../../../../@Types/Types";
import { BaseURL } from "../../../../../../../Utils/URLs/ApiURL";

type PropsTypes = {
  id: string;
  imageUrl: string;
  title: string;
  authors: string
};

const UpdateBookModal = ({ id, imageUrl, title, authors }: PropsTypes) => {
  const { ApiFetchDataFun } = useContext(FetchApiContext);
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);
  const selectedFileUpdate = useRef<File | null>(null);
  const [imageUpdate, setImageUpdate] = useState<string | null | any>(null);
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookInput, setBookInput] = useState({ title: title, authors: authors });

  //!
  const updateBookHandler = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();


    const formdata = new FormData();
    formdata.append("title",bookInput.title);
    formdata.append("authors", bookInput.authors);
   
    
    if (selectedFileUpdate.current) {
      formdata.append("image", selectedFileUpdate.current);
    }
    

try {
  // const response = await  fetch("http://localhost:5000/api/books/667c93317f2d6414668352a1", { method: "POST", body: formdata });
  const response = await  fetch(`${BaseURL}/api/books/${id}`, { method: "PUT", body: formdata });
   
  if (response.ok) {
    const data = await response.json();
    console.log("update success");
    setDisplayToggle(!displayToggle)
    ApiFetchDataFun();

  } else {
    const data = (await response.json()) as NotOkType;
    setErrorHandler(data);
    console.log(" Error", data);
  }




} catch (error) {
  
}






  };

  //! OnChange Function

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setBookInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // ! image preview

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (imageUpdate) {
      URL.revokeObjectURL(imageUpdate);
    }
    if (e.target.files && e.target.files.length > 0) {
      selectedFileUpdate.current = e.target.files[0];
      const tempURL = URL.createObjectURL(e.target.files[0]);
      setImageUpdate(tempURL);
    } else {
      if (imageUpdate) {
        URL.revokeObjectURL(imageUpdate);
      }
      setImageUpdate(null); // test
    }
  };

  return (
    <>
      <Link to="#" onClick={() => setDisplayToggle(true)}>
        <span className="pi pi-file-edit">&nbsp;</span>
      </Link>

      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={() =>{ 
             setImageUpdate(null);
            setDisplayToggle(false)}}>
            {" "}
            &times;{" "}
          </span>
          <h2>Update Book</h2>
          <hr />

          <div className={styles.container}>
            <form className={styles.form} onSubmit={updateBookHandler}>
              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="file" className={styles.file}>
                    Book Photo:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <label htmlFor="fileUpload" className={styles.file}>
                    <img className={styles.image} src={imageUpdate !== null ? imageUpdate : imageUrl} alt="" />
                    <span>Add an Image</span>
                  </label>

                  <input type="file" id="fileUpload" name="image" onChange={handleFileChange} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label className={styles.elements_label} htmlFor="titleUpdate">
                    Book Title:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input type="text" id="titleUpdate" name="title" placeholder="Book title.." value={bookInput.title} onChange={getInputValues} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label className={styles.elements_label} htmlFor="authorsUpdate">
                    Book Authors:{" "}
                  </label>
                </div>
                <div className={styles.col_75}>
                  <textarea id="authorsUpdate" name="authors" placeholder="Author1, Author2, Author3..." value={bookInput.authors} onChange={getInputValues} />

                  <div className={styles.error}>{errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}</div>
                </div>
              </div>

              <br />
              <div className={styles.row}>
                <input className={styles.submit_btn} type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBookModal;
