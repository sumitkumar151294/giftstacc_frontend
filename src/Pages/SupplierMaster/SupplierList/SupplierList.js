import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Loader from "../../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { onGetSupplierList } from "../../../Store/Slices/supplierMasterSlice";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import SupplierMasterDetails from "../SupplierMasterDetails/SupplierMasterDetails";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
const SupplierList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vendorData, setVendorData] = useState({
    name: "",
    secret: "",
    id: "",
    username: "",
    password: "",
    endPoint: "",
    code: "",
    status: "",
    amount: "",
  });
  const supplierList = GetTranslationData("UIAdmin", "supplierList");
  const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const supplierName = GetTranslationData("UIAdmin", "supplierName");
  const supplierClientID = GetTranslationData("UIAdmin", "supplierClientID");
  const userName = GetTranslationData("UIAdmin", "usernamee_label");
  const password = GetTranslationData("UIAdmin", "password_label");
  const minThresholdAmount = GetTranslationData(
    "UIAdmin",
    "minThresholdAmount"
  );
  const balance_Available = GetTranslationData("UIAdmin", "balance_Available");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const action = GetTranslationData("UIAdmin", "action_label");
  const active = GetTranslationData("UIAdmin", "active");

  const supplierMasterData = useSelector(
    (state) => state.supplierMasterReducer?.data.data
  );

  const headers = [
    { label: "id", key: "id" },
    { label: "name", key: "name" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(onGetSupplierList());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (vendor) => {
    setVendorData({
      name: vendor.name,
      secret: vendor.secret,
      id: vendor.id,
      username: vendor.Username,
      password: vendor.Password,
      endPoint: vendor.endPoint,
      code: vendor.code,
      status: vendor.status,
      amount: vendor.MinThresholdAmount,
    });
  };

  const filteredVendorList = Array.isArray(supplierMasterData)
    ? supplierMasterData.filter((vendor) =>
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
      {isLoading ? (
        <Loader classType={"absoluteLoader"} />
      ) : (
        <>
          <SupplierMasterDetails data={vendorData} />
          <div className="container-fluid pt-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                      <div className="card-header">
                        <h4 className="card-title">{supplierList}</h4>
                      </div>
                      <div className="customer-search mb-sm-0 mb-3">
                        <div className="input-group search-area">
                          <input
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

                      <div className="d-flex align-items-center flex-wrap">
                        {supplierMasterData &&
                          supplierMasterData.length > 0 && (
                            <CSVLink
                              data={supplierMasterData}
                              headers={headers}
                              filename={"SupplierMaster.csv"}
                            >
                              {filteredVendorList.length > 0 && (
                                <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                                  <i className="fa fa-file-excel me-2"></i>
                                  {export_label}
                                </button>
                              )}
                            </CSVLink>
                          )}
                      </div>
                    </div>
                  </div>

                  {filteredVendorList?.length > 0 ? (
                    <div className="card-body position-relative">
                      <div className="table-responsive">
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
                                    <span className="text-muted">1000</span>
                                  </td>
                                  <td>500</td>
                                  <td>
                                    <span className="badge badge-success">
                                      {active}
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
                                        <i className="fa fa-trash"></i>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <></>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <NoRecord />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SupplierList;
