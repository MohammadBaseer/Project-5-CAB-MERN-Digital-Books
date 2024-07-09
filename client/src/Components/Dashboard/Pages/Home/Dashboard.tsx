import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <>
      <div className={styles.main_container}>
        <DashboardNavbar />

        <div className={styles.container}>
          <div className={styles.container}>
            <div className={styles.dashboard}>
              <div className={styles.card}>
                <h3>Books</h3>
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
