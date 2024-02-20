import React, { useState } from "react";
import HtmlEditor from "../../../Components/HtmlEditor/HtmlEditor";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";

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
  // const [isLoading, setIsLoading] = useState("true");
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
    // let isValid = true;
    const newErrors = { ...errors };
    // Check if fields are empty and set corresponding error messages
    for (const key in cmsData) {
      if (cmsData[key] === "") {
        newErrors[key] = "This field is required";
        // isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    // if (isValid) {
    //   dispatch(onCmsSubmit(cmsData));
    // }
  };
  const PageNames = ["About us",
    "Privacy Policy", "Terms and Conditions", "LC Loyality Program"]



  const array = [
    { name: "John", age: 30, profession: "Engineer" },
    { name: "Alice", age: 25, profession: "Teacher" },
    { name: "Michael", age: 40, profession: "Doctor" },
    { name: "Emily", age: 28, profession: "Artist" },
    { name: "David", age: 35, profession: "Software Developer" },
    { name: "Sophia", age: 22, profession: "Student" },
    { name: "Daniel", age: 45, profession: "Lawyer" },
    { name: "Emma", age: 33, profession: "Architect" },
    { name: "Olivia", age: 29, profession: "Nurse" },
    { name: "Matthew", age: 27, profession: "Entrepreneur" }
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
                      {
                        PageNames.map((Option, index) =>
                          <option key={index} value={Option}>{Option}
                            &nbsp;
                            <i class="fa fa-angle-down"></i>
                          </option>
                        )
                      }
                    </select>
                    <p className="text-danger">{errors.pageName}</p>
                  </div>
                </div>
              </div>

              <div class="card-body">
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
                <HtmlEditor />
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
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table header-border table-responsive-sm">
                    <thead>
                      <tr>
                        <th>{GetTranslationData("UIClient","id")}</th>
                        <th>{GetTranslationData("UIClient", "Page_Name")}</th>
                        <th>{GetTranslationData("UIClient", "Page_Name")}</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <td>dcdasc</td>
                      <td>dcdasc</td>
                      <td>dcdasc</td>
                      <td>dcdasc</td>
                      <td>dcdasc</td>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CMS;
