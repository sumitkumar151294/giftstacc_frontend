import React, { useEffect, useState } from "react";
import {
  onFaqMasterSubmit,
  onGetFaqMaster,
} from "../../Store/Slices/faqMasterSlice";
import { useDispatch } from "react-redux";

const FaqMaster = () => {
  const dispatch = useDispatch();
  const [faqInfo, setFaqInfo] = useState({
    category: "",
    question: "",
    answer: "",
  });

  const [errors, setErrors] = useState({
    category: "",
    question: "",
    answer: "",
  });
  useEffect(() => {
    dispatch(onGetFaqMaster());
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

  return (
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
                    <input
                      type="text"
                      className={`form-control ${
                        errors.category ? "border-danger" : ""
                      }`}
                      id="name-l"
                      placeholder=""
                      value={faqInfo.category}
                      onChange={(e) => handleChange(e, "category")}
                    />
                    {errors.category && (
                      <div className="text-danger">{errors.category}</div>
                    )}
                  </div>
                  <div className="col-sm-12 form-group mb-2">
                    <label htmlFor="name-f">Question</label>
                    <input
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
                <div className="form-group mb-0 mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary float-right pad-aa"
                  >
                    Submit <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
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
                    <tr>
                      <td>1</td>
                      <td>12-12-2023</td>
                      <td>Coupon Redemption</td>
                      <td>How can Redeem my Coupon?</td>
                      <td>By Using coupon in the cart</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqMaster;
