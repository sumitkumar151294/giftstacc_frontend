import React, { useEffect, useState } from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { useLocation } from "react-router-dom";
import PageError from "../../Components/PageError/PageError";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import {
  onGetSupplierBrandList,
  onUpdateSupplierBrandList,
  onUpdateSupplierBrandListReset,
  // onUpdateSupplierBrandListReset,
} from "../../Store/Slices/supplierBrandListSlice";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import NoRecord from "../../Components/NoRecord/NoRecord";

const ClientBrandList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [supplierList, setSupplierList] = useState([]);
  const [supplierBrandList, setSupplierBrandList] = useState([]);
  const SupplierBrandList = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const SupplierBrandListUpdate = useSelector(
    (state) => state.supplierBrandListReducer
  );

  const suppliers = useSelector((state) => state.supplierMasterReducer);
  const [marginValue, setMarginValue] = useState([]);

  const [customerDiscount, setCustomerDiscount] = useState([]);

  const clientbrandlist = GetTranslationData("UIAdmin", "clientbrandlist");
  const [clientCommission, setClientCommission] = useState([]);

  const clientbrandlistheading = GetTranslationData(
    "UIAdmin",
    "clientbrandlistheading"
  );
  const clientbrandlistname = GetTranslationData(
    "UIAdmin",
    "clientbrandlistname"
  );
  const clientbrandlistbrandname = GetTranslationData(
    "UIAdmin",
    "clientbrandlistbrandname"
  );
  const clientbrandlistdiscount = GetTranslationData(
    "UIAdmin",
    "clientbrandlistdiscount"
  );
  const clientbrandlistcommission = GetTranslationData(
    "UIAdmin",
    "clientbrandlistcommission"
  );
  const clientbrandlistmargin = GetTranslationData(
    "UIAdmin",
    "clientbrandlistmargin"
  );
  const clientbrandlistaction = GetTranslationData(
    "UIAdmin",
    "clientbrandlistaction"
  );
  const status = GetTranslationData("UIAdmin", "Status_label");
  const selectSuppliers = GetTranslationData("UIAdmin", "selectSuppliers");
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
  const [searchQuery, setSearchQuery] = useState("");

  const [rowsPerPage] = useState(5);
  const headers = [
    { label: "name", key: "name" },
    { label: "brands", key: "brands" },
    { label: "brandName", key: "brandName" },
    { label: "customerDiscount", key: "customerDiscount" },
    { label: "clientCommission", key: "clientCommission" },
    { label: "supplierMargin", key: "supplierMargin" },
    { label: "status", key: "enabled" },
  ];
  useEffect(() => {
    dispatch(onGetSupplierBrandList());
    dispatch(onGetSupplierList());
  }, []);
  useEffect(() => {
    setClientCommission(SupplierBrandList);
    setCustomerDiscount(SupplierBrandList);
  }, [SupplierBrandList]);
  useEffect(() => {
    let filteredSupplierList =
      Array.isArray(SupplierBrandList) &&
      SupplierBrandList?.filter((vendor) =>
        vendor?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
    setSupplierBrandList(filteredSupplierList);
    const tempMarginValue = [];
    if (marginValue.length !== SupplierBrandList.length) {
      SupplierBrandList?.map((item) => {
        tempMarginValue.push({ value: item.supplierMargin });
      });
      setMarginValue(tempMarginValue);
    }
  }, [SupplierBrandList]);

  useEffect(() => {
    if (SupplierBrandListUpdate?.updateStatusCode === "201") {
      toast.success(SupplierBrandListUpdate?.message);
      dispatch(onGetSupplierBrandList());
      dispatch(onUpdateSupplierBrandListReset());
    }
  }, [SupplierBrandListUpdate]);

  const [page, setPage] = useState(1);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  const handleKeyPress = (e) => {
    if (e.key === "e" || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }
  };
  const generateUniqueId = (index) => `toggleSwitch-${index}`;
  const filteredBrandList = Array.isArray(SupplierBrandList)
    ? SupplierBrandList.filter((vendor) =>
        Object.values(vendor).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value?.toLowerCase().includes(searchQuery?.toLowerCase())
        )
      )
    : [];

  useEffect(() => {
    if (suppliers?.data.length && !supplierList.length) {
      let tempSupplier = [];
      suppliers?.data?.map((item) => {
        tempSupplier.push({ label: item.name, value: item.code });
      });
      setSupplierList(tempSupplier);
    }
  }, [suppliers]);

  const handleChange = (e) => {
    if (e.target.value === "Select") {
      setSupplierBrandList(supplierBrandList);
    } else {
      let filteredSupplierList =
        Array.isArray(SupplierBrandList) &&
        SupplierBrandList?.filter((vendor) =>
          vendor?.supplierCode
            ?.toLowerCase()
            .includes(e.target?.value?.toLowerCase())
        );
      setSupplierBrandList(filteredSupplierList);
    }
  };
  const handleInputChange = (e, ids) => {
    debugger;
    const newValue = e.target.value < 0 ? 0 : e.target.value;

    // Update for clientCommission

    const updateClientCommission = clientCommission?.map((item) => {
      if (item.id === ids) {
        debugger;
        return { ...item, clientCommission: newValue };
      } else {
        return item;
      }
    });
    setClientCommission(updateClientCommission);

    const updateCustomerDiscount = customerDiscount?.map((item) => {
      if (item.id === ids) {
        return { ...item, customerDiscount: newValue };
      } else {
        return item;
      }
    });
    setCustomerDiscount(updateCustomerDiscount);
  };

  const handleUpdate = (data) => {
    debugger;
    const updatedValues = {
      id: data.id,
      supplierMargin: data.supplierMargin,
      clientCommission: data.clientCommission,
      customerDiscount: data?.customerDiscount,
      clientId: data?.clientId,
    };
    dispatch(onUpdateSupplierBrandList(updatedValues));
  };

  const handleUpdateClient = (data) => {
    debugger;
    const updatedValues = {
      id: data.id,
      supplierMargin: data.supplierMargin,
      clientCommission: data.clientCommission,
      customerDiscount: data?.customerDiscount,
      clientId: data?.clientId,
    };
    dispatch(onUpdateSupplierBrandList(updatedValues));
  };
  const updateStatus = (data) => {
    debugger
    const updatedValues = {
      id: data.id,
      supplierMargin: data.marginValue,
      clientCommission: data?.clientCommission,
      customerDiscount: data.customerDiscount,
      clientId: data?.clientId,
      enabled: !data?.enabled,
    };
    dispatch(onUpdateSupplierBrandList(updatedValues));
  };
  return (
    <>
      <ScrollToTop />
      {console.log("sdff", location.state ? "true" : "false")}
      {location.state ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-xxl-12">
              <div className="card">
                <div className="container-fluid mt-2 mb-2 mt-client-list">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="card-header">
                      <h4 className="card-title headdd">{clientbrandlist}</h4>
                    </div>
                    <div className="customer-search mb-sm-0 mb-3">
                      <div className="input-group search-area">
                        <InputField
                          type="text"
                          value={searchQuery}
                          onChange={handleSearch}
                          className="form-control only-high"
                          placeholder={search_here_label}
                        />
                        <span className="input-group-text">
                          <a href="#">
                            <i className="flaticon-381-search-2"></i>
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex-wrap">
                    <CSVLink
                            data={SupplierBrandList}
                            headers={headers}
                            filename={"ClientBrandList.csv"}
                          >
                            <Button
                              className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                              icons={"fa fa-file-excel"}
                              text={export_label}
                            />
                          </CSVLink>
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-0 mt-client-list">
                  <div className="row">
                    <div className="col-sm-3 form-group mb-2">
                      <label htmlFor="name-f">{clientbrandlistheading}</label>
                      <Dropdown
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => handleChange(e, "status")}
                        options={supplierList}
                      />
                    </div>
                  </div>
                  {filteredBrandList.length > 0 ? (
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>{clientbrandlistname}</th>
                              <th>{clientbrandlistbrandname}</th>
                              <th>{clientbrandlistdiscount}</th>
                              <th>{clientbrandlistcommission}</th>
                              <th>{clientbrandlistmargin}</th>
                              <th>{status}</th>
                              <th>{clientbrandlistaction}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredBrandList
                              .slice(startIndex, endIndex)
                              .map((data, index) => (
                                <tr key={data.id}>
                                  <td>
                                    {data.name}
                                    <a href="#"></a>
                                  </td>
                                  <td>{data.name}</td>
                                  <td>
                                    <div className="input-group mb-2 w-11">
                                      <InputField
                                        type="number"
                                        className="form-control update-val"
                                        placeholder={data.customerDiscount}
                                        pattern="/^-?\d+\.?\d*$/"
                                        value={data.customerDiscount}
                                        onChange={(e) =>
                                          handleInputChange(e, data.id)
                                        }
                                        onKeyPress={(e) =>
                                          handleKeyPress(e, index)
                                        }
                                      />
                                      <div className="input-group-append">
                                        <Button
                                          onClick={() =>
                                            handleUpdate(data, data.id)
                                          }
                                          className="btn btn-outline-primary btn-sm group-btn"
                                          type="button"
                                          text={update}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="input-group mb-2 w-11">
                                      <InputField
                                        type="number"
                                        className="form-control update-val"
                                        value={data.clientCommission}
                                        onChange={(e) =>
                                          handleInputChange(e, data.id)
                                        }
                                        onKeyPress={(e) =>
                                          handleKeyPress(e, index)
                                        }
                                        placeholder={data.clientCommission}
                                        pattern="/^-?\d+\.?\d*$/"
                                      />
                                      <div className="input-group-append">
                                        <Button
                                          onClick={() =>
                                            handleUpdateClient(data, data.id)
                                          }
                                          className="btn btn-outline-primary btn-sm group-btn"
                                          type="button"
                                          text={update}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td>{data.supplierMargin}</td>
                                  <td>
                                          <span
                                            className={
                                              data.enabled === true
                                                ? "badge badge-success"
                                                : "badge badge-danger"
                                            }
                                          >
                                            {data.enabled === true
                                              ? "Active"
                                              : "Non-Active"}
                                          </span>
                                        </td>
                                        <td>
                                          <div className="can-toggle">
                                          <input id={generateUniqueId(index)} type="checkbox" checked ={data.enabled }></input>
                                            <label
                                              htmlFor={generateUniqueId(index)}
                                            >
                                              <div
                                                className="can-toggle__switch"
                                                data-unchecked={"OFF"}
                                                data-checked={"ON"}
                                                onClick={()=>updateStatus(data,index)}
                                              ></div>
                                            </label>
                                          </div>
                                        </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {filteredBrandList?.length > 5 && (
                          <div className="pagination-container">
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={">"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(
                                filteredBrandList.length / rowsPerPage
                              )}
                              filteredBrandList
                              marginPagesDisplayed={2}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={page === 1 && "active"}
                              initialPage={page - 1}
                              previousClassName={page === 1 ? "disabled" : ""}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <NoRecord />
                  )}
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageError
          pageError={{
            StatusCode: "401",
            ErrorName: "Not Authorised",
            ErrorDesription: "You are not authorised to view this page",
            url: "/",
            buttonText: "Back to home",
          }}
        />
      )}
    </>
  );
};

export default ClientBrandList;
