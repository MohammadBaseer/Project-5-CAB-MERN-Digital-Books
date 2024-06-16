import { BodyStyleFun } from "../../../Website/Layout/BodyStyleFun";
import DashboardNavbar from "../../DashboardElements/DashboardNavbar/DashboardNavbar";
import styles from "./DashboardHome.module.scss";
const DashboardHome = () => {
  // BodyStyleFun();

  return (
    <>
      <div className={styles.main_container}>
        <DashboardNavbar />

        <div className={styles.container}>
          <h1>this is a Home</h1>
          <h1>this is a Home</h1>
          <h1>this is a Home</h1>
          <h1>this is a Home</h1>
          <h1>this is a Home</h1>
        </div>
      </div>
    </>
  );
};
export default DashboardHome;
