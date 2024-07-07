import { useContext, useRef, useState } from "react";
import styles from "./UpdateCommentModal.module.scss";
import { Link } from "react-router-dom";
import { BaseURL } from "../../../../../../../../Utils/URLs/ApiURL";
import { Toast } from "primereact/toast";
import { AuthContext } from "../../../../../../../../Context/AuthContext";

type CommentsProps = {
  id: string;
  addComment: () => void;
  commentText: string;
};

const UpdateCommentModal = ({ id, addComment, commentText }: CommentsProps) => {
  const toast = useRef<Toast>(null);
  const { userProfile } = useContext(AuthContext);
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);
  const [updateComment, setUpdateComment] = useState(commentText);

  //!SECTION
  const updateComments = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("comment", updateComment);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const result = await fetch(`${BaseURL}/api/comments/${id}`, requestOptions);
      if (result.status === 200) {
        if (!userProfile) {
          alert("Please Login first");
          return;
        }
        addComment();
        toast.current?.show({ severity: "success", summary: "Error", detail: "Updated", life: 3000 });
        setDisplayToggle(false);
        setUpdateComment(commentText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //!

  const deleteComments = async (commentId: string) => {
    try {
      const result = await fetch(`${BaseURL}/api/comments/${commentId}`, { method: "DELETE" });
      if (result.status === 200) {
        if (!userProfile) {
          alert("Please Login first");
          return;
        }
        addComment();
        toast.current?.show({ severity: "success", summary: "Error", detail: "Deleted", life: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formToggle = () => {
    if (displayToggle) {
      setDisplayToggle(false);
      setUpdateComment(commentText);
    } else {
      setDisplayToggle(true);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <p className={styles.exist_user_action}>
        <Link to="#" onClick={formToggle}>
          <span className="pi pi-file-edit">&nbsp;</span>
        </Link>
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            deleteComments(id);
          }}
        >
          <span className="pi pi-trash"> </span>
        </Link>
      </p>

      <div id="myModal" className={styles.modal} style={displayToggle === true ? { display: "block" } : { display: "none" }}>
        <div className={styles.modal_content}>
          <span className={styles.close} onClick={formToggle}>
            {" "}
            &times;{" "}
          </span>
          <h2>Update Comments</h2>
          <hr />

          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.col_25}>
                <label className={styles.elements_label} htmlFor="updateComments">
                  Update your Comment:{" "}
                </label>
              </div>
              <div className={styles.col_75}>
                <textarea className={styles.text_area} id="updateComments" name="updateComments" value={updateComment} onChange={(e) => setUpdateComment(e.target.value)} />
              </div>
            </div>

            <br />
            <div className={styles.row}>
              <button className={styles.submit_btn} type="button" onClick={updateComments}>
                Update
              </button>
            </div>
          </div>

          {/* //! */}
        </div>
      </div>
    </>
  );
};

export default UpdateCommentModal;
