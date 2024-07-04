import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import "./css.css";

import Loading from "../../../../Utils/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { FetchApiContext } from "../../../../Context/FetchApiContext";

const Home = () => {
  const { data, loading, errorHandle } = useContext(FetchApiContext);
  const itemSlice = data?.slice(0, 27);

  //!
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const handleResize = () => {
  //   setWindowWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  //!

  // const shuffled = data?.sort(() => 0.5 - Math.random());
  var item = data?.slice(0, 4);

  return (
    <>
      {/* <h1>{windowWidth}</h1> */}
      <div className={styles.container}>
        <br />
        <div className={styles.slider}>
          <img className={styles.slider_image} src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2024/07/02/29800_Quote_A2_Evenings_and_Weekends_07_02_24.jpg" alt="" />
        </div>
        <div className={styles.random_items_box}>
          <div className={`${styles.random_items_box_a}  col-12 md:col-12 lg:col-12`}>
            <div className={styles.books_list}>
              {item &&
                item.map((singleBook, index) => (
                  <div className={styles.books} key={index}>
                    <div className={styles.books_elements}>
                      <div className={styles.book_image}>
                        <img src={singleBook.image} alt="" />
                      </div>
                      <div className={styles.book_title}>
                        <p className={styles.title}>
                          <strong>{singleBook.title}</strong>
                        </p>
                        <p className={styles.author}>{singleBook?.detail?.publishAt}</p>
                        <p className={styles.author}>{singleBook.authors[0]}</p>
                        <p className={styles.star}></p>
                        {/* <a href="/read" className={styles.read}>
                          <i className="pi pi-book"> Read</i>
                        </a> */}
                        {singleBook.detail && (
                          <Link to={`books/${singleBook._id}`} className={styles.content}>
                            <i className="pi pi-file"> Details</i>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {loading && <Loading />}
          </div>
        </div>

        <br />
        <br />
        <div className={styles.hr_line}></div>
        <hr />
        <br />
        {/* //!================================================================================== */}

        <div className={styles.books_list}>
          {itemSlice &&
            itemSlice.map((displayItem, index) => (
              <div className={styles.books} key={index}>
                <div className={styles.books_elements}>
                  <div className={styles.book_image}>
                    <img src={displayItem.image} alt="" />
                  </div>
                  <div className={styles.book_title}>
                    <p className={styles.title}>
                      <strong>{displayItem.title}</strong>
                    </p>
                    <p className={styles.author}>{displayItem?.detail?.publishAt}</p>
                    <p className={styles.author}>{displayItem.authors[0]}</p>
                    <p className={styles.star}></p>
                    {/* <a href="/read" className={styles.read}>
                      <i className="pi pi-book"> Read</i>
                    </a> */}
                    {displayItem.detail && (
                      <Link to={`books/${displayItem._id}`} className={styles.content}>
                        <i className="pi pi-file"> Details</i>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {
          <div className={styles.error}>
            <h2>{errorHandle}</h2>
          </div>
        }
        {loading && <Loading />}

        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Home;
