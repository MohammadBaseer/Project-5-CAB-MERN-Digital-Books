import { Link } from "react-router-dom";
import styles from "./UpdateBookModal.module.scss";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { BooksDataType, NotOkType } from "../../../../../../../@Types/Types";
import { BaseURL } from "../../../../../../../Utils/URLs/ApiURL";
import { FetchApiContext } from "../../../../../../../Context/FetchApiContext";
import { Toast } from "primereact/toast";

type BookDataProps = {
  bookData: BooksDataType;
};

const UpdateBookDetailsModal = ({ bookData }: BookDataProps) => {
  const toast = useRef<Toast>(null);
  const { ApiFetchDataFun } = useContext(FetchApiContext);
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);

  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookInput, setBookInput] = useState({
    longDescription: bookData.detail.longDescription,
    categories: bookData.detail.categories,
    date: bookData.detail.publishAt,
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

    const token = localStorage.getItem("token");

    if (!bookInput.longDescription.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Description is missing!", life: 3000 });
      return;
    }

    let categoryStringCleaned = typeof bookInput.categories === "string" ? bookInput.categories : bookInput.categories.join(",");

    const categoryStringCleanedResult = categoryStringCleaned
      .split(",")
      .map((author: string) => author.trim())
      .join(", ");

    if (!categoryStringCleanedResult) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Author is missing", life: 3000 });
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("longDescription", bookInput.longDescription);
    formdata.append("categories", categoryStringCleanedResult);
    formdata.append("publishAt", bookInput.date);

    const requestOption = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
    };

    try {
      const response = await fetch(`${BaseURL}/api/books?id=${bookData._id}`, requestOption);

      if (response.ok) {
        await response.json();
        setDisplayToggle(!displayToggle);
        ApiFetchDataFun();
        setBookInput({
          longDescription: bookData.detail.longDescription,
          categories: bookData.detail.categories,
          date: bookData.detail.publishAt,
        });

        toast.current?.show({ severity: "success", summary: "Success", detail: "Updated", life: 3000 });
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
          <h2>Update Book Detail:</h2>
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
                  <textarea className={styles.text_area} id="description" name="longDescription" rows={20} value={bookInput.longDescription} onChange={getInputValues} />
                </div>
              </div>

              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="categories" className={styles.file}>
                    Book Category:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input className={styles.inputs} type="text" id="categories" name="categories" value={bookInput.categories} onChange={getInputValues} />
                </div>
              </div>

              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="publishAt" className={styles.file}>
                    Publish Date:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input className={styles.inputs} type="date" id="publishAt" name="publishAt" value={bookInput.date} onChange={getInputValues} />

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
