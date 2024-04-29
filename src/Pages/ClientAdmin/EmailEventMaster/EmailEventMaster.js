/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import InputField from "../../../Components/InputField/InputField";
import { onGetEmailEventMaster } from "../../../Store/Slices/ClientAdmin/emailEventMasterSlice";
import ReactPaginate from "react-paginate";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import Button from "../../../Components/Button/Button";
import { Link } from "react-router-dom/dist";
import PageError from "../../../Components/PageError/PageError";

const EmailEventMaster = () => {
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const [name, setName] = useState({
    eventName: "",
    smsBody: "",
    subject: "",
    mailBody: "",
  });

  const [errors, setErrors] = useState({
    eventName: "",
    smsBody: "",
    subject: "",
    mailBody: "",
  });
  const dispatch = useDispatch();
  const emailEventMaster = useSelector(
    (state) => state.emailEventMasterReducer?.emailEventData
  );
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer.filteredData
  );
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleChange = (e, fieldName) => {
    setName({
      ...name,
      [fieldName]: e.target.value,
    });

    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };
  const handleSubmit = (e) => {
    e?.preventDefault();
    const newErrors = { ...errors };

    for (const key in name) {
      if (name[key] === "") {
        newErrors[key] = "This field is required";
      } else if (name[key].length > 250) {
        newErrors[key] = "Length must be 250 or fewer";
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
  };

  const tableData = [
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
    {
      variable: "%suborderid%",
      meaning: "Sub Order ID",
    },
  ];
  const submit = GetTranslationData("UIClient", "submitLabel");
  const emaileventmaster = GetTranslationData("UIAdmin", "emaileventmaster");
  const noDataFound = GetTranslationData("UIClient", "No_data_found_Text");

  const emaileventmastername = GetTranslationData(
    "UIAdmin",
    "emaileventmastername"
  );
  const emaileventmastersms = GetTranslationData(
    "UIAdmin",
    "emaileventmastersms"
  );
  const emaileventmastersubject = GetTranslationData(
    "UIAdmin",
    "emaileventmastersubject"
  );
  const emaileventmastermail = GetTranslationData(
    "UIAdmin",
    "emaileventmastermail"
  );
  const emaileventmasterkeywords = GetTranslationData(
    "UIAdmin",
    "emaileventmasterkeywords"
  );
  const emaileventmastersno = GetTranslationData(
    "UIAdmin",
    "emaileventmastersno"
  );
  const emaileventmasterdate = GetTranslationData(
    "UIAdmin",
    "emaileventmasterdate"
  );
  const emaileventmasteraction = GetTranslationData(
    "UIAdmin",
    "emaileventmasteraction"
  );
  const meaning = GetTranslationData("UIAdmin", "meaning");
  const variable = GetTranslationData("UIAdmin", "variable");
  const requiredLevel = GetTranslationData("UIAdmin", "required_label");

  useEffect(() => {
    dispatch(onGetEmailEventMaster());
  }, []);
  return (
    <div>
      {getRoleAccess[0] !== undefined ? (
        <>
          <ScrollToTop />
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-xxl-12">
                <div className="card">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="card-header">
                      <h4 className="card-title">{emaileventmaster}</h4>
                    </div>
                  </div>
                  {getRoleAccess[0]?.addAccess && (
                    <div className="row">
                      <div className="col-xl-7 col-xxl-7">
                        <div className="card">
                          <div className="card-body pt-0">
                            <div className="col-sm-12 form-group mb-2">
                              <label htmlFor="name-f">
                                {emaileventmastername}
                              </label>
                              <InputField
                                type="text"
                                value={name.eventName}
                                onChange={(e) => handleChange(e, "eventName")}
                                className={` ${
                                  errors.eventName
                                    ? "border-danger"
                                    : "form-control"
                                }`}
                                name="fname"
                                id="name-f"
                              />
                              {
                                <p className="text-danger">
                                  {errors.eventName}
                                </p>
                              }
                            </div>
                            <div className=" form-group mb-2">
                              <label htmlFor="name-f">
                                {emaileventmastersms}
                              </label>
                              <div className=" ">
                                <InputField
                                  type="text"
                                  value={name.smsBody}
                                  onChange={(e) => handleChange(e, "smsBody")}
                                  // className="input-tags "
                                  className={` ${
                                    errors.smsBody
                                      ? "border-input-tags"
                                      : "bootstrap-tagsinput"
                                  }`}
                                  data-role="tagsinput"
                                />
                                {
                                  <p className="text-danger">
                                    {errors.smsBody}
                                  </p>
                                }
                              </div>
                            </div>
                            <div className="form-group mb-2">
                              <label htmlFor="name-f">
                                {emaileventmastersubject}
                              </label>
                              <div className="">
                                <InputField
                                  type="text"
                                  value={name.subject}
                                  onChange={(e) => handleChange(e, "subject")}
                                  className={` ${
                                    errors.subject
                                      ? "border-input-tags"
                                      : "bootstrap-tagsinput"
                                  }`}
                                  data-role="tagsinput"
                                />
                                {
                                  <p className="text-danger">
                                    {errors.subject}
                                  </p>
                                }
                              </div>
                            </div>
                            <div className="form-group mb-2">
                              <label htmlFor="name-f">
                                {emaileventmastermail}
                              </label>
                              <div className="">
                                <InputField
                                  type="text"
                                  value={name.mailBody}
                                  onChange={(e) => handleChange(e, "mailBody")}
                                  className={` ${
                                    errors.mailBody
                                      ? "border-input-tags"
                                      : "bootstrap-tagsinput"
                                  }`}
                                  data-role="tagsinput"
                                />
                                {
                                  <p className="text-danger">
                                    {errors.mailBody}
                                  </p>
                                }
                              </div>
                            </div>
                            <span
                              className="form-check-label"
                              htmlFor="basic_checkbox_1"
                              style={{ marginLeft: "5px", marginTop: "10px" }}
                            >
                              {requiredLevel}
                            </span>
                            <div className="form-group mb-0 mt-2">
                              <Button
                                type="submit"
                                text={submit}
                                icon="fa fa-arrow-right"
                                className="btn btn-primary btn-sm float-right p-btn mt-2"
                                onClick={() => handleSubmit()}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-5 col-xxl-5">
                        <div className="card">
                          <div className="card-header d-flex justify-content-between">
                            <h4 className="card-title">
                              {emaileventmasterkeywords}
                            </h4>
                            <div className="customer-search mb-sm-0 mb-3">
                              <div className="input-group search-area">
                                <input
                                  type="text"
                                  className="form-control only-high"
                                  placeholder="Search by Email....."
                                />
                                <span className="input-group-text">
                                  <Link href="">
                                    <i className="flaticon-381-search-2"></i>
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="klaa">
                              <table className="table table-bordered table-striped">
                                <thead>
                                  <tr>
                                    <th>{variable}</th>
                                    <th>{meaning}</th>
                                  </tr>
                                </thead>
                                {tableData.length > 0 ? (
                                  <tbody>
                                    {tableData.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.variable}</td>
                                        <td>{item.meaning}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                ) : (
                                  <tr>
                                    <td colSpan="6" className="text-center">
                                      {noDataFound}
                                    </td>
                                  </tr>
                                )}
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="card-body">
                    {emailEventMaster.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>{emaileventmastersno}</th>
                              <th>{emaileventmastername}</th>
                              <th>{emaileventmasterdate}</th>
                              <th>{emaileventmastersubject}</th>
                              {getRoleAccess[0]?.editAccess && (
                                <th>{emaileventmasteraction}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {emailEventMaster
                              .slice(startIndex, endIndex)
                              .map((item, index) => (
                                <tr key={index}>
                                  <td>{item.id}</td>
                                  <td>{item.status}</td>
                                  <td>{item.date}</td>
                                  <td>{item.placeholders}%</td>
                                  {getRoleAccess[0]?.editAccess && (
                                    <td>
                                      <div className="d-flex">
                                        <Link
                                          href="#"
                                          className="btn btn-primary shadow btn-xs sharp me-1"
                                        >
                                          <i className="fas fa-pencil-alt"></i>
                                        </Link>
                                        <Link
                                          href="#"
                                          className="btn btn-danger shadow btn-xs sharp"
                                        >
                                          <i className="fa fa-trash"></i>
                                        </Link>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {emailEventMaster.length > 5 && (
                          <div className="pagination-container">
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={" >"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(
                                emailEventMaster.length / rowsPerPage
                              )}
                              marginPagesDisplayed={2}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                              initialPage={page - 1}
                              previousClassName={
                                page === 1 ? disabled_Text : ""
                              }
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
      ) : (
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

export default EmailEventMaster;
/* eslint-enable react-hooks/exhaustive-deps */
