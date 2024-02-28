import React, { useState } from "react";
import HtmlEditor from "../../../Components/HtmlEditor/HtmlEditor";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { onPostCms } from "../../../Store/Slices/cmsSlice";
import { useDispatch, useSelector } from "react-redux";

const CMSForm = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cmsReducer);
  const [isLoading, setIsLoading] = useState(false);
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
  const handleChange = (e, fieldName) => {
    setCmsData({
      ...cmsData,
      [fieldName]: e.target?.value,
    });

    // Remove the error message when the user starts typing
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const handleHTMLChange = (html) => {
    setCmsData({
      ...cmsData,
      longDescription: html,
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

    dispatch(onPostCms(cmsData));
    }
  };

  const PageNames = [
    "About us",
    "Privacy Policy",
    "Terms and Conditions",
    "LC Loyality Program",
  ];

  return (
    <>
      {/* {!isLoading ? (
          <Loader />
        ) : ( */}
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12 col-xxl-12">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <h4 class="card-title">
                  {GetTranslationData("UIClient", "cms")}
                </h4>
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
                      {PageNames.map((Option, index) => (
                        <option key={index} value={Option}>
                          {Option}
                          &nbsp;
                          <i class="fa fa-angle-down"></i>
                        </option>
                      ))}
                    </select>
                    <p className="text-danger">{errors.pageName}</p>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div class="form-group mb-2">
                  <label for="name-f">
                    {GetTranslationData("UIClient", "short_description")}
                  </label>
                  <textarea
                    name="textarea"
                    id="textarea"
                    cols="60"
                    rows="10"
                    class="form-control bg-transparent"
                    placeholder=""
                    value={cmsData.shortDescription}
                    onChange={(e) => handleChange(e, "shortDescription")}
                  ></textarea>
                  <p className="text-danger">{errors.shortDescription}</p>
                </div>

                <div class="form-group mb-2">
                  <label for="name-f">
                    {GetTranslationData("UIClient", "long_description")}
                  </label>
                  <HtmlEditor
                    value={cmsData.longDescription}
                    onChange={handleHTMLChange}
                  />
                  <p className="text-danger">{errors.longDescription}</p>
                </div>
                <div class="form-group mb-0 mt-2">
                  <button
                    type="submit"
                    class="btn btn-primary float-right pad-aa"
                    onClick={handleSubmit}
                  >
                    {GetTranslationData("UIClient", "sumbit")}{" "}
                    <i class="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CMSForm;
