import React, { useEffect, useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useSelector } from "react-redux";
import { onGetSupplierBrandList } from "../../Store/Slices/supplierBrandListSlice";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import { useDispatch } from "react-redux";
import {
  onGetbannerMaster,
  onbannerMasterSubmit,
} from "../../Store/Slices/bannerMasterSlice";
import Button from "../../Components/Button/Button";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
const BannerForm = ({ prefilledData }) => {
  const dispatch = useDispatch();
  const update = GetTranslationData("UIAdmin", "update_label");

  const submitTranslation = GetTranslationData("UIAdmin", "submit_label");
  const [bannerMaster, setBannerMaster] = useState({
    bannerPlacement: "",
    bannerTitle: "",
    bannerSubtitle: "",
    bannerLink: "",
    displayOrder: "",
    status: "",
    image: "",
  });
  useEffect(() => {
    if (prefilledData) {
      setBannerMaster({
        bannerPlacement: prefilledData.bannerPlacement || "",
        bannerTitle: prefilledData.title || "",
        bannerSubtitle: prefilledData.subtitle || "",
        bannerLink: prefilledData.link || "",
        displayOrder: prefilledData.order || "",
        status: prefilledData.status || "",
        image: prefilledData.image || "",
      });
      setErrors({
        bannerPlacement: prefilledData.bannerPlacement || "",
        bannerTitle: prefilledData.title || "",
        bannerSubtitle: prefilledData.subtitle || "",
        bannerLink: prefilledData.link || "",
        displayOrder: prefilledData.order || "",
        status: prefilledData.status || "",
        image: prefilledData.image || "",
      });
    }
  }, [prefilledData]);

  const [errors, setErrors] = useState({
    bannerPlacement: "",
    bannerTitle: "",
    bannerSubtitle: "",
    bannerLink: "",
    displayOrder: "",
    status: "",
    image: "",
  });
  const supplierMasterData = useSelector(
    (state) => state.supplierMasterReducer?.data
  );
  useEffect(() => {
    dispatch(onGetbannerMaster());

    dispatch(onGetSupplierBrandList());
    dispatch(onGetSupplierList());
  }, []);
  // Add more states for other form fields as necessary
  const handleChange = (e, fieldName) => {
    setBannerMaster({
      ...bannerMaster,
      [fieldName]: e.target.value,
    });

    // Remove the error message when the user starts typing
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
      dispatch(onbannerMasterSubmit(bannerMaster));
    }
  };
  return (
    <div className="row ml-6 pt-4">
      <div className="col-xl-12 col-xxl-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Banner Master</h4>
          </div>
          <div className="card-body pt-2 ml-6    mb-4">
            <div className="container-fluid">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-3 form-group mb-2">
                    <label htmlFor="bannerPlacement">Banner Placement</label>
                    <Dropdown
                      className={`${
                        errors.status ? "border-danger-select" : "form-select"
                      }`}
                      id="bannerPlacement"
                      value={bannerMaster.bannerPlacement}
                      onChange={(e) => handleChange(e, "bannerPlacement")}
                      options={
                        Array.isArray(supplierMasterData)
                          ? supplierMasterData?.map((item) => ({
                              label: item.name,
                              value: item.name,
                            }))
                          : []
                      }
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
                    <label htmlFor="uploadImage">Upload Image</label>
                    <div className="input-group   ">
                      <InputField
                        type="file"
                        className={`form-control upload ${
                          errors.image ? "border-danger" : ""
                        }`}
                        id="uploadImage"
                        onChange={(e) => handleChange(e, "image")}
                      />
                      <span className="input-group-text cursor">Upload</span>
                    </div>
                  </div>

                  <div className="col-sm-3 form-group mb-2">
                    <label htmlFor="status">Status</label>
                    <Dropdown
                      className={`${
                        errors.status ? "border-danger-select" : "form-select"
                      }`}
                      id="status"
                      value={bannerMaster.status}
                      onChange={(e) => handleChange(e, "status")}
                      options={
                        Array.isArray(supplierMasterData)
                          ? supplierMasterData?.map((item) => ({
                              label: item.name,
                              value: item.name,
                            }))
                          : []
                      }
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
  );
};
export default BannerForm;
