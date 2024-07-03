import styles from "./Books.module.scss";
import BooksDisplayItem from "./BooksDisplayItem/BooksDisplayItem";

const Books = () => {
  return (
    <div className={styles.container}>
      <br />
      <h1>Books List </h1>
      <BooksDisplayItem />
    </div>
  );
};

export default Books;
