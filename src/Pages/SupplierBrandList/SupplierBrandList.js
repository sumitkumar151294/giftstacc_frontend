import React, { useEffect, useState } from "react";
import "./SupplierBrandList.scss";
import { GetTranslationData } from "../../Componenets/GetTranslationData/GetTranslationData ";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { onGetSupplierBrandList } from "../../Store/Slices/supplierBrandListSlice";
import NoRecord from "../../Componenets/NoRecord/NoRecord";
import { Pagination } from "@mui/material";
import Dropdown from "../../Componenets/Dropdown/Dropdown";

const SupplierBrandList = () => {
  const dispatch = useDispatch();
  const SupplierBrandList = useSelector(
    (state) => state.supplierBrandListReducer?.data?.data
  );
  const supplierBrands = GetTranslationData("UIAdmin", "supplierBrands");
  const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const selectSuppliers = GetTranslationData("UIAdmin", "selectSuppliers");
  const select = GetTranslationData("UIAdmin", "select");
  const all = GetTranslationData("UIAdmin", "all");
  const supplierBrandLists = GetTranslationData(
    "UIAdmin",
    "supplierBrandLists"
  );
  const id = GetTranslationData("UIAdmin", "id");
  const brands = GetTranslationData("UIAdmin", "brands");
  const supplierMargin = GetTranslationData("UIAdmin", "supplierMargin");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const action = GetTranslationData("UIAdmin", "action_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(onGetSupplierBrandList());
  }, []);
  const filteredSupplierList = SupplierBrandList?.filter((vendor) =>
    Object.values(vendor).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const datas = {
    statuscolor: "badge badge-success",
  };
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;
  const headers = [
    { label: "id", key: "id" },
    { label: "brands", key: "brands" },
    { label: "supplier_Margin", key: "supplier_Margin" },
    { label: "status", key: "status" },
    { label: "action", key: "action" },
  ];

  const supplier = [
    { value: "all", label: "all" },

    { value: "Qwik cilver", label: "Qwik cilver" },
    { value: "Non-Supplier 2", label: "Non-Supplier 2" },
    { value: " Supplier 3", label: " Supplier 3" },
  ];
  const handleChange = (e) => {};

  const userData = [
    {
      status: "Active",
      count: "125",
      className: "btn btn-success btn-sm btn-margin",
    },
    {
      status: "Deprecated",
      count: "50",
      className: "btn btn-danger btn-sm btn-margin",
    },
    {
      status: "Deactive",
      count: "10",
      className: "btn btn-warning btn-sm btn-margin",
    },
    {
      status: "New",
      count: "105",
      className: "btn btn-primary btn-sm btn-margin",
    },
    {
      status: "Total",
      count: "280",
      className: "btn btn-secondary btn-sm btn-margin",
    },
  ];

  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-xxl-12">
              <div className="card d-flex justify-content-between">
                <div className="container-fluid mt-2 mb-2">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="card-header">
                      <h4 className="card-title">{supplierBrands}</h4>
                    </div>
                    <div className="customer-search mb-sm-0 mb-3">
                      <div className="input-group search-area">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearch}
                          className="form-control only-high"
                          placeholder={search_here_label}
                        />
                        <span className="input-group-text">
                          <i className="flaticon-381-search-2"></i>
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex-wrap">
                      {filteredSupplierList &&
                        filteredSupplierList.length > 0 && (
                          <CSVLink data={SupplierBrandList} headers={headers}>
                            <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                              <i className="fa fa-file-excel me-2"></i>
                              {export_label}
                            </button>
                          </CSVLink>
                        )}
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-3 form-group mb-2">
                        <label for="name-f">{selectSuppliers}</label>

                        <Dropdown
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => handleChange(e, "status")}
                          options={supplier}
                        />
                      </div>

                      <div className="col-lg-9 d-flex-list justify-content-end m-auto mb-2">
                        {userData.map((data) => (
                          <span className="mrr">
                            <button type="button" className={data.className}>
                              {data.status}{" "}
                              <span className="btn-icon-end">{data.count}</span>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </form>

                  <div className="row">
                    <div className="col-lg-12">
                      <div>
                        <div className="card-header">
                          <h4 className="card-title">{supplierBrandLists}</h4>
                        </div>
                        {Array.isArray(filteredSupplierList) &&
                        filteredSupplierList.length > 0 ? (
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table header-border table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>{id}</th>
                                    <th>{brands}</th>
                                    <th>{supplierMargin}</th>
                                    <th>{status}</th>
                                    <th>{action}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredSupplierList
                                    .slice(startIndex, endIndex)
                                    .map((data) => (
                                      <tr>
                                        <td>
                                          {data.id}
                                          <a href="#"></a>
                                        </td>

                                        <td>{data.brands}</td>
                                        <td>
                                          <div className="input-group mb-2 w-11">
                                            <input
                                              type="number"
                                              className="form-control htt"
                                              placeholder={data.supplier_Margin}
                                              pattern="/^-?\d+\.?\d*$/"
                                              onKeyPress="if(this.value.length==2) return false;"
                                            />
                                            <div className="input-group-append">
                                              <button
                                                className="btn btn-outline-primary btn-sm group-btn btn-pad"
                                                type="button"
                                              >
                                                {update}
                                              </button>
                                            </div>
                                          </div>
                                        </td>

                                        <td>
                                          <span className={datas.statuscolor}>
                                            {data.status === true
                                              ? "Active"
                                              : "Inactive"}
                                          </span>
                                        </td>

                                        <td>
                                          {" "}
                                          <div className="can-toggle">
                                            <input id="d" type="checkbox" />

                                            <label for="d">
                                              <div
                                                className="can-toggle__switch"
                                                data-unchecked="Off"
                                                data-checked={
                                                  data.action === true
                                                    ? "ON"
                                                    : "OFF"
                                                }
                                              ></div>
                                            </label>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              <div className="pagination-container">
                                <Pagination
                                  count={Math.ceil(
                                    filteredSupplierList.length / rowsPerPage
                                  )}
                                  page={page}
                                  onChange={handlePageChange}
                                  color="primary"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <NoRecord />
                        )}
                      </div>
                    </div>
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

export default SupplierBrandList;
