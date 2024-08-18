import styles from "./Navbar.module.scss";
import "./navbarLink.scss";
import { NavLink, useLocation } from "react-router-dom";
import NavbarHead from "./NavbarHead";
import { useEffect, useState } from "react";

function Navbar() {
  //! in every location change the toggle state
  const location = useLocation();
  //!---------------------------------------------------------------------------------

  const [hideMenuToggle, setHideMenuToggle] = useState<boolean>(false);

  const menuToggle = () => {
    if (hideMenuToggle) {
      setHideMenuToggle(false);
    } else {
      setHideMenuToggle(true);
    }
  };
  useEffect(() => {
    setHideMenuToggle(false);
  }, [location]);

  return (
    <>
      <NavbarHead />
      <div className={styles.menu}>
        <i className="pi pi-bars" onClick={menuToggle}></i>
      </div>
      <div className={styles.body_container} style={hideMenuToggle === true ? { display: "block" } : { display: "" }}>
        <nav className={styles.navbar}>
          <div className={styles.flex_box}>
            <ul>
              <div className={styles.flex}>
                <li className={styles.nav_elements}>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className={styles.nav_elements}>
                  <NavLink to="books">Books</NavLink>
                </li>
                <li className={styles.nav_elements}>
                  <NavLink to="contact">Contact</NavLink>
                </li>
                {/* <li className={styles.nav_elements}>
                  <NavLink to="/about">About us</NavLink>
                </li> */}
              </div>
            </ul>
          </div>
        </nav>
      </div>
      <hr className={styles.break_line} />
    </>
  );
}

export default Navbar;
