import { FetchApiContext } from "../../../../Context/FetchApiContext";
import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";
import styles from "./Books.module.scss";
import "primeicons/primeicons.css";
import { useContext, useEffect, useState } from "react";
import ViewBookModal from "./Modals/ViewBookModal/ViewBookModal";
import UpdateBookModal from "./Modals/UpdateBookModals/UpdateBookModal/UpdateBookModal";
import BookDeleteModal from "./Modals/BookDeleteModal/BookDeleteModal";
import InsertBookModal from "./Modals/InsertBookModal/InsertBookModal";
import { AuthContext } from "../../../../Context/AuthContext";
import { BooksDataType } from "../../../../@Types/Types";
import Loading from "../../../../Loaders/Loading/Loading";

const Books = () => {
  const { data, loading, errorHandle } = useContext(FetchApiContext);
  const { userProfile } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (data && userProfile) {
      const userBooks = data.filter((book) => book.userRef === userProfile.id);
      if (userBooks.length === 0) {
        setMsg("Please insert a book");
      } else {
        setMsg("");
      }
    }
  }, [data, userProfile]);

  return (
    <>
      <div className={styles.main_container}>
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
                  data.map((bookData: BooksDataType, index: number) => {
                    return (
                      bookData.userRef === userProfile?.id && (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img className={styles.image} src={bookData.image} alt="" />
                          </td>
                          <td>{bookData.title}</td>
                          <td>{bookData.authors.join(", ")}</td>
                          <td>
                            <ViewBookModal bookData={bookData} />
                            <UpdateBookModal id={bookData._id} imageUrl={bookData.image} title={bookData.title} authors={bookData.authors} />
                            <BookDeleteModal id={bookData._id} imageUrl={bookData.image} />
                          </td>
                        </tr>
                      )
                    );
                  })}
              </tbody>
            </table>

            <strong>{msg}</strong>
          </div>
        </div>
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
