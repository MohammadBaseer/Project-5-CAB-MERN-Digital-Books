import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { footer } from "../Pages/Home/Home";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Navbar />
        <Outlet />
      </div>
      {footer()}
    </>
  );
};

export default Layout;
