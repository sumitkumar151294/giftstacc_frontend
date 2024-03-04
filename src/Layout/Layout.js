import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar/Sidebar";
import Header from "../Layout/Header/Header";
import Footer from "./Footer/Footer";
import { onLogout } from "../Store/Slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Layout = (props) => {
  const { Component } = props;
  const [showSideBar, setShowSideBar] = useState(false);
  const loginDetails = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
  if (loginDetails?.isAdminLogin === null || loginDetails?.isAdminLogin  || !loginDetails?.isAdminLogin ) {
    if((loginDetails?.isAdminLogin===true && loginDetails.partner_Key==="UIClient") || (loginDetails?.isAdminLogin===false && loginDetails.partner_Key==="UIAdmin")){
      dispatch(onLogout());
      localStorage.clear();
      sessionStorage.clear();
      loginDetails.partner_Key === "UIAdmin" ? navigate("/") :navigate("/lc-user-admin/login");    
    }
 }
  }, []);

  return (  
    <>
      <div
        id="main-wrapper"
        className={showSideBar ? "show menu-toggle" : "show"}
      >
        <Header setSideBar={setShowSideBar} sidebar={showSideBar} />
        <Sidebar />
        <div className="content-body">
          <Component />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
