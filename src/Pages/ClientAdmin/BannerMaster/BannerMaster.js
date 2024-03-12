import React, { useEffect, useState } from "react";
import InputField from "../../../Components/InputField/InputField";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import { useSelector } from "react-redux";
import { onGetSupplierBrandList } from "../../../Store/Slices/supplierBrandListSlice";
import { onGetSupplierList } from "../../../Store/Slices/supplierMasterSlice";
import { useDispatch } from "react-redux";
import {
  onGetbannerMaster,
  onbannerMasterSubmit,
  onUpdateBannerMasterReset,
  onUpdateBannerMaster,
} from "../../../Store/Slices/ClientAdmin/bannerMasterSlice";
import Button from "../../../Components/Button/Button";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
import { onbannerMasterSubmitReset } from "../../../Store/Slices/ClientAdmin/bannerMasterSlice";
const BannerForm = ({ prefilledData, setPrefilledData }) => {
  const dispatch = useDispatch();
  const update = GetTranslationData("UIAdmin", "update_label");
  const active = GetTranslationData("UIClient", "active_option");
  const non_active = GetTranslationData("UIClient", "non_active_option");
  const submitTranslation = GetTranslationData("UIAdmin", "submit_label");
  const imagePlacement = GetTranslationData("UIClient", "image_placement");
  const upload_image = GetTranslationData("UIClient", "uploadImage");
  const upload = GetTranslationData("UIClient", "upload");
  const getBannerMaster = useSelector((state) => state.bannerMasterReducer);
  const [bannerMaster, setBannerMaster] = useState({
    bannerPlacement: "",
    bannerTitle: "",
    bannerSubtitle: "",
    bannerLink: "",
    displayOrder: "",
    enabled: "",
    image: "",
  });
  const resetField = {
    bannerPlacement: "",
    bannerTitle: "",
    bannerSubtitle: "",
    bannerLink: "",
    displayOrder: "",
    enabled: "",
    image: "",
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (prefilledData) {
      setBannerMaster({
        bannerPlacement: prefilledData.bannerPlacement || "",
        bannerTitle: prefilledData.bannerTitle || "",
        bannerSubtitle: prefilledData.bannerSubtitle || "",
        bannerLink: prefilledData.bannerLink || "",
        displayOrder: prefilledData.displayOrder || "",
        image: "",
        enabled:
          prefilledData?.enabled !== undefined ? prefilledData?.enabled : "", // image: prefilledData.image || "",
      });

      setErrors({
        bannerPlacement: "",
        bannerTitle: "",
        bannerSubtitle: "",
        bannerLink: "",
        displayOrder: "",
        // status: "",
        image: "",
      });
    }
  }, [prefilledData]);
  useEffect(() => {
    if (getBannerMaster.update_status_code === "201") {
      toast.success(getBannerMaster.message);
      setBannerMaster(resetField);

      dispatch(onUpdateBannerMasterReset());
      setPrefilledData("");
      dispatch(onGetbannerMaster());
    }
  }, [getBannerMaster]);

  useEffect(() => {
    if (getBannerMaster.status_code === "201") {
      toast.success(getBannerMaster.message);
      setBannerMaster(resetField);
      dispatch(onbannerMasterSubmitReset());
      dispatch(onGetbannerMaster());
    } else if (getBannerMaster?.status_code === "500") {
      toast.error(getBannerMaster.message);
    }
  }, [getBannerMaster]);

  const [errors, setErrors] = useState({
    bannerPlacement: "",
    bannerTitle: "",
    bannerSubtitle: "",
    bannerLink: "",
    displayOrder: "",
    enabled: "",
    image: "",
  });

  const statusoptions = [
    { value: true, label: active },
    { value: false, label: non_active },
  ];
  const bannerPlacement = [
    { value: "Top", label: "Top" },
    { value: "Bottom", label: "Bottom" },
  ];

  useEffect(() => {
    dispatch(onGetbannerMaster());
    dispatch(onGetSupplierBrandList());
    dispatch(onGetSupplierList());
  }, []);
  // Add more states for other form fields as necessary
  const handleChange = (e, fieldName) => {
    // Update the bannerMaster state with the new value
    setBannerMaster({
      ...bannerMaster,
      [fieldName]: e.target.value,
    });

    // Remove the error message for the field being edited
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    // Check if fields are empty and set corresponding error messages
    for (const key in bannerMaster) {
      if (bannerMaster[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    if (isValid) {
      if (!prefilledData) {
        dispatch(
          onbannerMasterSubmit({
            ...bannerMaster,
            enabled: bannerMaster.enabled === "true" ? true : false, // Convert status to boolean based on selection
          })
        );
      } else {
        dispatch(
          onUpdateBannerMaster({
            ...bannerMaster,
            id: prefilledData?.id,
            clientId: "strisng",
            enabled: bannerMaster.enabled === "true" ? true : false,
          })
        );
      }
    }
  };

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <div className="row ml-6 pt-4 rows">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Banner Master</h4>
            </div>
            <div className="card-body pt-2 ml-6  mb-4  ">
              <div className="container-fluid pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-3 form-group mb-2">
                      <label htmlFor="bannerPlacement">Banner Placement</label>
                      <Dropdown
                        className={`${
                          errors.bannerPlacement
                            ? "border-danger-select"
                            : "form-select"
                        }`}
                        id="bannerPlacement"
                        value={bannerMaster.bannerPlacement}
                        onChange={(e) => handleChange(e, "bannerPlacement")}
                        options={bannerPlacement}
                      ></Dropdown>
                    </div>

                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="bannerTitle">Banner Title</label>
                      <InputField
                        type="text"
                        className={`form-control ${
                          errors.bannerTitle ? "border-danger" : ""
                        }`}
                        id="bannerTitle"
                        value={bannerMaster.bannerTitle}
                        onChange={(e) => handleChange(e, "bannerTitle")}
                      />
                    </div>

                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="bannerSubtitle">Banner Subtitle</label>
                      <InputField
                        type="text"
                        className={`form-control ${
                          errors.bannerSubtitle ? "border-danger" : ""
                        }`}
                        id="bannerSubtitle"
                        value={bannerMaster.bannerSubtitle}
                        onChange={(e) => handleChange(e, "bannerSubtitle")}
                      />
                    </div>

                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="bannerLink">Banner Link</label>
                      <InputField
                        type="text"
                        className={`form-control ${
                          errors.bannerLink ? "border-danger" : ""
                        }`}
                        id="bannerLink"
                        value={bannerMaster.bannerLink}
                        onChange={(e) => handleChange(e, "bannerLink")}
                      />
                    </div>

                    <div className="col-sm-3 form-group mb-2">
                      <label htmlFor="displayOrder">Display Order</label>
                      <InputField
                        type="text"
                        className={`form-control ${
                          errors.displayOrder ? "border-danger" : ""
                        }`}
                        id="displayOrder"
                        value={bannerMaster.displayOrder}
                        onChange={(e) => handleChange(e, "displayOrder")}
                      />
                    </div>

                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="image">
                        {upload_image}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <div className="form-file">
                          <InputField
                            type="file"
                            accept="image/jpg,image/png"
                            value={bannerMaster.image}
                            className={` ${
                              errors.image
                                ? "border-danger"
                                : "form-file-input form-control"
                            }`}
                            onChange={(e) => handleChange(e, "image")}
                          />
                        </div>
                        <span className="input-group-text">{upload}</span>
                      </div>
                      {<p className="text-danger">{errors.image}</p>}
                    </div>

                    <div className="col-sm-3 form-group mb-2">
                      <label htmlFor="status">Status</label>
                      <Dropdown
                        className={`${
                          errors.enabled
                            ? "border-danger-select"
                            : "form-select"
                        }`}
                        id="status"
                        value={bannerMaster?.enabled}
                        onChange={(e) => handleChange(e, "enabled")}
                        options={statusoptions}
                      ></Dropdown>
                    </div>
                    {prefilledData ? (
                      <div className="col-sm-12 form-group mb-0 mt-2">
                        <Button
                          type="submit"
                          className="btn btn-primary float-right"
                          icon={"fa fa-arrow-right"}
                          text={update}
                        ></Button>
                      </div>
                    ) : (
                      <div className="col-sm-12 form-group mb-0 mt-2">
                        <Button
                          type="submit"
                          className="btn btn-primary float-right"
                          icon={"fa fa-arrow-right"}
                          text={submitTranslation}
                        ></Button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerForm;
