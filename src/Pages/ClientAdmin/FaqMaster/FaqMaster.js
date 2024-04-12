/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  onFaqMasterSubmit,
  onFaqMasterSubmitReset,
  onGetFaqMaster,
  onGetFaqMasterReset,
} from "../../../Store/Slices/ClientAdmin/faqMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../Components/InputField/InputField";
import Loader from "../../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import {
  onFaqCategorySubmitReset,
  onGetFaqCategory,
} from "../../../Store/Slices/ClientAdmin/faqCategorySlice";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import Button from "../../../Components/Button/Button";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import PageError from "../../../Components/PageError/PageError";

const FaqMaster = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const faqMasterGetData = useSelector((state) => state.faqMasterReducer);
  const faqCategory = useSelector((state) => state.faqCategoryReducer.getData);
  const [rowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const submitTranslation = GetTranslationData("UIAdmin", "submit_label");
  const requiredLevel = GetTranslationData("UIAdmin", "required_label");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const [faqInfo, setFaqInfo] = useState({
    categoryId: "",
    question: "",
    answer: "",
    clientId: "2",
  });
  const resetField = {
    categoryId: "",
    question: "",
    answer: "",
    clientId: "2",
  };
  const [errors, setErrors] = useState({
    categoryId: "",
    question: "",
    answer: "",
  });

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(() => {
    setShowLoader(false);
  }, [showLoader]);
  useEffect(() => {
    if (faqMasterGetData.status_code === "201") {
      toast.success(faqMasterGetData.message);
      setFaqInfo(resetField);
      dispatch(onFaqMasterSubmitReset());
      dispatch(onFaqCategorySubmitReset());
      dispatch(onGetFaqMaster());
    } else if (faqMasterGetData.status_code === 404) {
      dispatch(onGetFaqMasterReset());
      toast.error(faqMasterGetData.getmessage);
    }
  }, [faqMasterGetData?.status_code]);
  useEffect(() => {
    dispatch(onGetFaqMaster());
    dispatch(onGetFaqCategory());
  }, []);

  const handleChange = (e, fieldName) => {
    setFaqInfo({
      ...faqInfo,
      [fieldName]: e.target.value,
    });

    // Remove the error message when the user starts typing
    if (!!errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    // Check if fields are empty and set corresponding error messages
    for (const key in faqInfo) {
      if (faqInfo[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else if (faqInfo[key].length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    if (isValid) {
      dispatch(onFaqMasterSubmit(faqInfo));
    }
  };
  const FaqMasterCategory = (Categorydata) => {
    const category =
      Array.isArray(faqCategory) &&
      faqCategory.find((data) => data.id === Categorydata);
    return category ? category.name : "";
  };
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer.filteredData
  );
  return (
    <div>
    {getRoleAccess[0] !== undefined ? (
    <>
      <ScrollToTop />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4 className="card-title">FAQ's Categories</h4>
              </div>
              {getRoleAccess[0]?.addAccess && (

              <div className="card-body pt-4 ml-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="name-l">
                        Category <span className="text-danger">*</span>
                      </label>
                      <Dropdown
                        onChange={(e) => handleChange(e, "categoryId")}
                        error={errors.categoryId}
                        ariaLabel="Select"
                        value={faqInfo.categoryId}
                        className={` ${
                          errors.categoryId ? "border-danger" : "form-select"
                        }`}
                        options={
                          Array.isArray(faqCategory)
                            ? faqCategory?.map((category) => ({
                                label: category.name,
                                value: category.id,
                                data: category.code,
                              }))
                            : []
                        }
                      />
                    </div>
                    <div className="col-sm-12 form-group mb-2">
                      <label htmlFor="name-f">
                        Question <span className="text-danger">*</span>
                      </label>
                      <InputField
                        type="text"
                        className={`form-control ${
                          errors.question ? "border-danger" : ""
                        }`}
                        id="name-f"
                        placeholder=""
                        value={faqInfo.question}
                        onChange={(e) => handleChange(e, "question")}
                      />
                      {<p className="text-danger">{errors.question}</p>}
                    </div>
                    <div className="col-sm-12 form-group mb-2">
                      <label htmlFor="textarea">
                        Answer <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="textarea"
                        cols="60"
                        rows="10"
                        className={`form-control bg-transparent ${
                          errors.answer ? "border-danger" : ""
                        }`}
                        placeholder=""
                        value={faqInfo.answer}
                        onChange={(e) => handleChange(e, "answer")}
                      ></textarea>
                      {<p className="text-danger">{errors.answer}</p>}
                    </div>
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
                      type="submit"
                      className="btn btn-primary float-right"
                      icon={"fa fa-arrow-right"}
                      text={submitTranslation}
                    ></Button>
                    <ToastContainer />
                  </div>
                </form>
              </div>
              )}
              {showLoader ? (
                <div style={{ height: "400px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : (
                <>
                  {Array.isArray(faqMasterGetData?.getData) &&
                  faqMasterGetData?.getData?.length > 0 ? (
                    <div className="card-body pt-4  ml-4">
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>S.NO</th>
                              <th>Date</th>
                              <th>Category</th>
                              <th>Question</th>
                              <th>Answer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(faqMasterGetData.getData) &&
                              faqMasterGetData.getData
                                .slice(startIndex, endIndex)
                                .map((data, index) => (
                                  <tr key={index}>
                                    <td>{data.id}</td>
                                    <td>
                                      {new Date(
                                        data?.createdOn
                                      ).toLocaleDateString("en-GB")}
                                    </td>
                                    <td>
                                      {FaqMasterCategory(data.categoryId)}
                                    </td>
                                    <td>{data.question}</td>
                                    <td>{data.answer}</td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                        {faqMasterGetData.getData?.length > 5 && (
                          <div className="pagination-container">
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={" >"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(
                                faqMasterGetData.getData?.length / rowsPerPage
                              )}
                              marginPagesDisplayed={2}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                              initialPage={page - 1} // Use initialPage instead of forcePage
                              previousClassName={
                                page === 0 ? disabled_Text : ""
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <NoRecord />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
      ):(
        <PageError
            pageError={{
              StatusCode: "401",
              ErrorName: "Permission Denied",
              ErrorDesription:
                "Your application url is not registerd to our application",
              url: "/",
              buttonText: "Back to Home",
            }}
          />
      )}
    </div>
  );
};

export default FaqMaster;
