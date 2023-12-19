import React, { useEffect, useState } from "react";
import "../ClientMasterForm/ClientMasterForm.scss";
import InputField from "../../../Componenets/InputField/InputField";
import Dropdown from "../../../Componenets/Dropdown/Dropdown";
import Loader from "../../../Componenets/Loader/Loader";
import {
  onUpdateClientMasterSubmit,
  onPostClientMasterSubmit,
  onClientMasterSubmit,
} from "../../../Store/Slices/clientMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";
const ClientMaster = (props) => {
  const dispatch = useDispatch();
  const [showLoder, setShowLoader] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const clientMasterDetails = useSelector((state) => state.clientMasterReducer);
  const contactName = GetTranslationData("UIAdmin", "contact_Name_label");
  const contactNumber = GetTranslationData("UIAdmin", "contact_Number_label");
  const email = GetTranslationData("UIAdmin", "contact_Email_label");
  const ipAddress = GetTranslationData("UIAdmin", "IP Address_label");
  const userName = GetTranslationData("UIAdmin", "usernamee_label");
  const password = GetTranslationData("UIAdmin", "password_label");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const selectOption = GetTranslationData("UIAdmin", "select_Option");
  const color = GetTranslationData("UIAdmin", "Color_label");
  const logo = GetTranslationData("UIAdmin", "Logo Link_label");
  const theme = GetTranslationData("UIAdmin", "Select Theme_label");
  const razorpay = GetTranslationData(
    "UIAdmin",
    "razorpay Payment Gateway_label"
  );
  const staging = GetTranslationData("UIAdmin", "staging_label");
  const key = GetTranslationData("UIAdmin", "key_placeholder");
  const production = GetTranslationData("UIAdmin", "production_key_label");
  const secretKey = GetTranslationData("UIAdmin", "secretkey_placeholder");
  const add = GetTranslationData("UIAdmin", "add_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const invalidEmail = GetTranslationData("UIAdmin", "invalid_Email");
  const validNumber = GetTranslationData("UIAdmin", "number_Digit_Label");
  const statusoptions = [
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non-Active" },
  ];
  const options = [
    { value: "Theme 1", label: "Theme 1" },
    { value: "Theme 2", label: "Theme 2" },
    { value: "Theme 3", label: "Theme 3" },
    { value: "Theme 4", label: "Theme 4" },
  ];
  const [clientData, setClientData] = useState({
    name: "",
    number: "",
    email: "",
    userName: "",
    password: "",
    status: "",
    color: "",
    lgogLink: "",
    dbipAddress: "",
    dbLoginId: "",
    dbLoginPwd: "",
    stagingKey: "",
    stagingSecretKey: "",
    productionKey: "",
    productionSecretKey: "",
    theme: "",
    id: props.data?.id,
    enabled: true,
    deleted: true,
  });
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    email: "",
    userName: "",
    password: "",
    status: "",
    color: "",
    lgogLink: "",
    dbipAddress: "",
    stagingKey: "",
    stagingSecretKey: "",
    productionKey: "",
    productionSecretKey: "",
    theme: "",
  });
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setClientData({
      name: props.data?.name || "",
      number: props.data?.number || "",
      email: props.data?.email || "",
      dbipAddress: props.data?.dbipAddress || "",
      id: props.data?.id,
      color: props.data?.color,
      lgogLink: props.data?.lgogLink || "",
      theme: props.data?.theme || "",
      stagingKey: props.data?.stagingKey || "",
      stagingSecretKey: props.data?.stagingSecretKey || "",
      productionKey: props.data?.productionKey || "",
      productionSecretKey: props.data?.productionSecretKey || "",
      status: props.data?.status || "",
      password: props.data?.password || "",
      userName: props.data?.userName || "",
      dbLoginPwd: props.data?.dbLoginPwd || "ds",
      dbLoginId: props.data?.dbLoginId || "ds",
      enabled: true,
      deleted: true,
    });
    setErrors({
      name: "",
      number: "",
      email: "",
      userName: "",
      password: "",
      status: "",
      color: "",
      lgogLink: "",
      dbipAddress: "",
      stagingKey: "",
      stagingSecretKey: "",
      productionKey: "",
      productionSecretKey: "",
      theme: "",
    });
  }, [props.data]);

  const handleChange = (e, fieldName) => {
    setClientData({
      ...clientData,
      [fieldName]: e.target.value,
    });
    if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(e.target.value);
      setErrors({
        ...errors,
        [fieldName]: isValidEmail ? "" : invalidEmail,
      });
    } else if (fieldName === "number") {
      const phoneRegex = /^\d{10}$/;
      const isValidnumber = phoneRegex.test(e.target.value);
      setErrors({
        ...errors,
        [fieldName]: isValidnumber ? "" : validNumber,
      });
    }

    // Remove the error message when the user starts typing
    else {
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
    for (const key in clientData) {
      if (clientData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else if (key === "email" && newErrors[key] !== "") {
        isValid = false;
      } else if (key === "number" && newErrors[key] !== "") {
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    if (isValid) {
      if (!props.data) {
        try {
          setShowToast(true);
          setShowLoader(true);
          clientData.number = parseInt(clientData.number);
          // Wait for the dispatch to complete
          dispatch(onPostClientMasterSubmit(clientData));
          // Define a function to show a toast notification based on loginDetails
        } catch (error) {
          // Handle any errors during dispatch
        }
      } else if (props.data) {
        try {
          setShowUpdate(true);
          setShowLoader(true);
          clientData.number = parseInt(clientData.number);
          // Wait for the dispatch to complete
          dispatch(onUpdateClientMasterSubmit(clientData));
        } catch (error) {
          // Handle any errors during dispatch
        }
      }
    }
  };
  useEffect(() => {
    if (showToast) {
      if (clientMasterDetails.postMessage === "Added Successfully.") {
        setShowLoader(false);
        toast.success(clientMasterDetails.postMessage);
        dispatch(onClientMasterSubmit());
        setClientData({
          name: "",
          number: "",
          email: "",
          userName: "",
          password: "",
          status: "",
          color: "",
          lgogLink: "",
          dbipAddress: "",
          dbLoginId: "",
          dbLoginPwd: "",
          stagingKey: "",
          stagingSecretKey: "",
          productionKey: "",
          productionSecretKey: "",
          theme: "",
          id: props.data?.id,
          enabled: true,
          deleted: true,
        });
      } else {
        setShowLoader(false);
        toast.error(clientMasterDetails.postMessage);
      }
    }
    if (showUpdate) {
      if (clientMasterDetails.postMessage === "Update Successfully.") {
        setShowLoader(false);
        dispatch(onClientMasterSubmit());
        toast.success(clientMasterDetails.postMessage);
        setClientData({
          name: "",
          number: "",
          email: "",
          userName: "",
          password: "",
          status: "",
          color: "",
          lgogLink: "",
          dbipAddress: "",
          dbLoginId: "",
          dbLoginPwd: "",
          stagingKey: "",
          stagingSecretKey: "",
          productionKey: "",
          productionSecretKey: "",
          theme: "",
          id: props.data?.id,
          enabled: true,
          deleted: true,
        });
      }
    }
  }, [clientMasterDetails.postMessage]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">
                  {GetTranslationData("UIAdmin", "client_master_label")}
                </h4>
              </div>
              <div className="card-body position-relative">
                {showLoder ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container mt-3">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="contact-name">
                            {contactName}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="contactName"
                            id="contact-name"
                            error={errors.name}
                            value={clientData.name}
                            onChange={(e) => handleChange(e, "name")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="contact-number">
                            {contactNumber}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            className={` ${
                              errors.number ? "border-danger" : "form-control"
                            }`}
                            name="contactNumber"
                            id="contact-number"
                            value={clientData.number}
                            error={errors.number}
                            maxLength={10}
                            onChange={(e) => handleChange(e, "number")}
                          />
                          {<p className="text-danger">{errors.number}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="contact-email">
                            {email}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="email"
                            className={` ${
                              errors.email ? "border-danger" : "form-control"
                            }`}
                            name="contactEmail"
                            id="contact-email"
                            value={clientData.email}
                            error={errors.email}
                            onChange={(e) => handleChange(e, "email")}
                          />
                          {<p className="text-danger">{errors.email}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="ipAddress">
                            {ipAddress} <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.dbipAddress
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="ipAddress"
                            id="ipAddress"
                            value={clientData.dbipAddress}
                            error={errors.dbipAddress}
                            onChange={(e) => handleChange(e, "dbipAddress")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="contact-name">
                            {userName}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.userName ? "border-danger" : "form-control"
                            }`}
                            name="username"
                            id="user-name"
                            value={clientData.userName}
                            error={errors.userName}
                            onChange={(e) => handleChange(e, "userName")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="contact-name">
                            {password}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="password"
                            className={` ${
                              errors.password ? "border-danger" : "form-control"
                            }`}
                            name="password"
                            id="password"
                            value={clientData.password}
                            error={errors.password}
                            onChange={(e) => handleChange(e, "password")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="status">
                            {status}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "status")}
                            error={errors.status}
                            value={clientData.status}
                            ariaLabel="Default select example"
                            className="form-select"
                            options={statusoptions}
                          />
                          <p>
                            {selectOption}
                            {clientData.status}
                          </p>
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="color">
                            {color}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="color"
                            className={` ${
                              errors.color ? "border-danger" : "form-control"
                            }`}
                            name="color"
                            id="color"
                            error={errors.color}
                            value={clientData.color}
                            onChange={(e) => handleChange(e, "color")}
                          />
                        </div>
                        <div className="col-sm-6 form-group mb-2">
                          <label htmlFor="logo">
                            {logo}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.lgogLink ? "border-danger" : "form-control"
                            }`}
                            name="logo"
                            id="logo"
                            error={errors.lgogLink}
                            value={clientData.lgogLink}
                            onChange={(e) => handleChange(e, "lgogLink")}
                          />
                        </div>
                        <div className="col-sm-6 form-group mb-2">
                          <label htmlFor="status">
                            {theme}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "theme")}
                            error={errors.theme}
                            value={clientData.theme}
                            key={clientData.theme}
                            ariaLabel="Default select example"
                            className="form-select"
                            options={options}
                          />
                          <p>
                            {selectOption}
                            {clientData.theme}
                          </p>
                        </div>
                        <div className="row mt-2">
                          <h3 style={{ borderBottom: "1px solid #ededed" }}>
                            {razorpay}
                          </h3>
                          <div className="col-lg-6 mt-2">
                            <div className="row p-0">
                              <h4>
                                {staging}
                                <span className="text-danger">*</span>
                              </h4>
                              <div className="col-sm-12 form-group mb-2">
                                <InputField
                                  type="text"
                                  className={` ${
                                    errors.stagingKey
                                      ? "border-danger"
                                      : "form-control"
                                  }`}
                                  name="stagingKey"
                                  id="staging-key"
                                  placeholder={key}
                                  value={clientData.stagingKey}
                                  error={errors.stagingKey}
                                  onChange={(e) =>
                                    handleChange(e, "stagingKey")
                                  }
                                />
                              </div>
                              <div className="col-sm-12 form-group mb-2">
                                <InputField
                                  type="text"
                                  className={` ${
                                    errors.stagingSecretKey
                                      ? "border-danger"
                                      : "form-control"
                                  }`}
                                  name="stagingSecretKey"
                                  id="staging-secret-key"
                                  error={errors.stagingSecretKey}
                                  value={clientData.stagingSecretKey}
                                  placeholder={secretKey}
                                  onChange={(e) =>
                                    handleChange(e, "stagingSecretKey")
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 mt-2">
                            <div className="row p-0">
                              <h4>
                                {production}

                                <span className="text-danger">*</span>
                              </h4>
                              <div className="col-sm-12 form-group mb-2">
                                <InputField
                                  type="text"
                                  className={` ${
                                    errors.productionKey
                                      ? "border-danger"
                                      : "form-control"
                                  }`}
                                  name="productionKey"
                                  id="production-key"
                                  placeholder={key}
                                  error={errors.productionKey}
                                  value={clientData.productionKey}
                                  onChange={(e) =>
                                    handleChange(e, "productionKey")
                                  }
                                />
                              </div>
                              <div className="col-sm-12 form-group mb-2">
                                <InputField
                                  type="text"
                                  className={` ${
                                    errors.productionSecretKey
                                      ? "border-danger"
                                      : "form-control"
                                  }`}
                                  name="productionSecretKey"
                                  id="production-secret-key"
                                  placeholder={secretKey}
                                  error={errors.productionSecretKey}
                                  value={clientData.productionSecretKey}
                                  onChange={(e) =>
                                    handleChange(e, "productionSecretKey")
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary float-right pad-aa"
                          >
                            {props.data ? update : add}

                            <i className="fa fa-arrow-right"></i>
                          </button>
                          <ToastContainer />
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

export default ClientMaster;
