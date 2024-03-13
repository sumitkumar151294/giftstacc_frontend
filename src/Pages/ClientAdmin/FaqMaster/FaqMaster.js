/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  onFaqMasterSubmit,
  onFaqMasterSubmitReset,
  onGetFaqMaster,
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
    clientId: "",
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
    }
  }, [faqMasterGetData]);
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
    const newErrors = {};

    // Check if fields are empty and set corresponding error messages
    for (const key in faqInfo) {
      if (faqInfo[key].trim() === "") {
        newErrors[key] = " ";
        isValid = false;
      }
    }
    setErrors(newErrors);
    if (isValid) {
      dispatch(onFaqMasterSubmit(faqInfo));
    }
  };
const FaqMasterCategory=(Categorydata)=>{
const category=Array.isArray(faqCategory) && faqCategory.find((data)=>data.id === Categorydata);
return category ? category.name : "";
}
  return (
    <>
      <ScrollToTop />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h4 className="card-title">FAQ's Categories</h4>
              </div>
              <div className="card-body pt-4 ml-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-4 form-group mb-2">
                      <label htmlFor="name-l">Category</label>
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
                      <label htmlFor="name-f">Question</label>
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
                      {errors.question && (
                        <div className="text-danger">{errors.question}</div>
                      )}
                    </div>
                    <div className="col-sm-12 form-group mb-2">
                      <label htmlFor="textarea">Answer</label>
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
                      {errors.answer && (
                        <div className="text-danger">{errors.answer}</div>
                      )}
                    </div>
                  </div>
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
                                    <td>12-12-2023</td>
                                    <td>{FaqMasterCategory(data.categoryId)}</td>
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
                              previousClassName={page === 0 ? "disabled" : ""}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : faqMasterGetData?.getData?.length < 0 ? (
                    <NoRecord />
                  ) : (
                    <Loader />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqMaster;
/* eslint-enable react-hooks/exhaustive-deps */