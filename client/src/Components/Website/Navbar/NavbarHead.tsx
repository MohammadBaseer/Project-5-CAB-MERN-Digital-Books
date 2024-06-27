import "primeicons/primeicons.css";
import styles from "./NavbarHead.module.scss";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isToken, removeToken } from "../../../Utils/tokenServices";
import { AuthContext } from "../../../Context/AuthContext";

const NavbarHead = () => {
  //! AuthContext to get the User Profile
  const { userProfile, setUserProfile, getUserProfile } = useContext(AuthContext);
  //!------------------------------------
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
  //! Logout Function
  const logout = () => {
    removeToken();
    setUserProfile(null);
  };
  //!---------------------------------------------------------------------------------

  //! in every location change the toggle state
  useEffect(() => {
    setProfileNavbarToggle(false);
  }, [location]);
  //!---------------------------------------------------------------------------------
  const isUserLogged = isToken();
  useEffect(() => {
    if (isUserLogged) {
      getUserProfile();
    }
  }, []);
  return (
    <>
      <div className={styles.navbar_head}>
        <div className={styles.body_container}>
          <div className={styles.nav_elements}>
            {isUserLogged ? (
              <>
                <div className={styles.user_tab_navbar}>
                  <div className={styles.user_tab_navbar_photo}>
                    <img className={styles.user_photo} src={userProfile?.avatar} alt="" onClick={toggle} />
                  </div>
                  <div className={styles.user_tab_navbar_element_box} style={profileNavbarToggle === true ? { display: "block" } : { display: "none" }}>
                    <div className={styles.user_tab_navbar_element}>
                      <img className={styles.user_photo} src={userProfile?.avatar} alt="" onClick={toggle} />
                      <p>{userProfile?.name}</p>
                    </div>

                    <div className={styles.user_tab_navbar_element}>
                      <Link to="/profile">
                        <span className="pi pi-user"> My Profile</span>
                      </Link>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="/chat">
                        {" "}
                        <span className="pi pi-comment"> Messages</span>{" "}
                      </Link>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="/dashboard">
                        {" "}
                        <span className="pi pi-shop"> Admin Panel</span>{" "}
                      </Link>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="/register">
                        <span className="pi pi-cog"> Settings</span>
                      </Link>
                    </div>
                    <div className={styles.user_tab_navbar_element}>
                      <Link to="#" onClick={logout}>
                        <span className="pi pi-sign-out"> Logout</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className={styles.login_section}>
                  <Link to="/login">
                    <span className="pi pi pi-user" style={{ fontSize: "0.8rem" }}></span>
                  </Link>
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
