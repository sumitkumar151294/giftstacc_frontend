import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar/Sidebar";
import Header from "../Layout/Header/Header";
import Footer from "./Footer/Footer";
import "./Layout.scss";
import { onLogout } from "../Store/Slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar2 from "./Sidebar/Sidebar2";
const Layout = (props) => {
  const { Component } = props;
  const [showSideBar, setShowSideBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("login")) {
      dispatch(onLogout());
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <>
      <div
        id="main-wrapper"
        className={showSideBar ? "show menu-toggle" : "show"}
      >
        <Header setSideBar={setShowSideBar} sidebar={showSideBar} />
        <Sidebar2 />
        <div className="content-body">
          <Component />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
