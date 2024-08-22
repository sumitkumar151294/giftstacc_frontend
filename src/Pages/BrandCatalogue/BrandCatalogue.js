/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { useDispatch, useSelector } from "react-redux";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { CSVLink } from "react-csv";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";
import { onProductByIdSubmit } from "../../Store/Slices/productSlice";
import PageError from "../../Components/PageError/PageError";
import notFoundImage from "../../../src/Assets/img/notFound.png";

const BrandCatalogue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const heading = GetTranslationData("UIAdmin", "heading");
  const exportLabel = GetTranslationData("UIAdmin", "export_btn_Text");
  const image = GetTranslationData("UIAdmin", "image");
  const sku = GetTranslationData("UIAdmin", "sku");
  const name = GetTranslationData("UIAdmin", "name");
  const minprice = GetTranslationData("UIAdmin", "minprice");
  const maxprice = GetTranslationData("UIAdmin", "maxprice");
  const price = GetTranslationData("UIAdmin", "price");
  const action = GetTranslationData("UIAdmin", "action");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const BrandDetail = GetTranslationData("UIAdmin", "brand_Detail");
  const supplier = GetTranslationData("UIAdmin", "supplier");
  const client = GetTranslationData("UIAdmin", "client_label");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const client_label = GetTranslationData("UIAdmin", "client_label");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPageValue, setRowsPerPageValue] = useState("Page Size");
  const [page, setPage] = useState(1);
  const [copyBrandCatalogue, setCopyBrandCatalogue] = useState();
  const [selectedClientId, setSelectedClientId] = useState(null);
  const supplierMaster = useSelector((state) => state.supplierMasterReducer);
  const productByIdReducer = useSelector((state) => state.productReducer);
  const [notFoundStates, setNotFoundStates] = useState([]);
  const [info, setInfo] = useState(false);
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer?.filteredData
  );
  const LoginId = useSelector((state) => state?.loginReducer);
  const clientList = useSelector(
    (state) => state?.clientMasterReducer?.clientData
  );
  const [supplierLists, setSupplierLists] = useState({
    supplier: "",
    client: "",
  });
  const [supplierList, setSupplierList] = useState([]);
  const excelData = Array.isArray(
    productByIdReducer?.productById?.[0]?.products
  )
    ? productByIdReducer?.productById?.[0]?.products.map((data) => ({
      sku: data.sku,
      name: data.name,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice, // assuming you want to correct the casing here
      price: data.price,
    }))
    : [];
  const headers = [
    { label: "Sku", key: "sku" },
    { label: "Name", key: "name" },
    { label: "Min Price", key: "minPrice" },
    { label: "Max Price", key: "maxPrice" },
    { label: "Price", key: "price" },
  ];
  const paginationValue = [
    {
      value: 5,
      label: 5,
    },
    {
      value: 10,
      label: 10,
    },
    {
      value: 20,
      label: 20,
    },
    {
      value: 50,
      label: 50,
    },
    {
      value: 100,
      label: 100,
    },
  ];

  const handlePageChange = ({ selected }) => {
    if (selected !== false) {
      const newPage = selected + 1;
      setPage(newPage);

      // dispatch API call only when the page number changes
      if (newPage !== page) {
        if (selectedClientId !== null) {
          dispatch(
            onProductByIdSubmit({
              id: selectedClientId,
              pageNumber: newPage,
              pageSize: rowsPerPage,
              enable: 1,
            })
          );
        } else {
          dispatch(
            onProductByIdSubmit({
              pageNumber: newPage,
              pageSize: rowsPerPage,
              enable: 1,
            })
          );
        }
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  const clientProductMapping = copyBrandCatalogue?.filter((vendor) =>
    Object.values(vendor).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handleChange = (e, fieldName) => {
    const selectedSupplierName = e.target.value;
    let data =
      Array.isArray(productByIdReducer?.productById?.[0]?.products) &&
      productByIdReducer?.productById?.[0]?.products?.filter(
        (vendor) => vendor?.enabled === true
      );
    if (selectedSupplierName === "Select") {
      setCopyBrandCatalogue(data);
    } else {
      let filteredSupplierList =
        Array.isArray(productByIdReducer?.productById?.[0]?.products) &&
        productByIdReducer?.productById?.[0]?.products?.filter(
          (vendor) =>
            vendor?.enabled === true &&
            vendor?.supplierCode?.toLowerCase() ===
            selectedSupplierName?.toLowerCase()
        );
      // setCopyBrandCatalogue(productByIdReducer?.productById[0]?.products);
      setCopyBrandCatalogue(filteredSupplierList);
    }
    if (selectedSupplierName === "Select" && fieldName === "client") {
      setSelectedClientId(null);
      setPage(1);
      dispatch(
        onProductByIdSubmit({
          pageNumber: 1,
          pageSize: rowsPerPage,
          enable: 1,
        })
      );
      setCopyBrandCatalogue(productByIdReducer?.productById?.[0]?.products);
    } else if (fieldName === "client") {
      const id = clientList.filter((item) => {
        if (item.name === selectedSupplierName) {
          return item?.id;
        }
      });
      setSelectedClientId(id[0]?.id);
      setPage(1);
      dispatch(
        onProductByIdSubmit({
          id: id[0]?.id,
          pageNumber: 1,
          pageSize: rowsPerPage,
          enable: 1,
        })
      );
      setCopyBrandCatalogue(productByIdReducer?.productById?.[0]?.products);
    }
    setSupplierLists({
      ...supplierLists,
      [fieldName]: e.target.value,
    });
  };
  const clientCode = sessionStorage.getItem("clientCode");
  useEffect(() => {
    dispatch(onGetSupplierList());
    dispatch(onClientMasterSubmit());
    dispatch(
      onProductByIdSubmit({
        pageNumber: 1,
        pageSize: rowsPerPage,
        enable: 1,
      })
    );
  }, []);
  const handleClick = (data) => {
    LoginId.isAdminLogin
      ? navigate("/lc-admin/brand-detail", { state: data })
      : navigate("/lc-user-admin/brand-detail", { state: data });
  };
  useEffect(() => {
    if (supplierMaster?.data?.length && !supplierList.length) {
      let tempSupplier = [];
      supplierMaster?.data?.map((item) => {
        return (
          item.enabled &&
          tempSupplier.push({ label: item.name, value: item.code })
        );
      });
      setSupplierList(tempSupplier);
    }
  }, [supplierMaster]);

  // Make sure to include all variables your effect depends on
  useEffect(() => {
    if (
      productByIdReducer.productById &&
      productByIdReducer.productById.length > 0
    ) {
      setCopyBrandCatalogue(productByIdReducer.productById[0].products);
    } else {
      setCopyBrandCatalogue([]);
    }
  }, [productByIdReducer.productById]);
  const handleImageError = (index) => {
    setNotFoundStates((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const getClientNames = (product) => {
    if (selectedClientId) {
      const client = clientList.find(client => client.id === selectedClientId);
      return client.name;
    } else {
      const associatedClients = clientList.filter(client =>
        product.clientIds?.includes(client.id)
      );
      return associatedClients.map(client => client.name).join(', ');
    }
  };
  return (
    <div>
      {getRoleAccess[0] === undefined && (
        <div style={{ height: "100px" }}>
          <Loader classType={"absoluteLoader"} />
        </div>
      )}

      {getRoleAccess[0] !== undefined ? (
        <>
          <ScrollToTop />
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-xxl-12">
                <div className="card">
                  <div className="container-fluid pt-1">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                      <div className="card-header">
                        <h4 className="card-title">{heading}</h4>
                      </div>
                      <div className="customer-search mb-sm-0 mb-3">
                        <div className="input-group search-area">
                          <InputField
                            type="text"
                            className="form-control only-high"
                            placeholder={searchLabel}
                            value={searchQuery}
                            onChange={handleSearch}
                          />
                          <span className="input-group-text">
                            <i className="fa fa-search"></i>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-wrap">
                        <CSVLink
                          data={excelData}
                          headers={headers}
                          filename={"BrandCatalogue.csv"}
                        >
                          {productByIdReducer?.productById?.[0]?.products
                            ?.length >= +0 && (
                              <Button
                                className="btn btn-primary btn-sm btn-rounded mb-2 me-3"
                                icons={"fa fa-file-excel me-2"}
                                text={`${exportLabel}`}
                              />
                            )}
                        </CSVLink>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid pt-1">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                      <div className="col-sm-3 form-group mb-2">
                        <label htmlFor="supplier">{supplier}</label>

                        <Dropdown
                          onChange={(e) => handleChange(e, "supplier")}
                          defaultValue={supplierLists.supplier || ""}
                          className="form-select"
                          options={supplierList}
                        />
                      </div>

                      {LoginId.isAdminLogin && (
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="client">{client}</label>
                          <Dropdown
                            onChange={(e) => handleChange(e, "client")}
                            defaultValue={supplierLists.client || ""}
                            className="form-select"
                            options={
                              Array.isArray(clientList)
                                ? clientList
                                  .filter((item) => item.enabled === true)
                                  .map((item) => ({
                                    label: item.name,
                                    value: item.name,
                                    data: item.id,
                                  }))
                                : []
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-body">
                    {productByIdReducer?.isLoading &&
                      copyBrandCatalogue?.length === 0 ? (
                      <div style={{ height: "400px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive table-wrapper">
                          {clientProductMapping?.length > 0 ? (
                            <>
                              <table className="table header-border table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>{image}</th>
                                    <th>{sku}</th>
                                    <th>{name}</th>
                                    <th>{client_label}</th>
                                    <th>{minprice}</th>
                                    <th>{maxprice}</th>
                                    <th>{price}</th>
                                    <th>{action}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.isArray(clientProductMapping) &&
                                    clientProductMapping
                                      .filter((item) => item.enabled)
                                      .map((data, index) => (
                                        <tr key={index}>
                                          <td>
                                            {notFoundStates[index] && (
                                              <div
                                                className="info-icon"
                                                onMouseEnter={() =>
                                                  setInfo(true)
                                                }
                                                onMouseLeave={() =>
                                                  setInfo(false)
                                                }
                                              >
                                                <i
                                                  className="fa fa-info-circle imginfo"
                                                  aria-hidden="true"
                                                ></i>
                                                {info && (
                                                  <div className="tooltip tooltipimg" style={
                                                    {
                                                      color: "black", bottom: "1rem", borderRadius: "1rem"
                                                    }
                                                  }>
                                                    Error in image path

                                                  </div>
                                                )}
                                              </div>
                                            )}
                                            <img
                                              src={
                                                notFoundStates[index]
                                                  ? notFoundImage
                                                  : data.small
                                              }
                                              onError={() =>
                                                handleImageError(index)
                                              }


                                              style={{ width: "50px" }}
                                              alt={data?.name}
                                            />
                                            <br />
                                          </td>
                                          <td>{data.sku}</td>
                                          <td>{data.name}</td>
                                          <td>{getClientNames(data)}</td>
                                          <td>{data.minPrice}</td>
                                          <td>{data.maxPrice}</td>
                                          <td>{data.price}</td>
                                          <td>
                                            {" "}
                                            <Button
                                              onClick={() => handleClick(data)}
                                              className="btn btn-primary btn-sm bt-link float-right brand-detail-btn"
                                              icons={"fa fa-info"}
                                              text={BrandDetail}
                                            />
                                          </td>
                                        </tr>
                                      ))}
                                </tbody>
                              </table>
                              {productByIdReducer.productById[0]?.totalCount >
                                5 && (
                                  <div className="pagination-container">
                                    <ReactPaginate
                                      previousLabel={"<"}
                                      nextLabel={" >"}
                                      breakLabel={"..."}
                                      pageCount={Math.ceil(
                                        productByIdReducer.productById[0]
                                          ?.totalCount / rowsPerPage
                                      )}
                                      marginPagesDisplayed={2}
                                      onPageChange={(e) => handlePageChange(e)}
                                      containerClassName={"pagination"}
                                      activeClassName={"active"}
                                      initialPage={page - 1}
                                      previousClassName={
                                        page === 0 ? disabled_Text : ""
                                      }
                                    />
                                    <Dropdown
                                      defaultSelected="Page Size"
                                      className="paginationDropdown"
                                      value={rowsPerPageValue || ""}
                                      onChange={(e) => {
                                        setRowsPerPageValue(e.target.value);
                                        const newSize = parseInt(e.target.value);
                                        setPage(1);
                                        if (!isNaN(newSize)) {
                                          setRowsPerPage(newSize);
                                          dispatch(
                                            onProductByIdSubmit({
                                              clientCode,
                                              pageNumber: 1,
                                              pageSize: parseInt(e.target.value),
                                              enable: 1,
                                            })
                                          );
                                        }
                                      }}
                                      options={paginationValue}
                                    />
                                  </div>
                                )}
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
export default BrandCatalogue;

/* eslint-enable react-hooks/exhaustive-deps */
