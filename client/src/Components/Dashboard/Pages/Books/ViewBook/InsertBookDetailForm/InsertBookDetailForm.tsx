import { ChangeEvent, useState } from "react";
import { NotOkType } from "../../../../../../@Types/Types";
import styles from "./InsertBookDetailForm.module.scss";
import { BaseURL } from "../../../../../../Utils/URLs/ApiURL";

const InsertBookDetailForm = ({ id }) => {
  const [formToggle, setFormToggle] = useState<boolean>(false);

  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookDetailInput, setBookDetailInput] = useState({ longDescription: "", categories: "", publishAt: "", bookref: id });

  //! OnChange Fun

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setBookDetailInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();
    if (!bookDetailInput.longDescription) {
      setErrorHandler("Description is missing");
      return;
    }
    if (!bookDetailInput.categories.trim()) {
      setErrorHandler("Category is missing");
      return;
    }
    if (!bookDetailInput.publishAt.trim()) {
      setErrorHandler("Publish Date is missing");
      return;
    }
    if (!bookDetailInput.bookref()) {
      setErrorHandler("Ref ID is missing");
      return;
    }

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const body = new URLSearchParams();
      body.append("bookref", bookDetailInput.bookref);
      body.append("longDescription", bookDetailInput.longDescription);
      body.append("categories", bookDetailInput.categories);
      body.append("publishAt", bookDetailInput.publishAt);

      const requestOption = {
        method: "POST",
        headers: headers,
        body: body,
      };

      const response = await fetch(`${BaseURL}/api/book/detail`, requestOption);
      console.log("response", response);
      if (response.ok) {
        await response.json();
        setBookDetailInput({ longDescription: "", categories: "", publishAt: "", bookref: "" });
        setFormToggle(false);
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

  return (
    <>
      <button onClick={() => setFormToggle(true)}>
        <span className="pi pi-plus"></span> Add Detail{" "}
      </button>

      <div id="myModal" className={styles.modal} style={formToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={() => setFormToggle(false)}>
            {" "}
            &times;{" "}
          </span>
          <h2>Insert Book Detail: {id}</h2>
          <hr />
          <div className={styles.container}>
            <form className={styles.form} onSubmit={addProductHandler}>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label className={styles.elements_label} htmlFor="description">
                    Book Description:{" "}
                  </label>
                </div>
                <div className={styles.col_75}>
                  <textarea id="description" name="longDescription" placeholder="Description" rows={20} value={bookDetailInput.longDescription} onChange={getInputValues} />
                </div>
              </div>

              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="categories" className={styles.file}>
                    Book Category:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input type="text" id="categories" name="categories" placeholder="Category1, Category2, Category3 .." value={bookDetailInput.categories} onChange={getInputValues} />
                </div>
              </div>

              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="publishAt" className={styles.file}>
                    Publish Date:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input type="date" id="publishAt" name="publishAt" placeholder="Your last name.." value={bookDetailInput.publishAt} onChange={getInputValues} />
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

export default InsertBookDetailForm;
