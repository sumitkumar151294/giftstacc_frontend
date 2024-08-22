/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Button from "../../Components/Button/Button";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { onClientConfiqurationSubmit, onPostClientConfiqurationReset, onPostClientConfiqurationSubmit, onUpdateClientConfiqurationReset, onUpdateClientConfiqurationSubmit } from "../../Store/Slices/clientConfiqurationSlice";
import { GetClientId } from "../../Common/commonSlice/CommonSlice";

const ClientConfiguration = ({ prefilledData, setPrefilledData, isDelete, setIsDelete }) => {
  const dispatch = useDispatch();
  const update = GetTranslationData("UIAdmin", "update_label");
  const submitTranslation = GetTranslationData("UIAdmin", "submit_label");
  const clientConfigurationSliceReducer = useSelector((state) => state.clientConfigurationSliceReducer);
  const [clientConfiguration, setClientConfiguration] = useState({
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired:"",
    price: "",
    points:""

  });

  const resetField = {
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired: "",
    price: "",
    points:""

  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (prefilledData) {
      setClientConfiguration({
        email: prefilledData.email || "",
        phoneNumber: prefilledData.phoneNumber || "",
        cartInfo: prefilledData.cartInfo || "",
        cartInfoMessage: prefilledData.cartInfoMessage || "",
        consentRequired: prefilledData.consentRequired || "",
        consentMessage: prefilledData.consentMessage || "",
        price: prefilledData.price || "",
        points: prefilledData.points || "",
      });

      setErrors({
        email: "",
        phoneNumber: "",
        cartInfoMessage: "",
        cartInfo: "",
        consentMessage: "",
        consentRequired: "",
        price: "",
        points:""
      });
    }
  }, [prefilledData]);

  useEffect(() => {
    debugger
    if (clientConfigurationSliceReducer.post_status_code === 200 ) {
      toast.success(clientConfigurationSliceReducer.postMessage);
      setClientConfiguration(resetField);
      dispatch(onPostClientConfiqurationReset());
      dispatch(onClientConfiqurationSubmit()) 
    } else if (clientConfigurationSliceReducer.update_status_code === "201") {
      if (isDelete) {
        debugger
        toast.success(clientConfigurationSliceReducer.updateMessage);
        dispatch(onUpdateClientConfiqurationReset());
        setPrefilledData("");
        setIsDelete(false);
        dispatch(onClientConfiqurationSubmit())
      } else {
        debugger
        toast.success(clientConfigurationSliceReducer.updateMessage);
        dispatch(onUpdateClientConfiqurationReset());
        setPrefilledData("");
        setClientConfiguration(resetField);
        setIsDelete(false);
        dispatch(onClientConfiqurationSubmit())
      }
    }
  }, [clientConfigurationSliceReducer]);

  // useEffect(() => {
  //   debugger
  //   if (clientConfigurationSliceReducer.post_status_code === "201",clientConfigurationSliceReducer.post_status_code === "200") {
  //     toast.success(clientConfigurationSliceReducer.postMessage);
  //     setClientConfiguration(resetField);
  //     dispatch(onClientConfiqurationSubmit())
  //   } else if (clientConfigurationSliceReducer?.status_code === "500") {
  //     toast.error(clientConfigurationSliceReducer.postMessage);
  //   } else if (clientConfigurationSliceReducer.status_code === 404) {
  //     toast.error(clientConfigurationSliceReducer.getmessage);
  //   }
  // }, [clientConfigurationSliceReducer]);

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired: "",
    price: "",
    points:""
  });

  const statusOptions = [
    { value: true, label: "True" },
    { value: false, label: "False" },
  ];

  const handleChange = (e, fieldName) => {
    let value = e.target.value;
    let isValid = true;
    const newErrors = { ...errors };
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const mobileRegex = /^[0-9]{10}$/;
  
    if (fieldName === "email") {
      if (!emailRegex.test(value)) {
        isValid = false;
        newErrors.email = "Invalid email address";
      } else {
        newErrors.email = "";
      }
    }
  
    if (fieldName === "phoneNumber") {
      if (!mobileRegex.test(value)) {
        isValid = false;
        newErrors.phoneNumber = "Invalid phone number";
      } else {
        newErrors.phoneNumber = "";
      }
    }
  
    if (fieldName === "enabled") {
      value = e.target.value === "true" ? true : false;
    }
    if (fieldName === "consentRequired") {
      if (value.trim() === "") {
        isValid = false;
        newErrors.consentRequired = " ";
      } else {
        newErrors.consentRequired = "";
      }
    }
    if (fieldName === "cartInfoMessage") {
      if (value.trim() === "") {
        isValid = false;
        newErrors.cartInfoMessage = " ";
      } else {
        newErrors.cartInfoMessage = "";
      }
    }  if (fieldName === "price") {
      const priceValue = parseFloat(value);
      if (isNaN(priceValue) || priceValue <= 0) {
        isValid = false;
        newErrors.price = "Price must be a positive number";
      } else {
        newErrors.price = "";
      }
    }
  
    // Points validation (assuming it's a non-negative integer)
    if (fieldName === "points") {   
      const pointsValue = parseInt(value, 10);
      if (isNaN(pointsValue) || pointsValue < 0) {
        isValid = false;
        newErrors.points = "Points must be a non-negative integer";
      } else {
        newErrors.points = "";
      }
    }
  
    setClientConfiguration({
      ...clientConfiguration,
      [fieldName]: value,
    });
  
    setErrors(newErrors);
  };
  

  const clientId = GetClientId();

  const handleDropdownChange = (value, fieldName) => {
    setClientConfiguration({
      ...clientConfiguration,
      [fieldName]: value,
    });
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    for (const key in clientConfiguration) {
      if (clientConfiguration[key] === "" || clientConfiguration[key] === "Select") {
        newErrors[key] = " ";
        isValid = false;
      } else if (clientConfiguration[key]?.length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    if (isValid) {
      if(!prefilledData){
      dispatch(
        onPostClientConfiqurationSubmit({
          ...clientConfiguration,
          price: parseInt(clientConfiguration?.price),
          clientId: clientId,
        })
      );
    }


    else{
      dispatch(
        onUpdateClientConfiqurationSubmit({
          ...clientConfiguration,
          price: parseInt(clientConfiguration?.price),
          clientId: clientId,
          id:prefilledData?.id
        })
      );
    }
  };
  }
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Client Configuration</h4>
              </div>
              <div className="card-body pt-2 ml-6 mb-4">
                {clientConfigurationSliceReducer?.postClientLoading ? (
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
                            className={`form-control ${errors.email ? "border-danger" : ""}`}
                            id="email"
                            value={clientConfiguration.email}
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
                            type="text"
                            className={`form-control ${errors.phoneNumber ? "border-danger" : ""}`}
                            id="phone"
                            value={clientConfiguration.phoneNumber}
                            placeholder="Enter phone number"
                            onChange={(e) => handleChange(e, "phoneNumber")}
                          />
                          {<p className="text-danger">{errors.phoneNumber}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayItemInfoMessage">
                            Display Item Info Message <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${errors.cartInfoMessage ? "border-danger" : ""}`}
                            id="displayItemInfoMessage"
                            value={clientConfiguration.cartInfoMessage}
                            placeholder="Enter display item info message"
                            onChange={(e) => handleChange(e, "cartInfoMessage")}
                          />
                          {<p className="text-danger">{errors.cartInfoMessage}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayItemInfo">
                            Display Item Info Status <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            className={errors.cartInfo ? "border-danger-select" : "form-select"}
                            id="displayItemInfo"
                            value={clientConfiguration.cartInfo}
                            onChange={(event) => handleDropdownChange(event.target.value === "true", "cartInfo")}
                            options={statusOptions}
                          />
                          {<p className="text-danger">{errors.cartInfo}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayConsonantMessage">
                            Display Consonant <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${errors.consentRequired ? "border-danger" : ""}`}
                            id="displayConsonantMessage"
                            value={clientConfiguration.consentRequired}
                            placeholder="Enter display consonant message"
                            onChange={(e) => handleChange(e, "consentRequired")}
                          />
                          {<p className="text-danger">{errors.consentRequired}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayConsonant">
                            Display Consonant Status <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            className={errors.consentMessage ? "border-danger-select" : "form-select"}
                            id="displayConsonant"
                            value={clientConfiguration.consentMessage}
                            onChange={(event) => handleDropdownChange(event.target.value === "true", "consentMessage")}
                            options={statusOptions}
                          />
                          {<p className="text-danger">{errors.consentMessage}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="pricePerPoint">
                            Price Per Point <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            className={`form-control ${errors.price ? "border-danger" : ""}`}
                            id="pricePerPoint"
                            value={clientConfiguration.price}
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
                            className={`form-control ${errors.points ? "border-danger" : ""}`}
                            id="pricePerPoint"
                            value={clientConfiguration.points}
                            placeholder=" points"
                            onChange={(e) => handleChange(e, "points")}
                          />
                          {<p className="text-danger">{errors.points}</p>}
                        </div>
                      </div>

                      <div className="col-sm-12 form-group mb-0 mt-2">
                        <Button
                          type="submit"
                          className="btn btn-primary btn-sm float-right p-btn mt-2"
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
