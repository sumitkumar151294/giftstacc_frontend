/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Loader from "../../Components/Loader/Loader";
import {
  onUpdateClientMasterSubmit,
  onPostClientMasterSubmit,
  onClientMasterSubmit,
  onPostClientMasterReset,
  onUpdateClientMasterReset,
} from "../../Store/Slices/clientMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import Button from "../../Components/Button/Button";
import {
  onClientPaymentSubmit,
  onPostClientPaymentReset,
  onPostClientPaymentSubmit,
  onUpdateClientPaymentSubmit,
} from "../../Store/Slices/clientPaymentDetailSlice";
const ClientMaster = ({ data, clientPayData, setdata }) => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const clientMasterDetails = useSelector((state) => state.clientMasterReducer);
  const getClientPaymentdata = useSelector(
    (state) => state.clientPaymentReducer
  );
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
  const fieldNameNotEmpty = GetTranslationData("UIAdmin", "fieldNameNotEmpty");
  const fieldValueNotEmpty = GetTranslationData(
    "UIAdmin",
    "fieldValueNotEmpty"
  );
  const userPassword = GetTranslationData(
    "UIAdmin",
    "database_User_Pass_Label"
  );
  const db_name = GetTranslationData("UIAdmin", "db_name");
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
  const active = GetTranslationData("UIAdmin", "active");
  const nonActive = GetTranslationData("UIAdmin", "nonActive");
  const platformDomainUrl = GetTranslationData(
    "UIAdmin",
    "platform_Domain_Url"
  );
  const dc_ipAddress = GetTranslationData("UIAdmin", "ip_address");
  const dc_userId = GetTranslationData("UIAdmin", "user_id");
  const dc_userPassword = GetTranslationData("UIAdmin", "user_password");
  const dc_name = GetTranslationData("UIAdmin", "name");
  const dc_value = GetTranslationData("UIAdmin", "value");

  const statusoptions = [
    { value: true, label: active },
    { value: false, label: nonActive },
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
      clientId: "",
      resourceValue: "",
      mode: "",
      id: "",
    },
  ]);
  const [additionalFieldsError, setAdditionalFieldsError] = useState([
    {
      resourceKey: "",
      clientId: "",
      resourceValue: "",
      mode: "",
      id: data?.id,
    },
  ]);
  const [clientData, setClientData] = useState({
    name: "",
    number: "",
    email: "",
    enabled: "",
    color: "",
    logoUrl: "",
    themes: "",
    dbLoginId: "",
    dbLoginPwd: "",
    dbIpAddress: "",
    dbName: "",
    platformDomainUrl: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    email: "",
    enabled: "",
    color: "",
    logoUrl: "",
    dbLoginPwd: "",
    dbIpAddress: "",
    themes: "",
    dbName: "",
    platformDomainUrl: "",
  });
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const selectedData = Array.isArray(clientPayData)
      ? clientPayData?.find((item) => item.clientId === data?.id)
      : null;
    setClientData({
      name: data?.name || "",
      number: data?.number || "",
      id: data?.id,
      email: data?.email || "",
      dbIpAddress: data?.dbIpAddress || "",
      color: data?.color || "#000",
      logoUrl: data?.logoUrl || "",
      themes: data?.themes || "",
      enabled: data?.enabled !== undefined ? data.enabled : "",
      dbLoginPwd: data?.dbLoginPwd || "",
      dbLoginId: data?.dbLoginId || "",
      dbName: data?.dbName || "",
      platformDomainUrl: data?.platformDomainUrl,
    });
    setAdditionalFields([
      {
        resourceKey: selectedData?.resourceKey || "",
        clientId: selectedData?.clientId || "",
        resourceValue: selectedData?.resourceValue || "",
        mode: selectedData?.mode || "",
        id: selectedData?.id,
      },
    ]);
    setErrors({
      name: "",
      number: "",
      email: "",
      enabled: "",
      color: "",
      logoUrl: "",
      dbIpAddress: "",
      dbName: "",
      themes: "",
      platformDomainUrl: "",
    });
  }, [data]);

  const resetFields = {
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
    dbName: "",
    platformDomainUrl: "",
  };
  const resetAdditionalFields = [
    {
      resourceKey: "",
      clientId: "",
      resourceValue: "",
      mode: "",
      id: "",
    },
  ];
  const handleAddMoreData = (field, index, e) => {
    setAdditionalFields((prevFields) => {
      const newData = [...prevFields];
      newData[index] = { ...newData[index], [field]: e.target.value };
      return newData;
    });
    setAdditionalFieldsError((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = { ...newErrors[index], [field]: "" };
      return newErrors;
    });
  };

  const handleChange = (e, fieldName) => {
    let values = e.target.value;
    if (fieldName === "enabled") { debugger
      if (values === "true" || values === "false") {
        values = values === "true";
      } else {
        values = "";
      }
    }

    setClientData({
      ...clientData,
      [fieldName]: values,
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
    else if (fieldName === "platformDomainUrl") {
      const domainRegex = /^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6})(\/[\w .-]*)*\/?$/;
      const isValidDomain = domainRegex.test(e.target.value);
      setErrors({
        ...errors,
        [fieldName]: isValidDomain ? "" : " ",
      });
    }
    else if (fieldName === "dbIpAddress") {
      const ipRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
      const isValidIp = ipRegex.test(e.target.value);
      setErrors({
        ...errors,
        [fieldName]: isValidIp ? "" : "Invalid IP address",
      });
    }
    else if (fieldName === "logoUrl") {
      const domainRegex = /^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6})(\/[\w .-]*)*\/?$/;
      const isValidDomain = domainRegex.test(e.target.value);
      setErrors({
        ...errors,
        [fieldName]: isValidDomain ? "" : " ",
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
  const handleAddMore = (e) => {
    setAdditionalFields((prevFields) => [
      ...prevFields,
      {
        resourceKey: "",
        resourceValue: "",
        mode: "",
        // showDelete: true, // Set showDelete to true for the newly added field
      },
    ]);
    setAdditionalFieldsError((prevFields) => [
      ...prevFields,
      {
        resourceKey: "",
        resourceValue: "",
        mode: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };
  const handleSubmit = (e) => {
    debugger
    e.preventDefault();
    let isValid = true;

    const newErrors = { ...errors };
    for (const key in clientData) {
      if (clientData[key] === "" || clientData[key] === "Select") {
        newErrors[key] = " ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    const newAdditionalFieldsError = [...additionalFieldsError];
    additionalFields?.forEach((field, index) => {
      if (field.resourceKey === "") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].resourceKey = fieldNameNotEmpty;
          return newAdditionalFieldsError;
        });
        isValid = false;
      }

      if (field.resourceKey === "") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].resourceValue = fieldValueNotEmpty;
          return newAdditionalFieldsError;
        });

        isValid = false;
      }
    });
    setAdditionalFieldsError(newAdditionalFieldsError);
    // Validate required fields
    const requiredFields = [
      "name",
      "number",
      "email",
      "enabled",
      "color",
      "logoUrl",
      "dbIpAddress",
      "themes",
      "dbLoginId",
      "dbLoginPwd",
      "dbName",
      "platformDomainUrl",
    ];
    requiredFields.forEach((field) => {
      if (field === "enabled") {
        if (clientData[field] === "") {
          newErrors[field] = " ";
          isValid = false;
        }
      } else if (!clientData[field]) {
        newErrors[field] = " ";
        isValid = false;
      } else if (clientData[field] === "platformDomainUrl") {
        if (clientData[field].length > 250) {
          newErrors[field] = "Length must be 250 or fewer";
          isValid = false;
        }
      } else {
        if (clientData[field].length > 100) {
          newErrors[field] = "Length must be 100 or fewer";
          isValid = false;
        }
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
      if (field.resourceKey === "") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].resourceKey =
            " ";
          return newAdditionalFieldsError;
        });
        isValid = false;
      } else if (field.resourceKey.length > 250) {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].resourceKey =
            "Length must be 250 or fewer";
          return newAdditionalFieldsError;
        });
        isValid = false;
      }
      if (field.resourceValue === "") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].resourceValue =
            " ";
          return newAdditionalFieldsError;
        });
        isValid = false;
      } else if (field.resourceValue.length > 250) {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].resourceValue =
            "Length must be 250 or fewer";
          return newAdditionalFieldsError;
        });
        isValid = false;
      }
      if (field.mode === "" || field.mode === "Select") {
        setAdditionalFieldsError((prevErrors) => {
          const newAdditionalFieldsError = [...prevErrors];
          newAdditionalFieldsError[index].mode = " ";
          return newAdditionalFieldsError;
        });
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      if (!data) {
        try {
          setShowLoader(true);
          dispatch(onPostClientMasterSubmit(clientData));
        } catch (error) { }
      } else if (data) {
        try {
          setShowLoader(true);
          dispatch(onUpdateClientMasterSubmit(clientData));
          const updateAdditionalFIels = () => {
            let tempAdditionField = [...additionalFields];
            const additionalData = tempAdditionField.map((item) => ({
              ...item,
              clientId: item.clientId,
              resourceKey: item.resourceKey,
              resourceValue: item.resourceValue,
              mode: item.mode,
              id: item.id,
            }));
            return additionalData;
          };
          dispatch(onUpdateClientPaymentSubmit(updateAdditionalFIels()));
        } catch (error) { }
      }
    }
  };

  // To call the API after intial API call
  useEffect(() => {
    if (
      clientMasterDetails?.postClientData?.length > 0 &&
      !clientMasterDetails?.postClientLoading
    ) {
      const paymentData = additionalFields.map((field) => ({
        clientId: clientMasterDetails?.postClientData?.[0]?.id,
        resourceKey: field.resourceKey,
        resourceValue: field.resourceValue,
        mode: field.mode,
      }));
      dispatch(onPostClientMasterReset());
      dispatch(onPostClientPaymentSubmit(paymentData));
    }
  }, [clientMasterDetails]);

  useEffect(() => {
    if (getClientPaymentdata.post_status_code === "201") {
      setShowLoader(false);
      toast.success(getClientPaymentdata.postMessage);
      dispatch(onPostClientPaymentReset());
      dispatch(onClientMasterSubmit());
      dispatch(onClientPaymentSubmit());
      setClientData(resetFields);
      setAdditionalFields(resetAdditionalFields);
    }
  }, [getClientPaymentdata]);

  useEffect(() => {
    if (clientMasterDetails.update_status_code === "201") {
      setShowLoader(false);
      toast.success(clientMasterDetails?.updateMessage);
      dispatch(onClientMasterSubmit());
      dispatch(onClientPaymentSubmit());
      dispatch(onUpdateClientMasterReset());
      setClientData(resetFields);
      setdata("");
      setAdditionalFields(resetAdditionalFields);
    }
  }, [clientMasterDetails]);

  useEffect(() => {
    if (clientMasterDetails?.post_status_code === "500") {
      setShowLoader(false);
      toast.error(clientMasterDetails.postMessage);
      dispatch(onPostClientMasterReset());
      setClientData(resetFields);
      setAdditionalFields(resetAdditionalFields);
    }
  }, [clientMasterDetails]);

  useEffect(() => {
    dispatch(onPostClientMasterReset());
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
                {showLoader ? (
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
                          placeholder="Enter your contact name"
                          name="contactName"
                          id="contact-name"
                          error={errors.name}
                          value={clientData.name}
                          onChange={(e) => handleChange(e, "name")}
                        />
                        <p className="text-danger">{errors.name}</p>
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
                          placeholder="Enter your contact number"

                          name="contactNumber"
                          id="contact-number"
                          value={clientData.number}
                          error={errors.number}
                          maxLength={10}
                          onChange={(e) => handleChange(e, "number")}
                        />
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
                          placeholder="Enter your email"

                          name="contactEmail"
                          id="contact-email"
                          value={clientData.email}
                          error={errors.email}
                          onChange={(e) => handleChange(e, "email")}
                        />
                        {<p className="text-danger">{errors.email}</p>}
                      </div>
                      <div className="col-sm-6 form-group">
                        <label htmlFor="platformDomainUrl">
                          {platformDomainUrl}
                          <span className="text-danger">*</span>
                        </label>
                        <InputField
                          type="text"
                          className={` ${errors.platformDomainUrl ? "border-danger" : "form-control"}`}
                          name="platformDomainUrl"
                          id="contact-platformDomainUrl"
                          placeholder="Platform Domain URL"
                          value={clientData.platformDomainUrl}
                          error={errors.platformDomainUrl}
                          onChange={(e) => handleChange(e, "platformDomainUrl")}
                        />
                        <p className="text-danger">{errors.platformDomainUrl}</p>
                      </div>
                      <div className="col-sm-6 form-group mb-2">
                        <label htmlFor="status">
                          {status}
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          onChange={(e) => handleChange(e, "enabled")}
                          error={errors.enabled}
                          value={
                            clientData.enabled !== undefined
                              ? clientData.enabled
                              : ""
                          }
                          className="form-select"
                          options={statusoptions}
                        />
                      </div>
                      <h3 className="mt-3 border">{themeDetails} </h3>
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
                          placeholder="Logo Url"

                          id="logo"
                          error={errors.logoUrl}
                          value={clientData.logoUrl}
                          onChange={(e) => handleChange(e, "logoUrl")}
                        />
                        <p className="text-danger">{errors.logoUrl}</p>
                      </div>
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="status">
                          {theme}
                          <span className="text-danger">*</span>
                        </label>
                        <Dropdown
                          onChange={(e) => handleChange(e, "themes")}
                          error={errors.themes}
                          placeholder="Themes"

                          value={clientData.themes || ""}
                          key={clientData.themes}
                          className="form-select"
                          options={options}
                        />
                      </div>
                      <div className="row mt-3">
                        <h3 className="border">{DatabaseCredentials}</h3>

                        <div className="col-sm-3 form-group mb-2">
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
                            placeholder={dc_ipAddress}
                            onChange={(e) => handleChange(e, "dbIpAddress")}
                          />
                          <p className="text-danger">{errors.dbIpAddress}</p>
                        </div>
                        <div className="col-sm-3 form-group mb-2">
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
                            placeholder={dc_userId}
                            onChange={(e) => handleChange(e, "dbLoginId")}
                          />
                          <p className="text-danger">{errors.dbLoginId}</p>
                        </div>
                        <div className="col-sm-3 form-group mb-2">
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
                            placeholder={dc_userPassword}
                            onChange={(e) => handleChange(e, "dbLoginPwd")}
                          />
                          <p className="text-danger">{errors.dbLoginPwd}</p>
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <h4 htmlFor="contact-name">
                            {db_name}
                            <span className="text-danger">*</span>
                          </h4>
                          <InputField
                            type="text"
                            className={` ${errors.dbLoginPwd
                              ? "border-danger"
                              : "form-control"
                              }`}
                            name="dbName"
                            id="dbName"
                            value={clientData.dbName}
                            error={errors.dbName}
                            placeholder={dc_name}
                            onChange={(e) => handleChange(e, "dbName")}
                          />
                          <p className="text-danger">{errors.dbName}</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <h3 className="border">{razorpay}</h3>

                        {Array.isArray(additionalFields) &&
                          additionalFields.map((field, index) => (
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
                                      className={` ${additionalFieldsError[index]
                                        ?.resourceKey
                                        ? "border-danger"
                                        : "form-control"
                                        }`}
                                      name="resourceKey"
                                      id="resourceKey"
                                      placeholder={dc_name}
                                      value={
                                        additionalFields[index].resourceKey
                                      }
                                      onChange={(e) => {
                                        handleAddMoreData(
                                          "resourceKey",
                                          index,
                                          e
                                        );
                                      }}
                                    />
                                    <p className="text-danger">
                                      {additionalFieldsError[index].resourceKey}
                                    </p>
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
                                      className={` ${additionalFieldsError[index]
                                        ?.resourceValue
                                        ? "border-danger"
                                        : "form-control"
                                        }`}
                                      name="resourceValue"
                                      id="production-key"
                                      placeholder={dc_value}
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
                                    <p className="text-danger">
                                      {
                                        additionalFieldsError[index]
                                          .resourceValue
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-2">
                                <div className="row p-0">
                                  <h4>
                                    {mode}{" "}
                                    <span className="text-danger">*</span>
                                  </h4>
                                  <div className="col-sm-12 form-group mb-2">
                                    <Dropdown
                                      type="text"
                                      className={` ${additionalFieldsError[index]?.mode
                                        ? "border-danger"
                                        : "form-select"
                                        }`}
                                      name="mode"
                                      id="mode"
                                      placeholder={key}
                                      value={additionalFields[index]?.mode}
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
                                  key={delete -`${index}`}
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
                          text={data ? update : add}
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
/* eslint-enable react-hooks/exhaustive-deps */