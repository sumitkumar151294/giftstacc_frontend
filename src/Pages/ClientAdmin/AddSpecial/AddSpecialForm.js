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
  const addSpecialMaster=GetTranslationData("UIClient", "addSpecialMaster");
  const section_name=GetTranslationData("UIClient", "section_name");
  const status = GetTranslationData("UIClient", "status");
  const displayOrder = GetTranslationData("UIClient", "display-order");
  const maxNoOfbrands = GetTranslationData("UIClient", "maxNoOfbrands");
  const submit = GetTranslationData("UIClient", "submitLabel");
  const update = GetTranslationData("UIAdmin", "update_label");
  const [isLoading, setIsLoading] = useState(false);
  const getAddSpecial = useSelector((state) => state.addSpecialReducer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sectionName: "",
    displayOrder: "",
    status: true,
    maximumNumberOfBrands: "",
  });
  const [error, setError] = useState({
    sectionName: "",
    displayOrder: "",
    status: "",
    maximumNumberOfBrands: "",
  });
  const resetField = {
    sectionName: "",
    displayOrder: "",
    status: "",
    maximumNumberOfBrands: "",
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
      status:
        prefilledValues?.status !== undefined ? prefilledValues?.status : "",

      maximumNumberOfBrands: prefilledValues?.maximumNumberOfBrands || "",
    });
    setError({
      sectionName: "",
      displayOrder: "",
      status: "",
      maximumNumberOfBrands: "",
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
      } else if(getAddSpecial?.status_code === 404){
        console.log("getAddSpecial",getAddSpecial);
        toast.error(getAddSpecial.getmessage);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...error };
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      }else if (formData[key].length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setError(newErrors);
    if (isValid) {
      if (!prefilledValues) {
        const submissionData = {
          ...formData,
          displayOrder: parseInt(formData.displayOrder), // Convert displayOrder to integer
          maximumNumberOfBrands: parseInt(formData.maximumNumberOfBrands), // Convert maxNumBrand to integer
          status: formData.status === "true" ? true : false, // Convert status to boolean based on selection
        };
        dispatch(onAddSpecialSubmit(submissionData));
      } else {
        const tempData = { ...formData };
        tempData.id = prefilledValues?.id;
        dispatch(
          onAddSpecialUpdate({
            ...tempData,
            status: formData.status === "true" ? true : false,
          })
        );
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
                {isLoading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classNameType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="container-fluid">
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="row">
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="name-f">{section_name} <span className="text-danger">*</span></label>
                          <InputField
                            type="text"
                            value={formData?.sectionName}
                            className={`${error.sectionName
                              ? "border-danger"
                              : "form-control"
                              }`}
                            name="fname"
                            id="name-f"
                            onChange={(e) => handleInput(e, "sectionName")}
                          />
                          {<p className="text-danger">{error.sectionName}</p>}
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="displayOrder">{displayOrder} <span className="text-danger">*</span></label>
                          <InputField
                            type="number"
                            value={formData?.displayOrder}
                            className={`${error.displayOrder
                              ? "border-danger"
                              : "form-control"
                              }`}
                            name="displayOrder"
                            id="displayOrder"
                            onChange={(e) => handleInput(e, "displayOrder")}
                          />
                        </div>

                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="status">{status} <span className="text-danger">*</span></label>
                          <Dropdown
                            aria-label="Default select example"
                            onChange={(e) => handleInput(e, "status")}
                            value={formData?.status}
                            className={`${error.status
                              ? "border-danger-select"
                              : "form-select"
                              }`}
                            options={statusoptions}
                          />
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="maxNumBrand">
                            {maxNoOfbrands}
                            <span className="text-danger">*</span>
                          </label>
                          <InputField
                            type="number"
                            value={formData?.maximumNumberOfBrands}
                            className={`${error.maximumNumberOfBrands
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
                            text={prefilledValues ? update : submit}
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
      ;
    </>
  );
};

export default AddSpecialForm;
/* eslint-enable react-hooks/exhaustive-deps */