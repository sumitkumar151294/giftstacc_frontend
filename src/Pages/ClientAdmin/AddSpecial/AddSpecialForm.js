/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputField from "../../../Components/InputField/InputField";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import Button from "../../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddSpecialSubmit,
  onAddSpecialUpdate,
  onGetAddSpecial,
} from "../../../Store/Slices/ClientAdmin/addSpecialListSlice";
import Loader from "../../../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";

const AddSpecialForm = ({ prefilledValues, setPrefilledValues }) => {
  const active = GetTranslationData("UIClient", "active_option");
  const non_active = GetTranslationData("UIClient", "non_active_option");
  const requiredLevel = GetTranslationData("UIAdmin", "required_label");
  const getAddSpecial = useSelector((state) => state.addSpecialReducer);
  const field_Required = GetTranslationData("UIAdmin", "field_Required");
  const description = GetTranslationData("UIAdmin", "description");
  const addSpecialMaster = GetTranslationData("UIClient", "addSpecialMaster");
  const isSpecial_checked = GetTranslationData("UIClient", "isSpecial_checked");
  const section_Name = GetTranslationData("UIClient", "section_Name ");
  const displayOrder = GetTranslationData("UIClient", "display-order");
  const status = GetTranslationData("UIClient", "status");
  const Max_Brands = GetTranslationData("UIClient", "Max_Brands  ");
  const Is_Special = GetTranslationData("UIClient", "Is_Special ");
  const Button_Text = GetTranslationData("UIAdmin", "button_Text");

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sectionName: "",
    displayOrder: "",
    maximumNumberOfBrands: "",
    description: "",
    IsSpecial: "",
    enabled: "",
    buttonText: "",
  });
  const [error, setError] = useState({
    sectionName: "",
    displayOrder: "",
    maximumNumberOfBrands: "",
    description: "",
    IsSpecial: "",
    enabled: "",
    buttonText: "",
  });
  const resetField = {
    sectionName: "",
    displayOrder: "",
    maximumNumberOfBrands: "",
    description: "",
    IsSpecial: "",
    enabled: "",
    buttonText: "",
  };
  const statusoptions = [
    { value: true, label: active },
    { value: false, label: non_active },
  ];
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setFormData({
      sectionName: prefilledValues?.sectionName || "",
      displayOrder: prefilledValues?.displayOrder || "",
      enabled:
        prefilledValues?.enabled !== undefined ? prefilledValues?.enabled : "",
      maximumNumberOfBrands: prefilledValues?.maximumNumberOfBrands || "",
      description: prefilledValues?.description || "",
      IsSpecial: prefilledValues?.isSpecial, // Use boolean value directly
      buttonText: prefilledValues?.buttonText,
    });
    setError({
      sectionName: "",
      displayOrder: "",
      enabled: "",
      maximumNumberOfBrands: "",
      description: "",
      IsSpecial: "",
      buttonText: "",
    });
  }, [prefilledValues]);
  useEffect(() => {
    dispatch(onGetAddSpecial());
  }, []);

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

  useEffect(() => {
    if (!prefilledValues) {
      if (getAddSpecial?.status_code === "201") {
        toast.success(getAddSpecial.message);
        setFormData(resetField);
        dispatch(onGetAddSpecial());
      }
    } else if (prefilledValues) {
      if (getAddSpecial?.status_code === "201") {
        toast.success(getAddSpecial.message);
        setFormData(resetField);
        setPrefilledValues("");
        dispatch(onGetAddSpecial());
      }
    }
  }, [getAddSpecial.status_code]);
  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    if (name === "IsSpecial") {
      setFormData({
        ...formData,
        IsSpecial: checked,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...error };

    // Validate form fields
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = field_Required;
        isValid = false;
      } else if (formData[key]?.length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    if (!formData.buttonText?.trim()) {
      newErrors.buttonText = field_Required;
      isValid = false;
    }
    setError(newErrors);

    if (isValid) {
      const specialExists =
        Array.isArray(getAddSpecial?.getData) &&
        getAddSpecial?.getData.some((item) => item.isSpecial === true);
      if (specialExists && formData.IsSpecial === true) {
        const editedItem = getAddSpecial.getData.find(
          (item) => item?.id === prefilledValues?.id
        );
        const otherSpecialItemsCount = getAddSpecial.getData.filter(
          (item) => item.isSpecial === true && item?.id !== prefilledValues?.id
        ).length;

        if (editedItem && otherSpecialItemsCount > 0) {
          toast.error(isSpecial_checked);
          return;
        }
      }
      const submissionData = {
        ...formData,
        displayOrder: parseInt(formData.displayOrder),
        maximumNumberOfBrands: parseInt(formData.maximumNumberOfBrands),
        enabled: formData.enabled === "true",
      };
      if (specialExists && formData.IsSpecial === true) {
        toast.error(isSpecial_checked);
        return;
      }

      if (prefilledValues) {
        const updatedData = { ...submissionData, id: prefilledValues?.id };
        dispatch(onAddSpecialUpdate(updatedData));
      } else {
        dispatch(onAddSpecialSubmit(submissionData));
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{addSpecialMaster}</h4>
              </div>
              <div className="card-body card-body-user">
                {getAddSpecial?.isLoading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classNameType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="row">
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="name-f">
                            {section_Name}
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
                            onChange={(e) => handleInput(e, "sectionName")}
                          />
                          {/* {<p className="text-danger">{error.sectionName}</p>} */}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="displayOrder">
                            {displayOrder}{" "}
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
                          />
                        </div>

                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="enabled">
                            {status} <span className="text-danger">*</span>
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
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="maxNumBrand">
                            {Max_Brands}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            value={formData?.maximumNumberOfBrands}
                            className={`${
                              error.maximumNumberOfBrands
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="maximumNumberOfBrands"
                            id="maximumNumberOfBrands"
                            onChange={(e) =>
                              handleInput(e, "maximumNumberOfBrands")
                            }
                          />
                        </div>
                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="buttonText">
                            {Button_Text} <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            className={`form-control ${
                              error.buttonText ? "border-danger" : ""
                            }`}
                            id="buttonText"
                            value={formData.buttonText}
                            onChange={(e) => handleInput(e, "buttonText")}
                          />
                          {/* {<p className="text-danger">{error.buttonText}</p>} */}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="maxNumBrand">
                            {description}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="text"
                            value={formData?.description}
                            className={`${
                              error.description
                                ? "border-danger"
                                : "form-control"
                            }`}
                            name="description"
                            id="description"
                            onChange={(e) => handleInput(e, "description")}
                          />
                          {/* {<p className="text-danger">{error.description}</p>} */}
                        </div>
                        <div className="col-sm-3 form-group   mt-2 isSpecial">
                          <InputField
                            className="form-check-input mt-3"
                            type="checkbox"
                            name="IsSpecial"
                            value={formData?.IsSpecial}
                            checked={formData.IsSpecial} // Use checked attribute with boolean value
                            id="flexCheckDefault1"
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label mt-3 fnt-15"
                            htmlFor="flexCheckDefault1"
                          >
                            {Is_Special}{" "}
                          </label>
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

export default AddSpecialForm;
/* eslint-enable react-hooks/exhaustive-deps */
