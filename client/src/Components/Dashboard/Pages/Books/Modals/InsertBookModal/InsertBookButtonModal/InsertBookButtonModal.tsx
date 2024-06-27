import { useState } from "react";
import styles from "./InsertBookButtonModal.module.scss";
import InsertBookForm from "../InsertBookForm/InsertBookForm";
// import AddItemForm from "./AddItemForm";

const InsertBookButtonModal = () => {
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);

  const formToggle = () => {
    if (displayToggle) {
      setDisplayToggle(false);
    } else {
      setDisplayToggle(true);
    }
  };

  return (
    <>
      <button onClick={formToggle}>
        <span className="pi pi-plus"></span> Add New Book{" "}
      </button>
      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          {/* //REVIEW -  //! Run a function to clear  data if close the modal */}
          <span className={styles.close} onClick={formToggle}>
            {" "}
            &times;{" "}
          </span>
          <h2>Insert New Book</h2>
          <hr />
          <InsertBookForm setDisplayToggle={setDisplayToggle} />
        </div>
      </div>
    </>
  );
};

export default InsertBookButtonModal;
