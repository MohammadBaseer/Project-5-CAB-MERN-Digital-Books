import { Link } from "react-router-dom";
import styles from "./UpdateBookModal.module.scss";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { NotOkType } from "../../../../../../../@Types/Types";
import { BaseURL } from "../../../../../../../Utils/URLs/ApiURL";
import { FetchApiContext } from "../../../../../../../Context/FetchApiContext";
import { Toast } from "primereact/toast";

const UpdateBookDetailsModal = ({ bookDate }) => {
  const toast = useRef<Toast>(null);
  const { ApiFetchDataFun } = useContext(FetchApiContext);
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);

  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookInput, setBookInput] = useState({
    longDescription: bookDate.detail.longDescription,
    categories: bookDate.detail.categories,
    date: bookDate.detail.publishAt,
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   //!
  const updateBookDetailsHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("id", bookDate._id);

    if (!bookInput.longDescription.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Description is missing!", life: 3000 });
      return;
    }

    const categoryString = typeof bookInput.categories === "string" ? bookInput.categories : bookInput.categories.join(",");

    const formdata = new FormData();
    formdata.append("longDescription", bookInput.longDescription);
    formdata.append("categories", bookInput.categories);
    formdata.append("publishAt", bookInput.date);

    try {
      const response = await fetch(`${BaseURL}/api/books?id=${bookDate._id}`, { method: "PUT", body: formdata });

      if (response.ok) {
        await response.json();
        console.log("update success");
        ApiFetchDataFun();
        setDisplayToggle(!displayToggle);
        toast.current?.show({ severity: "success", summary: "Success", detail: "New Book Inserted", life: 3000 });
      } else {
        const data = (await response.json()) as NotOkType;
        setErrorHandler(data.error);
        console.log(" Error", data);
      }
    } catch (error) {
      setErrorHandler("An error occurred during the update process.");
      console.log(error);
    }
  };

  //   //! OnChange Function

  return (
    <>
      <Toast ref={toast} />
      <Link to="#" onClick={() => setDisplayToggle(true)}>
        <span className="pi pi-file-edit">Edit Details</span>
      </Link>

      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={() => setDisplayToggle(false)}>
            {" "}
            &times;{" "}
          </span>
          <h2>Insert Book Detail:</h2>
          <hr />
          <div className={styles.container}>
            <form className={styles.form} onSubmit={updateBookDetailsHandler}>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label className={styles.elements_label} htmlFor="description">
                    Book Description:{" "}
                  </label>
                </div>
                <div className={styles.col_75}>
                  <textarea id="description" name="longDescription" rows={20} value={bookInput.longDescription} onChange={getInputValues} />
                </div>
              </div>

              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="categories" className={styles.file}>
                    Book Category:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input type="text" id="categories" name="categories" value={bookInput.categories} onChange={getInputValues} />
                </div>
              </div>

              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="publishAt" className={styles.file}>
                    Publish Date:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input type="date" id="publishAt" name="publishAt" value={bookInput.date} onChange={getInputValues} />

                  <div className={styles.error}>{errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}</div>
                </div>
              </div>

              <br />
              <div className={styles.row}>
                <input className={styles.submit_btn} type="submit" value="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBookDetailsModal;
