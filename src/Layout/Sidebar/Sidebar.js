import React from "react";
import dashboard from "../../Assets/img/Dashboard.png";
import vendor from "../../Assets/img/vendor.png";
import clientmaster from "../../Assets/img/clientmaster.png";
import role from "../../Assets/img/role.png";
import productcate from "../../Assets/img/product-cate.png";
import product from "../../Assets/img/product.png";
import orders from "../../Assets/img/orders.png";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    return (
        <div class="deznav">
            <div class="deznav-scroll">
                <ul class="metismenu" id="menu">


                    <>
                        <li className={location.pathname === "/LC-admin" ? "mm-active" : ""}  >
                            <Link class="ai-icon" to="/LC-admin" aria-expanded="false">
                                <img class="w-20px" src={dashboard} alt="file not exist" />
                                <span class="nav-text ps-1">Dashbaord</span>
                            </Link>
                        </li>

                        <li className={location.pathname === "/LC-admin/supplymaster" ? "mm-active" : ""}>
                            <Link class="ai-icon" to="/LC-admin/supplymaster" aria-expanded="false" >
                                <img class="w-20px" src={vendor} alt="file not exist" />
                                <span class="nav-text ps-1">Supplier Master</span>
                            </Link>
                        </li>

                        <li className={location.pathname === "/LC-admin/supplierbrandlist" ? "mm-active" : ""}>
                            <Link to="/LC-admin/supplierbrandlist" class="ai-icon" aria-expanded="false"    >
                                <img class="w-20px" src={productcate} alt="file not exist" />
                                <span class="nav-text ps-1">Supplier Brand List</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/LC-admin/createcategories" ? "mm-active" : ""}>
                            <Link class="ai-icon" to="/LC-admin/createcategories" aria-expanded="false"    >
                                <img class="w-20px" src={productcate} alt="file not exist" />
                                <span class="nav-text ps-1">Create Categories</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/LC-admin/rolemaster" ? "mm-active" : ""}    >
                            <Link class="ai-icon" to="/LC-admin/rolemaster" aria-expanded="false"    >
                                <img class="w-20px" src={role} alt="file not exist" />
                                <span class="nav-text ps-1">Role Master</span>
                            </Link>
                        </li>
                        <li className={location.pathname === "/LC-admin/clientmaster" ? "mm-active" : ""} >
                            <Link class="ai-icon" to="/LC-admin/clientmaster" aria-expanded="false" >
                                <img class="w-20px" src={clientmaster} alt="file not exist" />
                                <span class="nav-text ps-1">Client Master</span>
                            </Link>
                        </li>

                        <li className={location.pathname === "/LC-admin/usermaster" ? "mm-active" : ""} >
                            <Link class="ai-icon" to="/LC-admin/usermaster" aria-expanded="false">
                                <img class="w-20px" src={clientmaster} alt="file not exist" />
                                <span class="nav-text ps-1">User Master</span>
                            </Link>
                        </li>

                        <li className={location.pathname === "/LC-admin/brandcatalogue" ? "mm-active" : ""} >
                            <Link to="/LC-admin/brandcatalouge" class="ai-icon" aria-expanded="false">
                                <img class="w-20px" src={product} alt="file not exist" />
                                <span class="nav-text ps-1">Brand Catalouge</span>
                            </Link>
                        </li>

                        <li className={location.pathname === "/LC-admin/orders" ? "mm-active" : ""}>
                            <Link to="/LC-admin/orders" class="ai-icon" aria-expanded="false">
                                <img class="w-20px" src={orders} alt="file not exist" />
                                <span class="nav-text ps-1">Orders</span>
                            </Link>
                        </li>
                    </>


                </ul>
            </div>
        </div>
    );
};

export default Sidebar;