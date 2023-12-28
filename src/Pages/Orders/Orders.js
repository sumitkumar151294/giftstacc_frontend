import React, { useEffect, useState } from "react";
import { GetTranslationData } from "../../Componenets/GetTranslationData/GetTranslationData ";
import "./Orders.scss";
import ScrollToTop from "../../Componenets/ScrollToTop/ScrollToTop";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Componenets/Dropdown/Dropdown";
import NoRecord from "../../Componenets/NoRecord/NoRecord";
import Loader from "../../Componenets/Loader/Loader";
import { Pagination } from "@mui/material";
import { CSVLink } from "react-csv";

const Orders = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [supplierListData, setSupplierListData] = useState([]);
  const [clientListData, setClientListData] = useState([]);
  const [supplierList, setSupplierList] = useState({
    supplier: "",
    client: "",
  });

  const supplierMasterData = useSelector(
    (state) => state.supplierMasterReducer?.data?.data
  );
  const clientList = useSelector((state) => state?.clientMasterReducer?.data);
  const orders = GetTranslationData("UIAdmin", "orders");
  const supplier = GetTranslationData("UIAdmin", "supplier");
  const client = GetTranslationData("UIAdmin", "client");
  const date = GetTranslationData("UIAdmin", "date");
  const ordersupplier = GetTranslationData("UIAdmin", "ordersupplier");
  const orderbrand = GetTranslationData("UIAdmin", "orderbrand");
  const ordervouchers = GetTranslationData("UIAdmin", "ordervouchers");
  const orderamount = GetTranslationData("UIAdmin", "orderamount");
  const ordermargin = GetTranslationData("UIAdmin", "ordermargin");
  const ordermarginvalue = GetTranslationData("UIAdmin", "ordermarginvalue");
  const exportLabel = GetTranslationData("UIAdmin", "export_label");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const data = [
    {
      supplier: "abc",
      brand: "amazon",
      vouchers: "2",
      amount: "₹1000",
      margin: "5%",
      marginvalue: "₹50",
    },
    {
      supplier: "def",
      brand: "flipcart",
      vouchers: "3",
      amount: "₹5000",
      margin: "10%",
      marginvalue: "₹100",
    },
    {
      supplier: "ghi",
      brand: "ajio",
      vouchers: "4",
      amount: "₹2000",
      margin: "15%",
      marginvalue: "₹150",
    },
    {
      supplier: "jkl",
      brand: "myntra",
      vouchers: "5",
      amount: "₹3000",
      margin: "20%",
      marginvalue: "₹200",
    },
  ];
  const headers = [
    { label: "supplier", key: "supplier" },
    { label: "brand", key: "brand" },
    { label: "vouchers", key: "vouchers" },
    { label: "amount", key: "amount" },
    { label: "margin", key: "margin" },
    { label: "marginvalue", key: "marginvalue" },
  ];
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  useEffect(() => {
    setShowLoader(false);
  }, [showLoader]);
  useEffect(() => {
    dispatch(onGetSupplierList());
    dispatch(onClientMasterSubmit());
  }, []);
  useEffect(() => {
    let tempSupplier = [];
    supplierMasterData?.map((item) => {
      tempSupplier.push({ label: item.name, value: item.name });
    });
    setSupplierListData(tempSupplier);
  }, [supplierMasterData]);
  useEffect(() => {
    let tempClient = [];
    Array.isArray(clientList) &&
      clientList?.map((item) => {
        tempClient.push({ label: item.name, value: item.name });
      });
    setClientListData(tempClient);
  }, [clientList]);
  const handleChange = (e, fieldName) => {
    setSupplierList({
      ...supplierList,
      [fieldName]: e.target.value,
    });
  };

  const filteredOrderList = Array.isArray(data)
    ? data.filter((vendor) =>
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

  return (
    <>
      <ScrollToTop />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-xxl-12">
              <div className="card">
                <div className="container-fluid">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="card-header">
                      <h4 className="card-title">{orders}</h4>
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
                          <a href="#">
                            <i className="flaticon-381-search-2"></i>
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex-wrap">
                      {data && data.length > 0 && (
                        <CSVLink
                          data={data}
                          headers={headers}
                          filename={"orders.csv"}
                        >
                          {filteredOrderList.length > 0 && (
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
                <div className="container-fluid">
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div className="col-sm-3 form-group mb-2">
                      <label for="name-f">{supplier}</label>
                      <Dropdown
                        onChange={(e) => handleChange(e, "supplier")}
                        value={supplierList.supplier || ""}
                        className="form-select"
                        options={supplierListData}
                      />
                    </div>
                    <div className="col-sm-3 form-group mb-2">
                      <label for="name-f">{client}</label>
                      <Dropdown
                        onChange={(e) => handleChange(e, "client")}
                        value={supplierList?.client || ""}
                        className="form-select"
                        options={clientListData}
                      />
                    </div>
                    <div className="col-xl-3">
                      <div className="example">
                        <p className="mb-1">{date}</p>
                        <input
                          type="text"
                          className="form-control input-daterange-timepicker"
                          name="daterange"
                          value="01/01/2015 1:30 PM - 01/01/2015 2:00 PM"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {showLoader && filteredOrderList.length < 0 ? (
                    <div style={{ height: "400px" }}>
                      <Loader classType={"absoluteLoader"} />
                    </div>
                  ) : (
                    <>
                      <div className="table-responsive">
                        {filteredOrderList.length > 0 ? (
                          <>
                            <table className="table header-border table-responsive-sm">
                              <thead>
                                <tr>
                                  <th>{ordersupplier}</th>
                                  <th>{orderbrand}</th>
                                  <th>{ordervouchers}</th>
                                  <th>{orderamount}</th>
                                  <th>{ordermargin}</th>
                                  <th>{ordermarginvalue}</th>
                                </tr>
                              </thead>
                              {filteredOrderList
                                .slice(startIndex, endIndex)
                                .map((data) => (
                                  <tbody>
                                    <tr>
                                      <td>{data.supplier}</td>{" "}
                                      <td>
                                        {data.brand}
                                        <a href="#"></a>
                                      </td>
                                      <td>{data.vouchers}</td>
                                      <td> {data.amount}</td>
                                      <td>{data.margin}</td>
                                      <td>{data.marginvalue}</td>
                                    </tr>
                                  </tbody>
                                ))}
                            </table>
                            <div className="pagination-container">
                              <Pagination
                                count={Math.ceil(
                                  filteredOrderList.length / rowsPerPage
                                )}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                              />
                            </div>
                          </>
                        ) : (
                          <NoRecord />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
