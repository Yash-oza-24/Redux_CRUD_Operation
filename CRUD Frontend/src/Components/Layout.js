import React from "react";
import { Outlet } from "react-router-dom";
import NavScrollExample from "./Navbar"
// import Sidebar from "./Sidebar";
const Layout = () => {
  return (
    <>
      <NavScrollExample />
      {/* <Sidebar/> */}
      <Outlet />
    </>
  );
};

export default Layout;
