import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Comments.module.scss";
import { CommentType } from "../../../../../../../@Types/Types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../../../Context/AuthContext";
import { BaseURL } from "../../../../../../../Utils/URLs/ApiURL";
import { Toast } from "primereact/toast";
type CommentTypeProps = {
  comment: CommentType[];
  addComment: any;
};
const Comments = ({ comment, addComment }: CommentTypeProps) => {
  const toast = useRef<Toast>(null);

  const { userProfile } = useContext(AuthContext);


  const deleteComments = async (commentId: string) => {
    try {
      const result = await fetch(`${BaseURL}/api/comments/${commentId}`, { method: "DELETE" });
      if (result.status === 200) {
        if (!userProfile) {
          alert("Please Login first")
          return;
        }
        addComment();
        toast.current?.show({severity:'success', summary: 'Error', detail:'Deleted', life: 3000});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
<div className={styles.Notification}>
     <Toast ref={toast} />
</div>
      {comment &&
        comment.map((singleComment, index) => {
          return (
            <div className={singleComment.userRef === userProfile?.id ? styles.exist_user : styles.comment_user} key={index}>
              <div className={styles.comment_photo_box}>
                <img className={styles.comment_photo} src={singleComment.users[0].avatar} alt="" />
              </div>
              <div className={styles.comment_text_box}>
                <p>{singleComment.users[0].name}</p>
                <p className={styles.comment_text}>{singleComment.comment}</p>

                {singleComment.userRef === userProfile?.id && (
                  <p className={styles.exist_user_action}>
                    <Link to="#">
                      <span className="pi pi-file-edit">&nbsp;</span>
                    </Link>
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteComments(singleComment.id);
                      }}
                    >
                      <span className="pi pi-trash"> </span>
                    </Link>
                  </p>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Comments;
