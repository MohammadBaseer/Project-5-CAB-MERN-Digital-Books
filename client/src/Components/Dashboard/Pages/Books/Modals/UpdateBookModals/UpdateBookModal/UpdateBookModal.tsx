import { Link } from "react-router-dom";
import styles from "./UpdateBookModal.module.scss";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { FetchApiContext } from "../../../../../../../Context/FetchApiContext";
import { NotOkType } from "../../../../../../../@Types/Types";
import { BaseURL } from "../../../../../../../Utils/URLs/ApiURL";
import { Toast } from "primereact/toast";

type PropsTypes = {
  id: string;
  imageUrl: string;
  title: string;
  authors: string;
};
type BookInputsTypes = {
  title: string;
  authors: string | any;
};

const UpdateBookModal = ({ id, imageUrl, title, authors }: PropsTypes) => {
  const { ApiFetchDataFun } = useContext(FetchApiContext);
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);
  const selectedFileUpdate = useRef<File | null>(null);
  const [imageUpdate, setImageUpdate] = useState<string | null | any>(null);
  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [bookInputGet, setBookInputGet] = useState<BookInputsTypes>({ title, authors });

  const toast = useRef<Toast>(null);

  //!
  const updateBookHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookInputGet.title.trim()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Title is missing!", life: 3000 });
      return;
    }

    let authorsString = typeof bookInputGet.authors === "string" ? bookInputGet.authors : bookInputGet.authors.join(",");

    const authorsStringResult = authorsString
      .split(",")
      .map((author: string) => author.trim())
      .join(", ");

    if (!authorsStringResult) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "Book Author is missing", life: 3000 });
      return;
    }

    const token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("title", bookInputGet.title);
    formdata.append("authors", authorsStringResult);

    if (selectedFileUpdate.current) {
      formdata.append("image", selectedFileUpdate.current);
    }

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
    };

    try {
      const response = await fetch(`${BaseURL}/api/books?id=${id}&imageUrl=${imageUrl}`, requestOptions);

      if (response.ok) {
        await response.json();
        setDisplayToggle(!displayToggle);
        selectedFileUpdate.current = null;
        setImageUpdate(null);
        ApiFetchDataFun();
        setBookInputGet({ title, authors });
        toast.current?.show({ severity: "success", summary: "Error", detail: "Updated", life: 3000 });
      } else {
        const data = (await response.json()) as NotOkType;
        setErrorHandler(data.error);
        console.log(" Error", data);
      }
    } catch (error) {}
  };

  //! OnChange Function

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setBookInputGet((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // ! image preview

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Toast ref={toast} />
      <Link
        to="#"
        onClick={() => {
          setDisplayToggle(true);
        }}
      >
        <span className="pi pi-file-edit">&nbsp;</span>
      </Link>

      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span
            className={styles.close}
            onClick={() => {
              selectedFileUpdate.current = null;
              setImageUpdate(null);

              setDisplayToggle(false);
            }}
          >
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
                  <label htmlFor={id} className={styles.file}>
                    <img className={styles.image} src={imageUpdate !== null ? imageUpdate : imageUrl} alt="" />
                    <span>Add an Image</span>
                  </label>

                  <input type="file" id={id} name="image" onChange={handleFileChange} style={{ display: "none" }} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label className={styles.elements_label} htmlFor="titleUpdate">
                    Book Title:
                  </label>
                </div>
                <div className={styles.col_75}>
                  <input className={styles.inputs} type="text" id="titleUpdate" name="title" placeholder="Book title.." value={bookInputGet.title} onChange={getInputValues} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label className={styles.elements_label} htmlFor="authorsUpdate">
                    Book Authors:{" "}
                  </label>
                </div>
                <div className={styles.col_75}>
                  <textarea className={styles.text_area} id="authorsUpdate" name="authors" placeholder="Author1, Author2, Author3..." value={bookInputGet.authors} onChange={getInputValues} />

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
