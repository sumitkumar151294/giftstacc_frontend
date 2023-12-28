import React, { useEffect, useState } from "react";
import "./ClientList.scss";
import { Link } from "react-router-dom";
import Loader from "../../../Componenets/Loader/Loader";
import NoRecord from "../../../Componenets/NoRecord/NoRecord";
import ClientMasterForm from "../ClientMasterForm/ClientMasterForm";
import { useDispatch, useSelector } from "react-redux";
import { onClientMasterSubmit, onUpdateClientMasterSubmit } from "../../../Store/Slices/clientMasterSlice";
import { CSVLink } from "react-csv";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";
import { Pagination } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ClientList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const clientList = useSelector((state) => state.clientMasterReducer.data);
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
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(onClientMasterSubmit());
  }, []);

  const handleEdit = (data) => {
    const prefilled = data;
    setData(prefilled);
  };
   const handleDelete = (data) => {
    const deletedData = {
      id: data?.id,
      name: data?.name,
      number: data?.number,
      email: data?.email,
      userName: data?.userName,
      password: data?.password,
      status: data?.status,
      color: data?.color,
      lgogLink: data?.lgogLink,
      dbipAddress: data?.dbipAddress,
      dbLoginId: data?.dbLoginId,
      dbLoginPwd: data?.dbLoginPwd,
      stagingKey: data?.stagingKey,
      stagingSecretKey: data?.stagingSecretKey,
      productionKey: data?.productionKey,
      productionSecretKey: data?.productionSecretKey,
      theme: data?.theme,
      enabled: false,
      deleted: true
    }
    dispatch(onUpdateClientMasterSubmit)
  };

  const headers = [
    { label: clientList, key: "name" },
    { label: "number", key: "number" },
    { label: "email", key: "email" },
    { label: "id", key: "id" },
    { label: "status", key: "status" },
  ];

  const filteredClientList = Array.isArray(clientList)
    ? clientList.filter((vendor) =>
        Object.values(vendor).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setShowLoader(false);
  }, []);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <>
      <ClientMasterForm clientList={clientList} data={data} />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">
                      {GetTranslationData("UIAdmin", "client List_label")}
                    </h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <input
                        type="text"
                        className="form-control only-high"
                        placeholder={searchLabel}
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <span className="input-group-text">
                        <i className="flaticon-381-search-2"></i>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    {clientList && clientList.length > 0 && (
                      <CSVLink data={clientList} headers={headers}   filename={"ClientMaster.csv"}
                      >
                        {filteredClientList.length > 0 && (
                          <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                            <i className="fa fa-file-excel me-2"></i>
                            {exportLabel}
                          </button>
                        )}
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-body">
                {showLoader ||  filteredClientList.length <= 0  ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    {Array.isArray(filteredClientList) &&
                    filteredClientList.length > 0 ? (
                      <div className="table-responsive">
                      <>
                        <Table className="table header-border table-responsive-sm">
                          <TableHead>
                            <TableRow>
                              <TableCell>{contactName}</TableCell>
                              <TableCell>{contactNumber}</TableCell>
                              <TableCell>{email}</TableCell>
                              <TableCell>{clientID}</TableCell>
                              <TableCell>{status}</TableCell>
                              <TableCell>{action}</TableCell>
                              <TableCell>{login}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredClientList
                              .slice(startIndex, endIndex)
                              .map((data) => (
                                <TableRow key={data.id}>
                                <TableCell>
                                    {data.name}
                                    <a href="#"></a>
                                  </TableCell>
                                  <TableCell>{data.number}</TableCell>
                                  <TableCell>
                                    <span className="text-muted">
                                      {data.email}
                                    </span>
                                  </TableCell>
                                  <TableCell>{data.id}</TableCell>
                                  <TableCell>
                                    <span className="badge badge-success">
                                      {data.status}
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <div className="d-flex">
                                      <button
                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                        onClick={() => handleEdit(data)}
                                      >
                                        <i className="fas fa-pencil-alt"></i>
                                      </button>
                                      <button className="btn btn-danger shadow btn-xs sharp" onClick={()=>handleDelete(data)}>
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Link to="/lc-user-admin/login">
                                      <button className="btn btn-secondary btn-sm float-right">
                                        <i className="fa fa-user"></i>&nbsp;{" "}
                                        {login}
                                      </button>
                                    </Link>
                                  </TableCell>
                                  <td>
                                    <Link
                                      to="/lc-admin/client-brand-list"
                                      className="btn btn-primary btn-sm float-right"
                                    >
                                      <i className="fa fa-eye"></i>&nbsp;
                                      {brands}
                                    </Link>
                                  </td>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                        <div className="pagination-container">
                          <Pagination
                            count={Math.ceil(
                              filteredClientList.length / rowsPerPage
                            )}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                          />
                        </div>
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
  );
};

export default ClientList;
