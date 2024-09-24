import React, { useEffect, useState } from "react";
import InputField from "../../../Components/InputField/InputField";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import Button from "../../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { GetClientId } from "../../../Common/commonSlice/CommonSlice";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import {
  onGetUnlockPoints,
  onUnlockPointsSubmit,
  onUnlockPointsSubmitReset,
  onUnlockPointsUpdate,
} from "../../../Store/Slices/ClientAdmin/unlockPointsSlice";

const UnlockPointsForm = ({ prefilledValues, setPrefilledValues }) => {
  const getClientId = GetClientId();
  const dispatch = useDispatch();
  // to get data from translation
  const active = GetTranslationData("UIClient", "active_option");
  const non_active = GetTranslationData("UIClient", "non_active_option");
  const field_Required = GetTranslationData("UIAdmin", "field_Required");
  const upload_image_web = GetTranslationData("UIAdmin", "upload_image_web");
  const upload_image_phone = GetTranslationData(
    "UIAdmin",
    "upload_image_phone"
  );
  const upload = GetTranslationData("UIClient", "upload");
  // to get data from redux store
  const getUnlockPoints = useSelector((state) => state?.unlockPointsReducer);
  // initial states of all input fields
  const [formData, setFormData] = useState({
    sectionName: "",
    mobileImage: "",
    webImage: "",
    title: "",
    displayOrder: "",
    enabled: "",
  });
  // to handle errors
  const [error, setError] = useState({
    sectionName: "",
    mobileImage: "",
    webImage: "",
    title: "",
    displayOrder: "",
    enabled: "",
  });
  // to handle reset input fields
  const resetField = {
    sectionName: "",
    mobileImage: "",
    webImage: "",
    title: "",
    displayOrder: "",
    enabled: "",
  };
  // options for status
  const statusoptions = [
    { value: true, label: active },
    { value: false, label: non_active },
  ];
  // to handle form updation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setFormData({
      // sectionName: prefilledValues?.sectionName || "",
      // displayOrder: prefilledValues?.displayOrder || "",
      enabled:
        prefilledValues?.enabled !== undefined ? prefilledValues?.enabled : "",
      // mobileImage: prefilledValues?.mobileImage || "",
      id: prefilledValues?.id,
      icon: prefilledValues?.icon || "",
      title: prefilledValues?.title || "",
      sub_Title: prefilledValues?.sub_Title || "",
      description: prefilledValues?.description || "",
    });
    setError({
      sectionName: "",
      mobileImage: "",
      webImage: "",
      title: "",
      displayOrder: "",
      enabled: "",
    });
  }, [prefilledValues]);

  // to handle input change
  const handleInput = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
    setError({
      ...error,
      [fieldName]: "",
    });
  };
  // to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...error };

    // Validate form fields
    // for (const key in formData) {
    //   if (formData[key] === "") {
    //     newErrors[key] = field_Required;
    //     isValid = false;
    //   } else if (formData[key]?.length > 250) {
    //     newErrors[key] = "Length must be 250 or fewer";
    //     isValid = false;
    //   } else {
    //     newErrors[key] = "";
    //   }
    // }
    // if (isValid) {
    if (!prefilledValues) {
      const postData = {
        clientId: getClientId,
        enabled: true,
        title: "dealjh",
        sub_Title: "abcdj",
        description:
          "Shop our nonus points events Looks for them throughtoutnm",
        icon: "image",
      };
      dispatch(onUnlockPointsSubmit(postData));
    } else {
      const updateData = {
        id: prefilledValues?.id,
        enabled: true,
        clientId: prefilledValues?.clientId,
        icon: prefilledValues?.icon,
        title: "dealdeal",
        sub_Title: prefilledValues?.sub_Title,
        description: prefilledValues?.description,
      };
      dispatch(onUnlockPointsUpdate(updateData));
    }
    setFormData(resetField);
    // }
  };
  // to handle toast notifications based on post and update status code
  useEffect(() => {
    if (!prefilledValues) {
      if (getUnlockPoints?.status_code === "201") {
        toast.success(getUnlockPoints.message);
        setFormData(resetField);
        dispatch(onGetUnlockPoints());
        dispatch(onUnlockPointsSubmitReset());
      } else if (getUnlockPoints?.status_code) {
        toast.error(getUnlockPoints?.message?.data?.ErrorMessage);
        dispatch(onUnlockPointsSubmitReset());
      }
    } else if (prefilledValues) {
      if (getUnlockPoints?.status_code === "201") {
        toast.success(getUnlockPoints.message);
        setFormData(resetField);
        setPrefilledValues("");
        dispatch(onGetUnlockPoints());
      }
    }
  }, [getUnlockPoints.status_code]);
  // to fetch the data on mount
  useEffect(() => {
    dispatch(onGetUnlockPoints());
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{"Unlock Points Form"}</h4>
              </div>
              <div className="card-body card-body-user">
                {getUnlockPoints?.isLoading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classNameType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {"Section Name"}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={formData?.sectionName}
                            className={`${
                              error.sectionName
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="fname"
                            id="name-f"
                            placeholder={"Enter section name"}
                            onChange={(e) => handleInput(e, "sectionName")}
                          />
                          {/* {<p className="text-danger">{error.sectionName}</p>} */}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="image">
                            {upload_image_phone}
                            <span className="text-danger">
                              {" "}
                              {!prefilledValues ? "*" : ""}
                            </span>
                          </label>
                          <div className="input-group">
                            <div className="form-file">
                              <InputField
                                type="file"
                                accept="image/jpg,image/png"
                                // value={bannerMaster.image}
                                className={
                                  !prefilledValues
                                    ? error.mobileImage
                                      ? "border-danger"
                                      : "form-file-input form-control"
                                    : ""
                                }
                                onChange={(e) => handleInput(e, "mobileImage")}
                              />
                            </div>

                            <span className="input-group-text">{upload}</span>
                          </div>
                          {<p className="text-danger">{error.mobileImage}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="image">
                            {upload_image_web}
                            <span className="text-danger">
                              {" "}
                              {!prefilledValues ? "*" : ""}
                            </span>
                          </label>
                          <div className="input-group">
                            <div className="form-file">
                              <InputField
                                type="file"
                                accept="image/jpg,image/png"
                                // value={bannerMaster.image}
                                className={
                                  !prefilledValues
                                    ? error.webImage
                                      ? "border-danger"
                                      : "form-file-input form-control"
                                    : ""
                                }
                                onChange={(e) => handleInput(e, "webImage")}
                              />
                            </div>

                            <span className="input-group-text">{upload}</span>
                          </div>
                          {<p className="text-danger">{error.webImage}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-f">
                            {"Title"}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={formData?.title}
                            className={`${
                              error.sectionName
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="fname"
                            id="name-f"
                            placeholder={"Enter title"}
                            onChange={(e) => handleInput(e, "title")}
                          />
                          {<p className="text-danger">{error.title}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="displayOrder">
                            {"Display Order"}{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            value={formData?.displayOrder}
                            className={`${
                              error.displayOrder
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="displayOrder"
                            id="displayOrder"
                            onChange={(e) => handleInput(e, "displayOrder")}
                            placeholder={"Enter display order"}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="enabled">
                            {"Status"} <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            aria-label="Default select example"
                            onChange={(e) => handleInput(e, "enabled")}
                            value={formData?.enabled}
                            className={`${
                              error.enabled
                                ? "border-danger-select"
                                : "form-select"
                            }`}
                            options={statusoptions}
                          />
                        </div>
                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <Button
                            className="btn btn-primary float-right pad-aa"
                            text={prefilledValues ? "Update" : "Submit"}
                            icon={"fa fa-arrow-right"}
                          />
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

export default UnlockPointsForm;
