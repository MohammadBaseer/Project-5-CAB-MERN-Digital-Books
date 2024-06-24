import { useState } from "react";
import styles from "./CommentSection.module.scss";
import { CommentType, NotOkType } from "../../../../../../@Types/Types";
import { BaseURL } from "../../../../../../Utils/URLs/ApiURL";
import Comments from "./Comments/Comments";
// import { FetchApiContext } from "../../../../../../Context/FetchApiContext";

type CommentTypeProps = {
  id: string;
  comment: CommentType[];
  addComment: any
};

const CommentSection = ({ id, comment, addComment  }: CommentTypeProps) => {


  const [errorHandler, setErrorHandler] = useState<NotOkType | string | any>("");
  const [commentText, setCommentText] = useState<string>("");

const insertNewComment = async () => {
  if (!commentText.trim()) {
    setErrorHandler("empty comment");
    return;
  }
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams();
    body.append("comment", commentText);
    body.append("bookRef", id);
    // body.append("userRef", userId);
    const requestOption = {
      method: "POST",
      headers: headers,
      body: body,
    };
    const response = await fetch(`${BaseURL}/api/comments`, requestOption);
    console.log("response", response);
    if (response.ok) {
    const  result = await response.json();
      setCommentText("");
            setErrorHandler("comment added successfully");
            addComment()
            console.log("result ======>", result);
    }
    if (!response.ok) {
      const data = (await response.json()) as NotOkType;
      setErrorHandler(data);
    }
  } catch (error: any) {
    setErrorHandler(error.message || "An unknown error occurred");
  }
}
  //! OnChange Function
  const AddCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrorHandler("");
    e.preventDefault();
    insertNewComment()
  };




  return (
    <div className={styles.comment_section}>
      <div className={styles.comment_container}>
 
        <form onSubmit={AddCommentHandler}>
          <div className={styles.comment_box}>
            <textarea className={styles.comments} rows={10} placeholder="Aa" name="comment" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
            {errorHandler && <div className={styles.error}>{typeof errorHandler === "string" ? errorHandler : errorHandler.error}</div>}
          </div>

          <div className={styles.comment_button}>
            <button>Comment</button>
          </div>

          <Comments comment={comment} />
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
