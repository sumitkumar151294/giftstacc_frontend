/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetUserRole,
  onPostUserRole,
  onPostUserRoleReset,
  onUpdateUserRole,
  onUpdateUserRoleReset
} from "../../Store/Slices/userRoleSlice";
import InputField from "../../Components/InputField/InputField";
import { ToastContainer, toast} from "react-toastify";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Button from "../../Components/Button/Button";
import { onGetUserRoleModuleAccess, onPostUserRoleModuleAccess, onPostUserRoleModuleAccessReset, onUpdateUserRoleModuleAccess } from "../../Store/Slices/userRoleModuleAccessSlice";

// Component for RoleMasterForm
const RoleMasterForm = ({ data, setData}) => {
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
  const view = GetTranslationData("UIAdmin", "view");
  const add = GetTranslationData("UIAdmin", "add");
  const edit = GetTranslationData("UIAdmin", "edit");
  const description_Label = GetTranslationData("UIAdmin", "description");
  const mandatory_Req_Label = GetTranslationData("UIAdmin", "role_Req_Label");
  const dispatch = useDispatch();
  const [isformLoading, setIsFormLoading] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState(false);
  const getModuleData = useSelector((state) => state.moduleReducer.data);
  const getModuleAccessData = useSelector((state) => state.userRoleModuleAccessReducer);
  const getRoleDataId = useSelector(
    (state) => state.userRoleReducer
  );

  //To get the data from redux store

  // Initial state for form data and errors
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isClientPlatformModule: false,
    module: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });
  // Check if all modules are selected
  const isSelectAllChecked =
    formData.modules?.length > 0 &&
    formData.modules.every((module) => module.checked);

  // Fetch module data and update form data on mount and when module data changes
  useEffect(() => {
    if (Array.isArray(getModuleData)) {
      // Check if getModuleData is an array
      
      const modulesData = getModuleData.map((module) => ({
        id: module.id,
        isClientPlatformModule: module.isClientPlatformModule,
        name: module.name,
        checked: false,
        addAccess: false,
        editAccess: false,
      }));
      setFormData({
        ...formData,
        modules: modulesData,
      });
      if (data) {
        const moduleAccessList = getModuleAccessData?.data?.filter(item=> (item.roleId===data?.id));
        for(var i=0; i<moduleAccessList.length; i++ ){
        for(var j=0; j<modulesData.length; j++){
         if(modulesData[j].id===moduleAccessList[i].moduleId){
          modulesData[j].addAccess=moduleAccessList[i].addAccess
          modulesData[j].checked=moduleAccessList[i].viewAccess
          modulesData[j].editAccess=moduleAccessList[i].editAccess
         }
        }
       }
        setFormData({
          ...formData,
          id: data.id,
          name: data?.name,
          code: data?.code,
          description: data?.description,
          isClientPlatformModule: data?.isClientPlatformRole,
          modules: modulesData,
        });
      }
    }
  }, [getModuleData, data]);

  // Handle input changes in the form
const handleInputChange = (e) => {
  const { name, type, checked } = e.target;
  if (name === "IsClientRole") {
    setFormData({
      ...formData,
      isClientPlatformModule: checked,
    });
  } else if (name === "selectAll") {
    const updatedModules = formData.modules.map((module) => ({
      ...module,
      checked: checked,
    }));
    setFormData({
      ...formData,
      modules: updatedModules,
    });
  } else if (type === "checkbox" && name === "view") {
    let modules = formData.modules.map((md) => {
      if (md.id === parseInt(e.target.id)) {
        return { ...md, checked: !md.checked };
      } else {
        return md;
      }
    });
    setFormData({ ...formData, modules });
  } else if (type === "checkbox" && name === "add") {
    let modules = formData.modules.map((md) => {
      if (md.id === parseInt(e.target.id)) {
        return { ...md, addAccess: !md.addAccess };
      } else {
        return md;
      }
    });
    setFormData({ ...formData, modules });
  } else if (type === "checkbox" && name === "edit") {
    let modules = formData.modules.map((md) => {
      if (md.id === parseInt(e.target.id)) {
        return { ...md, editAccess: !md.editAccess };
      } else {
        return md;
      }
    });
    setFormData({ ...formData, modules });
  } else {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  }
};


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

    //At least one Module should be selected
    if (formData.modules.some((module) => module.checked)) {
      setCheckBoxError(false);
    } else {
      setCheckBoxError(true);
      return;
    }

    const postData = {
      createdBy: 0,
      deleted: false,
      description: formData?.description,
      enabled: true,
      isClientPlatformRole: formData?.isClientPlatformModule,
      name: formData.name,
      updatedBy: 0,
    };
    try {
      //To Submit the data
      if (!data) {
          setIsFormLoading(true);
          dispatch(onPostUserRole(JSON.stringify(postData)));
      } else if (data) {
        postData.id=data.id
        setIsFormLoading(true);
        dispatch(onUpdateUserRole(JSON.stringify(postData)));
    }
    } catch (error) {
    }
  };

  useEffect(()=>{
if(getRoleDataId?.postRoleData?.length>0 && !getRoleDataId?.postLoading){
  const accessPostData = formData?.modules?.map((md) => {
    return {
      roleId: getRoleDataId?.postRoleData?.[0]?.roleId,
      moduleId: md.id,
      viewAccess: md.checked,
      addAccess: md.addAccess,
      editAccess: md.editAccess,
    };
  });
  dispatch(onPostUserRoleModuleAccess(accessPostData))
  dispatch(onPostUserRoleReset());
}else if(getRoleDataId?.status_code==="201" && !getRoleDataId?.updateLoading){
  let moduleAccess = JSON.parse(JSON.stringify(getModuleAccessData?.data));
  let moduleAccessList = moduleAccess?.filter(item=> (item.roleId===data?.id));
  let accessPostData = formData?.modules
  for(var i=0; i<moduleAccessList.length; i++ ){
  for(var j=0; j<accessPostData.length; j++){
   if(accessPostData[j].id===moduleAccessList[i].moduleId){
    moduleAccessList[i].addAccess=accessPostData[j].addAccess
    moduleAccessList[i].viewAccess=accessPostData[j].checked
    moduleAccessList[i].editAccess=accessPostData[j].editAccess
   }
  }
 }
  dispatch(onUpdateUserRoleModuleAccess(moduleAccessList))
  dispatch(onUpdateUserRoleReset());
}
},[getRoleDataId])

useEffect(()=>{
  if(getModuleAccessData?.status_code==='201' && !getModuleAccessData?.isLoading){
    setIsFormLoading(false)
    dispatch(onGetUserRole());
    dispatch(onGetUserRoleModuleAccess());
    toast.success(getModuleAccessData?.message);
    dispatch(onPostUserRoleModuleAccessReset());
    setData()
    if (Array.isArray(getModuleData)) {
      // Check if getModuleData is an array
      const modulesData = getModuleData.map((module) => ({
        id: module.id,
        isClientPlatformModule: module.isClientPlatformModule,
        name: module.name,
        checked: false,
        addAccess: false,
        editAccess: false,
      }));
      setFormData({
        name: "",
      description: "",
      isClientPlatformModule: false,
        modules: modulesData,
      });
    }
  }
},[getModuleAccessData])

  useEffect(()=>{
    dispatch(onPostUserRoleReset())
  },[])

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
                {isformLoading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {roleName}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
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
                          <label htmlFor="description">
                            {description_Label}
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.description
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="description"
                            id="description"
                            placeholder=""
                            value={formData.description}
                            error={errors.description}
                            onChange={handleInputChange}
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
                          <label htmlFor="name-f">{moduleAccess}</label>
                          {formData?.modules?.map(
                            ({
                              id,
                              name,
                              checked,
                              editAccess,
                              addAccess,
                              isClientPlatformModule,
                            }) => (
                              <div className="row mb-3 mt-3" key={id}>
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
                                      <InputField
                                        type="checkbox"
                                        id={id}
                                        className="form-check-input"
                                        name="view"
                                        value={checked}
                                        checked={checked}
                                        onChange={handleInputChange}
                                      />
                                      {view}
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <InputField
                                        type="checkbox"
                                        id={id}
                                        className="form-check-input"
                                        name="add"
                                        value={addAccess}
                                        checked={addAccess}
                                        onChange={handleInputChange}
                                      />
                                      {add}
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <InputField
                                        type="checkbox"
                                        id={id}
                                        className="form-check-input"
                                        name="edit"
                                        value={editAccess}
                                        checked={editAccess}
                                        onChange={handleInputChange}
                                      />
                                      {edit}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )
                          )}

                          {/* Checkbox Error Message */}
                          {checkBoxError && (
                            <span
                              className="form-check-label error-check text-danger"
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
/* eslint-enable react-hooks/exhaustive-deps */