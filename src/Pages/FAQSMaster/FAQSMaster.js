import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { onFaqsSubmit } from "../../redux/modules/UserAdmin/faqsSlice";
import Loader from "../../Componenets/Loader/Loader";

const FAQSMaster = () => {
  const [faqData, setFaqData] = useState({
    category: "",
    question: "",
    answer: "",
  });
  const [errors, setErrors] = useState({
    category: "",
    question: "",
    answer: "",
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState("true");
  const faqTableData = [
    {
      sno: 1,
      date: "12-12-2023",
      category: "Coupen Redemption",
      question: "How can I Redeem my Coupon?",
      answer: "How can I Redeem my Coupon?",
    },
    {
      sno: 1,
      date: "12-12-2023",
      category: "Coupen Redemption",
      question: "How can I Redeem my Coupon?",
      answer: "How can I Redeem my Coupon?",
    },
    {
      sno: 1,
      date: "12-12-2023",
      category: "Coupen Redemption",
      question: "How can I Redeem my Coupon?",
      answer: "How can I Redeem my Coupon?",
    },
    {
      sno: 1,
      date: "12-12-2023",
      category: "Coupen Redemption",
      question: "How can I Redeem my Coupon?",
      answer: "How can I Redeem my Coupon?",
    },
  ];
  const handleChange = (e, fieldName) => {
    setFaqData({
      ...faqData,
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
    for (const key in faqData) {
      if (faqData[key] === "") {
        newErrors[key] = "This field is required";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    if (isValid) {
    //   dispatch(onFaqsSubmit(faqData));
    console.log('abcd')
    }
  };

  return (
    <div class="content-body">
      {!isLoading ? (
        <Loader />
      ) : (
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-12 col-xxl-12">
              <div class="card">
                <div class="card-header d-flex justify-content-between">
                  <h4 class="card-title">FAQ's Master</h4>
                </div>

                <div class="card-body ">
                  <form>
                    <div class="row">
                      <div class="col-sm-4 form-group mb-2">
                        <label for="name-l">Category</label>
                        <input
                          type="text"
                          class="form-control"
                          name="bdate"
                          id="name-l"
                          placeholder=""
                          onChange={(e) => handleChange(e, "category")}
                        />
                        <p className="text-danger">{errors.category}</p>
                      </div>
                      <div class="col-sm-12 form-group mb-2">
                        <label for="name-f">Question</label>
                        <input
                          type="text"
                          class="form-control"
                          name="fname"
                          id="name-f"
                          placeholder=""
                          onChange={(e) => handleChange(e, "question")}
                        />
                        <p className="text-danger">{errors.question}</p>
                      </div>

                      <div class="col-sm-12 form-group mb-2">
                        <label for="name-f">Answer</label>
                        <textarea
                          name="textarea"
                          id="textarea"
                          cols="60"
                          rows="10"
                          class="form-control bg-transparent"
                          placeholder=""
                          onChange={(e) => handleChange(e, "answer")}
                        ></textarea>
                        <p className="text-danger">{errors.answer}</p>
                      </div>
                    </div>
                  </form>
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
                          <th>S.NO</th>
                          <th>Date</th>
                          <th>Category</th>
                          <th>Question</th>
                          <th>Answer</th>
                        </tr>
                      </thead>
                      <>
                        {faqTableData.length > 0 ? (
                          <>
                            {faqTableData.map((item) => (
                              <tr>
                                <td>{item.sno}</td>
                                <td>{item.date}</td>
                                <td>{item.category}</td>
                                <td>{item.question}</td>
                                <td>{item.answer}</td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No data found
                            </td>
                          </tr>
                        )}
                      </>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQSMaster;
