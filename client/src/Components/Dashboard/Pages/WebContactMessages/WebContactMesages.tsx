import { useEffect, useRef, useState } from "react";
import styles from "./WebContactMessages.module.scss";
import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";
import { BaseURL } from "../../../../Utils/URLs/ApiURL";
import { Toast } from "primereact/toast";

type MessagesType = {
  name: string;
  email: string;
  messages: string;
  createdAt: Date | string | any;
};

const WebContactMessages = () => {
  const [data, setData] = useState<MessagesType[] | null>(null);
  const toast = useRef<Toast>(null);

  const FetchContactMessages = async () => {
    try {
      const response = await fetch(`${BaseURL}/api/messages`);
      if (!response.ok) {
        console.log("Response Failed ");
        toast.current?.show({ severity: "error", summary: "Error", detail: "Response Failed", life: 3000 });
        return;
      }
      if (response.ok) {
        const result = (await response.json()) as MessagesType[];
        // console.log("result:::::", result)
        setData(result);
      }
    } catch (error: any) {
      console.log("err=====>", error);
    }
  };

  useEffect(() => {
    FetchContactMessages();
  }, []);

  return (
    <>
      <div className={styles.main_container}>
        <Toast ref={toast} />
        <DashboardNavbar />
        <div className={styles.container}>
          <h2>
            <span className="pi pi-home">&nbsp;Dashboard\Users</span>
          </h2>
          <div className={styles.table_box}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Messages</th>
                  {/* <th>Date</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.length === 0 ? (
                  <tr>
                    <td>
                      <strong>No Data Found</strong>
                    </td>
                  </tr>
                ) : (
                  data &&
                  data.map((msg, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{msg.name}</td>
                        <td>
                          <a href={`mailto: ${msg.email}`}> {msg.email}</a>
                        </td>
                        <td>{msg.messages}</td>
                        {/* <td>{msg.createdAt}</td> */}
                        <td>N/A</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebContactMessages;
