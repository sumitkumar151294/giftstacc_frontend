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
import {
  onClientProductMappingSubmit,
  onGetAllClientProductMapping,
} from "../../Store/Slices/clientProductMappingSlice";
import { CSVLink } from "react-csv";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";
import { onProductByIdSubmit } from "../../Store/Slices/productSlice";
import PageError from "../../Components/PageError/PageError";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPageValue, setRowsPerPageValue] = useState("Page Size");
  const [page, setPage] = useState(1);
  const [copyBrandCatalogue, setCopyBrandCatalogue] = useState();;
  const supplierMaster = useSelector((state) => state.supplierMasterReducer);
  const productByIdReducer = useSelector((state) => state.productReducer);
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
  const SupplierBrandList = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const [supplierList, setSupplierList] = useState([]);
  const excelData = Array.isArray(
    productByIdReducer?.productById?.[0]?.products
  )
    ? productByIdReducer?.productById?.[0]?.products.map((data) => ({
      sku: data.sku,
      name: data.name,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice, // Assuming you want to correct the casing here
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
    setPage(selected + 1);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  const clientProductMapping = Array.isArray(copyBrandCatalogue)
    ? copyBrandCatalogue.filter((vendor) =>
      Object.values(vendor).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    : [];
  const handleChange = (e, fieldName) => {
    const selectedSupplierName = e.target.value;
    if (selectedSupplierName === "Select") {
      setCopyBrandCatalogue(SupplierBrandList);
    } else {
      let filteredSupplierList =
        Array.isArray(SupplierBrandList) &&
        SupplierBrandList?.[0]?.products?.filter(
          (vendor) => vendor?.enabled === true &&
            vendor?.supplierCode?.toLowerCase() ===
            selectedSupplierName?.toLowerCase()
        );
      setCopyBrandCatalogue(filteredSupplierList);
    }
    if (selectedSupplierName === "Select" && fieldName === "client") { 
      dispatch(
        onProductByIdSubmit({
          pageNumber: page,
          pageSize: rowsPerPage,
        })
      );
      setCopyBrandCatalogue(productByIdReducer?.productById?.[0]?.products);
    } else if (fieldName === "client") { 
      const id = clientList.filter((item) => {
        if (item.name === selectedSupplierName) {
          return item?.id
        }
      })
      dispatch(
        onProductByIdSubmit({
          id:id[0]?.id,
          pageNumber: page,
          pageSize: rowsPerPage,
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
    dispatch(onGetAllClientProductMapping());
    dispatch(onGetSupplierList());
    dispatch(onClientMasterSubmit());
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
  useEffect(()=>{
    dispatch(
      onProductByIdSubmit({
        pageNumber: page,
        pageSize: rowsPerPage,
      })
    );
    setCopyBrandCatalogue(productByIdReducer?.productById?.[0]?.products);
  },[])
  return (
    <div>
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
                                  .filter(item => item.enabled === true)
                                  .map(item => ({
                                    label: item.name,
                                    value: item.name,
                                    data: item.id,
                                  }
                                  ))
                                : []
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-body">
                    {productByIdReducer?.isLoading ? (
                      <div style={{ height: "400px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive">
                          {clientProductMapping?.length ? (
                            <>
                              <table className="table header-border table-responsive-sm">
                                <thead>
                                  <tr>
                                    <th>{image}</th>
                                    <th>{sku}</th>
                                    <th>{name}</th>
                                    <th>{minprice}</th>
                                    <th>{maxprice}</th>
                                    <th>{price}</th>
                                    <th>{action}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.isArray(productByIdReducer?.productById?.[0]?.products) &&
                                    productByIdReducer?.productById?.[0]?.products
                                      .filter((item) => item.enabled)
                                      .map((data, index) => (
                                        <tr key={index}>
                                          <td>
                                            <img
                                              src={data.small}
                                              style={{ width: "50px" }}
                                              alt={data.small}
                                            />
                                            <br />
                                          </td>
                                          <td>{data.sku}</td>
                                          <td>{data.name}</td>
                                          <td>{data.minPrice}</td>
                                          <td>{data.maxPrice}</td>
                                          <td>{data.price}</td>
                                          <td>
                                            {" "}
                                            <Button
                                              onClick={() => handleClick(data)}
                                              className="btn btn-primary btn-sm bt-link float-right"
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
                                      initialPage={
                                        rowsPerPage !== 5 ? page === 0 : page - 1
                                      }
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
                                        if (!isNaN(newSize)) {
                                          setRowsPerPage(newSize);
                                          dispatch(
                                            onProductByIdSubmit({
                                              clientCode,
                                              pageNumber: page,
                                              pageSize: parseInt(e.target.value),
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