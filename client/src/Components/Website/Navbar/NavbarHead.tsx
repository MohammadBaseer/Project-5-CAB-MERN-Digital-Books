import "primeicons/primeicons.css";
import styles from "./NavbarHead.module.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarHead = () => {
  const { user, setUser } = useState<boolean>(true);
  //! in every location change the toggle state
  const location = useLocation();
  //!---------------------------------------------------------------------------------

  //! use State and Function for user Drop Down menu toggle on off
  const [profileNavbarToggle, setProfileNavbarToggle] = useState<boolean>(false);

  const toggle = () => {
    if (profileNavbarToggle) {
      setProfileNavbarToggle(false);
    } else {
      setProfileNavbarToggle(true);
    }
  };
  //!---------------------------------------------------------------------------------

  //! in every location change the toggle state
  useEffect(() => {
    setProfileNavbarToggle(false);
  }, [location]);
  //!---------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.navbar_head}>
        <div className={styles.body_container}>
          <div className={styles.nav_elements}>
            {!user ? (
              <>
                <Link to="/cart">
                  <i className="pi pi-shopping-cart">
                    <span> 0</span>
                  </i>
                </Link>

                <div className={styles.user_tab_navbar}>
                  <div className={styles.user_tab_navbar_photo}>
                    <img className={styles.user_photo} src="" alt="" onClick={toggle} />
                  </div>
                  <div className={styles.user_tab_navbar_element_box} style={profileNavbarToggle === true ? { display: "block" } : { display: "none" }}>
                    <div className={styles.user_tab_navbar_element}>
                      <img className={styles.user_photo} src="" alt="" onClick={toggle} />
                      <p>Baseer</p>
                    </div>

                    <div className={styles.user_tab_navbar_element}>
                      <span className="pi pi-user">
                        <Link to="/register"> My Profile</Link>
                      </span>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="/chat">
                        {" "}
                        <span className="pi pi-comment"> Messages</span>{" "}
                      </Link>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="/myShop">
                        {" "}
                        <span className="pi pi-shop"> My Shop</span>{" "}
                      </Link>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <span className="pi pi-cog">
                        <Link to="/register"> Settings</Link>
                      </span>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="#">
                        <span className="pi pi-sign-out"> Logout</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="">
                  <Link to="/login">Login</Link>
                  &nbsp;/&nbsp;
                  <Link to="/register">Register</Link>
                  &nbsp;
                  <span className="pi pi-sign-in" style={{ fontSize: "0.8rem" }}></span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarHead;
