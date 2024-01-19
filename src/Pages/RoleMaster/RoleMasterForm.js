import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetUserRole,
  onPostUserRole,
  onUpdateUserRole,
} from "../../Store/Slices/userRoleSlice";
import InputField from "../../Components/InputField/InputField";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Button from '../../Components/Button/Button';

// Component for RoleMasterForm
const RoleMasterForm = ({ data, setIsLoading, setData }) => {
  const dispatch = useDispatch();
  const [isformLoading, setIsFormLoading] = useState(true);
  const [checkBoxError, setCheckBoxError] = useState(false);
  //To get the data from redux store
  const getModule = useSelector((state) => state.moduleReducer);
  const getModuleData = getModule?.data?.data;
  // Initial state for form data and errors
  const [formData, setFormData] = useState({
    code: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    name: "",
    modules: [],
    isClientPlatformModule: false,
  });
  const [errors, setErrors] = useState({
    name: "",
  });
  // Check if all modules are selected
  const isSelectAllChecked =
    formData.modules?.length > 0 &&
    formData.modules.every((module) => module.checked);
  // Translation labels
  const roleMasterLabel = GetTranslationData("UIAdmin", "role-master");
  const roleName = GetTranslationData("UIAdmin", "role-name");
  const selectall = GetTranslationData("UIAdmin", "selectall");
  const moduleAccess = GetTranslationData("UIAdmin", "module-access");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const checkBox_Error = GetTranslationData("UIAdmin", "checkbox_error");
  const admin = GetTranslationData("UIAdmin", "admin_Label");
  const client = GetTranslationData("UIAdmin", "client");
  const isClientRole = GetTranslationData("UIAdmin", "is_Client_role");
  const roleCreated = GetTranslationData("UIAdmin", "role_Create_Label");
  const roleUpdated = GetTranslationData("UIAdmin", "role_Updated_Label");
  const roleRequired = GetTranslationData("UIAdmin", "role_Req_Label");
  // Fetch module data and update form data on mount and when module data changes
  useEffect(() => {
    if (getModuleData) {
      const modulesData = getModuleData?.map((module) => ({
        id: module.id,
        isClientPlatformModule: module.isClientPlatformModule,
        name: module.name,
        checked: false,
      }));
      setFormData({
        ...formData,
        modules: modulesData,
      });
      if (data) {
        const updatedModulesData = modulesData?.map((module) => ({
          ...module,
          checked: data.moduleIds.includes(module.id),
        }));

        setFormData({
          ...formData,
          id: data.id,
          name: data?.name,
          code: data?.code,
          modules: updatedModulesData,
          isClientPlatformModule: data?.isClientPlatformRole,
        });
      }
      setIsFormLoading(true);
    }
  }, [getModuleData, data]);
  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;

    if (name === "IsClientRole") {
      setFormData({
        ...formData,
        isClientPlatformModule: checked,
        modules: formData.modules.map((module) => ({
          ...module,
          checked: false, // Uncheck all other checkboxes when IsClientRole is checked
        })),
      });
    } else if (name === "selectAll") {
      const updatedModules = formData.modules.map((module) => ({
        ...module,
        checked: formData.isClientPlatformModule
          ? module.isClientPlatformModule
          : checked,
      }));
      setFormData({
        ...formData,
        modules: updatedModules,
      });
    } else if (type === "checkbox" && name !== "IsClientRole") {
      const updatedModules = formData.modules?.map((module) =>
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
  // Reset form fields
  const resetFiled = {
    code: Math.floor(Math.random() * (999 - 100 + 1) + 100),
    name: "",
    modules: formData.modules.map((module) => ({ ...module, checked: false })),
    isClientPlatformModule: false,
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { ...errors };
    setErrors(newErrors);
    if (formData.name.trim() === "") {
      newErrors.name = roleRequired;
      setErrors(newErrors);
      return;
    } else {
      newErrors.name = "";
    }

    const selectedModuleIds = formData.modules
      .filter((module) => module.checked)
      .map((module) => module.id);

    if (selectedModuleIds?.length === 0) {
      setCheckBoxError(true);
      return;
    } else {
      setCheckBoxError(false);
    }
    const postData = {
      code: formData.code,
      name: formData.name,
      moduleIds: selectedModuleIds,
    };
    try {
      //To Submit the data
      if (!data) {
        await dispatch(onPostUserRole(postData));
        setFormData(resetFiled);
        toast.success(roleCreated);
      }

      // To update the data
      if (data) {
        const updateData = {
          id: formData.id,
          code: formData.code,
          name: formData.name,
          description: "",
          isClientPlatformRole: formData.isClientPlatformModule,
          moduleIds: selectedModuleIds,
        };

        await dispatch(onUpdateUserRole(updateData));
        setFormData(resetFiled);
        toast.success(roleUpdated);
        setData();
      }
      setTimeout(() => {
        dispatch(onGetUserRole());
      }, 3000);
      setIsLoading(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  // Render the RoleMasterForm component
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
              <div className="card-body">
                {!isformLoading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">{roleName}</label>
                          <InputField
                            type="text"
                            className={` ${errors.name ? "border-danger" : "form-control"
                              }`}
                            name="name"
                            id="name-f"
                            placeholder=""
                            value={formData.name}
                            error={errors.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        {/* <div className="col-lg-4">
                          <div className="form-check mt-4 padd">
                            <InputField
                              className="form-check-input"
                              type="checkbox"
                              name="IsClientRole"
                              value={formData?.isClientPlatformModule}
                              checked={formData?.isClientPlatformModule}
                              id="flexCheckDefault1"
                              onChange={handleInputChange}
                            />
                            <label
                              className="form-check-label fnt-15"
                              htmlFor="flexCheckDefault1"
                            >
                              {isClientRole}
                            </label>
                          </div>
                        </div> */}
                      </div>

                      <div className="row top-top">
                        <div className="col-lg-4">
                          <div className="form-check  mb-2 padd">
                            <InputField
                              className="form-check-input"
                              type="checkbox"
                              name="selectAll"
                              value={
                                formData?.modules?.length > 0 &&
                                formData?.modules.every(
                                  (module) => module.checked
                                )
                              }
                              id="flexCheckDefault2"
                              checked={isSelectAllChecked}
                              onChange={handleInputChange}
                            />
                            <label
                              className="form-check-label fnt-17"
                              htmlFor="flexCheckDefault2"
                            >
                              {selectall}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-12 br pt-2">
                          <label htmlFor="name-f" >{moduleAccess}</label>

                          {formData?.modules?.map(
                            ({ id, name, checked, isClientPlatformModule }) =>
                              formData.isClientPlatformModule &&
                                isClientPlatformModule ? (

                                  // <div
                                  //   className="form-check mt-2 col-lg-3"
                                  //   key={id}
                                  // >
                                  //   <InputField
                                  //     className="form-check-input"
                                  //     type="checkbox"
                                  //     name={name}
                                  //     value={checked}
                                  //     id={`flexCheckDefault-${id}`}
                                  //     checked={checked}
                                  //     onChange={handleInputChange}
                                  //   />

                                  //   <label
                                  //     className="form-check-label"
                                  //     htmlFor={`flexCheckDefault-${id}`}
                                  //   >
                                  //     {name
                                  //       .replace(/([A-Z])/g, " $1")
                                  //       .split(" ")
                                  //       .map(
                                  //         (word) =>
                                  //           word.charAt(0).toUpperCase() +
                                  //           word.slice(1).toLowerCase()
                                  //       )
                                  //       .join(" ")}{" "}
                                  //     (
                                  //     {isClientPlatformModule === true
                                  //       ? `${client}`
                                  //       : `${admin}`}
                                  //     )
                                  //   </label>
                                  // </div>
                                  
                                <div
                                  className="row mb-3 mt-3"
                                  key={id}
                                >
                                  <h4
                                        className="col-lg-3"
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
                                          .join(" ")}{" "}
                                        (
                                        {isClientPlatformModule === true
                                          ? `${client}`
                                          : `${admin}`}
                                        )
                                      </h4>

                                  <div class="col-lg-9 d-flex justify-content-end">
                                    <div class="form-check form-check-inline">
                                      <label class="form-check-label">
                                        <InputField type="checkbox" class="form-check-input" value="" />View
                                      </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                      <label class="form-check-label">
                                        <InputField type="checkbox" class="form-check-input" value="" />Add
                                      </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                      <label class="form-check-label">
                                        <InputField type="checkbox" class="form-check-input" value="" />Edit
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                !formData.isClientPlatformModule && (
                                  <>
                                    <div
                                      className="row mb-3 mt-3"
                                      key={id}
                                    >
                                      <h4
                                        className="col-lg-3"
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
                                          .join(" ")}{" "}
                                        (
                                        {isClientPlatformModule === true
                                          ? `${client}`
                                          : `${admin}`}
                                        )
                                      </h4>

                                      <div class="col-lg-9 d-flex justify-content-end">
                                        <div class="form-check form-check-inline">
                                          <label class="form-check-label">
                                            <InputField type="checkbox" class="form-check-input" value="" />View
                                          </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                          <label class="form-check-label">
                                            <InputField type="checkbox" class="form-check-input" value="" />Add
                                          </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                          <label class="form-check-label">
                                            <InputField type="checkbox" class="form-check-input" value="" />Edit
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )
                              )
                          )}

                          {/* Checkbox Error Message */}
                          {checkBoxError && (
                            <span
                              className="form-check-label error-check"
                              htmlFor="basic_checkbox_1"
                            >
                              {checkBox_Error}
                            </span>
                          )}
                          <div className="col-sm-4 mt-4 mb-4">
                            <Button
                              text={data ? update : submit}
                              icon="fa fa-arrow-right"
                              className="btn btn-primary btn-sm float-right p-btn mt-2"
                            />
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

export default RoleMasterForm;
