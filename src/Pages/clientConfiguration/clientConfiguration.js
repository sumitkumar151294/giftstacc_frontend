/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";

import {
  onGetbannerMaster,
  onbannerMasterSubmit,
  onUpdateBannerMasterReset,
  onUpdateBannerMaster,
  onbannerMasterSubmitReset,
} from "../../Store/Slices/ClientAdmin/bannerMasterSlice";
import Button from "../../Components/Button/Button";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { onPostClientConfiqurationSubmit, onUpdateClientConfiqurationSubmit } from "../../Store/Slices/clientConfiqurationSlice";

const ClientConfiguration = ({ prefilledData, setPrefilledData, isDelete, setIsDelete }) => {
  const dispatch = useDispatch();
  const update = GetTranslationData("UIAdmin", "update_label");
  const active = GetTranslationData("UIClient", "active_option");
  const non_active = GetTranslationData("UIClient", "non_active_option");
  const submitTranslation = GetTranslationData("UIAdmin", "submit_label");
  const requiredLevel = GetTranslationData("UIAdmin", "required_label");
  const getBannerMaster = useSelector((state) => state.bannerMasterReducer);

  const [clientConfiguration, setClientConfiguration] = useState({
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired: "",
    points: "",
  });

  const resetField = {
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired: "",
    points: "",
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
        points: prefilledData.points || "",

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

  useEffect(() => {
    if (getBannerMaster.post_Status_code === "201") {
      toast.success(getBannerMaster.message);
      setClientConfiguration(resetField);
      dispatch(onbannerMasterSubmitReset());
      setPrefilledData("");
      dispatch(onGetbannerMaster());
    } else if (getBannerMaster.update_status_code === "201") {
      if (isDelete) {
        toast.success(getBannerMaster.message);
        dispatch(onUpdateBannerMasterReset());
        setIsDelete(false)
        dispatch(onGetbannerMaster());
      } else {
        toast.success(getBannerMaster.message);
        setClientConfiguration(resetField);
        dispatch(onUpdateBannerMasterReset());
        setPrefilledData("");
        dispatch(onGetbannerMaster());
      }
    }
  }, [getBannerMaster]);

  useEffect(() => {
    if (getBannerMaster.status_code === "201") {
      toast.success(getBannerMaster.message);
      setClientConfiguration(resetField);
      //   dispatch(onbannerMasterSubmitReset());
      dispatch(onGetbannerMaster());
    } else if (getBannerMaster?.status_code === "500") {
      toast.error(getBannerMaster.message);
    } else if (getBannerMaster.status_code === 404) {
      //   dispatch(onbannerMasterSubmitReset());
      toast.error(getBannerMaster.getmessage);
    }
  }, [getBannerMaster]);

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    cartInfoMessage: "",
    cartInfo: "",
    consentMessage: "",
    consentRequired: "",
    points: "",
  });

  const statusoptions = [
    { value: true, label: active },
    { value: false, label: non_active },
  ];

  useEffect(() => {
    dispatch(onGetbannerMaster());
  }, []);

  const handleChange = (e, fieldName) => {
    let value = e.target.value;

    if (fieldName === "enabled") {
      value = e.target.value === "true" ? true : false;
    }

    setClientConfiguration({
      ...clientConfiguration,
      [fieldName]: value,
    });

    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

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
    debugger
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    for (const key in clientConfiguration) {
      debugger
      if (clientConfiguration[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else if (clientConfiguration[key].length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    debugger
    if (isValid) {
      if (prefilledData) {
        dispatch(
          onUpdateClientConfiqurationSubmit({
            ...clientConfiguration,
            id: prefilledData?.id,
            clientId: sessionStorage.getItem("clientCode"),
            price: 1
          })
        );
      } else {
        debugger
        dispatch(
          onPostClientConfiqurationSubmit({
            ...clientConfiguration, points: parseInt(clientConfiguration?.points),
            price: 1,
            clientId: sessionStorage.getItem("clientCode"),
          })
        );
      }
    }
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
                <h4 className="card-title"> Client Configuration</h4>
              </div>
              <div className="card-body pt-2 ml-6  mb-4  ">
                {getBannerMaster?.postLoading || (!isDelete && getBannerMaster?.putLoading) ? (
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
                          {<p className="text-danger">{errors.phone}</p>}
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
                            value={clientConfiguration?.cartInfo}
                            onChange={(event) => handleDropdownChange(event.target.value, "cartInfo")}
                            options={statusoptions}
                          />
                          {<p className="text-danger">{errors.cartInfo}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayConsonantMessage">
                            Display Consonant  <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${errors.consentMessage ? "border-danger" : ""}`}
                            id="displayConsonantMessage"
                            value={clientConfiguration.consentMessage}
                            placeholder="Enter display consonant message"
                            onChange={(e) => handleChange(e, "consentMessage")}
                          />
                          {<p className="text-danger">{errors.consentMessage}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayConsonant">
                            Display Consonant Status <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            className={errors.consentRequired ? "border-danger-select" : "form-select"}
                            id="displayConsonant"
                            value={clientConfiguration?.consentRequired}
                            onChange={(event) => handleDropdownChange(event.target.value, "consentRequired")}
                            options={statusoptions}
                          />

                          {<p className="text-danger">{errors.consentRequired}</p>}
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="pricePerPoint">
                            Price Per Point <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            className={`form-control ${errors.points ? "border-danger" : ""}`}
                            id="pricePerPoint"
                            value={clientConfiguration.points}
                            placeholder="Enter price per point"
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
