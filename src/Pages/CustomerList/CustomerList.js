import React, { useState } from "react";
import ScrollToTop from '../../Componenets/ScrollToTop/ScrollToTop'
import { GetTranslationData } from "../../Componenets/GetTranslationData/GetTranslationData ";


const Customerlist = () => {
    const [isLoading, setIsLoading] = useState("true");
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



    return (
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
                                                <a href="javascript:void(0)">
                                                    <i className="flaticon-381-search-2"></i>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <a
                                            href="javascript:void(0);"
                                            className="btn btn-primary btn-rounded me-3 mb-2"
                                        >
                                            <i className="fa fa-file-excel me-2"></i>Export
                                        </a>
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
                                                    {customerData.map((item) => (
                                                        <tr class="btn-reveal-trigger">
                                                            <td class="py-3">
                                                                <div class="media-body">
                                                                    <h5 class="mb-0 fs--1 txt txxt ">{item.name}</h5>
                                                                </div>
                                                            </td>
                                                            <td class="py-2">
                                                                <a href="mailto:ricky@example.com">
                                                                    {item.email}{" "}
                                                                </a>
                                                            </td>
                                                            <td class="py-2">
                                                                {" "}
                                                                <a href="tel:2012001851">{item.phone}</a>
                                                            </td>
                                                            <td class="py-2">{item.joined}</td>
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
    );
};

export default Customerlist;
