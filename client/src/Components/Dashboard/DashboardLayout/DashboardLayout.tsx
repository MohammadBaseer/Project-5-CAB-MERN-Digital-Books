import { Outlet } from "react-router-dom";
import styles from "./DashboardLayout.module.scss";
import DashboardSidebar from "../DashboardElements/DashboardSidebar/DashboardSidebar";


const DashboardLayout = () => {
  return (
    <div className={styles.main_container}>

      <DashboardSidebar />
      <Outlet />

    </div>
  );
};

export default DashboardLayout;
