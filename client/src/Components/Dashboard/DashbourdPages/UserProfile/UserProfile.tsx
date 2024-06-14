import { useEffect, useState } from "react";
import styles from "./UserProfile.module.scss";

type UserType = {
  name: string;
  email: string;
  avatar: string;
  createdAt: Date | string;
};

const UserProfile = () => {
  const [userData, setUserData] = useState<UserType[] | null>(null);
  const [error, setError] = useState("");

  const ApiURL = "http://localhost:5000/auth/user";

  const FetchUSerDataFun = async () => {
    try {
      const response = await fetch(ApiURL);
      const result = (await response.json()) as UserType[];

      setUserData(result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    FetchUSerDataFun();
  }, []);

  return (
    <div>
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
                    <td>50</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
