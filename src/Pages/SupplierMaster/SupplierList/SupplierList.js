import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Loader from "../../../Componenets/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { onGetSupplierList } from "../../../Store/Slices/supplierMasterSlice";
import NoRecord from "../../../Componenets/NoRecord/NoRecord";
import SupplierMasterDetails from "../../SupplierMaster/SupplierMasterDetails/SupplierMasterDetails";
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

  const supplierMasterData = useSelector(
    (state) => state.supplierMasterReducer.data.data
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
        console.error("Error fetching data:", error);
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
                  <div className="card-header">
                    <h4 className="card-title">Supplier List</h4>
                    <div className="customer-search mb-sm-0 mb-3">
                      <div className="input-group search-area">
                        <input
                          type="text"
                          className="form-control only-high"
                          placeholder="Search here......"
                          value={searchQuery}
                          onChange={handleSearch}
                        />
                        <span className="input-group-text">
                          <a href="javascript:void(0)">
                            <i className="flaticon-381-search-2"></i>
                          </a>
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center flex-wrap">
                      {supplierMasterData && supplierMasterData.length > 0 && (
                        <CSVLink data={supplierMasterData} headers={headers}>
                                                    {filteredVendorList.length > 0 && (

                          <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                            <i className="fa fa-file-excel me-2"></i>export
                          </button>
                                                    )}
                        </CSVLink>
                      )}
                    </div>
                  </div>
                
                 
                 { filteredVendorList?.length > 0 ? (
                    <div className="card-body position-relative">
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>Supplier Name</th>
                              <th>Supplier Client ID</th>
                              <th>Username</th>
                              <th>Password</th>
                              <th>Min. Threshold Amount</th>
                              <th>Status</th>
                              <th>Action</th>
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
                                      {vendor.Username}
                                    </span>
                                  </td>
                                  <td>{vendor.Password}</td>
                                  <td>{vendor.MinThresholdAmount}</td>
                                  <td>
                                    <div className="d-flex">
                                      <a
                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                        onClick={() => handleEdit(vendor)}
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
