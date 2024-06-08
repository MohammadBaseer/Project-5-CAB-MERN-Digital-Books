import styles from "./BooksDetails.module.scss";
import "primeicons/primeicons.css";

const BooksDetails = () => {
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
              <h3 className={styles.h3}>
                <strong>Collective Intelligence in Action</strong>
              </h3>
            </div>
            <div className={styles.details_author}>
              <h4>Author: Tariq Ahmed</h4>
            </div>
            <div className={styles.details_publish_date}>
              <h4>Publish Date: Sat Jun 08 2024</h4>
            </div>
            <div className={styles.pages}>
              <h4>
                <i className="pi pi-file-check"> Pages: 155</i>
              </h4>
            </div>
            <div className={styles.details_toc}>
              <h4>
                <i className="pi pi-list"> TOC</i>
              </h4>
            </div>
            <div className={styles.read}>
              <h4>
                <i className="pi pi-book"> Read</i>
              </h4>
            </div>
          </div>
        </div>
        <hr />
        <hr />

        <div className="styles.toc_Container">
          <div className="styles Overview">
            <h2>Overview</h2>
            <h4>On May 17, 2014, Admiral William H. McRaven addressed the graduating class of the University of Texas at Austin on their Commencement day. Taking inspiration from the university's slogan, "What starts here changes the world," he shared the ten principles he learned during Navy Seal training that helped him overcome challenges not only in his training and long Naval career, but also throughout his life; and he explained how anyone can use these basic lessons to change themselves-and the world-for the better.</h4>
            <h4>Admiral McRaven's original speech went viral with over 10 million views. Building on the core tenets laid out in his speech, McRaven now recounts tales from his own life and from those of people he encountered during his military service who dealt with hardship and made tough decisions with determination, compassion, honor, and courage. Told with great humility and optimism, this timeless book provides simple wisdom, practical advice, and words of encouragement that will inspire readers to achieve more, even in life's darkest moments.</h4>
          </div>
          <hr />
          <h2>Additional Info</h2>
          <hr />
          <h3>Info</h3>{" "}
          <p>
            ISBN: 9781455570249 <br />
            Published Date: April 4, 2017 <br />
            Publisher: Grand Central Publishing <br />
            Language: English <br />
            Page Count: 130 <br />
            Size: 7.25" l x 5.09" w x 0.68" h
          </p>
        </div>
      </div>
    </>
  );
};

export default BooksDetails;
