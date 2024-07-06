import NavbarHead from "../../../Website/Navbar/NavbarHead";
import styles from "./DashboardNavbar.module.scss";

const DashboardNavbar = () => {
  return (
    <div className={styles.navbar_head}>
      {/* <h1> Navbar</h1> */}
      <NavbarHead />
    </div>
  );
};

export default DashboardNavbar;
