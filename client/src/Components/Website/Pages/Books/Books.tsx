import { Link } from "react-router-dom";
import styles from "./Books.module.scss";
import BooksDisplayItem from "./BooksDisplayItem/BooksDisplayItem";

const Books = () => {
  return (
    <div className={styles.container}>
      <h1>Digital Books</h1>
      <div className={styles.items_container}>
        <div className={styles.items}>
          <img className={styles.img} src="https://www.loop11.com/wp-content/uploads/2020/11/Web-Design-for-Dummies.png" alt="" />
          <div className={styles.book_title}>
            <p className={styles.title}>
              <strong>Zend Framework in Action</strong>
            </p>
            <Link to="#" className={styles.content}>
              <i className="pi pi-file"> Details</i>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <BooksDisplayItem />
    </div>
  );
};

export default Books;
