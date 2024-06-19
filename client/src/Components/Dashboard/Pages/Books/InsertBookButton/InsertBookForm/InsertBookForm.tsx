import styles from "./InsertBookForm.module.scss";
import add from "../../../../../../assets/img/registrationFormAvatar/addAvatar.png";
import { Dispatch, SetStateAction, useState } from "react";

type DisplayToggleProps = {
  setDisplayToggle: Dispatch<SetStateAction<boolean>>;
};

const InsertBookForm = ({ setDisplayToggle }: DisplayToggleProps) => {
  // UseState to get my input data
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null | any>(null);

  const addProductHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setDisplayToggle(false);
    } catch (error) {
      console.error("Error during user registration:", error);
      console.log("========>", error);
    }
  };

  return (
    <>
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
                <img className={styles.avatar} src={add} alt="" />
                <span>Add an Image</span>
              </label>

              <input
                type="file"
                id="file"
                name="file"
                placeholder="Your last name.."
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col_25}>
              <label htmlFor="title">Book Title:</label>
            </div>
            <div className={styles.col_75}>
              <input type="text" id="title" name="title" placeholder="Book title.." value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col_25}>
              <label htmlFor="author">Book Authors: </label>
            </div>
            <div className={styles.col_75}>
              <textarea id="author" name="author" placeholder="Author1, Author2, Author3..." value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
          </div>

          <br />
          <div className={styles.row}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default InsertBookForm;
