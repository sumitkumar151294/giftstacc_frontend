import React, { useEffect, useState } from "react";
import "../ClientMasterForm/ClientMasterForm.scss";
import InputField from "../../../Componenets/InputField/InputField";
import Dropdown from "../../../Componenets/Dropdown/Dropdown";
import Loader from "../../../Componenets/Loader/Loader";
import {
  onClientMasterSubmit,
  onPostClientMasterSubmit,
} from "../../../Store/Slices/clientMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";
const ClientMaster = (props) => {
  const dispatch = useDispatch();
  const [showLoder, setShowLoader] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const clientMasterDetails = useSelector((state) => state.clientMasterReducer);
  const statusoptions = [
    { value: "Active3", label: "Active" },
    { value: "Active4", label: "Non-Active" },
  ];

  const options = [
    { value: "Active1", label: "Theme 1" },
    { value: "Non-Active1", label: "Theme 2" },
    { value: "Non-Active2", label: "Theme 3" },
    { value: "Non-Active4", label: "Theme 4" },
  ];

  const [clientData, setClientData] = useState({
    name: "",
    number: "",
    email: "",
    ipAddress: "",
    color: "",
    logoLink: "",
    theme: "",
    stagingKey: "",
    stagingSecretKey: "",
    productionKey: "",
    productionSecretKey: "",
    status: "",
    password: "",
    userName: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    email: "",
    ipAddress: "",
    color: "",
    logoLink: "",
    theme: "",
    stagingKey: "",
    stagingSecretKey: "",
    productionKey: "",
    productionSecretKey: "",
    status: "",
    password: "",
    userName: "",
  });
  useEffect(() => {
    setClientData({
      name: props.data?.name || "",
      number: props.data?.number || "",
      email: props.data?.email || "",
      ipAddress: props.data?.dbipAddress || "",
      color: props.data?.color || "",
      logoLink: props.data?.lgogLink || "",
      theme: props.data?.theme || "",
      stagingKey: props.data?.stagingKey || "",
      stagingSecretKey: props.data?.stagingSecretKey || "",
      productionKey: props.data?.productionKey || "",
      productionSecretKey: props.data?.productionSecretKey || "",
      status: props.data?.status || "",
      password: props.data?.password || "",
      userName: props.data?.userName || "",
      dbLoginPwd: props.data?.dbLoginPwd || "", // Corrected order
      dbLoginId: props.data?.dbLoginId || "", // Corrected order
      isActive: props.data?.isActive || "",
    });

    setErrors({
      name: "",
      number: "",
      email: "",
      ipAddress: "",
      color: "",
      logoLink: "",
      theme: "",
      stagingKey: "",
      stagingSecretKey: "",
      productionKey: "",
      productionSecretKey: "",
      status: "",
      password: "",
      userName: "",
    });
  }, [props.data]); // Include props.data directly in the dependency array
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
        [fieldName]: isValidEmail ? "" : "Invalid email address",
      });
    } else if (fieldName === "number") {
      const phoneRegex = /^\d{10}$/;
      const isValidnumber = phoneRegex.test(e.target.value);

      setErrors({
        ...errors,
        [fieldName]: isValidnumber ? "" : "Please enter 10 digit only",
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

  const handleSubmit = async (e) => {
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
      try {
        setShowToast(true);
        setShowLoader(true);
        clientData.number = parseInt(clientData.number);

        // Wait for the dispatch to complete
        await dispatch(onPostClientMasterSubmit(clientData));

        // Define a function to show a toast notification based on loginDetails
      } catch (error) {
        // Handle any errors during dispatch
        console.error(error);
      }
    }
  };
  useEffect(() => {
    if (showToast) {
      if (clientMasterDetails.message === "Added Successfully.") {
        setShowLoader(false);
        toast.success(clientMasterDetails.message);
        // dispatch(onClientMasterSubmit());
      } else {
        setShowLoader(false);
        toast.error(clientMasterDetails.message);
      }
    }
  }, [clientMasterDetails.message]);
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">
                  {GetTranslationData("UIAdmin", "client_master_label")}
                </h4>
              </div>
              <div class="card-body position-relative">
                {showLoder ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div class="container mt-3">
                    <form onSubmit={handleSubmit}>
                      <div class="row">
                        <div class="col-sm-4 form-group mb-2">
                          <label for="contact-name">
                            {GetTranslationData(
                              "UIAdmin",
                              "contact_Name_label"
                            )}
                            <span class="text-danger">*</span>
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
                        <div class="col-sm-4 form-group mb-2">
                          <label for="contact-number">
                            {GetTranslationData(
                              "UIAdmin",
                              "contact_Number_label"
                            )}
                            <span class="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="contactNumber"
                            id="contact-number"
                            value={parseInt(clientData.number)}
                            error={errors.number}
                            maxLength={10}
                            onChange={(e) => handleChange(e, "number")}
                          />
                          {<p className="text-danger">{errors.number}</p>}
                        </div>
                        <div class="col-sm-4 form-group mb-2">
                          <label for="contact-email">
                            {GetTranslationData(
                              "UIAdmin",
                              "contact_Email_label"
                            )}{" "}
                            <span class="text-danger">*</span>
                          </label>
                          <InputField
                            type="email"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="contactEmail"
                            id="contact-email"
                            value={clientData.email}
                            error={errors.email}
                            onChange={(e) => handleChange(e, "email")}
                          />
                          {<p className="text-danger">{errors.email}</p>}
                        </div>
                        <div class="col-sm-4 form-group mb-2">
                          <label for="ipAddress">
                            {GetTranslationData("UIAdmin", "IP Address_label")}
                            <span class="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="ipAddress"
                            id="ipAddress"
                            value={clientData.ipAddress}
                            error={errors.ipAddress}
                            onChange={(e) => handleChange(e, "ipAddress")}
                          />
                        </div>
                        <div class="col-sm-4 form-group mb-2">
                          <label for="contact-name">
                            {GetTranslationData("UIAdmin", "usernamee_label")}
                            <span class="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="username"
                            id="user-name"
                            value={clientData.userName}
                            error={errors.userName}
                            onChange={(e) => handleChange(e, "userName")}
                          />
                        </div>
                        <div class="col-sm-4 form-group mb-2">
                          <label for="contact-name">
                            {GetTranslationData("UIAdmin", "password_label")}
                            <span class="text-danger">*</span>
                          </label>
                          <InputField
                            type="password"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="password"
                            id="password"
                            value={clientData.password}
                            error={errors.password}
                            onChange={(e) => handleChange(e, "password")}
                          />
                        </div>
                        <div class="col-sm-4 form-group mb-2">
                          <label for="status">
                            {GetTranslationData("UIAdmin", "Status_label")}
                            <span class="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "status")}
                            error={errors.status}
                            ariaLabel="Default select example"
                            className="form-select"
                            options={statusoptions}
                          />
                          <p>
                            {GetTranslationData("UIAdmin", "select_Option")}{" "}
                            {clientData.status}
                          </p>
                        </div>
                        <div class="col-sm-4 form-group mb-2">
                          <label for="color">
                            {GetTranslationData("UIAdmin", "Color_label")}
                            <span class="text-danger">*</span>
                          </label>
                          <InputField
                            type="color"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="color"
                            id="color"
                            error={errors.color}
                            value={clientData.color}
                            onChange={(e) => handleChange(e, "color")}
                          />
                        </div>
                        <div class="col-sm-6 form-group mb-2">
                          <label for="logo">
                            {GetTranslationData("UIAdmin", "Logo Link_label")}
                            <span class="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="logo"
                            id="logo"
                            error={errors.logoLink}
                            value={clientData.logoLink}
                            onChange={(e) => handleChange(e, "logoLink")}
                          />
                        </div>
                        <div class="col-sm-6 form-group mb-2">
                          <label for="status">
                            {GetTranslationData(
                              "UIAdmin",
                              "Select Theme_label"
                            )}
                            <span class="text-danger">*</span>
                          </label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "theme")}
                            error={errors.theme}
                            ariaLabel="Default select example"
                            className="form-select"
                            options={options}
                          />
                          <p>
                            {GetTranslationData("UIAdmin", "select_Option")}
                            {clientData.theme}
                          </p>
                        </div>
                        <div class="row mt-2">
                          <h3 style={{ borderBottom: "1px solid #ededed" }}>
                            {GetTranslationData(
                              "UIAdmin",
                              "razorpay Payment Gateway_label"
                            )}
                          </h3>
                          <div class="col-lg-6 mt-2">
                            <div class="row p-0">
                              <h4>
                                {GetTranslationData("UIAdmin", "staging_label")}
                                <span class="text-danger">*</span>
                              </h4>
                              <div class="col-sm-12 form-group mb-2">
                                <InputField
                                  type="text"
                                  className={` ${
                                    errors.name
                                      ? "border-danger"
                                      : "form-control"
                                  }`}
                                  name="stagingKey"
                                  id="staging-key"
                                  placeholder={GetTranslationData(
                                    "UIAdmin",
                                    "key_placeholder"
                                  )}
                                  value={clientData.stagingKey}
                                  error={errors.stagingKey}
                                  onChange={(e) =>
                                    handleChange(e, "stagingKey")
                                  }
                                />
                              </div>
                              <div class="col-sm-12 form-group mb-2">
                                <InputField
                                  type="text"
                                  className={` ${
                                    errors.name
                                      ? "border-danger"
                                      : "form-control"
                                  }`}
                                  name="stagingSecretKey"
                                  id="staging-secret-key"
                                  error={errors.stagingSecretKey}
                                  value={clientData.stagingSecretKey}
                                  placeholder={GetTranslationData(
                                    "UIAdmin",
                                    "secretkey_placeholder"
                                  )}
                                  onChange={(e) =>
                                    handleChange(e, "stagingSecretKey")
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6 mt-2">
                            <div class="row p-0">
                              <h4>
                                {GetTranslationData(
                                  "UIAdmin",
                                  "production_key_label"
                                )}
                                <span class="text-danger">*</span>
                              </h4>
                              <div class="col-sm-12 form-group mb-2">
                                <InputField
                                  type="text"
                                  className={` ${
                                    errors.name
                                      ? "border-danger"
                                      : "form-control"
                                  }`}
                                  name="productionKey"
                                  id="production-key"
                                  placeholder={GetTranslationData(
                                    "UIAdmin",
                                    "key_placeholder"
                                  )}
                                  error={errors.productionKey}
                                  value={clientData.productionKey}
                                  onChange={(e) =>
                                    handleChange(e, "productionKey")
                                  }
                                />
                              </div>
                              <div class="col-sm-12 form-group mb-2">
                                <InputField
                                  type="text"
                                  className={` ${
                                    errors.name
                                      ? "border-danger"
                                      : "form-control"
                                  }`}
                                  name="productionSecretKey"
                                  id="production-secret-key"
                                  placeholder={GetTranslationData(
                                    "UIAdmin",
                                    "secretkey_placeholder"
                                  )}
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
                        <div class="col-sm-12 form-group mb-0 mt-2">
                          <button
                            type="submit"
                            class="btn btn-primary float-right pad-aa"
                          >
                            {GetTranslationData("UIAdmin", "add_label")}
                            <i class="fa fa-arrow-right"></i>
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
