import "primeicons/primeicons.css";
import styles from "./BooksDisplayItem.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { FetchApiContext } from "../../../../../Context/FetchApiContext";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Toast } from "primereact/toast";
import { AuthContext } from "../../../../../Context/AuthContext";
import { BooksDataType } from "../../../../../@Types/Types";
import Loading from "../../../../../Loaders/Loading/Loading";

const BooksDisplayItem = () => {
  const toast = useRef<Toast>(null);

  const { data, loading, errorHandle, likeFunction } = useContext(FetchApiContext);
  const { userProfile } = useContext(AuthContext);
  const [bookData, setBookData] = useState<BooksDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (data) {
      setBookData(data.slice(0, itemsPerPage));
    }
  }, [data]);

  const fetchMoreData = () => {
    if (data) {
      setTimeout(() => {
        if (currentPage * itemsPerPage < data.length) {
          const nextPageData = data && data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
          setBookData((prevItems) => [...prevItems, ...nextPageData]);
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }, 1500);
    }
  };

  const dLength = data && (data.length as any);
  return (
    <>
      <Toast ref={toast} />

      <InfiniteScroll dataLength={bookData.length} next={fetchMoreData} hasMore={currentPage * itemsPerPage < dLength} loader={<Loading />}>
        <div className={styles.books_list}>
          {bookData.map((displayItem, index) => (
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
                        <span className={`pi pi-thumbs-up${userProfile && displayItem.likes.includes(userProfile?.id) ? "-fill" : ""} ${styles.like}`}></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {
        <div className={styles.error}>
          <h2>{errorHandle}</h2>
        </div>
      }
      {loading && <Loading />}
    </>
  );
};

export default BooksDisplayItem;
