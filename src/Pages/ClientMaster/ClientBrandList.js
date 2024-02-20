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
  // onUpdateSupplierBrandListReset,
} from "../../Store/Slices/supplierBrandListSlice";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";

const ClientBrandList = () => {
  const dispatch = useDispatch();

  const location = useLocation();
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

  const [customerDiscount, setCustomerDiscount] = useState("");
  const clientbrandlist = GetTranslationData("UIAdmin", "clientbrandlist");
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
  const selectSuppliers = GetTranslationData("UIAdmin", "selectSuppliers");
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage] = useState(5);
  const headers = [
    { label: "id", key: "id" },
    { label: "brands", key: "brands" },
    { label: "supplier_Margin", key: "supplier_Margin" },
    { label: "status", key: "status" },
    { label: "action", key: "action" },
  ];
  useEffect(() => {
    dispatch(onGetSupplierBrandList());
    dispatch(onGetSupplierList());
  }, []);

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
      debugger;
      setMarginValue(tempMarginValue);
    }
  }, [SupplierBrandList]);

  // useEffect(() => {
  //   if (SupplierBrandListUpdate?.updateStatusCode === "201") {
  //     toast.success(SupplierBrandListUpdate?.message);
  //     dispatch(onGetSupplierBrandList());
  //     dispatch(onUpdateSupplierBrandListReset());
  //   }
  // }, [SupplierBrandListUpdate]);

  const [page, setPage] = useState(1);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
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
  const handleInputChange = (e, index) => {
    const newValue = e.target.value < 0 ? 0 : e.target.value;

    // Update for customerDiscount
    setCustomerDiscount((prevCustomerDiscount) => {
      const updatedCustomerDiscount = [...prevCustomerDiscount];
      if (updatedCustomerDiscount[index]) {
        updatedCustomerDiscount[index].value = newValue;
      } else {
      }
      return updatedCustomerDiscount;
    });

    // Update for marginValue
    setMarginValue((prevMarginValue) => {
      const updatedMarginValue = [...prevMarginValue];
      if (updatedMarginValue[index]) {
        updatedMarginValue[index].value = newValue;
      } else {
      }
      return updatedMarginValue;
    });
  };

  const handleUpdate = (data, index) => {
    const updatedValues = {
      id: data.id,
      supplierMargin: marginValue[index]?.value,
      clientCommission: data?.clientCommission,
      customerDiscount: data?.customerDiscount,
      clientId: data?.clientId,
    };
    // dispatch(onUpdateSupplierBrandList(updatedValues));
  };
  const updateStatus = (data, index) => {
    const updatedValues = {
      id: data.id,
      supplierMargin: marginValue[index]?.value,
      clientCommission: data?.clientCommission,
      customerDiscount: data?.customerDiscount,
      clientId: data?.clientId,
      enabled: !data?.enabled,
    };
    // dispatch(onUpdateSupplierBrandList(updatedValues));
  };
  return (
    <>
      <ScrollToTop />
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
                      {filteredBrandList.length > 0 && (
                        <CSVLink
                          data={SupplierBrandList}
                          headers={headers}
                          filename={"SupplierBrandList.csv"}
                        >
                          <Button
                            className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                            icons={"fa fa-file-excel"}
                            text={export_label}
                          />
                        </CSVLink>
                      )}
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
                </div>
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
                          <th>{clientbrandlistaction}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(filteredBrandList) &&
                          filteredBrandList.map((data, index) => (
                            <tr key={index}>
                              <td>
                                {data.name}
                                <a href="#"></a>
                              </td>
                              <td>{data.brandName}</td>
                              <td>
                                <div className="input-group mb-2 w-11">
                                  <InputField
                                    type="number"
                                    className="form-control update-val"
                                    placeholder={data.customerDiscount}
                                    pattern="/^-?\d+\.?\d*$/"
                                    value={customerDiscount[index]?.value}
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                  />
                                  <div className="input-group-append">
                                    <Button
                                      onClick={() => handleUpdate(data, index)}
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
                                    value={marginValue[index]?.value}
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    placeholder={data.clientCommission}
                                    pattern="/^-?\d+\.?\d*$/"
                                  />
                                  <div className="input-group-append">
                                    <Button
                                      onClick={() => handleUpdate(data, index)}
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
                                  <input
                                    id={generateUniqueId(index)}
                                    type="checkbox"
                                    checked={data.enabled}
                                  ></input>
                                  <label htmlFor={generateUniqueId(index)}>
                                    <div
                                      className="can-toggle__switch"
                                      data-unchecked="Off"
                                      data-checked={
                                        data.enabled === true ? "ON" : "OFF"
                                      } // Set label based on the status
                                      onClick={() => updateStatus(data, index)}
                                    ></div>
                                  </label>
                                </div>
                              </td>
                              <td></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {filteredBrandList?.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(
                            filteredBrandList.length / rowsPerPage
                          )}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                          previousClassName={page === 0 ? "disabled" : ""}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <ToastContainer />
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
