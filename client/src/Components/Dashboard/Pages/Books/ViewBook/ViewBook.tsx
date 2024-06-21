import { useEffect, useState } from "react";
import styles from "./ViewBook.module.scss";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const ViewBook = ({ book }) => {
console.log("books", book);

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
              <img className={styles.image} src={book.image} alt="" />
            </div>

            <div className={styles.details_elements}>
              <div className={styles.details_title}>
                <h3 className={styles.h3}>{book.title}</h3>
              </div>
              <div className={styles.details_author}>
                <h3>{book.authors}</h3>
              </div>
              <div className={styles.details_publish_date}>
                <h3>{book?.detail?.date}</h3>
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



{book.detail ? <div className="styles.toc_Container">
          <div className="styles Overview">
            <h2>Overview</h2>
            <h3>{book?.detail?.longDescription}</h3>
          </div>
          <hr />
          <h3>Additional Info</h3>
          <hr />
          <h3>Info</h3>{" "}
          <h3>
            ISBN: {book?.detail?.isbn} <br />
            Published Date: {book?.detail?.date} <br />
            Publisher: Grand Central Publishing <br />
            Language: English <br />
            Page Count: {book?.detail?.pageCount} <br />
            Size: 7.25" l x 5.09" w x 0.68" h
          </h3>
        </div>: "Add Details"}







        </div>
      </div>
    </>
  );
};

export default ViewBook;
