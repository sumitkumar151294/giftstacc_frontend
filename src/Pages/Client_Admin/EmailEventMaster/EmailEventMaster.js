import React, { useState } from "react";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";



const EmailEventMaster = () => {

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
  const tableInfo = [
    {
      id: 1,
      status: "Order Confirmed",
      date: "12-20-2023",
      placeholders: ["%orderid%", "%firstname%", "%lastname%"],
    },
    {
      id: 2,
      status: "OTP",
      date: "12-20-2023",
      placeholders: ["%firstname%", "%lastname%"],
    },
    {
      id: 3,
      status: "Welcome",
      date: "12-20-2023",
      placeholders: ["%firstname%", "%lastname%"],
    },
    {
      id: 4,
      status: "Order Delivered",
      date: "12-20-2023",
      placeholders: ["%orderid%", "%firstname%", "%lastname%"],
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
                          <input
                            type="text"
                            className="form-control"
                            name="fname"
                            onChange={(e) => handleChange(e, "eventName")}
                            id="name-f"
                            placeholder=""
                            required=""
                          />
                          <p className="text-danger">{errors.eventName}</p>
                        </div>
                        <div className=" form-group mb-2">
                          <label htmlFor="name-f">{emaileventmastersms}</label>
                          <div className=" bootstrap-tagsinput border_type">
                            <input
                              className="input-tags "
                              onChange={(e) => handleChange(e, "smsBody")}
                              type="text"
                              data-role="tagsinput"
                            />
                            <p className="text-danger">{errors.smsBody}</p>
                          </div>
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="name-f">{emaileventmastersubject}</label>
                          <div className=" bootstrap-tagsinput border_type">
                            <input
                              className="input-tags"
                              type="text"
                              onChange={(e) => handleChange(e, "subject")}
                              data-role="tagsinput"
                            />
                            <p className="text-danger">{errors.subject}</p>
                          </div>
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="name-f">{emaileventmastermail}</label>
                          <div className=" bootstrap-tagsinput border_type">
                            <input
                              className="input-tags"
                              onChange={(e) => handleChange(e, "mailBody")}
                              type="text"
                              data-role="tagsinput"
                            />
                            <p className="text-danger">{errors.mailBody}</p>
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
                      {tableInfo.length > 0 ? (
                        <tbody>
                          {tableInfo.map((item,index) => (
                            <tr key={index}>
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
        </div>
    </>
  );
};

export default EmailEventMaster;
