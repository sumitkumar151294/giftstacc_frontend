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
import { Link } from "react-router-dom/dist";
import PageError from "../../Components/PageError/PageError";
import { onProductByIdSubmit } from "../../Store/Slices/productSlice";
import { DatePicker, InputGroup } from "rsuite";

const Orders = () => {
  const dispatch = useDispatch();
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
  const exportLabel = GetTranslationData("UIAdmin", "export_btn_Text");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const productByIdReducer = useSelector(
    (state) => state.productReducer?.productById?.[0]?.products
  );

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
    dispatch(onGetSupplierList());
    dispatch(onClientMasterSubmit());
  }, []);
  useEffect(() => {
    let tempSupplier = [];
    Array.isArray(supplierMasterData) &&
      supplierMasterData?.map((item) => {
        return (
          item.enabled &&
          tempSupplier.push({ label: item.name, value: item.name })
        );
      });
    setSupplierListData(tempSupplier);
  }, [supplierMasterData]);
  useEffect(() => {
    let tempClient = [];
    Array.isArray(clientList) &&
      clientList?.map((item) => {
        return (
          item.enabled &&
          tempClient.push({ label: item.name, value: item.name })
        );
      });
    setClientListData(tempClient);
  }, [clientList]);

  useEffect(() => {
    dispatch(
      onProductByIdSubmit({
        clientCode,
        pageNumber: 1,
        pageSize: 100,
      })
    );
  }, [page]);
  const clientCode = sessionStorage.getItem("clientCode");

  const handleChange = (e, fieldName) => {
    const selectedSupplierName = e.target.value;

    if (selectedSupplierName === "Select" && fieldName === "client") {
      dispatch(
        onProductByIdSubmit({
          clientCode,
          pageNumber: 1,
          pageSize: 100,
        })
      );
    } else if (fieldName === "client") {
      dispatch(
        onProductByIdSubmit({
          clientCode,
          pageNumber: page,
          pageSize: rowsPerPage,
        })
      );
    }
    setSupplierList({
      ...supplierList,
      [fieldName]: e.target.value,
    });
  };
  const filteredOrderList = Array.isArray(productByIdReducer)
    ? productByIdReducer.filter((vendor) =>
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
      {getRoleAccess[0] === undefined && (
        <div style={{ height: "100px" }}>
          <Loader classType={"absoluteLoader"} />
        </div>
      )}
      <>
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
                          <div className="col-sm-4 mt-4">
                          <div className="example">
                            {/* <label>{start_and_enddate}</label> */}

                            <InputGroup
                              className="dateInput"
                            >
                              <DatePicker
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="Start Date"
                                // value={formData.startDate ? new Date(formData.startDate) : null}
                                // onChange={(e) => handleDateChange(e, 'startDate')}
                                block
                                appearance="subtle"
                              />
                              <DatePicker
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="End Date"
                                // value={formData.endDate ? new Date(formData.endDate) : null}
                                // onChange={(e) => handleDateChange(e, 'endDate')}
                                block
                                appearance="subtle"
                              />
                            </InputGroup>
                          </div>
                        </div>
                        </div>
                      </div>
                      <div className="card-body">
                        {filteredOrderList.length < 0 ? (
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
                                        <td>{data.sku}</td>
                                        <td>
                                          {data.brand}
                                          <Link href="#"></Link>
                                        </td>
                                        <td>{data.vouchers}</td>
                                        <td>{data.amount}</td>
                                        <td>{data.margin}</td>
                                        <td>{data.marginvalue}</td>
                                      </tr>
                                    </thead>
                                    {filteredOrderList
                                      .slice(startIndex, endIndex)
                                      .map((data, index) => (
                                        <tbody key={index}>
                                          <tr>
                                            <td>{data.sku}</td>
                                            <td>
                                              {data.name}
                                              <button href="#"></button>
                                            </td>
                                            <td>{data.maxPrice}</td>
                                            <td>{data.price}</td>
                                            <td>{data.type}</td>
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
                                filteredOrderList.length === 0 &&
                                searchQuery && <NoRecord />
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
      </>
    </div>
  );
};

export default Orders;
/* eslint-enable react-hooks/exhaustive-deps */
