import { useEffect, useState } from "react";
import styles from "./ViewBookModal.module.scss";
import { Link } from "react-router-dom";
import InsertBookDetailForm from "../InsertBookDetailForm/InsertBookDetailForm";
import UpdateBookDetailsModal from "../UpdateBookModals/UpdateBookDetailsModal/UpdateBookDetailsModal";
import { BooksDataType } from "../../../../../../@Types/Types";
type BookDataProps = {
  bookData: {
    _id: string;
    title: string;
    image: string;
    authors: string[];
    detail: {
      publishAt: any;
      longDescription: string;
      categories: string[];
    };
  };
};
const ViewBookModal = ({ bookData }: BookDataProps) => {
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);

  useEffect(() => {
    if (displayToggle) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [displayToggle]);

  return (
    <>
      <Link to="#" onClick={() => setDisplayToggle(true)}>
        <span className="pi pi-file">&nbsp;</span>
      </Link>

      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={() => setDisplayToggle(false)}>
            {" "}
            &times;{" "}
          </span>
          <h2>Book Details</h2>
          <hr />

          <div className={styles.books_details_container}>
            <div className={styles.details_image}>
              <img className={styles.image} src={bookData?.image} alt="" />
            </div>

            <div className={styles.details_elements}>
              <div className={styles.details_title}>
                <h3 className={styles.h3}>{bookData.title}</h3>
              </div>
              <div className={styles.details_author}>
                <h3>{bookData.authors}</h3>
              </div>
              <div className={styles.details_publish_date}>
                <h3>{bookData?.detail?.publishAt}</h3>
              </div>
              <div className={styles.pages}>
                <h3>
                  <i className="pi pi-file-check"> Pages: 13</i>
                </h3>
              </div>
              <div className={styles.details_toc}>
                <h3>
                  <i className="pi pi-list"> TOC</i>
                </h3>
              </div>
              <div className={styles.read}>
                <h3>
                  <i className="pi pi-book"> Read</i>
                </h3>
              </div>
            </div>
          </div>
          {/* ----------------------- */}

          <div className="styles.toc_Container">
            <div className="styles Overview">
              <h2>Overview</h2>
              {bookData.detail ? <h3>{bookData?.detail?.longDescription}</h3> : ""}
            </div>
            <hr />
            <h3>Additional Info</h3>
            <hr />
            <h3>Info</h3>{" "}
            {bookData.detail ? (
              <h3>
                Published Date: {bookData?.detail?.publishAt} <br />
                Publisher: Grand Central Publishing <br />
                Language: English <br />
                Size: 7.25" l x 5.09" w x 0.68" h
              </h3>
            ) : (
              <InsertBookDetailForm id={bookData._id} />
            )}
          </div>
          {bookData.detail && <UpdateBookDetailsModal bookData={bookData} />}
        </div>
      </div>
    </>
  );
};

export default ViewBookModal;
