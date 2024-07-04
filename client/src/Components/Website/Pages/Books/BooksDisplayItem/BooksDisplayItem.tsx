import "primeicons/primeicons.css";
import styles from "./BooksDisplayItem.module.scss";
import { useContext, useEffect, useState } from "react";
import { FetchApiContext } from "../../../../../Context/FetchApiContext";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../../Utils/Loading/Loading";

const BooksDisplayItem = () => {
  const { data, loading, errorHandle } = useContext(FetchApiContext);
  const [bookData, setBookData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 27;

  useEffect(() => {
    if (data) {
      setBookData(data.slice(0, itemsPerPage));
    }
  }, [data]);

  const fetchMoreData = () => {
    setTimeout(() => {
      if (currentPage * itemsPerPage < data.length) {
        const nextPageData = data && data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        setBookData((prevItems) => [...prevItems, ...nextPageData]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }, 1500);
  };

  const dLength = data && (data.length as any);
  return (
    <>
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
                    {displayItem.detail && (
                      <Link to={`${displayItem._id}`} className={styles.content}>
                        <i className="pi pi-file"> Details</i>
                      </Link>
                    )}
                    <Link to={""}>
                      <span className={`pi pi-heart ${styles.like}`}> </span>
                    </Link>
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
