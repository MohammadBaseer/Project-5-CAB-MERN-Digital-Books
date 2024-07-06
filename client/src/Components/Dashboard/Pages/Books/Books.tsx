import { FetchApiContext } from "../../../../Context/FetchApiContext";
import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";
import styles from "./Books.module.scss";
import "primeicons/primeicons.css";
import { useContext, useEffect, useState } from "react";
import InsertBookButtonModal from "./Modals/InsertBookModal/InsertBookModal";
import ViewBookModal from "./Modals/ViewBookModal/ViewBookModal";
import UpdateBookModal from "./Modals/UpdateBookModals/UpdateBookModal/UpdateBookModal";
import BookDeleteModal from "./Modals/BookDeleteModal/BookDeleteModal";
import InsertBookModal from "./Modals/InsertBookModal/InsertBookModal";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../Utils/Loading/Loading";
import { AuthContext } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

interface BookData {
  _id: string;
  title: string;
  image: string;
  authors: string[];
  userRef: string;
  detail: {
    publishAt: any;
    longDescription: string;
    categories: string[];
  };
}

// Define the FetchApiContext data structure
interface FetchApiContextType {
  data: BookData[];
  loading: boolean;
  errorHandle: string;
}

const Books = () => {
  const { data, loading, errorHandle } = useContext(FetchApiContext) as FetchApiContextType;
  const { userProfile } = useContext(AuthContext);

  // if (data.userRef) {

  // }

  // const [bookData, setBookData] = useState<any>([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 21;

  // useEffect(() => {
  //   if (data) {
  //     setBookData(data.slice(0, itemsPerPage));
  //   }
  // }, [data]);

  // const fetchMoreData = () => {
  //   setTimeout(() => {
  //     if (currentPage * itemsPerPage < data.length) {
  //       const nextPageData = data && data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  //       setBookData((prevItems) => [...prevItems, ...nextPageData]);
  //       setCurrentPage((prevPage) => prevPage + 1);
  //     }
  //   }, 1500);
  // };

  // const dLength = data && (data.length as any);

  return (
    <>
      <div className={styles.main_container}>
        {/* <InfiniteScroll dataLength={bookData.length} next={fetchMoreData} hasMore={currentPage * itemsPerPage < dLength} loader={<Loading />}> */}
        <DashboardNavbar />
        <div className={styles.container}>
          <h2>
            <span className="pi pi-home">&nbsp;Dashboard\Books List</span>
          </h2>
          <div className={styles.table_box}>
            <div className={styles.button_section}>
              <InsertBookModal />
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Photo</th>
                  <th>Book Name</th>
                  <th>Author</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((bookData, index) => {
                    return bookData.userRef === userProfile?.id ? (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>
                          <img className={styles.image} src={bookData.image} alt="" />
                        </td>
                        <td>{bookData.title}</td>
                        <td>{bookData.authors}</td>

                        <td>
                          {/* View  */}
                          <ViewBookModal bookData={bookData} />

                          {/* Edit  */}
                          <UpdateBookModal id={bookData._id} imageUrl={bookData.image} title={bookData.title} authors={bookData.authors} />

                          {/* Delete Confirm Notified */}
                          <BookDeleteModal id={bookData._id} imageUrl={bookData.image} />
                        </td>
                      </tr>
                    ) : (
                      ""
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* </InfiniteScroll> */}
        {loading && <Loading />}
        {
          <div className={styles.error}>
            <h2>{errorHandle}</h2>
          </div>
        }
      </div>
    </>
  );
};

export default Books;
