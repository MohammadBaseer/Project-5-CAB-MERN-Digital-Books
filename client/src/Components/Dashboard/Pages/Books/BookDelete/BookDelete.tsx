import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { BaseURL } from "../../../../../Utils/URLs/ApiURL";
import { Link, useParams } from "react-router-dom";

const BookDelete = ({ id }) => {
  //   console.log("id =======<", id);

  const [visible, setVisible] = useState(false);
  //   const [itemToDelete, setItemToDelete] = useState(null);
  const toastBC = useRef(null);

  const clear = () => {
    toastBC.current.clear();
    setVisible(false);
  };

  const confirmDelete = async () => {
    try {
      console.log("id =======<", id);

      await fetch(`${BaseURL}/api/books/${id}`, { method: "DELETE" });
      //   if (result.status === 200) {
      toastBC.current.show({ severity: "success", summary: "Item deleted successfully!" });
      //   }
    } catch (error) {
      toastBC.current.show({ severity: "error", summary: "Error deleting item!" });
    } finally {
      clear();
    }
  };

  const confirm = (itemId) => {
    if (!visible) {
      //   setItemToDelete(itemId);
      setVisible(true);
      toastBC.current.clear();
      toastBC.current.show({
        severity: "warn",
        summary: "Are you sure you want to delete this Book?",
        sticky: true,
        content: (props) => (
          <div className="flex flex-column align-items-left" style={{ flex: "1" }}>
            <div className="font-medium text-lg my-3 text-900">{props.message.summary}</div>
            <div className="flex gap-2">
              <Button className="p-button-sm" label="Yes" severity="success" onClick={confirmDelete} />
              <Button className="p-button-sm" label="No" severity="danger" onClick={clear} />
            </div>
          </div>
        ),
      });
    }
  };

  return (
    <>
      <Toast ref={toastBC} />

      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          confirm("item-id");
        }}
      >
        <span className="pi pi-trash">&nbsp;</span>
      </Link>
    </>
  );
};

export default BookDelete;
