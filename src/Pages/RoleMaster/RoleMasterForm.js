import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { callUserRoleModuleAccessPostApi } from "../../Context/userRoleModuleAccessApi";

// Component for RoleMasterForm
const RoleMasterForm = ({ data, setIsLoading, setData }) => {
  // Translation labels
  // const [moduleArr, setModuleArr] = useState()

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
  const view = GetTranslationData("UIAdmin", "view");
  const add = GetTranslationData("UIAdmin", "add");
  const edit = GetTranslationData("UIAdmin", "edit");
  const description_Label = GetTranslationData("UIAdmin", "description_Label");
  const mandatory_Req_Label = GetTranslationData("UIAdmin", "mandatory_Req_Label");
  const dispatch = useDispatch();
  const [isformLoading, setIsFormLoading] = useState(true);
  const [checkBoxError, setCheckBoxError] = useState(false);

  //To get the data from redux store
  const getModule = useSelector((state) => state.moduleReducer);
  const getModuleData = getModule?.data?.data;
  // Initial state for form data and errors
  const [formData, setFormData] = useState({
    name: "",
    isClientPlatformModule: false,
    module: []

  });
  const [errors, setErrors] = useState({
    name: "",
  });
  // Check if all modules are selected
  const isSelectAllChecked =
    formData.modules?.length > 0 &&
    formData.modules.every((module) => module.checked);

  // Fetch module data and update form data on mount and when module data changes

  useEffect(() => {

    console.log('<><><>', formData)

  }, [formData])


  
  useEffect(() => {
    if (getModuleData) {
      const modulesData = getModuleData?.map((module) => ({
        id: module.id,
        isClientPlatformModule: module.isClientPlatformModule,
        name: module.name,
        checked: false,
        // viewAccess: false,
        addAccess: false,
        editAccess: false

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
 


    // if (name === "IsClientRole") {
    //   setFormData({
    //     ...formData,
    //     isClientPlatformModule: checked,
    //     modules: formData.modules.map((module) => ({
    //       ...module,
    //       checked: false, // Uncheck all other checkboxes when IsClientRole is checked
    //     })),
    //   });
    // } 
    // else 
    if (name === "selectAll") {
      const updatedModules = formData.modules?.map((module) => ({
        ...module,
        checked: formData.isClientPlatformModule
          ? module.isClientPlatformModule
          : checked,
      }));
      setFormData({
        ...formData,
        modules: updatedModules,
      });
    }
    else if (type === "checkbox" && name === "view") {
      let modules = formData.modules.map((md) => {
        if (md.id === parseInt(e.target.id)) {
          return { ...md, checked: !md.checked }
        }
        else {
          return md
        }
      });
      setFormData({ ...formData, modules })
    }

    else if (type === "checkbox" && name === "add") {
      let modules = formData.modules.map((md) => {
        if (md.id === parseInt(e.target.id)) {
          return { ...md, addAccess: !md.addAccess }
        }
        else {
          return md
        }
      });
      setFormData({ ...formData, modules })
    }

    else if (type === "checkbox" && name === "edit") {
      let modules = formData.modules.map((md) => {
        if (md.id === parseInt(e.target.id)) {
          return { ...md, editAccess: !md.editAccess }
        }
        else {
          return md
        }
      });
      setFormData({ ...formData, modules })
    }


    // else if (type === "checkbox" && name !== "IsClientRole") {
    //   const updatedModules = formData.modules?.map((module) =>
    //     module.name === name ? { ...module, checked } : module
    //   );
    //   setFormData({
    //     ...formData,
    //     modules: updatedModules,
    //   });
    // } 

    else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };
  // Reset form fields
  // const resetFiled = {
  //   code: Math.floor(Math.random() * (999 - 100 + 1) + 100),
  //   name: "",
  //   modules: formData.modules,
  //   isClientPlatformModule: false,
  // };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { ...errors };
    setErrors(newErrors);
    if (formData.name.trim() === "") {
      newErrors.name = mandatory_Req_Label;
      setErrors(newErrors);
      return;
    } else {
      newErrors.name = "";
    }

    const selectedModuleIds = formData.modules
      ?.filter((module) => module.checked)
      .map((module) => module.id);

    // if (selectedModuleIds?.length === 0) {
    //   setCheckBoxError(true);
    //   return;
    // } else {
    //   setCheckBoxError(false);
    // }
    const postData = {
      name: formData.name,
      isClientPlatformModule: false,
    };
     const accessPostData = formData.modules?.map((md) => {
          return {
            roleId: md.id,
            moduleId: md.id,
            viewAccess: md.checked,
            addAccess: md.addAccess,
            editAccess: md.editAccess,
          }
        })
    try {
      //To Submit the data
      if (!data) {
        await dispatch(onPostUserRole(postData));

       

         console.log('submit Data 2', accessPostData)

        await dispatch(callUserRoleModuleAccessPostApi(accessPostData))
        // setFormData(resetFiled);
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
        // setFormData(resetFiled);
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
                          <label htmlFor="name-f" style={{textDecoration:"underline"}}>
                            {roleName}
                            <span className="text-danger">*</span>
                          </label>
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
                          <p className="text-danger">{errors.name}</p>
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">{description_Label}
                          </label>
                          <InputField
                            type="text"
                            className={` ${errors.description ? "border-danger" : "form-control"
                              }`}
                            name="name"
                            id="name-f"
                            placeholder=""
                            value={formData.description}
                            error={errors.description}
                          />
                        </div>
                        <div className="col-sm-4">
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
                        </div>

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
                            // onChange={()=>{
                            //   if ( formData?.modules?.length > 0 &&
                            //     formData?.modules.every(
                            //       (module) => module.checked
                            //     ))
                            //     {

                            //       let modules = formData.modules.map((md)=>{
                            //         return {...md,checked: false}
                            //       })
                            //       setFormData({...formData, modules})
                            //     }
                            //     else {

                            //       let modules = formData.modules.map((md)=>{
                            //         return {...md,checked: true}
                            //       }) 

                            //       setFormData({...formData, modules})
                            //     }
                            // }}
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
                            ({ id, name, checked, editAccess, addAccess, isClientPlatformModule }) =>
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

                                <div className="col-lg-9 d-flex justify-content-end">
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <InputField type="checkbox" id={id} className="form-check-input" name="view" value={checked} checked={checked} onChange={handleInputChange} />{view}
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <InputField type="checkbox" id={id} className="form-check-input" name="add" value={addAccess} checked={addAccess} onChange={handleInputChange} />{add}
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <InputField type="checkbox" id={id} className="form-check-input" name="edit" value={editAccess} checked={editAccess} onChange={handleInputChange} />{edit}
                                    </label>
                                  </div>
                                </div>
                              </div>

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
