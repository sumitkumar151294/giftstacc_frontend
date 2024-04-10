/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../Components/Dropdown/Dropdown";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import DatePickerInput from "../../Components/DatePicker/DatePicker";
import PageError from "../../Components/PageError/PageError";

const Orders = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [supplierListData, setSupplierListData] = useState([]);
  const [clientListData, setClientListData] = useState([]);
  const [supplierList, setSupplierList] = useState({
    supplier: "",
    client: "",
  });
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  const supplierMasterData = useSelector(
    (state) => state?.supplierMasterReducer?.data
  );
  const ClientLogin = useSelector((state) => state.loginReducer.isAdminLogin);
  const clientList = useSelector(
    (state) => state?.clientMasterReducer?.clientData
  );
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
  const exportLabel = GetTranslationData("UIAdmin", "export_btn_Text");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
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
    Array.isArray(supplierMasterData) &&
      supplierMasterData?.map((item) => {
        return tempSupplier.push({ label: item.name, value: item.name });
      });
    setSupplierListData(tempSupplier);
  }, [supplierMasterData]);
  useEffect(() => {
    let tempClient = [];
    Array.isArray(clientList) &&
      clientList?.map((item) => {
        return tempClient.push({ label: item.name, value: item.name });
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
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  return (
    <div>
      {getRoleAccess[0] !== undefined ? (
        <>
          <ScrollToTop />
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12 col-xxl-12">
                  <div className="card">
                    <div className="container-fluid pt-1">
                      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                        <div className="card-header">
                          <h4 className="card-title">{orders}</h4>
                        </div>
                        <div className="customer-search mb-sm-0 mb-3">
                          <div className="input-group search-area">
                            <InputField
                              type="text"
                              className="form-control only-high"
                              placeholder={searchLabel}
                              defaultValue={searchQuery}
                              onChange={handleSearch}
                            />
                            <span className="input-group-text">
                              <i className="fa fa-search"></i>
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
                                <Button
                                  className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                                  text={exportLabel}
                                  icons={"fa fa-file-excel"}
                                />
                              )}
                            </CSVLink>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="container-fluid  pt-1">
                      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="supplier">{supplier}</label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "supplier")}
                            defaultValue={supplierList.supplier || ""}
                            className="form-select"
                            options={supplierListData}
                          />
                        </div>
                        {ClientLogin && (
                          <div className="col-sm-3 form-group mb-2">
                            <label htmlFor="client">{client}</label>
                            <Dropdown
                              onChange={(e) => handleChange(e, "client")}
                              defaultValue={supplierList?.client || ""}
                              className="form-select"
                              options={clientListData}
                            />
                          </div>
                        )}
                        <div className="col-xl-3">
                          <div className="example">
                            <p className="mb-1">{date}</p>
                            <DatePickerInput
                              placeholderText="01/01/2015 1:30 PM - 01/01/2015 2:00 PM"
                              selectsRange={true}
                              dateFormat="dd MMM yyyy h:mm aa"
                              timeFormat="HH:mm"
                              className={"form-control form-control-sm"}
                              showDisabledMonthNavigation
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
                                    .map((data, index) => (
                                      <tbody key={index}>
                                        <tr>
                                          <td>{data.supplier}</td>
                                          <td>
                                            {data.brand}
                                            <button href="#"></button>
                                          </td>
                                          <td>{data.vouchers}</td>
                                          <td>{data.amount}</td>
                                          <td>{data.margin}</td>
                                          <td>{data.marginvalue}</td>
                                        </tr>
                                      </tbody>
                                    ))}
                                </table>
                                <div className="pagination-container">
                                  <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={" >"}
                                    breakLabel={"..."}
                                    pageCount={Math.ceil(
                                      filteredOrderList.length / rowsPerPage
                                    )}
                                    marginPagesDisplayed={2}
                                    onPageChange={handlePageChange}
                                    containerClassName={"pagination"}
                                    activeClassName={"active"}
                                    initialPage={page - 1} // Use initialPage instead of forcePage
                                    previousClassName={
                                      page === 0 ? disabled_Text : ""
                                    }
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
      ) : (
        <PageError
          pageError={{
            StatusCode: "401",
            ErrorName: "Permission Denied",
            ErrorDesription:
              "Your application url is not registerd to our application",
            url: "/",
            buttonText: "Back to Home",
          }}
        />
      )}
    </div>
  );
};

export default Orders;
/* eslint-enable react-hooks/exhaustive-deps */
