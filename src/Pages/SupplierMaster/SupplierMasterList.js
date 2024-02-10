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
const SupplierMasterList = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [apiError, setApiError] = useState(false);
  const [vendorData, setVendorData] = useState({
    name: "",
    balanceThresholdAmount: "",
    creditAmount: "",
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
  // const active = GetTranslationData("UIAdmin", "active");
  const supplierMasterData = useSelector(
    (state) => state.supplierMasterReducer
  );

  const headers = [
    { label: "id", key: "id" },
    { label: "name", key: "name" },
    { label: "balanceAvailable", key: "creditAmount" },
    { label: "minThresholdAmount", key: "balanceThresholdAmount" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (
      supplierMasterData?.message === "Created Successfully." ||
      "Updated Successfully."
    ) {
      dispatch(onGetSupplierList());
      setIsLoading(false);
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(onGetSupplierList());
        setIsLoading(false);
      } catch (error) {
        if (supplierMasterData.status_code === 400) {
          setTimeout(() => {
            // setApiError(true);
            setIsLoading(false);
          }, 2000);
        }
      }
    };

    fetchData();
  }, [supplierMasterData?.message]);

  const handleEdit = (vendor) => {
    setVendorData({
      name: vendor.name,
      status: vendor.status,
      balanceThresholdAmount: vendor.balanceThresholdAmount,
      creditAmount: vendor.creditAmount,
      id: vendor?.id,
    });
  };
  const handleDelete = (vendor) => {
    const deletedData = {
      name: vendor.name,
      id: vendor.id,
      balanceThresholdAmount: vendor.balanceThresholdAmount,
      creditAmount: vendor.creditAmount,
      deleted: true,
      enabled: false,
    };
    dispatch(onUpdateSupplierList(deletedData));
  };
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

  return (
    <>
      <SupplierMasterForm data={vendorData} />

      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              {/* {apiError && <NoRecord />} */}

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
                      {supplierMasterData?.data.length > 0 ? (
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
                              <a href="#">
                                <i className="flaticon-381-search-2"></i>
                              </a>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ height: "0px" }}>
                          <Loader classType={"absoluteLoader"} />
                        </div>
                      )}

                      <div className="d-flex align-items-center flex-wrap">
                        {supplierMasterData &&
                          supplierMasterData?.data.length > 0 && (
                            <CSVLink
                              data={supplierMasterData?.data}
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
                                  <th>{action}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredVendorList.length > 0 ? (
                                  Array.isArray(filteredVendorList) &&
                                  filteredVendorList.map((vendor, index) => (
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
                                      <td>
                                        <div className="d-flex">
                                          <a
                                            className="btn btn-primary shadow btn-xs sharp me-1"
                                            onClick={() => handleEdit(vendor)}
                                          >
                                            <i className="fas fa-pencil-alt"></i>
                                          </a>
                                          <a className="btn btn-danger shadow btn-xs sharp">
                                            <i
                                              className="fa fa-trash"
                                              onClick={() =>
                                                handleDelete(vendor)
                                              }
                                            ></i>
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <NoRecord />
                                )}
                              </tbody>
                            </table>
                          </>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <NoRecord />{" "}
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
