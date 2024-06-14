import { useParams } from "react-router-dom";
import styles from "./BooksDetails.module.scss";
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";

import { BooksDataType } from "../../../../../@Types/Types";

const BooksDetails = () => {
  const [data, setData] = useState<BooksDataType | null>(null);
  let { id } = useParams();

  const ApiFetchDataFunA = async () => {
    // const ApiURL = "http://localhost:5000/api/books/all/66630ce850d41bcb8fa629d6";
    const ApiURL = `http://localhost:5000/api/books/all/${id}`;

    try {
      const url = await fetch(ApiURL);
      const result = (await url.json()) as BooksDataType;
      console.log("result ====> ", result);
      setData(result);
    } catch (error) {}
  };

  useEffect(() => {
    ApiFetchDataFunA();
  }, []);

  if (data) {
    console.log("data------->>>>", data.detail.date);
  }

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
              <h5>{data?.detail.date}</h5>
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
            ISBN: {data?.detail.isbn} <br />
            Published Date: {data?.detail.date} <br />
            Publisher: Grand Central Publishing <br />
            Language: English <br />
            Page Count: {data?.detail.pageCount} <br />
            Size: 7.25" l x 5.09" w x 0.68" h
          </h5>
        </div>
        {/* ------------------------------- */}

        <hr />
        <hr />

        <div className={styles.comment_section}>
          <div className={styles.comment_container}>
            <div className={styles.comment_box}>
              <textarea className={styles.comments} rows="10" placeholder="Aa"></textarea>
            </div>

            <div className={styles.comment_button}>
              <button>Comment</button>
            </div>

            <div className={styles.comment_user}>
              <div className={styles.comment_photo_box}>
                <img className={styles.comment_photo} src="https://johannesippen.com/img/blog/humans-not-users/header.jpg" alt="" />
              </div>
              <div className={styles.comment_text_box}>
                <p>Name</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis autem atque aut exercitationem ratione voluptatum nulla libero, ipsa ullam. Laborum, minus iusto? Molestiae mollitia aliquid esse ducimus accusantium tempore earum?</p>
              </div>
            </div>
          </div>
        </div>
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
