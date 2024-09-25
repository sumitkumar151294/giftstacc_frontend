/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Button from "../../Components/Button/Button";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import {
  onClientConfigurationSubmit,
  onPostClientConfigurationReset,
  onPostClientConfigurationSubmit,
  onUpdateClientConfigurationReset,
  onUpdateClientConfigurationSubmit,
} from "../../Store/Slices/ClientAdmin/clientConfigurationSlice";
import { GetClientId } from "../../Common/commonSlice/CommonSlice";

const ClientConfiguration = ({
  prefilledData,
  setPrefilledData,
  isDelete,
  setIsDelete
}) => {
  const dispatch = useDispatch();
  const getClientId = GetClientId();
  // to get data from translation
  const update = GetTranslationData("UIAdmin", "update_label");
  const active = GetTranslationData("UIClient", "active_option");
  const non_active = GetTranslationData("UIClient", "non_active_option");
  const submitTranslation = GetTranslationData("UIAdmin", "submit_label");
  const requiredLevel = GetTranslationData("UIAdmin", "required_label");
  // to get data from redux store
  const getClientConfiguration = useSelector(
    (state) => state.clientConfigurationReducer
  );
  // initial state of input fields
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired: "",
    points: "",
    price: "",
  });
  // reset input fields for form
  const resetField = {
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired: "",
    points: "",
    price: "",
  };
  // state for error handling
  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired: "",
    points: "",
    price: "",
  });
  // options for status
  const statusoptions = [
    { value: true, label: active },
    { value: false, label: non_active },
  ];
  // to handle edit
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (prefilledData) {
      setFormData({
        email: prefilledData.email || "",
        phoneNumber: prefilledData.phoneNumber || "",
        cartInfo: prefilledData.cartInfo || "",
        cartInfoMessage: prefilledData.cartInfoMessage || "",
        consentRequired: prefilledData.consentRequired || "",
        consentMessage: prefilledData.consentMessage || "",
        points: prefilledData.points || "",
        price:prefilledData.price || ""
      });

      setErrors({
        email: "",
        phoneNumber: "",
        cartInfoMessage: "",
        cartInfo: "",
        consentMessage: "",
        consentRequired: "",
        points: "",
      });
    }
  }, [prefilledData]);
  // to handle input change
  const handleChange = (e, fieldName) => {
    let value = e.target.value;

    setFormData({
      ...formData,
      [fieldName]: value,
    });

    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };
  // to handle dropdown
  const handleDropdownChange = (value, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };
  // to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    for (const key in formData) {
      if (formData[key] === "" || formData[key] === undefined) {
        newErrors[key] = "This field is required";
        isValid = false;
      } else if (formData[key].length > 250) {
        newErrors[key] = "Length must be 250 characters or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    if (isValid) {
      if (prefilledData) {
        dispatch(
          onUpdateClientConfigurationSubmit({
            ...formData,
            id: prefilledData?.id,
            clientId: prefilledData?.clientId,
            price: parseInt(formData?.price),
            points: parseInt(formData?.points),
            cartInfo: formData?.cartInfo === "true" ? true : false,
            consentMessage: formData?.consentMessage === "true" ? true : false,
          })
        );
      } else {
        const postData = {
          ...formData,
          clientId: getClientId,
          points: parseInt(formData?.points),
          price: parseInt(formData?.price),
          cartInfo: formData?.cartInfo === "true" ? true : false,
          consentMessage: formData?.consentMessage === "true" ? true : false,
        };
        dispatch(onPostClientConfigurationSubmit(postData));
      }
      setFormData(resetField);
    }
  };
  // to handle toast notifications based on post and update status code
  useEffect(() => {
      if (getClientConfiguration?.update_status_code === "201") {
        if (isDelete ){
          toast.success(getClientConfiguration.updateMessage);
          dispatch(onUpdateClientConfigurationReset());
          setIsDelete(false);
          dispatch(onClientConfigurationSubmit());
        }
        else{
        toast.success(getClientConfiguration.updateMessage);
        setFormData(resetField);
        dispatch(onUpdateClientConfigurationReset());
        setPrefilledData("");
        dispatch(onClientConfigurationSubmit());
        }
      }
      else if (getClientConfiguration?.post_status_code === 200) {
        toast.success(getClientConfiguration.postMessage);
        setFormData(resetField);
        dispatch(onClientConfigurationSubmit());
        dispatch(onPostClientConfigurationReset());
      } else if (getClientConfiguration?.status_code) {
        toast.error(getClientConfiguration?.message?.data?.ErrorMessage);
        dispatch(onPostClientConfigurationReset());
      }
  }, [getClientConfiguration?.post_status_code,getClientConfiguration?.update_status_code]);
  // to fetch the data on mount
  useEffect(() => {
    dispatch(onClientConfigurationSubmit());
  }, []);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Client Configuration</h4>
              </div>
              <div className="card-body pt-2 ml-6  mb-4  ">
                {(getClientConfiguration?.postClientLoading) || (!isDelete && getClientConfiguration?.updateLoading) ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="email">
                            Email <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="email"
                            className={`form-control ${
                              errors.email ? "border-danger" : ""
                            }`}
                            id="email"
                            value={formData.email}
                            placeholder="Enter email"
                            onChange={(e) => handleChange(e, "email")}
                          />
                          {<p className="text-danger">{errors.email}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="phone">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            className={`form-control ${
                              errors.phoneNumber ? "border-danger" : ""
                            }`}
                            id="phone"
                            value={formData.phoneNumber}
                            placeholder="Enter phone number"
                            onChange={(e) => handleChange(e, "phoneNumber")}
                          />
                          {<p className="text-danger">{errors.phone}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="pricePerPoint">
                            Price <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            className={`form-control ${
                              errors.price ? "border-danger" : ""
                            }`}
                            id="pricePerPoint"
                            value={formData.price}
                            placeholder="Enter price per point"
                            onChange={(e) => handleChange(e, "price")}
                          />
                          {<p className="text-danger">{errors.price}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="pricePerPoint">
                            Points <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            className={`form-control ${
                              errors.points ? "border-danger" : ""
                            }`}
                            id="pricePerPoint"
                            value={formData.points}
                            placeholder="Enter price per point"
                            onChange={(e) => handleChange(e, "points")}
                          />
                          {<p className="text-danger">{errors.points}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayItemInfoMessage">
                            Display Item Info Message{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${
                              errors.cartInfoMessage ? "border-danger" : ""
                            }`}
                            id="displayItemInfoMessage"
                            value={formData.cartInfoMessage}
                            placeholder="Enter display item info message"
                            onChange={(e) => handleChange(e, "cartInfoMessage")}
                          />
                          {
                            <p className="text-danger">
                              {errors.cartInfoMessage}
                            </p>
                          }
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayItemInfo">
                            Display Item Info Status{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            className={
                              errors.cartInfo
                                ? "border-danger-select"
                                : "form-select"
                            }
                            id="displayItemInfo"
                            value={formData?.cartInfo}
                            onChange={(event) =>
                              handleDropdownChange(
                                event.target.value,
                                "cartInfo"
                              )
                            }
                            options={statusoptions}
                          />
                          {<p className="text-danger">{errors.cartInfo}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayConsonantMessage">
                            Display Consonant{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${
                              errors.consentMessage ? "border-danger" : ""
                            }`}
                            id="displayConsonantMessage"
                            value={formData.consentMessage}
                            placeholder="Enter display consonant message"
                            onChange={(e) => handleChange(e, "consentMessage")}
                          />
                          {
                            <p className="text-danger">
                              {errors.consentMessage}
                            </p>
                          }
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayConsonant">
                            Display Consonant Status{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            className={
                              errors.consentRequired
                                ? "border-danger-select"
                                : "form-select"
                            }
                            id="displayConsonant"
                            value={formData?.consentRequired}
                            onChange={(event) =>
                              handleDropdownChange(
                                event.target.value,
                                "consentRequired"
                              )
                            }
                            options={statusoptions}
                          />

                          {
                            <p className="text-danger">
                              {errors.consentRequired}
                            </p>
                          }
                        </div>
                      </div>
                      <div className="col-sm-12 form-group mb-0 mt-2">
                        <Button
                          type="submit"
                          className="btn btn-primary float-right pad-aa"
                          icon={"fa fa-arrow-right"}
                          text={prefilledData ? update : submitTranslation}
                        ></Button>
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

export default ClientConfiguration;
