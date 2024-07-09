import { useContext, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { BaseURL } from "../../../../../../Utils/URLs/ApiURL";
import { Link } from "react-router-dom";
import { FetchApiContext } from "../../../../../../Context/FetchApiContext";

type PropsType = {
  id: string;
  imageUrl: string;
};

type ToastContentProps = {
  message: {
    severity: string;
    sticky: boolean;
    summary: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
};

const ToastContent = ({ message, onConfirm, onCancel }: ToastContentProps) => {
  return (
    <div className="flex flex-column align-items-left" style={{ flex: "1" }}>
      <div className="font-medium text-lg my-3 text-900">{message.summary}</div>
      <div className="flex gap-2">
        <Button className="p-button-sm" label="Yes" severity="success" onClick={onConfirm} />
        <Button className="p-button-sm" label="No" severity="danger" onClick={onCancel} />
      </div>
    </div>
  );
};

const BookDeleteModal = ({ id, imageUrl }: PropsType) => {
  const { ApiFetchDataFun } = useContext(FetchApiContext);

  const [visible, setVisible] = useState(false);
  const toastBC = useRef<Toast>(null);

  const clear = () => {
    toastBC.current?.clear();
    setVisible(false);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOption = {
      method: "DELETE",
      headers: myHeaders,
    };
    try {
      await fetch(`${BaseURL}/api/books?id=${id}&imageUrl=${imageUrl}`, requestOption);
      toastBC.current?.show({ severity: "success", summary: "Item deleted successfully!" });
      ApiFetchDataFun();
    } catch (error) {
      toastBC.current?.show({ severity: "error", summary: "Error deleting item!" });
    } finally {
      clear();
    }
  };

  const confirm = () => {
    if (!visible) {
      setVisible(true);
      toastBC.current?.clear();
      toastBC.current?.show({
        severity: "warn",
        summary: "Are you sure you want to delete this Book?",
        sticky: true,
        content: <ToastContent message={{ severity: "warn", sticky: true, summary: "Are you sure you want to delete this Book?" }} onConfirm={confirmDelete} onCancel={clear} />,
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
          confirm();
        }}
      >
        <span className="pi pi-trash">&nbsp;</span>
      </Link>
    </>
  );
};

export default BookDeleteModal;
