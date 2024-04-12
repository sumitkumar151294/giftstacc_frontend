import React from "react";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import './CustomerList.scss'
import { Link } from "react-router-dom/dist";
import PageError from "../../Components/PageError/PageError";
import { useSelector } from "react-redux";

const Customerlist = () => {
    const customerData = [
        {
            name: "Ricky Antony",
            email: "	info@example.com",
            phone: "	(201) 200-1851",
            joined: "30/03/2018",
        },
        {
            name: "Ricky Antony",
            email: "	info@example.com",
            phone: "	(201) 200-1851",
            joined: "30/03/2018",
        },
        {
            name: "Ricky Antony",
            email: "	info@example.com",
            phone: "	(201) 200-1851",
            joined: "30/03/2018",
        },
        {
            name: "Ricky Antony",
            email: "	info@example.com",
            phone: "	(201) 200-1851",
            joined: "30/03/2018",
        },
        {
            name: "Ricky Antony",
            email: "	info@example.com",
            phone: "	(201) 200-1851",
            joined: "30/03/2018",
        },
        {
            name: "Ricky Antony",
            email: "	info@example.com",
            phone: "	(201) 200-1851",
            joined: "30/03/2018",
        },
        {
            name: "Ricky Antony",
            email: "	info@example.com",
            phone: "	(201) 200-1851",
            joined: "30/03/2018",
        },
        {
            name: "Ricky Antony",
            email: "	info@example.com",
            phone: "	(201) 200-1851",
            joined: "30/03/2018",
        },
    ];

  const customerlist = GetTranslationData("UIAdmin", "customerlist");
  const customerlistname = GetTranslationData("UIAdmin", "customerlistname");
  const customerlistemail = GetTranslationData("UIAdmin", "customerlistemail");
  const customerlistphone = GetTranslationData("UIAdmin", "customerlistphone");
  const customerlistjoined = GetTranslationData("UIAdmin", "customerlistjoined");
  const exportLabel = GetTranslationData("UIAdmin", "export_label");
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
                            <div className="container mt-2 mb-2">
                                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div className="card-header">
                                        <h4 className="card-title">{customerlist}</h4>
                                    </div>
                                    <div className="customer-search mb-sm-0 mb-3">
                                        <div className="input-group search-area">
                                            <input
                                                type="text"
                                                className="form-control only-high"
                                                placeholder="Search Here......"
                                            />
                                            <span className="input-group-text">
                                                <Link>
                                                    <i className="flaticon-381-search-2"></i>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <Link
                                            className="btn btn-primary btn-rounded me-3 mb-2"
                                        >
                                            <i className="fa fa-file-excel me-2"></i>{exportLabel}
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-sm mb-0 table-striped">
                                            <thead>
                                                <tr>
                                                    <th>{customerlistname}</th>
                                                    <th>{customerlistemail}</th>
                                                    <th>{customerlistphone}</th>
                                                    <th>{customerlistjoined}</th>
                                                </tr>
                                            </thead>
                                            {customerData.length > 0 ? (
                                                <tbody id="customers">
                                                    {customerData.map((item,index) => (
                                                        <tr key={index} className="btn-reveal-trigger" >
                                                            <td className="py-3">
                                                                <div className="media-body">
                                                                    <h5 className="mb-0 fs--1 txt txxt ">{item.name}</h5>
                                                                </div>
                                                            </td>
                                                            <td className="py-2">
                                                                <Link href="mailto:ricky@example.com">
                                                                    {item.email}{" "}
                                                                </Link>
                                                            </td>
                                                            <td className="py-2">

                                                                <Link href="tel:2012001851">{item.phone}</Link>
                                                            </td>
                                                            <td className="py-2">{item.joined}</td>
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

export default Customerlist;
