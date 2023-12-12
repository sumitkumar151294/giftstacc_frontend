import React, { useState } from "react";
import user from "../../Assets/img/user-profile.png";

const Header = ({setSideBar, sidebar}) => {
  const [hamburgerClass, setHamburgerClass] = useState(false)
  const handleShowSideBar = () =>{
    setHamburgerClass(!hamburgerClass)
    setSideBar(!sidebar)
  }
  return (
    <>
      <div class="nav-header">
        <a href="/#/LC-admin" class="brand-logo">
          <img
            class="w-100"
            src="https://beta.shop-loyalty.com/images/logo.png"
          />
        </a>
        <div class="nav-control">
          <div class={`hamburger ${hamburgerClass? 'is-active': ''}`} onClick={handleShowSideBar}>
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </div>
        </div>
      </div>

      <div class="header">
        <div class="header-content">
          <nav class="navbar navbar-expand">
            <div class="collapse navbar-collapse justify-content-between">
              <div class="header-left"></div>
              <ul class="navbar-nav header-right ">
                <li class="nav-item dropdown  header-profile">
                  <a
                    class="nav-link"
                    href="javascript:void(0);"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img src={user} width="56" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;