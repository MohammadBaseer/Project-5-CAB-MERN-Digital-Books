import { Link } from "react-router-dom";
import styles from "./UpdateBookModal.module.scss";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { FetchApiContext } from "../../../../../../../Context/FetchApiContext";
import { NotOkType } from "../../../../../../../@Types/Types";

type PropsTypes = {
  imageUrl: string;
  title: string;
  authors: Array<string>;
};

const UpdateBookModal = ({ imageUrl, title, authors }: PropsTypes) => {
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);

  const { ApiFetchDataFun } = useContext(FetchApiContext);
  const selectedFileUpdate = useRef<File | null>(null);

  const [imageUpdate, setImageUpdate] = useState<File | null | any>(null);
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookInput, setBookInput] = useState({ title: title, authors: authors });

  const updateBookHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Funcion");
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
    }
  };

  console.log("test =========================================?");

  return (
    <>
      <Link to="#" onClick={() => setDisplayToggle(true)}>
        <span className="pi pi-file-edit">&nbsp;</span>
      </Link>

      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={() => setDisplayToggle(false)}>
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
                  <label htmlFor="file" className={styles.file}>
                    <img className={styles.image} src={imageUpdate !== null ? imageUpdate : imageUrl} alt="" />
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
