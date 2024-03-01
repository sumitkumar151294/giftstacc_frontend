import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetSupplierList,
  onUpdateSupplierList,
} from "../../Store/Slices/supplierMasterSlice";
import NoRecord from "../../Components/NoRecord/NoRecord";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import SupplierMasterForm from "./SupplierMasterForm";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { onGetSupplierResource } from "../../Store/Slices/supplierResourceSlice";
import ReactPaginate from "react-paginate";
const SupplierMasterList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [vendorData, setVendorData] = useState({
    name: "",
    balanceThresholdAmount: "",
    creditAmount: "",
    servicePath: "",
    enabled: "",
  });
  const supplierList = GetTranslationData("UIAdmin", "supplierList");
  const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
  const export_label = GetTranslationData("UIAdmin", "export_btn_Text");
  const supplierName = GetTranslationData("UIAdmin", "supplierName");
  const supplierClientID = GetTranslationData("UIAdmin", "supplierClientID");
  const minThresholdAmount = GetTranslationData(
    "UIAdmin",
    "minThresholdAmount"
  );
  const balance_Available = GetTranslationData("UIAdmin", "balance_Available");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const action = GetTranslationData("UIAdmin", "action_label");
  const getRoleAccess = useSelector((state) => state.moduleReducer.filteredData);
  const supplierMasterData = useSelector(
    (state) => state.supplierMasterReducer
  );

  const headers = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Balance Available", key: "creditAmount" },
    { label: "Min Threshold Amount", key: "balanceThresholdAmount" },
    { label: "Status", key: "status" },
  ];

  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (supplierMasterData?.status_code === "200") {
      const totalItems = supplierMasterData?.data.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
      setIsLoading(false);
    }
  }, [supplierMasterData, page, rowsPerPage]);

  const handleEdit = (vendor) => {
    setVendorData({
      name: vendor.name,
      enabled: vendor.enabled ? true : false,
      balanceThresholdAmount: vendor.balanceThresholdAmount,
      creditAmount: vendor.creditAmount,
      servicePath: vendor.servicePath,
      id: vendor?.id,
    });
  };
  const handleDelete = (vendor) => {
    const deletedData = {
      name: vendor.name,
      id: vendor.id,
      balanceThresholdAmount: vendor.balanceThresholdAmount,
      creditAmount: vendor.creditAmount,
      servicePath: vendor.servicePath,
      deleted: true,
      enabled: false,
    };
    setIsDelete(true);
    setIsLoading(true);
    dispatch(onUpdateSupplierList(deletedData));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(onGetSupplierList());
    dispatch(onGetSupplierResource());
  }, []);
  const filteredVendorList = Array.isArray(supplierMasterData?.data)
    ? supplierMasterData?.data.filter((vendor) =>
      Object.values(vendor).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    : [];


  // excel data 
  const excelData = Array.isArray(supplierMasterData?.data) && supplierMasterData?.data?.map(data => ({
    id:data.id,
    name:data.name,
    creditAmount:data.creditAmount,
    balanceThresholdAmount:data.balanceThresholdAmount,
    status: data.enabled ? 'Active' : 'Non-active'
  }));

  return (
    <>
      {getRoleAccess[0]?.addAccess && (
        <SupplierMasterForm
          data={vendorData}
          setData={setVendorData}
          isDelete={isDelete}
          setIsDelete={setIsDelete}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              {isLoading ? (
                <div style={{ height: "400px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
              ) : (
                <>
                  <div className="container-fluid pt-1">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                      <div className="card-header">
                        <h4 className="card-title">{supplierList}</h4>
                      </div>
                      {supplierMasterData?.data.length > 0 && (
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
                      )}

                      <div className="d-flex align-items-center flex-wrap">
                        {supplierMasterData &&
                          supplierMasterData?.data.length > 0 && (
                            <CSVLink
                              data={excelData}
                              headers={headers}
                              filename={"SupplierMaster.csv"}
                            >
                              {filteredVendorList.length > 0 && (
                                <Button
                                  className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                                  icons={"fa fa-file-excel"}
                                  text={export_label}
                                />
                              )}
                            </CSVLink>
                          )}
                      </div>
                    </div>
                  </div>

                  <>
                    {filteredVendorList.length > 0 ? (
                      <div className="card-body position-relative">
                        <div className="table-responsive">
                          <>
                            <table className="table header-border table-responsive-sm">
                              <thead>
                                <tr>
                                  <th>{supplierName}</th>
                                  <th>{supplierClientID}</th>
                                  <th>{balance_Available}</th>
                                  <th>{minThresholdAmount}</th>
                                  <th>{status}</th>
                                  {getRoleAccess[0]?.editAccess && (
                                    <th>{action}</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {filteredVendorList.length > 0 ? (
                                  Array.isArray(filteredVendorList) &&
                                  filteredVendorList
                                    .slice(startIndex, endIndex)
                                    .map((vendor, index) => (
                                      <tr key={index}>
                                        <td>{vendor.name}</td>
                                        <td>{vendor.id}</td>
                                        <td>
                                          <span className="text-muted">
                                            {vendor.creditAmount}
                                          </span>
                                        </td>
                                        <td>{vendor.balanceThresholdAmount}</td>
                                        <td>
                                          <span
                                            className={`badge ${
                                              vendor.enabled
                                                ? "badge-success"
                                                : "badge-danger"
                                              }`}
                                          >
                                            {vendor.enabled
                                              ? "Active"
                                              : "Non-Active"}
                                          </span>
                                        </td>
                                        {getRoleAccess[0]?.editAccess && (
                                          <td>
                                            <div className="d-flex">
                                              <a
                                                className="btn btn-primary shadow btn-xs sharp me-1"
                                                onClick={() => handleEdit(vendor)}
                                              >
                                                <i className="fas fa-pencil-alt"></i>
                                              </a>
                                              <a
                                                className="btn btn-danger shadow btn-xs sharp"
                                                onClick={() =>
                                                  handleDelete(vendor)
                                                }
                                              >
                                                <i className="fa fa-trash"></i>
                                              </a>
                                            </div>
                                          </td>
                                        )}
                                      </tr>
                                    ))
                                ) : (
                                  <NoRecord />
                                )}
                              </tbody>
                            </table>
                            {filteredVendorList.length > 5 && (
                              <div className="pagination-container">
                                <ReactPaginate
                                  previousLabel={"<"}
                                  nextLabel={" >"}
                                  breakLabel={"..."}
                                  pageCount={Math.ceil(
                                    filteredVendorList.length / rowsPerPage
                                  )}
                                  marginPagesDisplayed={2}
                                  onPageChange={handlePageChange}
                                  containerClassName={"pagination"}
                                  activeClassName={"active"}
                                  initialPage={page - 1} // Use initialPage instead of forcePage
                                  previousClassName={
                                    page === 0 ? "disabled" : ""
                                  }
                                />
                              </div>
                            )}
                          </>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <NoRecord />
                      </div>

                    )}
                  </>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierMasterList;
