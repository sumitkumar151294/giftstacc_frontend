import React, { useState, useEffect } from "react";
import Loader from "../../../Componenets/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetSupplierList,
  onUpdateSupplierList,
  onVendorSubmit,
} from "../../../Store/Slices/supplierMasterSlice";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";
import { ToastContainer, toast } from "react-toastify";
import { onClientMasterSubmit } from "../../../Store/Slices/clientMasterSlice";

const SupplierMasterDetails = ({ data }) => {
  const dispatch = useDispatch();
  const [isformLoading, setIsFormLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [vendorData, setVendorData] = useState({});
  const [errors, setErrors] = useState({});
  const supplyPostData = useSelector((state) => state.supplierMasterReducer);
  const update = GetTranslationData("UIAdmin", "update_label");
  const submit = GetTranslationData("UIAdmin", "submit_label");
  const supplierMaster = GetTranslationData("UIAdmin", "supplierMaster");
  const supplierName = GetTranslationData("UIAdmin", "supplierName");
  const supplierClientID = GetTranslationData("UIAdmin", "supplierClientID");
  const supplierClientSecret = GetTranslationData("UIAdmin", "supplierClientSecret");
  const userName = GetTranslationData("UIAdmin", "usernamee_label");
  const password = GetTranslationData("UIAdmin", "password_label");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const endPoint = GetTranslationData("UIAdmin", "endPoint");
  const select = GetTranslationData("UIAdmin", "select");
  const active = GetTranslationData("UIAdmin", "active");
  const nonActive = GetTranslationData("UIAdmin", "nonActive");
  const authorizationCode = GetTranslationData("UIAdmin", "authorizationCode ");
  const minThresholdAmount = GetTranslationData("UIAdmin", "minThresholdAmount");
  const required_label = GetTranslationData("UIAdmin", "required_label");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // Update the state when the data prop changes
    setVendorData({
      name: data?.name || "",
      secret: "",
      id: data?.id || "",
      username: "",
      password: "",
      endPoint: "",
      code: "",
      status: "",
      amount: "",
    });

    // You may also want to reset errors here if needed
    setErrors({
      name: "",
      secret: "",
      id: "",
      username: "",
      password: "",
      endPoint: "",
      code: "",
      status: "",
      amount: "",
    });

    if (supplyPostData.status_code === 200) {
      setIsFormLoading(false);
      dispatch(onGetSupplierList());
    }
  }, [data]);

  const handleChange = (e, fieldName) => {
    setVendorData({
      ...vendorData,
      [fieldName]: e.target.value,
    });

    // Remove the error message when the user starts typing
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  //  Submit Button for handle  input fields data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    // Check if fields are empty and set corresponding error messages
    for (const key in vendorData) {
      if (vendorData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    if (isValid) {
      if (!data.name) {
        try {
          setShowToast(true);
          // setIsFormLoading(true);
          dispatch(onVendorSubmit(vendorData));
        } catch (error) {
          // Handle any errors during dispatch
          console.error(error);
        }
      } else if (data.name) {
        try {
          setShowUpdate(true);
          // setIsFormLoading(true);
          await dispatch(onUpdateSupplierList(vendorData));

          // Define a function to show a toast notification based on loginDetails
        } catch (error) {
          // Handle any errors during dispatch
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    if (showToast) {
      if (supplyPostData.message === "Added Successfully.") {
        // setIsFormLoading(false);
        dispatch(onGetSupplierList());
        toast.success(supplyPostData.message);
      }
    } else {
      // setIsFormLoading(false);
      toast.error(supplyPostData.message);
    }
    if (showUpdate) {
      if (supplyPostData.message === "Update Successfully.") {
        // setIsFormLoading(false);
        dispatch(onClientMasterSubmit());
        toast.success(supplyPostData.message);
      }
    }
  }, [supplyPostData.message]);
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">{supplierMaster}</h4>
              </div>
              <div class="card-body position-relative">
                {isformLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div class="container mt-3">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className={`col-sm-4 form-group mb-2 $`}>
                          <label htmlFor="name-f">
                            {supplierName} <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={vendorData?.name}
                            className={` ${errors.name ? "border-danger" : "form-control"
                              }`}
                            name="fname"
                            id="name-f"
                            placeholder=""
                            onChange={(e) => handleChange(e, "name")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-l">
                            {supplierClientID}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={vendorData?.id}
                            className={` ${errors.id ? "border-danger" : "form-control"
                              }`}
                            name="lname"
                            id="name-l"
                            placeholder=""
                            onChange={(e) => handleChange(e, "id")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="text">
                            {supplierClientSecret}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={` ${errors.secret ? "border-danger" : "form-control"
                              }`}
                            name="text"
                            value={vendorData.secret}
                            id="text"
                            placeholder=""
                            onChange={(e) => handleChange(e, "secret")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="text"> {userName}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={vendorData.username}
                            className={` ${errors.username ? "border-danger" : "form-control"
                              }`}
                            placeholder=""
                            onChange={(e) => handleChange(e, "username")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="password-1">
                            {password} <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            value={vendorData.password}
                            className={` ${errors.password ? "border-danger" : "form-control"
                              }`}
                            name="password"
                            id="password-1"
                            placeholder=""
                            onChange={(e) => handleChange(e, "password")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="status">
                            {status} <span className="text-danger">*</span>
                          </label>
                          <select
                            className={` ${errors.status ? "border-danger" : "form-control"
                              }`}
                            aria-label="Default select example"
                            name="status"
                            value={vendorData.status}
                            onChange={(e) => handleChange(e, "status")}
                          >
                            <option value="" disabled>
                              {select}
                            </option>
                            <option value="Active">{active}</option>
                            <option value="Non-Active">{nonActive}</option>
                          </select>
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="zip">
                            {endPoint} <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={vendorData.endPoint}
                            className={` ${errors.endPoint ? "border-danger" : "form-control"
                              }`}
                            name="Zip"
                            id="zip"
                            placeholder=""
                            onChange={(e) => handleChange(e, "endPoint")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="pass">
                           {authorizationCode}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            className={` ${errors.code ? "border-danger" : "form-control"
                              }`}
                            id="pass"
                            value={vendorData.AuthCode}
                            placeholder=""
                            onChange={(e) => handleChange(e, "code")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="amount">
                            {minThresholdAmount}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="text"
                            value={vendorData.amount}
                            className={` ${errors.amount ? "border-danger" : "form-control"
                              }`}
                            id="amount"
                            placeholder=""
                            onChange={(e) => handleChange(e, "amount")}
                          />
                        </div>

                        <span
                          className="form-check-label"
                          for="basic_checkbox_1"
                        >
                          {required_label}
                        </span>

                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary float-right pad-aa"
                          >
                            {data.name ? update : submit}
                            <i className="fa fa-arrow-right"></i>
                          </button>
                          <ToastContainer />
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

export default SupplierMasterDetails;
