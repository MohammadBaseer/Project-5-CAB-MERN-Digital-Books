import { NavLink } from "react-router-dom";
import styles from "./DashboardSidebar.module.scss";
import "primeicons/primeicons.css";

const DashboardSidebar = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.navbar}>
        <h1>Admin Panel</h1>
        <div className={styles.nav_elements}>
          <ul className={styles.ul_main}>
            <li className={styles.li_main}>
              <span className="pi pi-home">&nbsp;Dashboard</span>
            </li>
            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <NavLink to="dashboard">
                  <span className="pi pi-angle-right">&nbsp;Home</span>
                </NavLink>
              </li>
            </ul>
            <li className={styles.li_main}>
              <span className="pi pi-book">&nbsp;Book Section</span>
            </li>
            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <NavLink to="books-table">
                  <span className="pi pi-angle-right">&nbsp;Books</span>
                </NavLink>
              </li>
            </ul>

            <li className={styles.li_main}>
              <span className="pi pi-cog">&nbsp;Web Contact Section </span>
            </li>

            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <NavLink to="/messages">
                  <span className="pi pi-angle-right">&nbsp;Messages</span>
                </NavLink>
              </li>
            </ul>

            <li className={styles.li_main}>
              <span className="pi pi-cog">&nbsp;Settings</span>
            </li>

            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <NavLink to="/users">
                  <span className="pi pi-angle-right">&nbsp;Users</span>
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
