import { FetchApiContext } from "../../../../Context/FetchApiContext";
import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";
import styles from "./Books.module.scss";
import "primeicons/primeicons.css";
import InsertBookButtonModal from "./InsertBookButton/InsertBookButtonModal/InsertBookButtonModal";
import BookDelete from "./BookDelete/BookDelete";
import ViewBook from "./ViewBook/ViewBook";
import { useContext } from "react";

const Books = () => {
  const { data } = useContext(FetchApiContext);

  return (
    <div className={styles.main_container}>
      <DashboardNavbar />
      <div className={styles.container}>
        <h2>
          <span className="pi pi-home">&nbsp;Dashboard\Books List</span>
        </h2>
        <div className={styles.table_box}>
          <div className={styles.button_section}>
            <InsertBookButtonModal />
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
                data.map((book, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>
                        <img className={styles.image} src={book.image} alt="" />
                      </td>
                      <td>{book.title}</td>
                      <td>{book.authors}</td>

                      <td>
                        {/* Book Details */}

                        <ViewBook book={book} />

                        {/* SECTION Table of Content */}
                        <a href="#">
                          <span className="pi pi-receipt">&nbsp;</span>
                        </a>
                        {/* Add Book Title */}
                        <a href="#">
                          <span className="pi pi-external-link">&nbsp;</span>
                        </a>
                        {/* Edit  */}
                        <a href="#">
                          <span className="pi pi-file-edit">&nbsp;</span>
                        </a>
                        {/* Delete Confirm Notified */}
                        <BookDelete id={book._id} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
