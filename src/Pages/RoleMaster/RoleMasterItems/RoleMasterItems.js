import React, { useEffect, useState } from "react";
import "../RoleMaster.scss";
import Loader from "../../../Componenets/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onPostUserRole,
} from "../../../Store/Slices/userRoleSlice";
import InputField from "../../../Componenets/InputField/InputField";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../../Componenets/ScrollToTop/ScrollToTop";
const RoleMasterItems = ({data}) => {
  const dispatch = useDispatch();
  const [isformLoading, setIsFormLoading] = useState(true);
  const getModule = useSelector((state) => state.moduleReducer);
  const getModuleData = getModule?.data?.data;
  const [formData, setFormData] = useState({
    code: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    name: "",
    modules: [],
  });

  const isSelectAllChecked = formData.modules.length > 0 && formData.modules.every((module) => module.checked);

// To get the label from DB
  const roleMasterLabel = GetTranslationData("UIAdmin", "role-master");
  const roleName = GetTranslationData("UIAdmin", "role-name");
  const selectall = GetTranslationData("UIAdmin", "selectall");
  const moduleAccess = GetTranslationData("UIAdmin", "module-access");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const update = GetTranslationData("UIAdmin", "update_label");


  useEffect(() => {
    if (getModuleData) {
      const modulesData = getModuleData.map((module) => ({
        id: module.id,
        name: module.name,
        checked: false,
      }));
        setFormData({
        ...formData,
                modules: modulesData,
      });
      if (data) {
        const updatedModulesData = modulesData.map((module) => ({
          ...module,
          checked: data.moduleIds.includes(module.id),
        }));

        setFormData({
          ...formData,
          name: data?.name,
          modules: updatedModulesData,
        });
      }
        setIsFormLoading(true);
    }
  }, [getModuleData, data]);
  
  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;

    if (name === "selectAll") {
      const updatedModules = formData.modules.map((module) => ({
        ...module,
        checked,
      }));
      setFormData({
        ...formData,
        modules: updatedModules,
      });
    } else if (type === "checkbox") {
      const updatedModules = formData.modules.map((module) =>
        module.name === name ? { ...module, checked } : module
      );
      setFormData({
        ...formData,
        modules: updatedModules,
      });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") {
      toast.error("Role Name is required.");
      return;
    }

    const selectedModuleIds = formData.modules
      .filter((module) => module.checked)
      .map((module) => module.id);

    const postData = {
      code:formData.code,
      name: formData.name,
      moduleIds: selectedModuleIds,
    };

    dispatch(onPostUserRole(postData));
  };
const getName = formData.name;
  return (
    <>
      <ScrollToTop />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{roleMasterLabel}</h4>
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
                          <label htmlFor="name-f">{roleName}</label>
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
                              value={formData.modules.length > 0 && formData.modules.every((module) => module.checked)}
                              id="flexCheckDefault1"
                              checked={isSelectAllChecked}
                              onChange={handleInputChange}
                            />
                            <label
                              className="form-check-label fnt-17"
                              htmlFor="flexCheckDefault1"
                            >
                              {selectall}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-12 br pt-2">
                          <label htmlFor="name-f">{moduleAccess}</label>
                          <div className="row ml-4">
                            {formData.modules.map(({ id, name, checked }) => (
                              <div
                                className="form-check mt-2 col-lg-3"
                                key={id}
                              >
                                <InputField
                                  className="form-check-input"
                                  type="checkbox"
                                  name={name}
                                  value={checked}
                                  id={`flexCheckDefault-${id}`}
                                  checked={checked}
                                  onChange={handleInputChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`flexCheckDefault-${id}`}
                                >
                                  {name
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
                            ))}
                          </div>
                          <div className="col-sm-4 mt-4 mb-4">
                            <button className="btn btn-primary float-right pad-aa">
                              {/* {submit} */}
                              {data ? update : submit}
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
  );
};

export default RoleMasterItems;
