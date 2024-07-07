import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import "./css.css";
import Loading from "../../../../Utils/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { FetchApiContext } from "../../../../Context/FetchApiContext";

import { AuthContext } from "../../../../Context/AuthContext";

const Home = () => {
  const { data, loading, errorHandle, likeFunction } = useContext(FetchApiContext);
  const { userProfile } = useContext(AuthContext);

  const itemSlice = data?.slice(0, 18);

  //!
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //!

  // const shuffled = data?.sort(() => 0.5 - Math.random());
  let size = 4;
  if (windowWidth <= 1186) {
    size = 3;
  }
  if (windowWidth <= 905) {
    size = 2;
  }
  if (windowWidth <= 625) {
    size = 1;
  }

  var item = data?.slice(0, size);

  return (
    <>
      {/* <h1>{windowWidth}</h1> */}
      <div className={styles.container}>
        <br />
        <div className={styles.slider}>
          <img className={styles.slider_image} src="https://cdn.pixabay.com/photo/2018/07/17/14/43/banner-3544296_1280.jpg" alt="" />
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
                    <div className={styles.item_footer}>
                      {(displayItem.detail && (
                        <Link to={`${displayItem._id}`} className={styles.content}>
                          <i className="pi pi-file"> Details</i>
                        </Link>
                      )) || <div></div>}

                      <div className={styles.count_like}>
                        {displayItem.likes.length || 0}
                        &nbsp;
                        <Link to={"#"} onClick={() => likeFunction(displayItem._id)}>
                          <span className={`pi pi-thumbs-up${displayItem.likes.includes(userProfile?.id) ? "-fill" : ""} ${styles.like}`}></span>
                        </Link>
                      </div>
                    </div>
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
