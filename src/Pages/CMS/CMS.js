import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onCmsSubmit } from "../../redux/modules/UserAdmin/cmsSlice";
import Loader from "../../Admin/Loader/Loader";

const CMS = () => {
  const [cmsData, setCmsData] = useState({
    pageName: "",
    shortDescription: "",
    longDescription: "",
  });
  const [errors, setErrors] = useState({
    pageName: "",
    shortDescription: "",
    longDescription: "",
  });
  const [isLoading, setIsLoading] = useState("true");
  const dispatch = useDispatch();

  const handleChange = (e, fieldName) => {
    setCmsData({
      ...cmsData,
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
    for (const key in cmsData) {
      if (cmsData[key] === "") {
        newErrors[key] = "This field is required";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    if (isValid) {
      dispatch(onCmsSubmit(cmsData));
    }
  };

  return (
    <>
      <div class="content-body">
        {!isLoading ? (
          <Loader />
        ) : (
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-12 col-xxl-12">
                <div class="card">
                  <div class="card-header d-flex justify-content-between">
                    <h4 class="card-title">CMS</h4>

                    <div class="dropdown-side">
                      <div class="form-group mb-2">
                        <select
                          class="form-select"
                          name="pageName"
                          value={cmsData.pageName}
                          onChange={(e) => handleChange(e, "pageName")}
                          aria-label="Default select example"
                        >
                          <option selected>
                            Select Page Name &nbsp;
                            <i class="fa fa-angle-down"></i>
                          </option>
                          <option value="About us">About us</option>
                          <option value="Privacy Policy">Privacy Policy</option>
                          <option value="Terms and Conditions">
                            Terms and Conditions
                          </option>
                          <option value="Contact us">Contact us</option>
                          <option value="LC Loyality Program">
                            LC Loyality Program
                          </option>
                        </select>
                        <p className="text-danger">{errors.pageName}</p>
                      </div>
                    </div>
                  </div>

                  <div class="card-body ">
                    <div class="form-group mb-2">
                      <label for="name-f">Short Description</label>
                      <textarea
                        name="textarea"
                        id="textarea"
                        cols="60"
                        rows="10"
                        class="form-control bg-transparent"
                        placeholder=""
                        onChange={(e) => handleChange(e, "shortDescription")}
                      ></textarea>
                      <p className="text-danger">{errors.shortDescription}</p>
                    </div>

                    <div class="form-group mb-2 if">
                      <label for="name-f">Long Description</label>
                      <textarea
                        name="textarea"
                        id="textarea"
                        cols="60"
                        rows="10"
                        class="form-control bg-transparent"
                        placeholder=""
                        onChange={(e) => handleChange(e, "longDescription")}
                      ></textarea>
                      <p className="text-danger">{errors.longDescription}</p>
                    </div>

                    <div class="form-group mb-0 mt-2">
                      <button
                        type="submit"
                        class="btn btn-primary float-right pad-aa"
                        onClick={handleSubmit}
                      >
                        Submit <i class="fa fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CMS;
