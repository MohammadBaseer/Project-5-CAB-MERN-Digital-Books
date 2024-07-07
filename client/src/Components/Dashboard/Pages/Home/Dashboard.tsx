import { useContext } from "react";
import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";
import styles from "./Dashboard.module.scss";
import { FetchApiContext } from "../../../../Context/FetchApiContext";

const Dashboard = () => {
  const { data } = useContext(FetchApiContext);

  console.log(data);
  return (
    <>
      <div className={styles.main_container}>
        <DashboardNavbar />

        <div className={styles.container}>
          <div className={styles.container}>
            <div className={styles.dashboard}>
              <div className={styles.card}>
                <h3>Books</h3>
                <p className={styles.percentage}>{data && data.length}</p>
              </div>
              <div className={styles.card}>
                <h3>Users</h3>
                <p className={styles.percentage}></p>
              </div>
              <div className={styles.card}>
                <h3>Messages</h3>
                <p className={styles.percentage}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
