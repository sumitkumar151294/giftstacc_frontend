import React, { useState, useEffect } from "react";
import Loader from "../../../Componenets/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetSupplierList,
  onVendorSubmit,
} from "../../../Store/Slices/supplierMasterSlice";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";

const SupplierMasterDetails = ({ data }) => {
  const dispatch = useDispatch();
  const [isformLoading, setIsFormLoading] = useState(true);
  const [vendorData, setVendorData] = useState({});
  const [errors, setErrors] = useState({});
  const supplyPostData = useSelector((state) => state.supplierMasterReducer);
  const update = GetTranslationData("UIAdmin", "update_label");
  const submit = GetTranslationData("UIAdmin", "submit_label");

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
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    // Check if fields are empty and set corresponding error messages
    for (const key in vendorData) {
      if (vendorData[key] === "") {
        newErrors[key] = "This field is Required ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    if (isValid) {
      setIsFormLoading(true);
      dispatch(onVendorSubmit(vendorData));
    }
  };
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Supplier Master</h4>
              </div>
              <div class="card-body position-relative">
                {!isformLoading ? (
                  <div style={{ height: "200px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div class="container mt-3">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className={`col-sm-4 form-group mb-2 $`}>
                          <label htmlFor="name-f">
                            Supplier Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={vendorData?.name}
                            className={` ${
                              errors.name ? "border-danger" : "form-control"
                            }`}
                            name="fname"
                            id="name-f"
                            placeholder=""
                            onChange={(e) => handleChange(e, "name")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="name-l">
                            Supplier Client ID{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={vendorData?.id}
                            className={` ${
                              errors.id ? "border-danger" : "form-control"
                            }`}
                            name="lname"
                            id="name-l"
                            placeholder=""
                            onChange={(e) => handleChange(e, "id")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="text">
                            Supplier Client Secret{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={` ${
                              errors.secret ? "border-danger" : "form-control"
                            }`}
                            name="text"
                            value={vendorData.secret}
                            id="text"
                            placeholder=""
                            onChange={(e) => handleChange(e, "secret")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="text">
                            Username <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={vendorData.username}
                            className={` ${
                              errors.username ? "border-danger" : "form-control"
                            }`}
                            placeholder=""
                            onChange={(e) => handleChange(e, "username")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="password-1">
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            value={vendorData.password}
                            className={` ${
                              errors.password ? "border-danger" : "form-control"
                            }`}
                            name="password"
                            id="password-1"
                            placeholder=""
                            onChange={(e) => handleChange(e, "password")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="status">
                            Status <span className="text-danger">*</span>
                          </label>
                          <select
                            className={` ${
                              errors.status ? "border-danger" : "form-control"
                            }`}
                            aria-label="Default select example"
                            name="status"
                            value={vendorData.status}
                            onChange={(e) => handleChange(e, "status")}
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            <option value="Active">Active</option>
                            <option value="Non-Active">Non-Active</option>
                          </select>
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="zip">
                            End Point <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={vendorData.endPoint}
                            className={` ${
                              errors.endPoint ? "border-danger" : "form-control"
                            }`}
                            name="Zip"
                            id="zip"
                            placeholder=""
                            onChange={(e) => handleChange(e, "endPoint")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="pass">
                            Authorization Code{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            className={` ${
                              errors.code ? "border-danger" : "form-control"
                            }`}
                            id="pass"
                            value={vendorData.AuthCode}
                            placeholder=""
                            onChange={(e) => handleChange(e, "code")}
                          />
                        </div>

                        <div className="col-sm-4 form-group mb-2">
                          <label htmlFor="amount">
                            Min. Threshold Amount{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="text"
                            value={vendorData.amount}
                            className={` ${
                              errors.amount ? "border-danger" : "form-control"
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
                          All the * fields are required.
                        </span>

                        <div className="col-sm-12 form-group mb-0 mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary float-right pad-aa"
                          >
                            {data.name ? update : submit}{" "}
                            <i className="fa fa-arrow-right"></i>
                          </button>
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
