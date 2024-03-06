import React, { useState,useEffect } from "react";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import InputField from "../../../Components/InputField/InputField";
import { onGetEmailEventMaster } from "../../../Store/Slices/ClientAdmin/emailEventMasterSlice";
import ReactPaginate from "react-paginate";
import NoRecord from "../../../Components/NoRecord/NoRecord";

const EmailEventMaster = () => {
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
  const emailEventMaster = useSelector((state) => state.emailEventMasterReducer?.emailEventData);

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
    let isValid = true;
    const newErrors = { ...errors };

    for (const key in name) {
      if (name[key] === "") {
        newErrors[key] = "This field is required";
        isValid = false;
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

  const emaileventmaster = GetTranslationData('UIAdmin', 'emaileventmaster');
  const emaileventmastername = GetTranslationData('UIAdmin', 'emaileventmastername');
  const emaileventmastersms = GetTranslationData('UIAdmin', 'emaileventmastersms');
  const emaileventmastersubject = GetTranslationData('UIAdmin', 'emaileventmastersubject');
  const emaileventmastermail = GetTranslationData('UIAdmin', 'emaileventmastermail');
  const emaileventmasterkeywords = GetTranslationData('UIAdmin', 'emaileventmasterkeywords');
  const emaileventmastersno = GetTranslationData('UIAdmin', 'emaileventmastersno');
  const emaileventmasterdate = GetTranslationData('UIAdmin', 'emaileventmasterdate');
  const emaileventmasteraction = GetTranslationData('UIAdmin', 'emaileventmasteraction');
  const meaning = GetTranslationData('UIAdmin', 'meaning');
  const variable = GetTranslationData('UIAdmin', 'variable');

  useEffect(() => {
    dispatch(onGetEmailEventMaster());
  }, []);
  return (
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
                <div className="row">
                  <div className="col-xl-7 col-xxl-7">
                    <div className="card">
                      <div className="card-body pt-0">
                        <div className="col-sm-12 form-group mb-2">
                          <label htmlFor="name-f">{emaileventmastername}</label>
                          <InputField
                            type="text"
                            value={name.eventName}
                            onChange={(e) => handleChange(e, "eventName")}
                            className="form-control"
                            name="fname"                            
                            id="name-f"
                          />
                        </div>
                        <div className=" form-group mb-2">
                          <label htmlFor="name-f">{emaileventmastersms}</label>
                          <div className=" bootstrap-tagsinput border_type">
                          <InputField
                            type="text"
                            value={name.smsBody}
                            onChange={(e) => handleChange(e, "smsBody")}
                            className="input-tags "
                            data-role="tagsinput"
                          />
                          </div>
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="name-f">{emaileventmastersubject}</label>
                          <div className=" bootstrap-tagsinput border_type">
                          <InputField
                            type="text"
                            value={name.subject}
                            onChange={(e) => handleChange(e, "subject")}
                            className="input-tags "
                            data-role="tagsinput"
                          />
                          </div>
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="name-f">{emaileventmastermail}</label>
                          <div className=" bootstrap-tagsinput border_type">
                          <InputField
                            type="text"
                            value={name.mailBody}
                            onChange={(e) => handleChange(e, "mailBody")}
                            className="input-tags "
                            data-role="tagsinput"
                          />
                          </div>
                        </div>
                        <div className="form-group mb-0 mt-2">
                          <button
                            className="btn btn-primary float-right pad-aa"
                            onClick={() => handleSubmit()}
                          >
                            Submit <i className="fa fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-xxl-5">
                    <div className="card">
                      <div className="card-header d-flex justify-content-between">
                        <h4 className="card-title">{emaileventmasterkeywords}</h4>
                        <div className="customer-search mb-sm-0 mb-3">
                          <div className="input-group search-area">
                            <input
                              type="text"
                              className="form-control only-high"
                              placeholder="Search by Email....."
                            />
                            <span className="input-group-text">
                              <a href="">
                                <i className="flaticon-381-search-2"></i>
                              </a>
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
                                  No data found
                                </td>
                              </tr>
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                          <th>{emaileventmasteraction}</th>
                        </tr>
                      </thead>
                        <tbody>
                          {emailEventMaster.slice(startIndex, endIndex).map((item)=> (
                             <tr>
                              <td>
                                {item.id}
                              </td>
                              <td>{item.status}</td>
                              <td>{item.date}</td>
                              <td>{item.placeholders}%</td>
                              <td>
                                <div className="d-flex">
                                  <a
                                    href="#"
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </a>
                                  <a
                                    href="#"
                                    className="btn btn-danger shadow btn-xs sharp"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </a>
                                </div>
                              </td>
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

export default EmailEventMaster;