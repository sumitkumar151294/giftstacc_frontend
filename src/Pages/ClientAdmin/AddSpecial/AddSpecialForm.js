import React, { useEffect, useState } from "react";
import InputField from "../../../Components/InputField/InputField";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import Button from "../../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddSpecialSubmit,
  onAddSpecialSubmitReset,
  onAddSpecialUpdate,
  onGetAddSpecial,
} from "../../../Store/Slices/ClientAdmin/addSpecialListSlice";
import Loader from "../../../Components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";

const AddSpecialForm = ({ prefilledValues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const getAddSpecial = useSelector((state) => state.addSpecialReducer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    sectionName: "",
    displayOrder: "",
    status: "",
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
    { value: "Active", label: "Active" },
    { value: "Non-Active", label: "Non-Active" },
  ];
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setFormData({
      sectionName: prefilledValues?.sectionName || "",
      displayOrder: prefilledValues?.displayOrder || "",
      status: prefilledValues?.status || "",
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
      } else if (getAddSpecial?.message?.data?.HttpStatusCode === "500") {
        toast.error(getAddSpecial.message?.data?.ErrorMessage);
      }
    } else if (prefilledValues) {
      if (getAddSpecial?.status_code === "201") {
        toast.success(getAddSpecial.message);
        setFormData(resetField);
        dispatch(onGetAddSpecial());
      }
    }
  }, [getAddSpecial.status_code, getAddSpecial.message?.data?.HttpStatusCode]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...error };
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setError(newErrors);
    if (isValid) {
      console.log(formData);
      if (prefilledValues) {
        dispatch(onAddSpecialUpdate({ ...formData, id: prefilledValues?.id }));
      } else {
        const submissionData = {
          ...formData,
          displayOrder: parseInt(formData.displayOrder), // Convert displayOrder to integer
          maximumNumberOfBrands: parseInt(formData.maximumNumberOfBrands), // Convert maxNumBrand to integer
          status: formData.status === "Active" ? true : false, // Convert status to boolean based on selection
        };
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
                <h4 className="card-title">Add Special Master</h4>
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
                          <label htmlFor="name-f">Section Name</label>
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
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="displayOrder">Display Order</label>
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
                          <label htmlFor="status">Status</label>
                          <Dropdown
                            aria-label="Default select example"
                            onChange={(e) => handleInput(e, "status")}
                            value={formData?.status ? "Active" : "Non-Active"}
                            className={`${
                              error.status
                                ? "border-danger-select"
                                : "form-select"
                            }`}
                            options={statusoptions}
                          />
                        </div>
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="maxNumBrand">
                            Max. No. of Brands
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
      ;
    </>
  );
};

export default AddSpecialForm;
