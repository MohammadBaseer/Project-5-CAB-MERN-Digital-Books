import { useContext, useRef, useState } from "react";
import styles from "./CommentSection.module.scss";
import { CommentType, NotOkType } from "../../../../../../@Types/Types";
import { BaseURL } from "../../../../../../Utils/URLs/ApiURL";
import Comments from "./Comments/Comments";
import { AuthContext } from "../../../../../../Context/AuthContext";
import { isToken } from "../../../../../../Utils/tokenServices";
import { Toast } from "primereact/toast";

type CommentTypeProps = {
  id: string;
  comment: CommentType[];
  addComment: any;
};

const CommentSection = ({ id, comment, addComment }: CommentTypeProps) => {
  const toast = useRef<Toast>(null);
  const { userProfile } = useContext(AuthContext);
  const uid = userProfile?.id as string;
  const isUserLogged = isToken();

  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [commentText, setCommentText] = useState<string>("");


  const insertNewComment = async () => {

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const body = new URLSearchParams();
      body.append("comment", commentText);
      body.append("bookRef", id);
      body.append("userRef", uid);
      const requestOption = {
        method: "POST",
        headers: headers,
        body: body,
      };
      const response = await fetch(`${BaseURL}/api/comments`, requestOption);

      if (!isUserLogged) {
        toast.current?.show({severity:'error', summary: 'Error', detail:'Please Login first', life: 3000});
        return;
      }
      if (!commentText.trim()) {
        toast.current?.show({severity:'error', summary: 'Error', detail:'empty*', life: 3000});
        return;
      }
      
      if (response.ok) {
        await response.json();
        setCommentText("");
        setErrorHandler("comment added successfully");
        addComment();
      }
      if (!response.ok) {
        const data = (await response.json()) as NotOkType;
        setErrorHandler(data);
        return;
      }
    } catch (error: any) {
      setErrorHandler(error.message || "An unknown error occurred");
    }
  };
  //! OnChange Function
  const AddCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();
    insertNewComment();
  };

  return (
    <>
      <Toast ref={toast} />
    <div className={styles.comment_section}>
      <div className={styles.comment_container}>
        <form onSubmit={AddCommentHandler}>
          <div className={styles.comment_box}>
            <textarea className={styles.comments} rows={10} placeholder="Aa" name="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
            {/* {errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>} */}
          </div>

          <div className={styles.comment_button}>
            <button>Comment</button>
          </div>
          <br />
          <br />

          <Comments comment={comment} addComment={addComment} />
        </form>
      </div>
    </div>
    </>
  );
};

export default CommentSection;
