import React from "react";
import './Header.scss'

const Header = () => {
 
  return (
    <>
      <header className="header1">
        <div className="fixheader">
          <div className="botheader top-hh mobile-hide">
            <div className="top-menu">
              <p className="promo">Get upto 10X Rewards on Gift Cards</p>
            </div>
          </div>

          <div className="main-header">
            <div className="container">
              <div className="row align-items-lg-center">
                <div className="col-xl-3 col-lg-4 col-7 order-0 order-lg-0">
                  <div className="button d-none"></div>

                  <div className="logo d-flex">
                    <div className="mobile-menu-trigger" >
                      <span></span>
                    </div>
                    {/* <Link to="/">
                      <img src={img} />
                    </Link> */}
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 col-5 order-1 order-lg-2">
                  <div className="top-right clearfix">
                    <ul>
                      <li className="meiconbtn">
                        <a
                          href="javascript:void(0)"
                          id="ctl00_whenusernotlogin"
                          className="mt-1"
                        >
                          <i className="las la-user"></i>
                        </a>

                        <div className="logindropbox">
                          <div className="logindrop1">
                            <h5>Hi,</h5>
                            <p>Instant access to your orders and account</p>
                            <ul>
                              <li id="" className="loginbtnmenu mr-2">
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#loginmodal"
                                  href="#."
                                >
                                  login
                                </a>
                              </li>
                              <li id="">
                                <a
                                  data-bs-toggle="modal"
                                  data-bs-target="#signupmodal"
                                  href="#."
                                >
                                  sign up
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="logindrop2">
                            <ul>
                              <li>
                                {/* <a onClick={handleMyAccount}>My Account</a> */}
                              </li>
                              <li>
                                {/* <a onClick={handleMyAccount}>My Points</a> */}
                              </li>
                              <li>
                                <a href="#">Use Points</a>
                              </li>

                              <li>
                                <a href="#">Customer Support </a>
                              </li>

                              <li>
                                <a>Logout </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li className="d-none d-xl-inline-block">
                        {/* <a onClick={handleWishList}>
                          <i className="lar la-heart"></i>
                        </a> */}
                      </li>
                      <li className="d-none d-xl-inline-block">
                        <a href="#">
                          <i className="las la-shopping-bag"></i>
                          <span className="cartcounter">
                            <div>0</div>
                          </span>
                        </a>
                        <div id="ctl00_upd">
                          <div id="floatingcart" className="popcartmain">
                            <div className="popcartinn">
                              <div className="popcarthead">
                                <h3>ITEMS IN BAG (0)</h3>
                              </div>
                              <div className="popcartlistmain">
                                <div className="popcartlistmainscroll"></div>
                              </div>
                              <div className="popcartbot">
                                <div className="poptotmain">
                                  <div className="row m-n1">
                                    <div className="col-md-6 col-6 p-1">
                                      <span className="poptoquhead">
                                        Total (0 items)
                                      </span>
                                    </div>
                                    <div className="col-md-6 col-6 p-1">
                                      <div className="float-right text-right">
                                        <span className="poptotarup">
                                          Pts 0
                                        </span>
                                        <p className="incltaxtext m-0">
                                          <small>(incl. GST)</small>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="mt-n4 position-relative">
                                    <div className="text-center">
                                      <a className="popviewbagbtn" href="#">
                                        <i className="las la-shopping-bag"></i>
                                        Checkout
                                      </a>
                                    </div>
                                  </div>
                                </div>

                                <div className="popcarteligb">
                                  Add Rs.500 for free shipping
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-12 order-2 order-lg-1">
                  <div className="searchboxmaindiv">
                    <div>
                      <div className="searchbox big">
                        <input
                          name="search"
                          type="text"
                          id="txtsearch"
                          className="autosuggest ui-autocomplete-input"
                          autocomplete="off"
                          placeholder="Search any product"
                        />
                        <a id="btnsearch" href="">
                          <i className="las la-search"></i>
                        </a>
                        <ul className="drop"></ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-xl-none d-lg-none d-md-none col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="mobileMenu d-inline-flex justify-content-center">
              <span className="menu-seperator">
                <a className="nav-link " href="/brand-gift-cards">
                  {/* <img width="25" src={img2} /> */}
                  <div
                  // style="color: black!important;"
                  >
                    Top Brands
                  </div>
                </a>
              </span>
              <span className="menu-seperator">
                <a className="nav-link " href="/menu/topMenu/1">
                  {/* <img width="25" src={img3} /> */}
                  <div
                  // style="color: black!important;"
                  >
                    Categories
                  </div>
                </a>
              </span>

              <span className="menu-seperator">
                <a className="nav-link " href="#">
                  {/* <img width="25" src={img4} /> */}
                  <div
                  //  style="color: black!important;"
                  >
                    Offers
                  </div>
                </a>
              </span>

              <span className="menu-seperator">
                <a className="nav-link " href="#">
                  {/* <img width="25" src={img5} /> */}
                  <div
                  // style="color: black!important;"
                  >
                    My Account
                  </div>
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
