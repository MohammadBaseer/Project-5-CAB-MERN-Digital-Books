import { useState } from "react";
import styles from "./UserProfile.module.scss";

const UserProfileInputs = () => {
  const [editButtons, setEditButtons] = useState(true);

  const action = () => {
    if (editButtons) {
      setEditButtons(false);
    } else {
      setEditButtons(true);
    }
  };
  return (
    <div className={styles.text_element}>
      <input type="text" />

      <div className={styles.action_buttons}>
        <div className={styles.edit_button_1} style={editButtons ? { display: "contents" } : { display: "none" }}>
          &nbsp;&nbsp;
          <i className={`${styles.pi} pi pi-pencil`} onClick={action}>
            {" "}
            &nbsp;
          </i>
        </div>

        <div className={styles.edit_button_2} style={editButtons ? { display: "none" } : { display: "contents" }}>
          &nbsp;&nbsp;
          <i className={`${styles.pi} pi pi-check`}> &nbsp;&nbsp; </i>
          <i className={`${styles.pi} pi pi-times`} onClick={action}>
            {" "}
            &nbsp;{" "}
          </i>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInputs;
