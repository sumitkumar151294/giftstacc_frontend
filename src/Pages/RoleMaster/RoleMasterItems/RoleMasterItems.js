import React, { useEffect, useState } from "react";
import '../RoleMaster.scss'
import Loader from "../../../Componenets/Loader/Loader";
import { onGetModule } from "../../../Store/Slices/moduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { onGetUserRole, onPostUserRole } from "../../../Store/Slices/userRoleSlice";
import InputField from "../../../Componenets/InputField/InputField";
import { ToastContainer, toast } from "react-toastify";
import { onPostUserRoleModuleAccess } from "../../../Store/Slices/userRoleModuleAccessSlice";
const RoleMasterItems = () => {
    const dispatch = useDispatch();
    const [isformLoading, setIsFormLoading] = useState("true");
    const getModule = useSelector((state) => state.moduleReducer);
    const getModuleData = getModule?.data?.data;
    console.log(getModuleData,"getModuleData");
    const getRoleId = useSelector((state)=> state.userRoleReducer);
    
 
    const [formData, setFormData] = useState({
        code: Math.floor(Math.random()*(999-100+1)+100),
        name: "",
        modules: {}
    });

    const isSelectAllChecked = Object.values(formData.modules).every(
        (module) => module
    );
    
// To get the Module from API
    useEffect(() => {
        dispatch(onGetModule())
    }, []);

    useEffect(() => {
        if (getModuleData) {
          const modulesData = {};
          getModuleData.forEach((module) => {
            modulesData[module.name.toLowerCase()] = false;
          });
          setFormData({
            ...formData,
            modules: modulesData,
          });
          setIsFormLoading(true);
        }
      }, [getModuleData]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "selectAll") {
            const updatedModules = { ...formData.modules };
            for (const key in updatedModules) {
                updatedModules[key] = checked;
            }
            setFormData({
                ...formData,
                modules: updatedModules,
            });
        } else if (type === "checkbox") {
            setFormData({
                ...formData,
                modules: {
                    ...formData.modules,
                    [name]: checked,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name.trim() === "") {
            toast.error("Role Name is required.");
            return;
        }

        const { name, code } = formData;
        const nameValue = { name, code };
        dispatch(onPostUserRole(nameValue));
        dispatch(onPostUserRoleModuleAccess())
    };
  // to get module role id from user role api and call the moduel access api
  useEffect(() => {
    if (getRoleId.data) {
      const roleId = getRoleId.data.data?.id;
      console.log("Role ID:", roleId);
  
      const selectedModuleIds = Object.keys(formData.modules)
      .filter((moduleId) => formData.modules[moduleId])
      .map((moduleId) => Number(moduleId))
      .filter(
        (moduleId) =>
          getModuleData &&
          getModuleData.some((module) => module.id === moduleId)
      );
    
      
  
      const accessData = {
        roleId: roleId,
        moduleId: selectedModuleIds[0],
        viewAccess: true,
        addAccess: true,
        editAccess: true,
      };
      console.log(accessData,"accessData")
  
      dispatch(onPostUserRoleModuleAccess(accessData));
    }
  }, [getRoleId.data, formData.modules, getModuleData]);
  
  
  
      
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Role Master</h4>
                            </div>
                            <div className="card-body position-relative">
                                {!isformLoading ? (
                                    <div style={{ height: "400px" }}>
                                        <Loader classType={"absoluteLoader"} />
                                    </div>
                                ) : (
                                    <div className="container mt-3">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label htmlFor="name-f">Role Name</label>
                                                    <InputField
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        id="name-f"
                                                        placeholder=""
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row top-top">
                                                <div className="col-lg-4">
                                                    <div className="form-check mb-2 pad-left">
                                                        <InputField
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="selectAll"
                                                            value={formData.modules.selectAll}
                                                            id="flexCheckDefault1"
                                                            checked={isSelectAllChecked}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label
                                                            className="form-check-label fnt-17"
                                                            htmlFor="flexCheckDefault1"
                                                        >
                                                            Select All
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 br pt-2">
                                                    <label htmlFor="name-f">Module Access</label>
                                                    <div className="row ml-4">
                                                        {Object.entries(formData.modules).map(
                                                            ([module, checked]) => (
                                                                <div
                                                                    className="form-check mt-2 col-lg-3"
                                                                    key={module}
                                                                >
                                                                    <InputField
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        name={module}
                                                                        value={checked}
                                                                        id={`flexCheckDefault-${module}`}
                                                                        checked={checked}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor={`flexCheckDefault-${module}`}
                                                                    >
                                                                        {module
                                                                            .replace(/([A-Z])/g, " $1")
                                                                            .split(" ")
                                                                            .map(
                                                                                (word) =>
                                                                                    word.charAt(0).toUpperCase() +
                                                                                    word.slice(1).toLowerCase()
                                                                            )
                                                                            .join(" ")}
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="col-sm-4 mt-4 mb-4">
                                                        <button className="btn btn-primary float-right pad-aa">
                                                            Submit
                                                        </button>
                                                        <ToastContainer />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RoleMasterItems