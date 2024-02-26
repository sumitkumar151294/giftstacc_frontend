import React, { useEffect, useState } from "react";
import HtmlEditor from "../../../Components/HtmlEditor/HtmlEditor";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { onCmsSubmit, onPostCms } from "../../../Store/Slices/cmsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";


const CMS = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dispatch = useDispatch();
  const data = useSelector(state => state.cmsReducer)
  const [cmsData, setCmsData] = useState({
    pageName: "",
    shortDescription: "",
    longDescription: "",
  });
  const [errors, setErrors] = useState({
    pageName: "",
    shortDescription: "",
    longDescription:"",
  });
  const [isLoading, setIsLoading] = useState(false);
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
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
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
    dispatch(onPostCms(cmsData));

    //}
  };

  const PageNames = [
    "About us",
    "Privacy Policy",
    "Terms and Conditions",
    "LC Loyality Program",
  ];

  const DataArray = [
    { name: "John", age: 30, profession: "Engineer" },
    { name: "Alice", age: 25, profession: "Teacher" },
    { name: "Michael", age: 40, profession: "Doctor" },
    { name: "Emily", age: 28, profession: "Artist" },
    { name: "David", age: 35, profession: "Software Developer" },
    { name: "Sophia", age: 22, profession: "Student" },
    { name: "Daniel", age: 45, profession: "Lawyer" },
    { name: "Emma", age: 33, profession: "Architect" },
    { name: "Olivia", age: 29, profession: "Nurse" },
    { name: "Matthew", age: 27, profession: "Entrepreneur" },
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
              <div className="card-body">
                {isLoading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : Array.isArray(DataArray) && DataArray.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>{GetTranslationData("UIClient", "id")}</th>
                          <th>{GetTranslationData("UIClient", "Page_Name")}</th>
                          <th>
                            {GetTranslationData(
                              "UIClient",
                              "short_description"
                            )}
                          </th>
                          <th>
                            {GetTranslationData("UIClient", "long_description")}
                          </th>
                          <th>{GetTranslationData("UIClient", "action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DataArray.slice(startIndex, endIndex).map((data) => (
                          <tr>
                            <td>{data.name}</td>
                            <td>{data.name}</td>
                            <td>{data.age}</td>
                            <td>{data.profession}</td>
                            <td>
                              <div className="d-flex">
                                <a
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  // onClick={() => handleEdit(vendor)}
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </a>
                                <a
                                  className="btn btn-danger shadow btn-xs sharp"
                                  // onClick={() =>
                                  //   handleDelete(vendor)
                                  // }
                                >
                                  <i className="fa fa-trash"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {DataArray.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(DataArray.length / rowsPerPage)}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                          previousClassName={page === 1 ? "disabled" : ""}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <NoRecord />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CMS;
