import { ChangeEvent, useContext, useRef, useState } from "react";
import styles from "./InsertBookDetailForm.module.scss";
import { BaseURL } from "../../../../../../Utils/URLs/ApiURL";
import { NotOkType } from "../../../../../../@Types/Types";
import { FetchApiContext } from "../../../../../../Context/FetchApiContext";
import { Toast } from "primereact/toast";

type InsertBookDetailFormProps = {
  id: string;
};

const InsertBookDetailForm = ({ id }: InsertBookDetailFormProps) => {
  const { ApiFetchDataFun } = useContext(FetchApiContext);
  const [formToggle, setFormToggle] = useState<boolean>(false);
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookDetailInput, setBookDetailInput] = useState({ longDescription: "", categories: "", publishAt: "", bookref: "" });
  const toast = useRef<Toast>(null);

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
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Description is missing!", life: 3000 });
      return;
    }
    if (!bookDetailInput.categories.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Category is missing!", life: 3000 });
      return;
    }
    if (!bookDetailInput.publishAt.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Publish Date is missing!", life: 3000 });
      return;
    }
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const body = new URLSearchParams();
      body.append("bookref", id);
      body.append("longDescription", bookDetailInput.longDescription);
      body.append("categories", bookDetailInput.categories);
      body.append("publishAt", bookDetailInput.publishAt);

      const requestOption = {
        method: "POST",
        headers: headers,
        body: body,
      };

      const response = await fetch(`${BaseURL}/api/detail`, requestOption);
      console.log("response", response);
      if (response.ok) {
        await response.json();
        setBookDetailInput({ longDescription: "", categories: "", publishAt: "", bookref: "" });
        toast.current?.show({ severity: "success", summary: "Success", detail: "Book Details updated", life: 3000 });
        setFormToggle(false);
        ApiFetchDataFun();
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
      <Toast ref={toast} />
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
                  <textarea className={styles.text_area} id="description" name="longDescription" placeholder="Description" rows={20} value={bookDetailInput.longDescription} onChange={getInputValues} />
                </div>
              </div>

              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="categories" className={styles.file}>
                    Book Category:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input className={styles.inputs} type="text" id="categories" name="categories" placeholder="Category1, Category2, Category3 .." value={bookDetailInput.categories} onChange={getInputValues} />
                </div>
              </div>

              <div className={`${styles.row} ${styles.flex}`}>
                <div className={styles.col_25}>
                  <label htmlFor="publishAt" className={styles.file}>
                    Publish Date:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input className={styles.inputs} type="date" id="publishAt" name="publishAt" placeholder="Your last name.." value={bookDetailInput.publishAt} onChange={getInputValues} />
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
