import { useContext } from "react";
import styles from "./Comments.module.scss";
import { CommentsType } from "../../../../../../../@Types/Types";
import { AuthContext } from "../../../../../../../Context/AuthContext";
import UpdateCommentModal from "./CommentModal/UpdateCommentModal";
type CommentTypeProps = {
  comment: CommentsType[];
  addComment: any;
};
const Comments = ({ comment, addComment }: CommentTypeProps) => {
  console.log("comments======>", comment);

  const { userProfile } = useContext(AuthContext);

  return (
    <>
      <div className={styles.Notification}></div>
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
                  <>
                    <UpdateCommentModal id={singleComment.id} addComment={addComment} commentText={singleComment.comment} />
                  </>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Comments;
