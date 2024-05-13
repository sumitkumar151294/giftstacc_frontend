/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allowModules,
  onGetModule,
  resetAllowModules,
} from "../../Store/Slices/moduleSlice";
import Loader from "../../Components/Loader/Loader";
import Logout from "../../Assets/img/Logout.png";
import { onLogout } from "../../Store/Slices/loginSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onGetUserRoleModuleAccess } from "../../Store/Slices/userRoleModuleAccessSlice";
import axiosInstance from "../../Common/Axios/axiosInstance";
import axiosInstanceClient from "../../Common/Axios/axiosInstanceClient";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAuthData = useSelector((state) => state.loginAuthReducer);
  const [sideBarModules, setIsSideBarModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const logout = GetTranslationData("UIAdmin", "logout");
  const loginDetails = useSelector((state) => state.loginReducer);
  const currentUrl = useLocation();
  // To reset the redux store (logout the user)
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(onLogout());
    localStorage.clear();
    sessionStorage.clear();
    loginDetails.partner_Key === "UIAdmin"
      ? navigate("/")
      : navigate("/lc-user-admin/login");
  };
  // get module data
  const getModuleData = useSelector((state) => state.moduleReducer);
  const userRoleModuleAccess = useSelector(
    (state) => state.userRoleModuleAccessReducer?.data
  );
  const userRoleID = useSelector(
    (state) => state.loginReducer?.data?.[0]?.adminRoleId
  );
  const roleAccessListLoading = useSelector(
    (state) => state.userRoleReducer.getUserRoleLoading
  );
  useEffect(() => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
    axiosInstanceClient.defaults.headers.Authorization = `Bearer ${loginAuthData?.data?.[0]?.token}`;
    axiosInstance.defaults.headers["partner-code"] = loginDetails?.partner_Key;
    axiosInstanceClient.defaults.headers["partner-code"] =
    loginDetails?.partner_Key;
    axiosInstanceClient.defaults.headers["client-code"] =
      loginAuthData?.data?.[0]?.clientId;
    axiosInstance.defaults.headers["client-code"] =
      loginAuthData?.data?.[0]?.clientId;
    if(!getModuleData?.data?.length){
    dispatch(onGetModule());
    dispatch(onGetUserRoleModuleAccess());
    dispatch(resetAllowModules());
   }
    
  }, []);

  useEffect(() => {
    if (!getModuleData.isLoading && userRoleModuleAccess.length > 0) {
      let tempideModules = JSON.parse(JSON.stringify(getModuleData?.data));
      const filterData = userRoleModuleAccess.filter((item) => {
        return (
          item.roleId === userRoleID &&
          (item.addAccess || item.editAccess || item.viewAccess)
        );
      });
      const filterModules = [];
      for (var i = 0; i < tempideModules.length; i++) {
        for (var j = 0; j < filterData?.length; j++) {
          if (tempideModules[i].id === filterData[j].moduleId) {
            tempideModules[i].moduleId = filterData[j].moduleId;
            filterModules.push(tempideModules[i]);
          }
        }
      }
      setIsSideBarModules(filterModules);
    } else {
    }
  }, [getModuleData, userRoleModuleAccess]);

  // function to add active class on Li
  const hanleClick = (e, moduleId) => {
    document.querySelectorAll(".mm-active").forEach((e) => {
      e.classList.remove("mm-active");
    });
    e.target.closest(".nav-icn").classList.add("mm-active");
    setSelectedModuleId(moduleId);
    dispatch(resetAllowModules());
  };
  const getModuleDataAccess = userRoleModuleAccess.filter((item) => {
    return (
      item.roleId === userRoleID &&
      (item.addAccess || item.editAccess || item.viewAccess)
    );
  });

  useEffect(() => {
    if (
      getModuleDataAccess &&
      selectedModuleId !== null &&
      !getModuleData?.filteredData?.length
    ) {
      const roleAcessValues = getModuleDataAccess.filter(
        (item) => item.moduleId === selectedModuleId
      );
      dispatch(allowModules(roleAcessValues));
    } else if (
      getModuleDataAccess &&
      selectedModuleId === null &&
      !getModuleData?.filteredData?.length
    ) {
      const data = sideBarModules.find(
        (item) =>
          item.routePath.toLowerCase() === currentUrl.pathname.toLowerCase()
      );
      const roleAcessValues = getModuleDataAccess.filter(
        (item) => item.moduleId === data?.moduleId
      );
      dispatch(allowModules(roleAcessValues));
    }
  }, [userRoleModuleAccess, selectedModuleId, sideBarModules]);

  return (
    <div className="deznav">
      <div className="deznav-scroll mm-active ps ps--active-y">
        {roleAccessListLoading  ? (
          <div style={{ height: "400px" }}>
            <Loader classType={"absoluteLoader"} />
          </div>
        ) : (
          <ul className="metismenu mm-show" id="menu">
            {sideBarModules.length &&
              sideBarModules?.map((item, index) => (
                <li
                  key={index}
                  className={`nav-icn ${
                    item.routePath === currentUrl.pathname ? "mm-active" : ""
                  }`}
                  onClick={(e) => hanleClick(e, item.id)}
                >
                  <Link
                    className="ai-icon"
                    to={item.routePath}
                    aria-expanded="false"
                  >
                    <img
                      src={require(`../../Assets/icon/${item.icon}.svg`)}
                      alt={item.icon}
                    />
                    <span className="nav-text ps-1">{item.name}</span>
                  </Link>
                </li>
              ))}
            <li>
              <Link
                className="ai-icon "
                onClick={handleLogout}
                aria-expanded="false"
              >
                <img className="w-20px" src={Logout} alt="file not exist" />
                <span className="nav-text ps-1"> {logout}</span>
              </Link>
            </li>
          </ul>
         )} 
      </div>
    </div>
  );
};

export default Sidebar;
/* eslint-enable react-hooks/exhaustive-deps */
