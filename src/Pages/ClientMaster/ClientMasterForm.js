import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Loader from "../../Components/Loader/Loader";
import {
  onUpdateClientMasterSubmit,
  onPostClientMasterSubmit,
  onClientMasterSubmit,
  onPostClientMasterReset,
} from "../../Store/Slices/clientMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import Button from "../../Components/Button/Button";
import { onPostClientPaymentSubmit, onUpdateClientPaymentSubmit } from "../../Store/Slices/clientPaymentDetailSlice";
const ClientMaster = (props) => {
  const dispatch = useDispatch();
  const [showLoder, setShowLoader] = useState(false);
  const clientMasterDetails = useSelector((state) => state.clientMasterReducer);
  const getClientPaymentdata = useSelector((state) => state.clientPaymentReducer);
  const clientId = clientMasterDetails?.postClientData?.[0]?.id;
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
  const platformDomainUrl = GetTranslationData(
    "UIAdmin",
    "platform_Domain_Url"
  );

  const statusoptions = [
    { value: true, label: "Active" },
    { value: false, label: "Non-active" },
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
      resourceKey: "",
      clientId: clientId,
      resourceValue: "",
      mode: "",
      id:""
    },
  ]);
  const [clientData, setClientData] = useState({
    name: "",
    number: "",
    email: "",
    enabled: true,
    color: "",
    logoUrl: "",
    themes: "",
    dbLoginId: "",
    dbLoginPwd: "",
    dbIpAddress: "",
    platformDomainUrl: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    email: "",
    status: "",
    color: "",
    logoUrl: "",
    dbLoginPwd: "",
    dbIpAddress: "",
    themes: "",
    platformDomainUrl: "",
  });
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const selectedData = Array.isArray( props.clientPayData) && props.clientPayData?.find(item => item.clientId === props.data?.id);
     setClientData({
      name: props.data?.name || "",
      number: props.data?.number || "",
      id: props.data?.id,
      email: props.data?.email || "",
      dbIpAddress: props.data?.dbIpAddress || "",
      color: props.data?.color,
      logoUrl: props.data?.logoUrl || "",
      themes: props.data?.themes || "",
      status: props.data?.enabled || "",
      dbLoginPwd: props.data?.dbLoginPwd || "",
      dbLoginId: props.data?.dbLoginId || "",
      platformDomainUrl: props?.data?.platformDomainUrl,
    });
    setAdditionalFields([
      {
        resourceKey: selectedData?.resourceKey || "",
        clientId: selectedData?.clientId || clientId,
        resourceValue: selectedData?.resourceValue || "",
        mode: selectedData?.mode || "",
        id: selectedData?.id
      }
    ]
      )
    setErrors({
      name: "",
      number: "",
      email: "",
      status: "",
      color: "",
      logoUrl: "",
      dbIpAddress: "",
      themes: "",
      platformDomainUrl: "",
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

  const handleAddMore = () => {
    setAdditionalFields((prevFields) => [
      ...prevFields,
      {
        resourceKey: "",
        resourceValue: "",
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
    const newErrors = {};

    // Validate required fields
    const requiredFields = [
      "name",
      "number",
      "email",
      "status",
      "color",
      "logoUrl",
      "dbIpAddress",
      "themes",
      "dbLoginId",
      "dbLoginPwd",
      "platformDomainUrl",
    ];
    requiredFields.forEach((field) => {
      if (!clientData[field]) {
        newErrors[field] = " "; // Set your required field message
        isValid = false;
      }
    });

    // Email validation
    if (
      clientData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientData.email)
    ) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Number validation
    if (clientData.number && !/^\d{10}$/.test(clientData.number)) {
      newErrors.number = "Number must be 10 digits";
      isValid = false;
    }

    // Validate additionalFields
    additionalFields.forEach((field, index) => {
      if (!field.resourceKey || !field.resourceValue || !field.mode) {
        newErrors[`additionalField-${index}`] = "All fields are required";
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      if (!props.data) {
        try {
          setShowLoader(true);
          dispatch(onPostClientMasterSubmit(clientData));
        } catch (error) {
        } finally {
          dispatch(onClientMasterSubmit());
        }
      } else if (props.data) {
        try {
          setShowLoader(true);
          dispatch(onUpdateClientMasterSubmit(clientData));

          const paymentData = additionalFields.map((field) => ({
            clientId: field.clientId,
            resourceKey: field.resourceKey,
            resourceValue: field.resourceValue,
            mode: field.mode,
            id:field?.id
          }));
          dispatch(onUpdateClientPaymentSubmit(paymentData));
  
        } catch (error) {
        }
      }
    }
  };

  // To call the API after intial API call
  useEffect(() => {
    if (clientMasterDetails?.postClientData?.length > 0 && !clientMasterDetails?.postClientLoading) {
      const paymentData = additionalFields.map((field) => ({
        clientId: clientId,
        resourceKey: field.resourceKey,
        resourceValue: field.resourceValue,
        mode: field.mode,
      }));
        // dispatch(onPostClientMasterReset())
        dispatch(onPostClientPaymentSubmit(paymentData));
      toast.success(getClientPaymentdata?.postMessage);
      // Reset form fields
      setClientData({
        name: "",
        number: "",
        email: "",
        enabled: true,
        color: "",
        logoUrl: "",
        themes: "",
        dbLoginId: "",
        dbLoginPwd: "",
        dbIpAddress: "",
        platformDomainUrl: "",
      });
      // Reset additional fields if needed
      setAdditionalFields([
        {
          resourceKey: "",
          clientId: clientId,
          resourceValue: "",
          mode: "",
        },
      ]);
    }
    setShowLoader(false);
  }, [clientMasterDetails])

  useEffect(() => {
    dispatch(onPostClientMasterReset())
  }, []);

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
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm-6 form-group mb-2">
                        <label htmlFor="contact-name">
                          {contactName}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${errors.name ? "border-danger" : "form-control"
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
                          className={` ${errors.number ? "border-danger" : "form-control"
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
                          className={` ${errors.email ? "border-danger" : "form-control"
                            }`}
                          name="contactEmail"
                          id="contact-email"
                          value={clientData.email}
                          error={errors.email}
                          onChange={(e) => handleChange(e, "email")}
                        />
                        {<p className="text-danger">{errors.email}</p>}
                      </div>
                      <div className="col-sm-6 form-group ">
                        <label htmlFor="platformDomainUrl">
                          {platformDomainUrl}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="platformDomainUrl"
                          className={` ${errors.platformDomainUrl
                            ? "border-danger"
                            : "form-control"
                            }`}
                          name="contactplatformDomainUrl"
                          id="contact-platformDomainUrl"
                          value={clientData.platformDomainUrl}
                          error={errors.platformDomainUrl}
                          onChange={(e) => handleChange(e, "platformDomainUrl")}
                        />
                        {
                          <p className="text-danger">
                            {errors.platformDomainUrl}
                          </p>
                        }
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
                          className={"form-control"}
                          name="color"
                          id="color"
                          // error={errors.color}
                          value={clientData.color || "#000000"}
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
                          className={` ${errors.logoUrl ? "border-danger" : "form-control"
                            }`}
                          name="logo"
                          id="logo"
                          error={errors.logoUrl}
                          value={clientData.logoUrl}
                          onChange={(e) => handleChange(e, "logoUrl")}
                        />
                      </div>
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="status">
                          {theme}
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          onChange={(e) => handleChange(e, "themes")}
                          error={errors.themes}
                          value={clientData.themes || ""}
                          key={clientData.themes}
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
                            className={` ${errors.dbIpAddress
                              ? "border-danger"
                              : "form-control"
                              }`}
                            name="ipAddress"
                            id="ipAddress"
                            value={clientData.dbIpAddress}
                            error={errors.dbIpAddress}
                            placeholder={key}
                            onChange={(e) => handleChange(e, "dbIpAddress")}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <h4 htmlFor="contact-name">
                            {userId}
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${errors.dbLoginId
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
                            className={` ${errors.dbLoginPwd
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
                                    className={` ${errors.resourceKey
                                      ? "border-danger"
                                      : "form-control"
                                      }`}
                                    name="resourceKey"
                                    id="resourceKey"
                                    placeholder={key}
                                    value={additionalFields[index].resourceKey}
                                    error={errors.resourceKey}
                                    onChange={(e) => {
                                      handleAddMoreData(
                                        "resourceKey",
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
                                    className={` ${errors.resourceValue
                                      ? "border-danger"
                                      : "form-control"
                                      }`}
                                    name="resourceValue"
                                    id="production-key"
                                    placeholder={key}
                                    error={errors.resourceValue}
                                    value={
                                      additionalFields[index].resourceValue
                                    }
                                    onChange={(e) => {
                                      handleAddMoreData(
                                        "resourceValue",
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
                                  {mode} <span className="text-danger">*</span>
                                </h4>
                                <div className="col-sm-12 form-group mb-2">
                                  <Dropdown
                                    type="text"
                                    className={` ${errors.mode
                                      ? "border-danger"
                                      : "form-select"
                                      }`}
                                    name="mode"
                                    id="mode"
                                    placeholder={key}
                                    value={additionalFields[index]?.mode}
                                    error={errors.mode}
                                    onChange={(e) => {
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
                                  <Button
                                    className="btn btn-danger btn-sm float-right pad-aa mt-2"
                                    text={delete_Button}
                                    icon={"fa fa-trash"}
                                    onClick={() => handleDelete(index)}
                                  />
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                        <div className="col-lg-3 mt-4">
                          <div className="col-sm-12 form-group mb-7">
                            <Button
                              className="btn btn-primary btn-sm float-right pad-aa mt-2"
                              text={add_More}
                              icon={"fa fa-plus"}
                              onClick={() => handleAddMore()}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 form-group mb-0 mt-2">
                        <Button
                          text={props.data ? update : add}
                          icon={"fa fa-arrow-right"}
                          onClick={handleSubmit}
                          className="btn btn-primary btn-sm float-right p-btn mb-5 mt-2"
                        />
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
