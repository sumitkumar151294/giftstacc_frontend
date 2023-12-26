import React, { useEffect, useState } from "react";
import { onGetUser, onUserSubmit } from "../../../Store/Slices/userMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../Componenets/InputField/InputField";
import "../../UserMaster/UserMaster.scss";
import { ToastContainer, toast } from "react-toastify";
import { onGetUserRole } from "../../../Store/Slices/userRoleSlice";
import Loader from "../../../Componenets/Loader/Loader";
import { onClientMasterSubmit } from "../../../Store/Slices/clientMasterSlice";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";

const UserDetails = ({ prefilledValues }) => {
  const dispatch = useDispatch();
  const [onUpdate, setOnUpdate] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    mobile: "",
    email: "",
    role: "",
    accessClientIds: [],
    firstName: "",
    lastName: "",
  });
  // Initialize 'role' error state
  const [errors, setErrors] = useState({
    userName: "",
    mobile: "",
    email: "",
    role: "",
    accessClientIds: "",
    firstName: "",
    lastName: "",
  }); 

  //To get the data from redux store
  const onSubmitData = useSelector((state) => state.userMasterReducer.postdata);
  const loading = useSelector((state) => state.userMasterReducer.isLoading);
  const roleList = useSelector((state) => state.userRoleReducer);
  const clientList = useSelector((state) => state.clientMasterReducer.data);

  //To get the labels from API
  const userMaster = GetTranslationData("UIAdmin", "user_Master_label");
  const email = GetTranslationData("UIAdmin", "email_label");
  const mobile = GetTranslationData("UIAdmin", "mobile_label");
  const username = GetTranslationData("UIAdmin", "usernamee_label");
  const client = GetTranslationData("UIAdmin", "client_label");
  const role = GetTranslationData("UIAdmin", "role_name_label");
  const requiredLevel = GetTranslationData("UIAdmin", "required_label");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const invalidEmail = GetTranslationData("UIAdmin", "invalid_Email");
  const invalidMobile = GetTranslationData("UIAdmin", "number_Digit_Label");
  const firstName = GetTranslationData("UIAdmin", "first-name");
  const lastName = GetTranslationData("UIAdmin", "last-name");
  const update = GetTranslationData("UIAdmin", "update_label");
  const fieldRequired = GetTranslationData("UIAdmin", "required-field");

// user-role get api call

  useEffect(() => {
    dispatch(onGetUserRole());
    dispatch(onClientMasterSubmit());
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setUserData({
      userName: prefilledValues?.firstName || "",
      mobile: prefilledValues?.mobile || "",
      email: prefilledValues?.email || "",
      role: "",
      accessClientIds: [],
      firstName: prefilledValues?.firstName || "",
      lastName: prefilledValues?.lastName || "",
    });
  }, [prefilledValues]);

  // to get role module access list
  const handleChange = (e, fieldName) => {
    const { name, value, type, checked } = e.target;
    let newUserdetailData;
    if (fieldName === "check") {
      let accessClientIds = userData.accessClientIds;
      accessClientIds.push(value);
      newUserdetailData = {
        ...userData,
        accessClientIds,
      };
    } else {
      newUserdetailData = {
        ...userData,
        [fieldName]: value,
      };
    }
    setUserData(newUserdetailData);
    if (fieldName === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const isValidEmail = emailRegex.test(value);
      setErrors({
        ...errors,
        [fieldName]: isValidEmail ? "" : invalidEmail,
      });
    } else if (fieldName === "mobile") {
      const mobileRegex = /^[0-9]{10}$/;
      const isValidMobile = mobileRegex.test(value);
      setErrors({
        ...errors,
        [fieldName]: isValidMobile ? "" : invalidMobile,
      });
    } else {
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
    // Check if fields are empty and set corresponding error messages
    for (const key in userData) {
      if (userData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else if (key === "email" && newErrors[key] !== "") {
        isValid = false;
      } else if (key === "mobile" && newErrors[key] !== "") {
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    // Check if a role has been selected
    if (userData.role === "") {
      newErrors.role = "Please select a role";
      isValid = false;
    } else {
      newErrors.role = ""; // Clear the role error if a role is selected
    }
    setErrors(newErrors);
    // Check if a client has been selected
    if (userData.accessClientIds.length === 0) {
      newErrors.accessClientIds = "Please select a client";
      isValid = false;
    } else {
      newErrors.accessClientIds = ""; // Clear the client error if a client is selected
    }
    setErrors(newErrors);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const mobileRegex = /^[0-9]{10}$/;
    if (!emailRegex.test(userData.email)) {
      isValid = false;
    } else if (!mobileRegex.test(userData.mobile)) {
      isValid = false;
    } else {
      newErrors.email = "";
    }
    setErrors(newErrors);
    if (isValid) {
      setOnUpdate(true);
      const UsersData = {
        ...userData,
        adminRoleId: parseInt(userData.role),
        adminRoleCode: 1,
        clientRoleId: 2,
        clientRoleCode: 2,
        password:"admin",
        mobile: parseInt(userData.mobile),
      };
      // Dispatch the form submission action if needed

    
        dispatch(onUserSubmit(UsersData));
    
      
    }
  };

  useEffect(() => {
    if (onUpdate) {
      if (onSubmitData.message === "User Added Successfully.") {
        toast.success(onSubmitData.message);
        setUserData({
          userName: "",
          mobile: "",
          email: "",
          role: "",
          accessClientIds: [],
          firstName: "",
          lastName: "",
        });
        setTimeout(()=>{
        dispatch(onGetUser());
      }, 3000)
      } else {
        toast.error(onSubmitData.message);
      }
    }
  }, [onSubmitData]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{userMaster}</h4>
              </div>
              <div className="card-body position-relative">
                {loading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classNameType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container mt-3">
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {email}
                            <span className="text-danger">{fieldRequired}</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.email ? "border-danger" : "form-control"
                            }`}
                            onChange={(e) => handleChange(e, "email")}
                            placeholder=""
                            error={errors.email}
                            value={userData.email}
                          />
                          <p className="text-danger">{errors.email}</p>
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {mobile}
                            <span className="text-danger">{fieldRequired}</span>
                          </label>
                          <InputField
                            type="number"
                            className={` ${
                              errors.mobile ? "border-danger" : "form-control"
                            }`}
                            onChange={(e) => handleChange(e, "mobile")}
                            placeholder=""
                            error={errors.mobile}
                            value={userData.mobile}
                          />
                          <p className="text-danger">{errors.mobile}</p>
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {username}
                            <span className="text-danger">{fieldRequired}</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.userName ? "border-danger" : "form-control"
                            }`}
                            name="fname"
                            id="name-f"
                            placeholder=""
                            onChange={(e) => handleChange(e, "userName")}
                            error={errors.userName}
                            value={userData.userName}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {firstName}
                            <span className="text-danger">{fieldRequired}</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.firstName
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="fname"
                            id="name-f"
                            placeholder=""
                            onChange={(e) => handleChange(e, "firstName")}
                            error={errors.firstName}
                            value={userData.firstName}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {lastName}
                            <span className="text-danger">{fieldRequired}</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.lastName ? "border-danger" : "form-control"
                            }`}
                            name="lname"
                            id="name-f"
                            placeholder=""
                            onChange={(e) => handleChange(e, "lastName")}
                            error={errors.lastName}
                            value={userData.lastName}
                          />
                        </div>
                        <div className="col-lg-12 br pt-2">
                          <label htmlFor="name-f">{client}</label>
                          <div className="row ml-4">
                            {Array.isArray(clientList) &&
                              clientList?.map((item) => (
                                <div
                                  className="form-check mt-2 col-lg-3"
                                  key={item.id}
                                >
                                  <InputField
                                    className="form-check-input"
                                    type="checkbox"
                                    name={item.name}
                                    value={item.id}
                                    id={`flexCheckDefault-${item.id}`}
                                    checked={prefilledValues?.accessClientIds?.includes(
                                      parseInt(item.id)
                                    )}
                                    onChange={(e) => handleChange(e, "check")}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`flexCheckDefault-${item.id}`}
                                  >
                                    {item.name
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
                        </div>
                        <div className="col-lg-12 br pt-2">
                          <label htmlFor="name-f">{role}</label>
                          <div className="row ml-4 mb-10">
                            {roleList?.userRoleData?.data?.map(( item) => (
                              <div
                                key={item?.id}
                                className="form-check mt-2 col-lg-3"
                              >
                                <input
                                  id={item.id}
                                  type="radio"
                                  className="form-check-input"
                                  name="role"
                                  value={item.id}
                                  onChange={(e) => handleChange(e, "role")}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={item.id}
                                >
                                  {item.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          <span
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                            style={{ marginLeft: "5px", marginTop: "10px" }}
                          >
                            {requiredLevel}
                          </span>
                          <div className="col-sm-4 mt-2 mb-4">
                            <button className="btn btn-primary float-right pad-aa">
                              {prefilledValues ? update : submit}{" "}
                              <i className="fa fa-arrow-right"></i>
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

export default UserDetails;
