import { ChangeEvent, useState } from "react";
import { NotOkType } from "../../../../../../@Types/Types";
import styles from "./InsertBookDetailForm.module.scss";
import { BaseURL } from "../../../../../../Utils/URLs/ApiURL";

const InsertBookDetailForm = () => {
  const [formToggle, setFormToggle] = useState<boolean>(false);

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

    const formdata = new FormData();
    formdata.append("title", bookInput.title);
    formdata.append("authors", bookInput.authors);

    try {
      const response = await fetch(`${BaseURL}/api/books`, { method: "POST", body: formdata });
      console.log("response", response);
      if (response.ok) {
        await response.json();
        setBookInput({ title: "", authors: "" });
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

  //! ----------------------------------------

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
          <h2>Insert Book Detail</h2>
          <hr />

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
                    Title
                  </label>

                  <input type="file" id="file" name="image" placeholder="Your last name.." />
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

export default InsertBookDetailForm;
