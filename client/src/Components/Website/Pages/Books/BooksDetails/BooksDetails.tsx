import { useParams } from "react-router-dom";
import styles from "./BooksDetails.module.scss";
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { BooksDataType } from "../../../../../@Types/Types";
import CommentSection from "./CommentSection/CommentSection";

const BooksDetails = () => {
  const [data, setData] = useState<BooksDataType | null>(null);

  let { id } = useParams();
  id = id as string;

  const ApiFetchDataFunction = async () => {
    try {
      const url = await fetch(`http://localhost:5000/api/books/${id}`);
      const response = (await url.json()) as BooksDataType;
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ApiFetchDataFunction();
  }, []);

  const addComment = () => {
    ApiFetchDataFunction();
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className={styles.container}>
        <div className={styles.books_details_container}>
          <div className={styles.details_image}>
            <img className={styles.image} src={data?.image} alt="" />
          </div>

          <div className={styles.details_elements}>
            <div className={styles.details_title}>
              <h5 className={styles.h3}>{data?.title}</h5>
            </div>
            <div className={styles.details_author}>
              <h5>{data?.authors}</h5>
            </div>
            <div className={styles.details_publish_date}>
              <h5>{data?.detail.publishAt}</h5>
            </div>
            <div className={styles.pages}>
              <h5>
                <i className="pi pi-file-check"> Pages: 155</i>
              </h5>
            </div>
            <div className={styles.details_toc}>
              <h5>
                <i className="pi pi-list"> TOC</i>
              </h5>
            </div>
            <div className={styles.read}>
              <h5>
                <i className="pi pi-book"> Read</i>
              </h5>
            </div>
          </div>
        </div>
        <hr />
        <hr />

        <div className="styles.toc_Container">
          <div className="styles Overview">
            <h2>Overview</h2>
            <h5>{data?.detail.longDescription}</h5>
          </div>
          <hr />
          <h3>Additional Info</h3>
          <hr />
          <h3>Info</h3>{" "}
          <h5>
            Published Date: {data?.detail.publishAt} <br />
          </h5>
        </div>
        {/* ------------------------------- */}

        <hr />
        <hr />

        <CommentSection id={id} comment={data?.comment} addComment={addComment} />

        <br />
        <br />
        <br />
        <br />
        <br />
        {/* ------------------------------- */}
      </div>
    </>
  );
};

export default BooksDetails;
