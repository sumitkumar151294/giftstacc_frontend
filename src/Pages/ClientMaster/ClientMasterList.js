/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import NoRecord from "../../Components/NoRecord/NoRecord";
import ClientMasterForm from "./ClientMasterForm";
import { useDispatch, useSelector } from "react-redux";
import {
  onClientMasterSubmit,
  onUpdateClientMasterSubmit,
} from "../../Store/Slices/clientMasterSlice";
import { CSVLink } from "react-csv";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { onClientPaymentSubmit } from "../../Store/Slices/clientPaymentDetailSlice";
import PageError from "../../Components/PageError/PageError";
const ClientMasterList = () => {
  const dispatch = useDispatch();
  const [data, setdata] = useState();
  const clientList = useSelector((state) => state.clientMasterReducer);
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  const clientPayData = useSelector(
    (state) => state.clientPaymentReducer.clientPaymentData
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const contactName = GetTranslationData("UIAdmin", "contact_Name_label");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const brands = GetTranslationData("UIAdmin", "brands_label");
  const contactNumber = GetTranslationData("UIAdmin", "contact_Number_label");
  const email = GetTranslationData("UIAdmin", "contact_Email_label");
  const clientID = GetTranslationData("UIAdmin", "client ID_label");
  const login = GetTranslationData("UIAdmin", "login_label");
  const action = GetTranslationData("UIAdmin", "action_label");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const exportLabel = GetTranslationData("UIAdmin", "export_label");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const active = GetTranslationData("UIAdmin", "active");
  const nonActive = GetTranslationData("UIAdmin", "nonActive");
  const clientListLabel = GetTranslationData("UIAdmin", "client List_label");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(onClientMasterSubmit());
    dispatch(onClientPaymentSubmit());
  }, []);
  const handleEdit = (data, clientPayData) => {
    const prefilled = { ...clientPayData, ...data };
    setdata(prefilled);
  };
  const handleDelete = (data) => {
    const deletedData = {
      name: data?.name,
      number: data?.number,
      id: data?.id,
      email: data?.email,
      dbIpAddress: data?.dbIpAddress,
      color: data?.color,
      logoUrl: data?.logoUrl,
      themes: data?.themes,
      status: data?.status,
      dbLoginPwd: data?.dbLoginPwd,
      dbLoginId: data?.dbLoginId,
      dbName: data?.dbName,
      platformDomainUrl: data?.platformDomainUrl,
      enabled: false,
      deleted: true,
    };
    dispatch(onUpdateClientMasterSubmit(deletedData));
  };

  const headers = [
    { label: "Client Id", key: "clientID" },
    { label: "Contact Name", key: "contactName" },
    { label: "Contact Number", key: "contactNumber" },
    { label: "Contact Email", key: "contactEmail" },
    { label: "Status", key: "status" },
  ];
  

  // excel data to print
  const excelData =
    Array.isArray(clientList?.clientData) &&
    clientList?.clientData?.map((data) => ({
      contactName: data.name,
      contactNumber: data.number,
      contactEmail: data.email,
      clientID: data.id,
      status: data.enabled ? active : nonActive,
    }));

  const filteredClientList = Array.isArray(clientList?.clientData)
    ? clientList?.clientData.filter((vendor) =>
      Object.values(vendor).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    : [];

  useEffect(() => {
    if (clientList?.clientData?.status_code === "200") {
      const totalItems = clientList?.clientData?.data.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [clientList?.clientData, page, rowsPerPage]);


  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return (
    <div>
      {getRoleAccess[0] === undefined && (
          <div style={{ height: "100px" }}>
          <Loader classType={"absoluteLoader"} />
        </div>
      )}
      <>
      {getRoleAccess[0] !== undefined ? (
        <>
          {getRoleAccess[0]?.addAccess && (
            <ClientMasterForm
              clientList={clientList}
              data={data}
              clientPayData={clientPayData}
              setdata={setdata}
            />
          )}
          <ScrollToTop />
          <div className="container-fluid pt-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="container-fluid mt-2 mb-2 pt-1">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                      <div className="card-header">
                        <h4 className="card-title">{clientListLabel}</h4>
                      </div>
                      <div className="customer-search mb-sm-0 mb-3">
                        <div className="input-group search-area">
                          <InputField
                            type="text"
                            className="form-control only-high"
                            placeholder={searchLabel}
                            value={searchQuery}
                            onChange={handleSearch}
                          />
                          <span className="input-group-text">
                            <i className="fa fa-search"></i>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-wrap">
                        {clientList?.clientData &&
                          clientList?.clientData?.length > 0 && (
                            <CSVLink
                              data={excelData}
                              headers={headers}
                              filename={"ClientMaster.csv"}
                            >
                              {filteredClientList.length > 0 && (
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
                  </div>
                  <div className="card-body">
                    {clientList?.isLoading ? (
                      <div style={{ height: "200px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : (
                      <>
                        {Array.isArray(filteredClientList) &&
                          filteredClientList.length > 0 ? (
                          <div className="table-responsive scroll-Table-x">
                            <>
                              <table className="table header-border table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>{contactName}</th>
                                    <th>{contactNumber}</th>
                                    <th>{email}</th>
                                    <th>{clientID}</th>
                                    <th>{status}</th>
                                    {getRoleAccess[0]?.editAccess && (
                                      <th>{action}</th>
                                    )}
                                    <th>{login}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredClientList
                                    .slice(startIndex, endIndex)
                                    .map((data) => (
                                      <tr key={data.id}>
                                        <td>
                                          {data.name}
                                          <button href="#"></button>
                                        </td>
                                        <td>{data.number}</td>
                                        <td>
                                          <span className="text-muted">
                                            {data.email}
                                          </span>
                                        </td>
                                        <td>{data.id}</td>
                                        <td>
                                          <span
                                            className={`badge ${data.enabled
                                                ? "badge-success"
                                                : "badge-danger"
                                              }`}
                                          >
                                            {data.enabled ? active : nonActive}
                                          </span>
                                        </td>
                                        {getRoleAccess[0]?.editAccess && (
                                          <>
                                            <td>
                                              <div className="d-flex">
                                                <Button
                                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                                  icon={"fas fa-pencil-alt"}
                                                  onClick={() =>
                                                    handleEdit(
                                                      data,
                                                      clientPayData
                                                    )
                                                  }
                                                />
                                                <Button
                                                  className="btn btn-danger shadow btn-xs sharp"
                                                  icon={"fa fa-trash"}
                                                  onClick={() =>
                                                    handleDelete(data)
                                                  }
                                                />
                                              </div>
                                            </td>
                                          </>
                                        )}
                                        <td>
                                          <Link to="/lc-user-admin/login">
                                            <Button
                                              className="btn btn-secondary btn-sm float-right client_Btn"
                                              icons={"fa fa-user"}
                                              text={login}
                                            />
                                          </Link>
                                        </td>
                                        <td>
                                          <Link
                                            to="/lc-admin/client-brand-list"
                                            state={{ id: data.id }}
                                            className="btn btn-primary btn-sm float-right client_Btn"
                                          >
                                            <i className="fa fa-eye"></i>&nbsp;{brands}
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              {filteredClientList.length > 5 && (
                                <div className="pagination-container">
                                  <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    pageCount={Math.ceil(
                                      filteredClientList.length / rowsPerPage
                                    )}
                                    marginPagesDisplayed={2}
                                    onPageChange={handlePageChange}
                                    containerClassName={"pagination"}
                                    activeClassName={page === 1 && "active"}
                                    initialPage={page - 1}
                                    previousClassName={
                                      page === 1 ? disabled_Text : ""
                                    }
                                  />
                                </div>
                              )}
                            </>
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
      </>
    </div>
  );
};

export default ClientMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
