import { useEffect, useState } from "react";
import styles from "./User.module.scss";
import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";

type UserType = {
  name: string;
  email: string;
  avatar: string;
  createdAt: Date | string | any;
};

const User = () => {
  const [userData, setUserData] = useState<UserType[] | null>(null);
  const [error, setError] = useState("");

  const ApiURL = "http://localhost:5000/auth/user";

  const FetchUSerDataFun = async () => {
    try {
      const response = await fetch(ApiURL);
      const result = (await response.json()) as UserType[];

      setUserData(result);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    FetchUSerDataFun();
  }, []);

  return (
    <>
      <div className={styles.main_container}>
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
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date of Register</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData &&
                  userData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>
                          <img className={styles.image} src={item.avatar} alt="" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.createdAt}</td>
                        <td>N/A</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
