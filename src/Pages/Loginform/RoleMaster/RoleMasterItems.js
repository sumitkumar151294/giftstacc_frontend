import React, { useState } from "react";
import Loader from "../../../Componenets/Loader/Loader";
import './RoleMaster.css'
// import { onRoleMasterSubmit } from "../../redux/modules/Admin/roleMasterSlice";
import { useDispatch } from "react-redux";


const RoleMasterItems = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState("true");
    const [isformLoading, setIsFormLoading] = useState("true");

    const [formData, setFormData] = useState({
        roleName: "",
        modules: {
            vendorMaster: false,
            allocatedMaster: false,
            clientMaster: false,
            userMaster: false,
            productCategories: false,
            productCatalogue: false,
            orders: false,
            cms: false,
            blogMaster: false,
            faqMaster: false,
            contactedListMaster: false,
            customerList: false,
            emailTemplates: false,
        },
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "selectAll") {
            const updatedModules = { ...formData.modules };
            console.log(updatedModules);
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

    const isSelectAllChecked = Object.values(formData.modules).every(
        (module) => module
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        //   dispatch(onRoleMasterSubmit(formData));
    };
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
                                            <Loader classNameType={"absoluteLoader"} />
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
                                                                        <input
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