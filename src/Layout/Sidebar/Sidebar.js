import React, { useEffect, useState } from "react";
import dashboard from "../../Assets/img/Dashboard.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import Loader from "../../Componenets/Loader/Loader";
const Sidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isSidebarLoading, setIsSidebarLoading] = useState(true);
    // get module data 
    const getModuleData = useSelector((state) => state.moduleReducer);
    useEffect(() => {
        dispatch(onGetModule());
    }, [])
    return (
        <div class="deznav">
            <div class="deznav-scroll">
                {!isSidebarLoading ? (
                    <div style={{ height: "400px" }}>
                        <Loader classType={"absoluteLoader"} />
                    </div>
                ) : (
                    <ul class="metismenu" id="menu">
                        {getModuleData?.data?.data?.map((item) =>
                            <li className={location.pathname === "/LC-admin" ? "mm-active" : ""}>
                                <Link class="ai-icon" to={item.routePath} aria-expanded="false">
                                    <img class="w-20px" src={dashboard} alt="file not exist" />
                                    <span class="nav-text ps-1">{item.name}</span>
                                </Link>
                            </li>)
                        }
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sidebar;