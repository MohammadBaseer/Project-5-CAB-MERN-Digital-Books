import { useContext, useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import { CommentType } from "../../../../../../../@Types/Types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../../../Context/AuthContext";
type CommentTypeProps = {
  // id: string;
  comment: CommentType[];
};
const Comments = ({ comment }: CommentTypeProps) => {
  const { userProfile } = useContext(AuthContext);

  return (
    <>
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

                {singleComment.userRef === userProfile?.id ? (
                  <p className={styles.exist_user_action}>
                    <Link rel="stylesheet" to="#">
                      <span className="pi pi-file-edit">&nbsp;</span>
                    </Link>
                    <Link rel="stylesheet" to="#">
                      <span className="pi pi-trash"> </span>
                    </Link>
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Comments;
