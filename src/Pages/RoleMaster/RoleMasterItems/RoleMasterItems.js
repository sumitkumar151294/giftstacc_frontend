import React, { useEffect, useState } from "react";
import '../RoleMaster.css'
import Loader from "../../../Componenets/Loader/Loader";
import { onGetModule } from "../../../Store/Slices/moduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { onGetUserRole, onPostUserRole } from "../../../Store/Slices/userRoleSlice";
const RoleMasterItems = () => {
    const dispatch = useDispatch();
    // to get module master data 
    const getModuleData = useSelector((state) => state.moduleReducer.data.data);
    console.log("module data", getModuleData);
    const [isformLoading, setIsFormLoading] = useState("true");
    const [isChecked, setIsChecked] =useState(false)
    const [isCheckAll, setIsCheck] =useState([]);
    const [moduleAccess, setModuleAccess] = useState([]);
    const [formData, setFormData] = useState({
        roleName: "",
    });
    const handleInputChange = (e) => {
        const { name, value,} = e.target;
       
        
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(onPostUserRole(formData));
    };
    useEffect(() => {
        // module master get api call 
        dispatch(onGetModule())
    }, [])

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
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="roleName"
                                                        id="name-f"
                                                        placeholder=""
                                                        value={formData.roleName}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row top-top">
                                                <div className="col-lg-4">
                                                    <div className="form-check mb-2 padd">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="selectAll"
                                                            value=""
                                                            id="flexCheckDefault1"
                                                            checked=''
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
                                                        {getModuleData?.map(
                                                            (value) => (
                                                                <div
                                                                    className="form-check mt-2 col-lg-3"
                                                                    key={value.id}
                                                                >
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        name={value.name}
                                                                        value={value.id}
                                                                        id={`flexCheckDefault-${value.id}`}
                                                                        onChange={handleInputChange}
                                                                        isChecked={isChecked}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor={`flexCheckDefault-${value.id}`}
                                                                    >
                                                                        {value.name
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