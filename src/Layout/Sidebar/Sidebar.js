import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onGetModule } from "../../Store/Slices/moduleSlice";
import Loader from "../../Componenets/Loader/Loader";
import Logout from "../../Assets/img/Logout.png";
import { onLogout } from "../../Store/Slices/loginSlice";

const Sidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarLoading, setIsSidebarLoading] = useState(false);

    // To reset the redux store (logout the user)
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(onLogout());
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    }
    // get module data 
    const getModuleData = useSelector((state) => state.moduleReducer);
    useEffect(() => {
        setIsSidebarLoading(true);
        dispatch(onGetModule());
    }, [])

    useEffect(() => {
        if (!getModuleData.isLoading) {
            setIsSidebarLoading(false);
        } else {
            setIsSidebarLoading(true);
        }
    }, [getModuleData])

    // function to add active class on Li
    const hanleClick = (e) =>{
        document.querySelectorAll('.mm-active').forEach(e => {e.classList.remove('mm-active')});
        e.target.closest('.nav-icn').classList.add('mm-active')
    }


    return (
        <div className="deznav">
            <div className="deznav-scroll">
                {isSidebarLoading ? (
                    <div style={{ height: "400px" }}>
                        <Loader classType={"absoluteLoader"} />
                    </div>
                ) : (
                    <ul className="metismenu" id="menu">
                        {getModuleData?.data?.data?.map((item, index) => (
                            <li key={index} className="nav-icn" onClick={(e)=>hanleClick(e)}>
                                <Link className="ai-icon" to={item.routePath} aria-expanded="false">
                                    <img src={require(`../../Assets/icon/${item.icon}.svg`)} alt={item.icon} />
                                    <span className="nav-text ps-1">{item.name}</span>
                                </Link>
                            </li>))}


                        <li>
                            <Link className="ai-icon " onClick={handleLogout} aria-expanded="false">
                                <img className="w-20px" src={Logout} alt="file not exist" />
                                <span className="nav-text ps-1">Logout</span>
                            </Link>
                        </li>
                    </ul>

                )}
            </div>
        </div>
    );
};

export default Sidebar;