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
} from "../../../Store/Slices/ClientAdmin/offerMasterSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { DatePicker, InputGroup } from "rsuite";

const OfferMasterForm = ({ data, setPrefilledValues }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [addData, setAddData] = useState({
    placement: "",
    title: "",
    subtitle: "",
    link: "",
    imagePlacement: "",
    image: "",
    enabled: true,
    linkText: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({
    placement: "",
    title: "",
    subtitle: "",
    link: "",
    imagePlacement: "",
    image: "",
    linkText: "",
    enabled: "",
    startDate: "",
    endDate: "",
  });
  // To reset the Input Field
  const resetAddData = {
    placement: "",
    title: "",
    subtitle: "",
    link: "",
    imagePlacement: "",
    image: "",
    enabled: "",
    linkText: "",
    startDate: "",
    endDate: "",
  };

  // To get the label from translation API
  const top = GetTranslationData("UIClient", "top");
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
  const subtitle_placeholder = GetTranslationData("UIClient", "subtitle_placeholder");
  const link_placeholder = GetTranslationData("UIClient", "link_placeholder");
  const link_text_placeholder = GetTranslationData("UIClient", "link_text_placeholder");

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
    if (fieldName === "image") {
      const file = e?.target?.files[0]; // Assuming only one file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setGetImagePath(formData);
        setGetImage(true);

        setAddData({
          ...addData,
          [fieldName]: e.target.value,
        });

        // dispatch(onUploadImage(formData));
      }
    } else if (fieldName === enabled_Text) {
      setAddData({
        ...addData,
        [fieldName]: e.target.value === "true" ? true : false,
      });
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }

    // else if(fieldName==="image"){
    //   let img = new Image()
    //   img.src = window.URL.createObjectURL(e.target.files[0])

    //     setAddData({
    //       ...addData,
    //       [fieldName]: e.target.value,
    //     });

    //   img.onload = () => {
    //     if(img.width > 100 || img.height > 100){
    //       setErrors({
    //         ...errors,
    //         [fieldName]: "Image size should be less than 500 KB",
    //       });
    //       setAddData({
    //         ...addData,
    //         [fieldName]: e.target.value,
    //       });
    //     }

    //   }
    // }
    else {
      setAddData({
        ...addData,
        [fieldName]: e.target.value,
      });
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
    const requiredFields = data
      ? [
          "placement",
          "title",
          "subtitle",
          "link",
          "imagePlacement",
          "enabled",
          "linkText",
          "startDate",
          "endDate",
        ]
      : [
          "placement",
          "title",
          "subtitle",
          "link",
          "imagePlacement",
          "image",
          "enabled",
          "linkText",
          "startDate",
          "endDate",
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
      if (data?.image && !getImage) {
        const tempData = {
          ...addData,
          id: data?.id,
          image: data?.image,
        };
        setShowLoader(true);
        dispatch(onUpdateOfferMaster(tempData));
      } else if (getImage) {
        setShowLoader(true);
        dispatch(onUploadImage(getImagePath));
      }
    }
  };
  useEffect(() => {
    if (offerMasterData?.status_code_Image === "201") {
      if (!data) {
        try {
          dispatch(onUploadImageReset());
          dispatch(
            onPostOfferMasterSubmit({
              ...addData,
              image: offerMasterData?.imageUpload,
            })
          );
        } catch (error) {
          console.error("Error submitting offer:", error);
        }
      } else {
        try {
          const tempData = {
            ...addData,
            id: data?.id,
            image: offerMasterData?.imageUpload,
          };
          dispatch(onUpdateOfferMaster(tempData));
        } catch (error) {
          console.error("Error updating offer:", error);
        }
      }
    }
  }, [offerMasterData?.status_code_Image, data]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setAddData({
      ...addData,
      placement: data?.placement || "",
      title: data?.title || "",
      subtitle: data?.subtitle || "",
      link: data?.link || "",
      imagePlacement: data?.imagePlacement || "",
      linkText: data?.linkText || "",
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
  // useEffect(() => {
  //   if (offerMasterData?.status_code === "201") {
  //     setShowLoader(false);
  //     toast.success(offerMasterData?.message);
  //     setAddData(resetAddData);
  //     dispatch(onPostOfferMasterReset());
  //     dispatch(onGetOfferMaster());
  //   } else if (offerMasterData.status_code === 404) {
  //     dispatch(onPostOfferMasterReset());
  //     toast.error(offerMasterData.message);
  //   }
  // }, [offerMasterData]);
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
                        <div className="col-sm-3 form-group mb-2">
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
                        <div className="col-sm-5 form-group mb-2">
                          <label htmlFor="title">
                            {title}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={addData.title}
                            onChange={(e) => handleInputChange(e, "title")}
                            className={` ${
                              errors.title ? "border-danger" : "form-control"
                            }`}
                            name="title"
                            id="title"
                            placeholder={title_placeholder}
                          />
                          {<p className="text-danger">{errors.title}</p>}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="subtitle">
                            {subtitle}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={addData.subtitle}
                            onChange={(e) => handleInputChange(e, "subtitle")}
                            className={` ${
                              errors.subtitle ? "border-danger" : "form-control"
                            }`}
                            name="subtitle"
                            id="subtitle"
                            placeholder={subtitle_placeholder}
                          />
                          {<p className="text-danger">{errors.subtitle}</p>}
                        </div>
                        <div className="col-sm-5 form-group mb-2">
                          <label htmlFor="link">
                            {link_label}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={addData.link}
                            onChange={(e) => handleInputChange(e, "link")}
                            className={` ${
                              errors.link ? "border-danger" : "form-control"
                            }`}
                            name="link"
                            id="link"
                            placeholder={link_placeholder}
                          />
                          {errors.link && (
                            <small className="text-danger">{errors.link}</small>
                          )}
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="linkText">
                            {link_text} <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={addData.linkText}
                            onChange={(e) => handleInputChange(e, "linkText")}
                            className={` ${
                              errors.linkText ? "border-danger" : "form-control"
                            }`}
                            placeholder={link_text_placeholder}
                          />
                          {<p className="text-danger">{errors.linkText}</p>}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="imagePlacement">
                            {imagePlacement}
                            <span className="text-danger">*</span>
                          </label>
                          <Dropdown
                            value={addData.imagePlacement || ""}
                            onChange={(e) =>
                              handleInputChange(e, "imagePlacement")
                            }
                            className={` ${
                              errors.imagePlacement
                                ? "border-danger-select"
                                : "form-select"
                            }`}
                            options={imagePlacementOptions}
                          />
                        </div>
                        <div className="col-sm-5 form-group mb-2">
                          <label htmlFor="image">
                            {upload_image}
                            <span className="text-danger">
                              {" "}
                              {!data ? "*" : ""}
                            </span>
                          </label>
                          <div className="input-group">
                            <div className="form-file">
                              <InputField
                                type="file"
                                accept="image/jpg,image/png"
                                value={addData.image}
                                className={
                                  !data
                                    ? errors.image
                                      ? "border-danger"
                                      : "form-file-input form-control"
                                    : ""
                                }
                                onChange={(e) => handleInputChange(e, "image")}
                              />
                            </div>
                            <span className="input-group-text">{upload}</span>
                          </div>
                        </div>
                        <div className="col-sm-4 mt-5">
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
                        <div className="col-sm-3 form-group mb-2">
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
