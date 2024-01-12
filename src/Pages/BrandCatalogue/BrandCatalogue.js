import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../Assets/img/pizz1.jpg";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onbrandCatalogueSubmit } from "../../Store/Slices/brandCatalogueSlice";
import { useDispatch, useSelector } from "react-redux";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import { Pagination } from "@mui/material";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { CSVLink } from "react-csv";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
const BrandCatalogue = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const heading = GetTranslationData("UIAdmin", "heading");
  const image = GetTranslationData("UIAdmin", "image");
  const sku = GetTranslationData("UIAdmin", "sku");
  const name = GetTranslationData("UIAdmin", "name");
  const minprice = GetTranslationData("UIAdmin", "minprice");
  const maxprice = GetTranslationData("UIAdmin", "maxprice");
  const price = GetTranslationData("UIAdmin", "price");
  const action = GetTranslationData("UIAdmin", "action");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const exportLabel = GetTranslationData("UIAdmin", "export_label");
  const BrandDetail = GetTranslationData("UIAdmin", "brand_Detail");
  const supplier = GetTranslationData("UIAdmin", "supplier");
  const client = GetTranslationData("UIAdmin", "client");
  const [searchQuery, setSearchQuery] = useState("");
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [supplierListData, setSupplierListData] = useState([]);
  const [clientListData, setClientListData] = useState([]);

  const supplierMasterData = useSelector(
    (state) => state.supplierMasterReducer?.data?.data
  );
  const clientList = useSelector((state) => state?.clientMasterReducer?.data);

  const [supplierList, setSupplierList] = useState({
    supplier: "",
    client: "",
  });
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    setShowLoader(false);
  }, [showLoader]);
  useEffect(() => {
    dispatch(onbrandCatalogueSubmit());
    dispatch(onGetSupplierList());
    dispatch(onClientMasterSubmit());
  }, []);
  const BrandCatalogueData = useSelector(
    (state) => state.brandCatalogueReducer?.data
  );
  const headers = [
    { label: "action", key: "action" },
    { label: "id", key: "id" },
    { label: "min_price", key: "min_price" },
    { label: "max_price", key: "max_price" },
    { label: "name", key: "name" },
    { label: "price", key: "price" },
    { label: "sku", key: "sku" },
  ];
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  const filteredBrandCatalogueList = Array.isArray(BrandCatalogueData)
    ? BrandCatalogueData.filter((vendor) =>
      Object.values(vendor).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    : [];

  const handleChange = (e, fieldName) => {
    setSupplierList({
      ...supplierList,
      [fieldName]: e.target.value,
    });
  };
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
  return (
    <>
      <ScrollToTop />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="container-fluid">
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
                        <a href="#">
                          <i className="flaticon-381-search-2"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    {BrandCatalogueData && BrandCatalogueData.length > 0 && (
                      <CSVLink
                        data={BrandCatalogueData}
                        headers={headers}
                        filename={"BrandCatalogue.csv"}
                      >
                        {filteredBrandCatalogueList.length > 0 && (
                          <Button
                            className="btn btn-primary btn-sm btn-rounded mb-2"
                            icons={"fa fa-file-excel me-2"}
                            text={`${exportLabel}`}
                          />
                        )}
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="col-sm-3 form-group mb-2">
<<<<<<< HEAD
                    <label htmlFor="name-f">{supplier}</label>
=======
                    <label htmlFor="supplier">{supplier}</label>
>>>>>>> 4dd2707632ea0993e9021de6a91a608061ed8ae0
                    <Dropdown
                      onChange={(e) => handleChange(e, "supplier")}
                      value={supplierList.supplier || ""}
                      className="form-select"
                      options={supplierListData}
                    />
                  </div>
                  <div className="col-sm-3 form-group mb-2">
<<<<<<< HEAD
                    <label htmlFor="name-f">{client}</label>
=======
                    <label htmlFor="client">{client}</label>
>>>>>>> 4dd2707632ea0993e9021de6a91a608061ed8ae0
                    <Dropdown
                      onChange={(e) => handleChange(e, "client")}
                      value={supplierList?.client || ""}
                      className="form-select"
                      options={clientListData}
                    />
                  </div>
                </div>
              </div>
              <div className="card-body">
                {showLoader && filteredBrandCatalogueList.length < 0 ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      {filteredBrandCatalogueList.length > 0 ? (
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
                              {filteredBrandCatalogueList
                                .slice(startIndex, endIndex)
                                .map((data, index) => (
                                  <tr key={index}>
                                    <td>
                                      <img
                                        src={img}
                                        style={{ width: "50px" }}
                                      />
                                      <br />
                                    </td>
                                    <td>
                                      {data.sku}
                                      <a href="#"></a>
                                    </td>
                                    <td>{data.name}</td>
                                    <td>{data.min_price}</td>
                                    <td>{data.max_price}</td>
                                    <td>{data.price}</td>
                                    <td>
                                      {" "}
                                      <Link
                                        to={"/lc-admin/brand-detail"}
                                        href="productdetail.html"
                                        className="btn btn-primary btn-sm bttn float-right"
                                      >
                                        <i className="fa fa-info"></i>&nbsp;
                                        {BrandDetail}
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          <div className="pagination-container">
                            <Pagination
                              count={Math.ceil(
                                filteredBrandCatalogueList.length / rowsPerPage
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
    </>
  );
};

export default BrandCatalogue;
