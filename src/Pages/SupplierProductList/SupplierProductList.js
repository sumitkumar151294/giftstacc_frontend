import React, { useEffect, useState } from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { onGetSupplierBrandList, onUpdateSupplierBrandList, onUpdateSupplierBrandListReset } from "../../Store/Slices/supplierBrandListSlice";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

const SupplierProductList = () => {
  const dispatch = useDispatch();
  const [selectedSupplierCode, setSelectedSupplierCode] = useState("Select");
  const [isLoading, setIsLoading] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [copySupplierBrandList, setCopySupplierBrandList] = useState([]);
  const SupplierBrandList = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const activeUsersCount = Array.isArray(SupplierBrandList) && SupplierBrandList?.filter(item => item?.enabled)?.length;
  const inactiveUsersCount = Array.isArray(SupplierBrandList) && SupplierBrandList?.filter(item => !item?.enabled)?.length;
  const SupplierBrandListUpdate = useSelector(
    (state) => state.supplierBrandListReducer
  );
  const suppliers = useSelector((state) => state.supplierMasterReducer);
  const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const selectSuppliers = GetTranslationData("UIAdmin", "selectSuppliers");
  const supplier_products = GetTranslationData("UIAdmin", "supplier_products");
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
    dispatch(onGetSupplierList());
  }, []);

  useEffect(() => {
    setCopySupplierBrandList(SupplierBrandList)
  }, [SupplierBrandList])


  useEffect(() => {
    if (SupplierBrandListUpdate?.updateStatusCode === "201") {
      setIsLoading(false);
      toast.success(SupplierBrandListUpdate?.message)
      dispatch(onGetSupplierBrandList());
      dispatch(onUpdateSupplierBrandListReset())
    }
  }, [SupplierBrandListUpdate])

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;
  const headers = [
    { label: "Id", key: "id" },
    { label: "Brands", key: "brands" },
    { label: "Supplier Margin", key: "supplier_Margin" },
    { label: "Status", key: "status" },
  ];
  const generateUniqueId = (index) => `toggleSwitch-${index}`;

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
    const selectedSupplierCode = e.target.value;
    if (selectedSupplierCode === "Select") {
      setCopySupplierBrandList(SupplierBrandList);
    } else {
      let filteredSupplierList = Array.isArray(SupplierBrandList) && SupplierBrandList?.filter((vendor) =>
        vendor?.supplierCode.toLowerCase() === selectedSupplierCode.toLowerCase()
      );
      setCopySupplierBrandList(filteredSupplierList);
    }
  };

  const userData = [
    {
      status: "Active",
      count: activeUsersCount,
      className: "btn btn-success btn-sm btn-margin",
    },
    {
      status: "Deprecated",
      count: "0",
      className: "btn btn-danger btn-sm btn-margin",
    },
    {
      status: "Deactive",
      count: inactiveUsersCount,
      className: "btn btn-warning btn-sm btn-margin",
    },
    {
      status: "New",
      count: "0",
      className: "btn btn-primary btn-sm btn-margin",
    },
    {
      status: "Total",
      count: SupplierBrandList?.length,
      className: "btn btn-secondary btn-sm btn-margin",
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key === "e" || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }
  };

  const handleInputChange = (e, ids) => {
    const newValue = e.target.value < 0 ? 0 : e.target.value;
    const updatedSupplier = copySupplierBrandList.map(item => {
      if (item.id === ids) {
        return { ...item, supplierMargin: newValue };
      } else {
        return item;
      }
    });
    setCopySupplierBrandList(updatedSupplier);
  };
  const handleUpdate = (data) => {
    const updatedValues = {
      id: data.id,
      supplierMargin: data?.supplierMargin,
      clientCommission: data?.clientCommission,
      customerDiscount: data?.customerDiscount,
      clientId: data?.clientId,
      enabled: data?.enabled,
      clientEnabled: data?.clientEnabled
    };
    setIsLoading(true);
    dispatch(onUpdateSupplierBrandList(updatedValues));
  };

  const updateStatus = (data) => {
    const updatedValues = {
      id: data.id,
      supplierMargin: data?.supplierMargin,
      clientCommission: data?.clientCommission,
      customerDiscount: data?.customerDiscount,
      clientId: data?.clientId,
      enabled: !data?.enabled,
      clientEnabled: data?.clientEnabled
    };
    setIsLoading(true)
    dispatch(onUpdateSupplierBrandList(updatedValues));
  }

  useEffect(() => {
    let filteredSupplierList = Array.isArray(SupplierBrandList) && SupplierBrandList?.filter((vendor) =>
      vendor?.name.toLowerCase().includes(searchQuery?.toLowerCase()) &&
      (vendor?.supplierCode.toLowerCase() === selectedSupplierCode.toLowerCase() || selectedSupplierCode === "Select")
    );
    setCopySupplierBrandList(filteredSupplierList);
  }, [searchQuery, selectedSupplierCode]);

  // excel data to print
  const excelData = Array.isArray(SupplierBrandList)&&SupplierBrandList.map(data => ({
    id: data.id,
    brands: data.name,
    supplier_Margin: data.supplierMargin,
    status: data.enabled ?"Active":"Non-active",
  }));

  return (
    <>
      <ScrollToTop />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-xxl-12">
              <div className="card d-flex justify-content-between ">
                <div className="container-fluid mt-2 mb-2 ">
                  <div className="d-flex justify-content-between align-items-center mb-4 mt-7-supplier flex-wrap">
                    <div className="card-header">
                      <h4 className="card-title">{supplier_products}</h4>
                    </div>
                    <div className="customer-search mb-sm-0 mb-3">
                      <div className="input-group search-area">
                        <InputField
                          type="text"
                          value={searchQuery}
                          onChange={handleSearch}
                          className="form-control only-high "
                          placeholder={search_here_label}
                        />
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex-wrap">
                      {copySupplierBrandList &&
                        copySupplierBrandList.length > 0 && (
                          <CSVLink
                            data={excelData}
                            headers={headers}
                            filename={"SupplierProductList.csv"}
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
                <div className="card-body">
                  <form>
                    <div className="row flex-column px-1">
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="name-f">{selectSuppliers}</label>
                        <Dropdown
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setSelectedSupplierCode(e.target.value);
                            handleChange(e);
                          }}
                          options={supplierList}
                        />
                      </div>
                      <div className="col-lg-9 d-flex justify-content-end m-auto mb-2 w-100-sm">
                        {userData.map((data, index) => (
                          <span className="mrr" key={index}>
                            <Button
                              type="button"
                              className={data.className}
                              text={data.status}
                              btn_css={"btn-icon-end"}
                              value={data.count}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  </form>
                  <div className="row px-1">
                    <div className="col-lg-12">
                      {isLoading ? (
                        <div style={{ height: "400px" }}>
                          <Loader classType={"absoluteLoader"} />
                        </div>
                      ) : (
                        <div>
                          <div className="card-header">
                            <h4 className="card-title">{supplierBrandLists}</h4>
                          </div>
                          {Array.isArray(copySupplierBrandList) &&
                            copySupplierBrandList.length > 0 ? (
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
                                    {copySupplierBrandList
                                      .slice(startIndex, endIndex)
                                      .map((data, index) => (
                                        <tr key={index}>
                                          <td>{data.id}</td>
                                          <td>{data.name}</td>
                                          <td>
                                            <div className="input-group mb-2 w-11">
                                              <InputField
                                                type="number"
                                                className="form-control htt  border-Radius"
                                                placeholder={data.supplier_Margin}
                                                pattern="/^-?\d+\.?\d*$/"
                                                value={data?.supplierMargin}
                                                onChange={(e) => handleInputChange(e, data.id)}
                                                onKeyPress={(e) => handleKeyPress(e, index)}
                                              />
                                              <div className="input-group-append">
                                                <Button
                                                  onClick={() =>
                                                    handleUpdate(data, data.id)
                                                  }
                                                  className="btn btn-outline-primary btn-sm group-btn btn-pad"
                                                  type="button"
                                                  text={update}
                                                />
                                              </div>
                                            </div>
                                          </td>
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
                                              <input id={generateUniqueId(index)} type="checkbox" checked={data.enabled}></input>
                                              <label
                                                htmlFor={generateUniqueId(index)}
                                              >
                                                <div
                                                  className="can-toggle__switch"
                                                  data-unchecked={"OFF"}
                                                  data-checked={"ON"}
                                                  onClick={() => updateStatus(data, index)}
                                                ></div>
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                                {copySupplierBrandList?.length > 5 &&
                                  <div className="pagination-container">
                                    <ReactPaginate
                                      previousLabel={"<"}
                                      nextLabel={" >"}
                                      breakLabel={"..."}
                                      pageCount={Math.ceil(
                                        SupplierBrandList.length / rowsPerPage
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
                                }
                              </div>
                            </div>
                          ) : (
                            <NoRecord />
                          )}
                        </div>
                      )}
                      <ToastContainer />
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

export default SupplierProductList;
