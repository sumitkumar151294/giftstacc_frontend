import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import Loader from "../../Componenets/Loader/Loader";
import Logout from "../../Assets/img/Logout.png";
const Sidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarLoading, setIsSidebarLoading] = useState(true);
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    }
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
                                <img className="w-20px" src={`data:image/png;base64, ${item.icon}`} alt="file not exist" />
                                    <span class="nav-text ps-1">{item.name}</span>
                                </Link>
                            </li>)
                        }
                        <li className={location.pathname === "/LC-admin" ? "mm-active" : ""}>
                        <Link class="ai-icon" onClick={handleLogout} aria-expanded="false">
                        <img className="w-20px" src={Logout} alt="file not exist" />
                        <span class="nav-text ps-1">Logout</span>
                        </Link>
                        </li>
                    </ul>
                    
                )}
            </div>
        </div>
    );
};

export default Sidebar;