import { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import { CommentType } from "../../../../../../../@Types/Types";
type CommentTypeProps = {
  // id: string;
  comment: CommentType[];
};
const Comments = ({comment}:CommentTypeProps) => {
  return (
    <>


        {comment &&
          comment.map((singleComment, index) => {
            return(
              <div className={styles.comment_user} key={index}>
              <div className={styles.comment_photo_box}>
                <img className={styles.comment_photo} src="https://johannesippen.com/img/blog/humans-not-users/header.jpg" alt="" />
              </div>
              <div className={styles.comment_text_box}>
                <p>Name</p>
                <p>{singleComment.comment}</p>
              </div>
            </div>  

            )
 })}


    </>
  );
};

export default Comments;
