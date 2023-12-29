import React, { useEffect, useState } from "react";
import "../ClientMasterForm/ClientMasterForm.scss";
import InputField from "../../../Components/InputField/InputField";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import Loader from "../../../Components/Loader/Loader";
import {
  onUpdateClientMasterSubmit,
  onPostClientMasterSubmit,
  onClientMasterSubmit,
} from "../../../Store/Slices/clientMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
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
  const status = GetTranslationData("UIAdmin", "Status_label");
  const color = GetTranslationData("UIAdmin", "Color_label");
  const logo = GetTranslationData("UIAdmin", "Logo Link_label");
  const theme = GetTranslationData("UIAdmin", "Select Theme_label");
  const fieldName = GetTranslationData("UIAdmin", "field_Name_Label");
  const fieldValue = GetTranslationData("UIAdmin", "field_Value_Label");
  const userId = GetTranslationData("UIAdmin", "database_User_ID_Label");
  const add_More = GetTranslationData("UIAdmin", "add_More");
  const delete_Button = GetTranslationData("UIAdmin", "delete_Button");
  const userPassword = GetTranslationData(
    "UIAdmin",
    "database_User_Pass_Label"
  );
  const mode = GetTranslationData("UIAdmin", "mode_Label");
  const themeDetails = GetTranslationData("UIAdmin", "Theme_Details_Label");
  const DatabaseCredentials = GetTranslationData("UIAdmin", " Database_Label");
  const razorpay = GetTranslationData(
    "UIAdmin",
    "razorpay Payment Gateway_label"
  );
  const key = GetTranslationData("UIAdmin", "key_placeholder");
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
  const modes = [
    { value: "Live", label: "Live" },
    { value: "Staging", label: "Staging" },
  ];
  const [additionalFields, setAdditionalFields] = useState([
    {
      fieldNameInput: "",
      fieldValue: "",
      mode: "",
    },
  ]);
  const [clientData, setClientData] = useState({
    name: "",
    number: "",
    email: "",
    status: "",
    id: props?.data?.id,
    userName: "string",
    password: "string",
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
    fieldNameInput: "",
    fieldValue: "",
    mode: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    email: "",
    status: "",
    color: "",
    lgogLink: "",
    dbLoginPwd: "",
    dbipAddress: "",
    stagingKey: "ds",
    stagingSecretKey: "ds",
    productionKey: "ds",
    productionSecretKey: "ds",
    theme: "",
    fieldNameInput: "",
    fieldValue: "",
    mode: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setClientData({
      name: props.data?.name || "",
      number: props.data?.number || "",
      id: props.data?.id,
      userName: "string",
      password: "string",
      email: props.data?.email || "",
      fieldNameInput: props.data?.fieldNameInput || "",
      fieldValue: props.data?.fieldValue || "",
      mode: props.data?.mode || "",
      dbipAddress: props.data?.dbipAddress || "",
      color: props.data?.color,
      lgogLink: props.data?.lgogLink || "",
      theme: props.data?.theme || "",
      stagingKey: props.data?.stagingKey || "sring",
      stagingSecretKey: props.data?.stagingSecretKey || "sring",
      productionKey: props.data?.productionKey || "sring",
      productionSecretKey: props.data?.productionSecretKey || "sring ",
      status: props.data?.status || "",
      dbLoginPwd: props.data?.dbLoginPwd || "",
      dbLoginId: props.data?.dbLoginId || "",
    });
    setErrors({
      name: "",
      number: "",
      email: "",
      status: "",
      color: "",
      lgogLink: "",
      dbipAddress: "",
      stagingKey: "",
      stagingSecretKey: "",
      productionKey: "",
      productionSecretKey: "",
      theme: "",
      fieldNameInput: "",
      fieldValue: "",
      mode: "",
    });
  }, [props.data]);

  const handleAddMoreData = (field, index, e) => {
    var data = [...additionalFields];
    data[index][field] = e.target.value;
    setAdditionalFields(data);
  };

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

  const [showDelete, setShowDelete] = useState(false);
  const handleAddMore = () => {
    setShowDelete(true);
    setAdditionalFields((prevFields) => [
      ...prevFields,
      {
        fieldNameInput: "",
        fieldValue: "",
        mode: "",
        showDelete: true, // Set showDelete to true for the newly added field
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
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
          clientData.paymentdetails = additionalFields;
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
        });
        setAdditionalFields([
          {
            fieldNameInput: "",
            fieldValue: "",
            mode: "",
          },
        ]);
      } else {
        setShowLoader(false);
        toast.error(clientMasterDetails.postMessage);
      }
    }
    if (showUpdate) {
      if (clientMasterDetails.postMessage === "Update Successfully.") {
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
          fieldNameInput: "",
          fieldValue: "",
          mode: "",
          id: "",
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
                    <div className="row">
                      <div className="col-sm-6 form-group mb-2">
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
                      <div className="col-sm-6 form-group ">
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
                      <div className="col-sm-6 form-group ">
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

                      <div className="col-sm-6 form-group mb-2">
                        <label htmlFor="status">
                          {status}
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          onChange={(e) => handleChange(e, "status")}
                          error={errors.status}
                          value={clientData.status || ""}
                          className="form-select"
                          options={statusoptions}
                        />
                      </div>
                      <h3 style={{ borderBottom: "1px solid #ededed" }}>
                        {themeDetails}{" "}
                      </h3>
                      <div className="col-sm-3 form-group mb-2">
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
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="status">
                          {theme}
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          onChange={(e) => handleChange(e, "theme")}
                          error={errors.theme}
                          value={clientData.theme || ""}
                          key={clientData.theme}
                          className="form-select"
                          options={options}
                        />
                      </div>
                      <div className="row mt-3">
                        <h3 style={{ borderBottom: "1px solid #ededed" }}>
                          {DatabaseCredentials}
                        </h3>

                        <div className="col-sm-4 form-group mb-2">
                          <h4>
                            {ipAddress} <span className="text-danger">*</span>
                          </h4>
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
                            placeholder={key}
                            onChange={(e) => handleChange(e, "dbipAddress")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <h4 htmlFor="contact-name">
                            {userId}
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${
                              errors.dbLoginId
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="username"
                            id="user-name"
                            value={clientData.dbLoginId}
                            error={errors.dbLoginId}
                            placeholder={key}
                            onChange={(e) => handleChange(e, "dbLoginId")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <h4 htmlFor="contact-name">
                            {userPassword}
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="password"
                            className={` ${
                              errors.dbLoginPwd
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="password"
                            id="password"
                            value={clientData.dbLoginPwd}
                            error={errors.dbLoginPwd}
                            placeholder={key}
                            onChange={(e) => handleChange(e, "dbLoginPwd")}
                          />
                        </div>
                      </div>

                      <div className="row mt-2">
                        <h3 style={{ borderBottom: "1px solid #ededed" }}>
                          {razorpay}
                        </h3>

                        {additionalFields.map((field, index) => (
                          <React.Fragment key={index}>
                            <div className="col-lg-3 mt-2">
                              <div className="row p-0">
                                <h4>
                                  {fieldName}
                                  <span className="text-danger">*</span>
                                </h4>
                                <div className="col-sm-12 form-group mb-2">
                                  <InputField
                                    type="text"
                                    className={` ${
                                      errors.fieldNameInput
                                        ? "border-danger"
                                        : "form-control"
                                    }`}
                                    name="fieldNameInput"
                                    id="fieldNameInput"
                                    placeholder={key}
                                    value={
                                      additionalFields[index].fieldNameInput
                                    }
                                    error={errors.fieldNameInput}
                                    onChange={(e) => {
                                      handleChange(e, "fieldNameInput");
                                      handleAddMoreData(
                                        "fieldNameInput",
                                        index,
                                        e
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-3 mt-2">
                              <div className="row p-0">
                                <h4>
                                  {fieldValue}{" "}
                                  <span className="text-danger">*</span>
                                </h4>
                                <div className="col-sm-12 form-group mb-2">
                                  <InputField
                                    type="text"
                                    className={` ${
                                      errors.fieldValue
                                        ? "border-danger"
                                        : "form-control"
                                    }`}
                                    name="fieldValue"
                                    id="production-key"
                                    placeholder={key}
                                    error={errors.fieldValue}
                                    value={additionalFields[index].fieldValue}
                                    onChange={(e) => {
                                      handleChange(e, "fieldValue");
                                      handleAddMoreData("fieldValue", index, e);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 mt-2">
                              <div className="row p-0">
                                <h4>
                                  {mode} <span className="text-danger">*</span>
                                </h4>
                                <div className="col-sm-12 form-group mb-2">
                                  <Dropdown
                                    type="text"
                                    className={` ${
                                      errors.mode
                                        ? "border-danger"
                                        : "form-select"
                                    }`}
                                    name="mode"
                                    id="mode"
                                    placeholder={key}
                                    value={additionalFields[index]?.mode}
                                    error={errors.mode}
                                    onChange={(e) => {
                                      handleChange(e, "mode");
                                      handleAddMoreData("mode", index, e);
                                    }}
                                    options={modes}
                                  />
                                </div>
                              </div>
                            </div>

                            {index < additionalFields.length - 1 && (
                              <div
                                className="col-lg-3 mt-4"
                                key={`delete-${index}`}
                              >
                                <div className="col-sm-12 form-group mb-7">
                                  <button
                                    className="btn btn-danger btn-sm float-right pad-aa mt-2"
                                    onClick={() => handleDelete(index)}
                                  >
                                    {delete_Button}
                                    <i className="fa fa-trash"></i>{" "}
                                  </button>
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                        <div className="col-lg-3 mt-4">
                          <div className="col-sm-12 form-group mb-7">
                            <button
                              className="btn btn-primary btn-sm float-right pad-aa mt-2"
                              onClick={() => handleAddMore()}
                            >
                              {add_More} <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 form-group mb-0 mt-2">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="btn btn-primary float-right pad-aa"
                        >
                          {props.data ? update : add}

                          <i className="fa fa-arrow-right"></i>
                        </button>
                        <ToastContainer />
                      </div>
                    </div>
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
