/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import InputField from "../../../Components/InputField/InputField";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { onGetCustomer } from "../../../Store/Slices/ClientAdmin/customerListSlice";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import { CSVLink } from "react-csv";
import Button from "../../../Components/Button/Button";

export const CustomerList = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(onGetCustomer());
  }, []);
  // To get the data of customer list from redux store
  const getCustomerList = useSelector(
    (state) => state.customerListReducer?.customerData
  );
  const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
  const exportLabel = GetTranslationData("UIAdmin", "export_label");
  const filteredCustomerList = Array.isArray(getCustomerList)
    ? getCustomerList.filter((vendor) =>
        Object.values(vendor).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];
  const excelData =
    Array.isArray(getCustomerList) &&
    getCustomerList?.map((data) => ({
      name: data.name,
      phone: data.phone,
      email: data.email,
      joined: data.joined,
    }));
  const headers = [
    { label: " Name", key: "name" },
    { label: "Contact Number", key: "phone" },
    { label: " Email", key: "email" },
    { label: "Joined", key: "Joined" },
  ];

  return (
    <>
      <ScrollToTop />
      <div className="container-fluid ">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="container pt-0 mt-2 mb-2">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">Customer List</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder={search_here_label}
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    {filteredCustomerList.length > 0 && (
                      <CSVLink
                        data={excelData}
                        headers={headers}
                        filename={"CustomerList.csv"}
                      >
                        {filteredCustomerList.length > 0 && (
                          <Button
                            className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                            text={exportLabel}
                            icons={"fa fa-file-excel me-2"}
                          />
                        )}
                      </CSVLink>
                    )}
                  </div>
                </div>
                {filteredCustomerList.length > 0 ? (
                  <div className="cd-body-responsive">
                    <div className="table-responsive">
                      <table className="table table-sm mb-0 table-striped">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Joined</th>
                          </tr>
                        </thead>
                        <tbody id="customers">
                          {filteredCustomerList.length > 0 ? (
                            Array.isArray(filteredCustomerList) &&
                            filteredCustomerList
                              .slice()
                              .map((customer, index) => (
                                <tr className="btn-reveal-trigger" key={index}>
                                  <td className="py-3">
                                    <div className="media-body">
                                      <h5 className="mb-0 fs--1">
                                        {customer.name}
                                      </h5>
                                    </div>
                                  </td>
                                  <td className="py-2">{customer.email}</td>
                                  <td className="py-2"> {customer.phone}</td>
                                  <td className="py-2">{customer.joined}</td>
                                </tr>
                              ))
                          ) : (
                            <NoRecord />
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div>
                    <NoRecord />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomerList;
