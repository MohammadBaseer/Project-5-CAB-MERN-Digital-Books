import styles from "./Books.module.scss";
import BooksDisplayItem from "./BooksDisplayItem/BooksDisplayItem";

const Books = () => {
  return (
    <div className={styles.container}>
      <BooksDisplayItem />
    </div>
  );
};

export default Books;
