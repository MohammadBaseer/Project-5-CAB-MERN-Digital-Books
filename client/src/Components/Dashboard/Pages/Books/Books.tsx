import { FetchApiContext } from "../../../../Context/FetchApiContext";
import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";
import styles from "./Books.module.scss";
import "primeicons/primeicons.css";
import { useContext } from "react";
import InsertBookButtonModal from "./Modals/InsertBookModal/InsertBookButtonModal/InsertBookButtonModal";
import ViewBookModal from "./Modals/ViewBookModal/ViewBookModal";
import UpdateBookModal from "./Modals/UpdateBookModals/UpdateBookModal/UpdateBookModal";
import BookDeleteModal from "./Modals/BookDeleteModal/BookDeleteModal";

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
                        {/* View  */}
                        <ViewBookModal book={book} />

                        {/* Edit  */}
                        <UpdateBookModal imageUrl={book.image} title={book.title} authors={book.authors} />

                        {/* Delete Confirm Notified */}
                        <BookDeleteModal id={book._id} imageUrl={book.image} />
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
