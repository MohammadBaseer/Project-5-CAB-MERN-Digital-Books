import { useParams } from "react-router-dom";
import styles from "./BooksDetails.module.scss";
import "primeicons/primeicons.css";

const BooksDetails = () => {
  let { id } = useParams();

  console.log("id====>", id);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className={styles.container}>
        <div className={styles.books_details_container}>
          <div className={styles.details_image}>
            <img className={styles.image} src="https://cdn01.sapnaonline.com/product_media/9789352133574/md_9789352133574.jpg" alt="" />
          </div>

          <div className={styles.details_elements}>
            <div className={styles.details_title}>
              <h5 className={styles.h3}>Collective Intelligence in Action</h5>
            </div>
            <div className={styles.details_author}>
              <h5>Author: Tariq Ahmed</h5>
            </div>
            <div className={styles.details_publish_date}>
              <h5>Publish Date: Sat Jun 08 2024</h5>
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
            <h5>On May 17, 2014, Admiral William H. McRaven addressed the graduating class of the University of Texas at Austin on their Commencement day. Taking inspiration from the university's slogan, "What starts here changes the world," he shared the ten principles he learned during Navy Seal training that helped him overcome challenges not only in his training and long Naval career, but also throughout his life; and he explained how anyone can use these basic lessons to change themselves-and the world-for the better.</h5>
            <h5>Admiral McRaven's original speech went viral with over 10 million views. Building on the core tenets laid out in his speech, McRaven now recounts tales from his own life and from those of people he encountered during his military service who dealt with hardship and made tough decisions with determination, compassion, honor, and courage. Told with great humility and optimism, this timeless book provides simple wisdom, practical advice, and words of encouragement that will inspire readers to achieve more, even in life's darkest moments.</h5>
          </div>
          <hr />
          <h3>Additional Info</h3>
          <hr />
          <h3>Info</h3>{" "}
          <h5>
            ISBN: 9781455570249 <br />
            Published Date: April 4, 2017 <br />
            Publisher: Grand Central Publishing <br />
            Language: English <br />
            Page Count: 130 <br />
            Size: 7.25" l x 5.09" w x 0.68" h
          </h5>
        </div>
      </div>
    </>
  );
};

export default BooksDetails;
