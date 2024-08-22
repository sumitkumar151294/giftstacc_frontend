/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import InputField from "../../../Components/InputField/InputField";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import Button from "../../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  onPostOfferMasterSubmit,
  onPostOfferMasterReset,
  onGetOfferMaster,
  onUpdateOfferMaster,
  onUpdateOfferMasterReset,
  onUploadImage,
  onUploadImageReset,
  onUploadImageMobile,
} from "../../../Store/Slices/ClientAdmin/offerMasterSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { GetClientId } from "../../../Common/commonSlice/CommonSlice";
import { DatePicker, InputGroup } from "rsuite";

const OfferMasterForm = ({ data, setPrefilledValues }) => {
  const [webvisible, setwebVisible] = useState(false);
  const [webvisibleMob, setwebVisibleMob] = useState(false);


  const [showLoader, setShowLoader] = useState(false);
  const [addData, setAddData] = useState({
    placement: "",
    // title: "",
    mobileImage: "",
    link: "",
    // imagePlacement: "",
    image: "",
    enabled: true,
    // linkText: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({
    placement: "",
    // title: "",
    // subtitle: "",
    mobileImage: "",
    link: "",
    // imagePlacement: "",
    image: "",
    // linkText: "",
    enabled: "",
    startDate: "",
    endDate: "",
  });
  // To reset the Input Field
  const resetAddData = {
    placement: "",
    mobileImage: "",
    // subtitle: "",
    link: "",
    // imagePlacement: "",
    image: "",
    enabled: "",
    // linkText: "",
    startDate: "",
    endDate: "",
  };

  // To get the label from translation API
  const top = GetTranslationData("UIClient", "top");
  const start_and_enddate = GetTranslationData("UIAdmin", "start_and_enddate");
  const bottom = GetTranslationData("UIClient", "bottom");
  const left = GetTranslationData("UIClient", "left_option");
  const right = GetTranslationData("UIClient", "right_option");
  const active = GetTranslationData("UIClient", "active_option");
  const non_active = GetTranslationData("UIClient", "non_active_option");
  const field_Required = GetTranslationData("UIAdmin", "field_Required");
  const placement = GetTranslationData("UIClient", "placement");
  const title = GetTranslationData("UIClient", "title");
  const subtitle = GetTranslationData("UIClient", "sub-title");
  const link_label = GetTranslationData("UIClient", "link_label");
  const imagePlacement = GetTranslationData("UIClient", "image_placement");
  const upload_image = GetTranslationData("UIClient", "uploadImage");
  const upload = GetTranslationData("UIClient", "upload");
  const status = GetTranslationData("UIClient", "status");
  const submit = GetTranslationData("UIClient", "submitLabel");
  const update = GetTranslationData("UIAdmin", "update_label");
  const requiredLevel = GetTranslationData("UIAdmin", "required_label");
  const enabled_Text = GetTranslationData("UIAdmin", "enabled_Text");
  const link_text = GetTranslationData("UIClient", "link_text");
  const title_placeholder = GetTranslationData("UIClient", "title_placeholder");
  const subtitle_placeholder = GetTranslationData(
    "UIClient",
    "subtitle_placeholder"
  );
  const overlap_date_error_msg = GetTranslationData(
    "UIAdmin",
    "overlap_date_error_msg"
  );
  const link_placeholder = GetTranslationData("UIClient", "link_placeholder");
  const link_text_placeholder = GetTranslationData(
    "UIClient",
    "link_text_placeholder"
  );
  const upload_image_web = GetTranslationData("UIAdmin", "upload_image_web");
  const upload_image_phone = GetTranslationData(
    "UIAdmin",
    "upload_image_phone"
  );
  const [getImagePathMobile, setGetImagePathMobile] = useState("");
  const [getImage, setGetImage] = useState(false);
  const dispatch = useDispatch();
  const offerMasterData = useSelector((state) => state.offerMasterReducer);
  const [getImagePath, setGetImagePath] = useState("");
  const placementoptions = [
    { value: "Top", label: top },
    { value: "Bottom", label: bottom },
  ];
  const statusoptions = [
    { value: true, label: active },
    { value: false, label: non_active },
  ];
  const imagePlacementOptions = [
    { value: "Left", label: left },
    { value: "Right", label: right },
  ];

  const handleInputChange = (e, fieldName) => {
    let value = e.target.value;
 
    if (fieldName === "webImage" || fieldName === "mobileImage") {
      debugger;
      const file = e?.target?.files[0]; // Assuming only one file is selected
      if (file) {
        const img = new Image();
        img.onload = () => {
          let expectedWidth, expectedHeight;

          if (addData.placement === "Top") {
            if (fieldName === "webImage") {
              expectedWidth = 582;
              expectedHeight = 336;
            } else if (fieldName === "mobileImage") {
              expectedWidth = 398;
              expectedHeight = 230;
            }
          } else if (addData.placement === "Bottom") {
            if (fieldName === "webImage") {
              expectedWidth = 589;
              expectedHeight = 294;
            } else if (fieldName === "mobileImage") {
              expectedWidth = 395;
              expectedHeight = 197;
            }
          }

          if (img.width === expectedWidth && img.height === expectedHeight) {
            const formData = new FormData();
            formData.append("file", file);

            if (fieldName === "webImage") {
              debugger;
              setGetImagePath(formData); // Set the formData to state
            } else if (fieldName === "mobileImage") {
              setGetImagePathMobile(formData); // Set the formData to state
            }

            setGetImage(true); // Indicate that the image has been set
            setErrors({
              ...errors,
              [fieldName]: "", // Clear any existing errors for this field
            });
          } else {
            setErrors({
              ...errors,
              [fieldName]: `Image should be ${expectedWidth}px by ${expectedHeight}px`, // Set an error if dimensions do not match
            });
          }
        };
        img.src = URL.createObjectURL(file); // Create a URL for the image file
      } else {
        value = ""; // Reset the value if no file is selected
      }
    } else if (fieldName === "enabled") {
      value = e.target.value === "true" ? true : false;
      setAddData({
        ...addData,
        [fieldName]: value,
      });
      
    } else {
      setAddData({
        ...addData,
        [fieldName]: value,
      });
    }
  
    setErrors({
      ...errors,
      [fieldName]: "",
    });
    if (fieldName === "link") {
      const urlRegex = /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?/;
      const isValidUrl = urlRegex.test(value);
      // Update the error state based on the URL validity
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: isValidUrl ? "" : " ",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
    const requiredFields = data
      ? [
          "placement",
          "link",
          "enabled",
          "startDate",
          "endDate",
          "image",
          "mobileImage",
        ]
      : [
          "placement",
          "link",
          "enabled",
          "startDate",
          "endDate",
          "image",
          "mobileImage",
        ];

    for (const key of requiredFields) {
      if (addData[key] === "" || addData[key] === undefined) {
        newErrors[key] = " ";
        isValid = false;
      } else if (addData[key].length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    setErrors(newErrors);
    if (isValid) {
      debugger;
      if (data?.image && !getImage) {
        debugger;
        const tempData = {
          ...addData,
          id: data?.id,
          image: data?.image,
          mobileImage: data?.mobileImage,
          clientId: clientId,
        };
        setShowLoader(true);
        dispatch(onUpdateOfferMaster(tempData));
      } else if (getImage) {
        dispatch(onUploadImage(getImagePath));
        dispatch(onUploadImageMobile(getImagePathMobile));
        debugger;
        setShowLoader(true);
        const tempData = {
          ...addData,
          id: data?.id,
          image: offerMasterData?.imageUpload,
          mobileImage: offerMasterData?.imageMobileUpload,
          clientId: clientId,
        };
        dispatch(onUpdateOfferMaster(tempData));
      }
    }
  };
  const clientId = GetClientId();

  useEffect(() => {
    debugger;
    if (offerMasterData?.status_code_Image === "201") {
      if (!data) {
        try {
          dispatch(onUploadImageReset());
          dispatch(
            onPostOfferMasterSubmit({
              ...addData,
              image: offerMasterData?.imageUpload,
              mobileImage: offerMasterData?.imageMobileUpload,
              clientId: clientId,
            })
          );
        } catch (error) {
          console.error("Error submitting offer:", error);
        }
      } else {
        try {
          debugger;
          const tempData = {
            ...addData,
            id: data?.id,
            image: offerMasterData?.imageUpload,
            clientId: clientId,
          };
          dispatch(onUpdateOfferMaster(tempData));
        } catch (error) {
          console.error("Error updating offer:", error);
        }
      }
    }
  }, [offerMasterData?.status_code_Image, data]);

  useEffect(() => {
    debugger;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setAddData({
      ...addData,
      placement: data?.placement || "",
      link: data?.link || "",
      image: data?.image,
      mobileImage: data?.mobileImage,
      enabled: data?.enabled !== undefined ? data?.enabled : "",
      startDate: data?.startDate || "",
      endDate: data?.endDate || "",
    });
    setErrors({
      StatusCode: "",
      image: "",
      ErrorName: "",
      ErrorDesription: "",
      url: "",
      buttonText: "",
      startDate: "",
      endDate: "",
    });
  }, [data]);

  useEffect(() => {
    if (offerMasterData.postStatus_code === "201") {
      setShowLoader(false);
      toast.success(offerMasterData?.message);
      setAddData(resetAddData);
      dispatch(onPostOfferMasterReset());
      dispatch(onGetOfferMaster());
    } else if (offerMasterData.update_status_code === "201") {
      setShowLoader(false);
      toast.success(offerMasterData?.updateMessage);
      setAddData(resetAddData);
      dispatch(onUpdateOfferMasterReset());
      dispatch(onGetOfferMaster());
    }
  }, [offerMasterData]);

  useEffect(() => {
    if (offerMasterData?.postStatus_code === "400") {
      setShowLoader(false);
      toast.error(offerMasterData.message);
      dispatch(onPostOfferMasterReset());
      // setAddData(resetAddData);
    } else if (offerMasterData.update_status_code === "400") {
      setShowLoader(false);
      toast.error(offerMasterData.updateMessage);
      dispatch(onUpdateOfferMasterReset());
      // setAddData(resetAddData);
    }
  }, [offerMasterData]);
  const handleDateChange = (dates, fieldName) => {
    setAddData({
      ...addData,
      [fieldName]: dates,
    });
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">
                  {GetTranslationData("UIClient", "offerMaster")}
                </h4>
              </div>
              <div className="card-body ">
                {showLoader ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="placement">
                            {placement}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            value={addData.placement || ""}
                            onChange={(e) => handleInputChange(e, "placement")}
                            className={` ${
                              errors.placement
                                ? "border-danger-select"
                                : "form-select"
                            }`}
                            options={placementoptions}
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="link">
                            {link_label}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={addData.link}
                            onChange={(e) => handleInputChange(e, "link")}
                            className={`${errors.link ? "border-danger" : "form-control"}`}
                            name="link"
                            id="link"
                            placeholder={link_placeholder}
                          />
                          {errors.link && (
                            <small className="text-danger">{errors.link}</small>
                          )}
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                          <label className="control-label d-flex">
                            {upload_image_web}{" "}
                            <div
                              className="info-icon"
                              onMouseEnter={() => setwebVisible(true)}
                              onMouseLeave={() => setwebVisible(false)}
                            >
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                              {webvisible && addData.placement === "Top" ? (
                                <div className="tooltip">
                                  Image size Should be 582 <sup>*</sup>336px
                                </div>
                              ) : webvisible &&
                                addData.placement === "Bottom" ? (
                                <div className="tooltip">
                                  Image size Should be 589 <sup>*</sup>294px
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </label>
                          <div className="input-group">
                            <div className="form-file">
                          <InputField
                            type="file"
                            placeholder={upload_image_web}
                            onChange={(e) => handleInputChange(e, "webImage")}
                            accept="image/jpg,image/png"
                            className={` ${
                              errors.link ? "border-danger" : "form-file-input form-control"
                            } ${
                              addData?.placement === "" ||
                              addData?.placement === "Select"
                                ? "disabled-class"
                                : ""
                            }`}
                          />
                          </div>
                          <span className="input-group-text">{upload}</span>

                          </div>
                          {errors?.image && (
                            <span className="text-danger">{errors?.image}</span>
                          )}
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                          <label className="control-label d-flex">
                            {upload_image_phone}
                            <div
                              className="info-icon"
                              onMouseEnter={() => setwebVisibleMob(true)}
                              onMouseLeave={() => setwebVisibleMob(false)}
                            >
                              <i
                                className="fa fa-info-circle"
                                aria-hidden="true"
                              ></i>
                              {webvisibleMob && addData.placement === "Top" ? (
                                <div className="tooltip">
                                  Image size Should be 398 <sup>*</sup>230px
                                </div>
                              ) : webvisibleMob &&
                                addData.placement === "Bottom" ? (
                                <div className="tooltip">
                                  Image size Should be 395 <sup>*</sup>197px
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </label>
                          <div className="input-group">
                            <div className="form-file">
                          <InputField
                            type="file"
                            placeholder={upload_image_phone}
                            onChange={(e) =>
                              handleInputChange(e, "mobileImage")
                            }
                            className={` ${
                              errors.link ? "border-danger" : "form-file-input form-control "
                            } ${
                              addData?.placement === "" ||
                              addData?.placement === "Select"
                                ? "disabled-class"
                                : ""
                            }`}
                            accept="image/*"
                          />
                          </div>
                          <span className="input-group-text">{upload}</span>

                          </div>
                          {errors?.mobileImage && (
                            <span className="text-danger">
                              {errors?.mobileImage}
                            </span>
                          )}
                        </div>
                        <div className="col-sm-4">
                          <label htmlFor="enabled">
                            {start_and_enddate}
                            <span className="text-danger">*</span>
                          </label>
                          <InputGroup
                            className={`${
                              errors.startDate || errors.endDate
                                ? "border-danger-date"
                                : "dateInput"
                            }`}
                          >
                            <DatePicker
                              format="yyyy-MM-dd HH:mm:ss"
                              placeholder="Start Date"
                              value={
                                addData.startDate
                                  ? new Date(addData.startDate)
                                  : null
                              }
                              onChange={(e) => handleDateChange(e, "startDate")}
                              block
                              appearance="subtle"
                            />
                            <DatePicker
                              format="yyyy-MM-dd HH:mm:ss"
                              placeholder="End Date"
                              value={
                                addData.endDate
                                  ? new Date(addData.endDate)
                                  : null
                              }
                              onChange={(e) => handleDateChange(e, "endDate")}
                              block
                              appearance="subtle"
                            />
                          </InputGroup>
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="enabled">
                            {status}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            value={addData.enabled}
                            onChange={(e) => handleInputChange(e, "enabled")}
                            className={` ${
                              errors.enabled
                                ? "border-danger-select"
                                : "form-select"
                            }`}
                            options={statusoptions}
                          />
                        </div>
                        <span
                          className="form-check-label"
                          htmlFor="basic_checkbox_1"
                          style={{ marginLeft: "5px", marginTop: "10px" }}
                        >
                          {requiredLevel}
                        </span>
                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <Button
                            text={data ? update : submit}
                            icon="fa fa-arrow-right"
                            className="btn btn-primary btn-sm float-right p-btn mt-2"
                          />
                        </div>
                      </div>
                    </form>
                    <ToastContainer />
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
export default OfferMasterForm;
/* eslint-enable react-hooks/exhaustive-deps */
