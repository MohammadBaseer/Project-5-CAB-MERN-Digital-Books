import "primeicons/primeicons.css";
import styles from "./BooksDisplayItem.module.scss";
import { useContext } from "react";
import { FetchApiContext } from "../../../../../Context/FetchApiContext";

const BooksDisplayItem = () => {
  const { data } = useContext(FetchApiContext);

  //   console.log("data", data);
  return (
    <>
      <h1>This is books Page</h1>
      <div className={styles.books_list}>
        {/* ------------------------------------------ */}
        {data &&
          data.map((displayItem, index) => {
            return (
              <div className={styles.books} key={index}>
                <div className={styles.books_elements}>
                  <div className={styles.book_image}>
                    <img src={displayItem.image} alt="" />
                  </div>
                  <div className={styles.book_title}>
                    <p className={styles.title}>
                      <strong>{displayItem.title}</strong>
                    </p>
                    <p className={styles.author}>{displayItem.authors[0]}</p>
                    <p className={styles.star}></p>
                    <a href="" className={styles.read}>
                      <i className="pi pi-book"> Read</i>
                    </a>
                    <a href="" className={styles.content}>
                      <i className="pi pi-file"> Details</i>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default BooksDisplayItem;
