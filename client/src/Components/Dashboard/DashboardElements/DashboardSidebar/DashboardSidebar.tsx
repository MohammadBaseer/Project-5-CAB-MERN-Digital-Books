import { NavLink } from "react-router-dom";
import styles from "./DashboardSidebar.module.scss";
import "primeicons/primeicons.css";

const DashboardSidebar = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.navbar}>
        <h1>Sidebar</h1>
        <div className={styles.nav_elements}>
          <ul className={styles.ul_main}>
            <li className={styles.li_main}>
              <NavLink to="dashboard">
                <span className="pi pi-home"> Dashboard</span>
              </NavLink>
            </li>
            <li className={styles.li_main}>
              <NavLink to="">
                <span className="pi pi-book"> Book Section</span>
              </NavLink>
            </li>
            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <NavLink to="books-table">
                  <span className="pi pi-angle-right"> Books</span>
                </NavLink>
              </li>
            </ul>

            <li className={styles.li_main}>
              <NavLink to="">
                <span className="pi pi-cog"> Web Contact Section </span>
              </NavLink>
            </li>

            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <NavLink to="/messages">
                  <span className="pi pi-envelope"> Messages</span>
                </NavLink>
              </li>
            </ul>

            <li className={styles.li_main}>
              <NavLink to="">
                <span className="pi pi-cog"> Settings</span>
              </NavLink>
            </li>

            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <NavLink to="/users">
                  <span className="pi pi-user"> Users</span>
                </NavLink>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
