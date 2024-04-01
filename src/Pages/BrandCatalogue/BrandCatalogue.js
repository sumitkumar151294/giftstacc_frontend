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
import { onGetSupplierBrandList } from "../../Store/Slices/supplierBrandListSlice";
import {
  onClientProductMappingSubmit,
  onGetAllClientProductMapping,
} from "../../Store/Slices/clientProductMappingSlice";
import { CSVLink } from "react-csv";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";

const BrandCatalogue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProduct, setGetProduct] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [copyBrandCatalogue, setCopyBrandCatalogue] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
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
  const [searchQuery, setSearchQuery] = useState("");
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const supplierMasterData = useSelector(
    (state) => state.supplierMasterReducer?.data
  );
  const clientProductMapping = useSelector(
    (state) => state.clientProductMappingReducer?.clientData
  );
  const SupplierBrandList = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const LoginId = useSelector((state) => state?.loginReducer);
  useEffect(() => {
    const matchingProductsData = clientProductMapping
      .map((clientProduct) => {
        const matchingProduct = SupplierBrandList.find((supplierProduct) => {
          return (
            supplierProduct.id === clientProduct.productId &&
            supplierProduct.enabled === clientProduct.enabled
          );
        });

        return matchingProduct || null;
      })
      .filter((product) => product !== null);

    setGetProduct(matchingProductsData);
    setCopyBrandCatalogue(matchingProductsData);
  }, [clientProductMapping, SupplierBrandList]);
  const clientList = useSelector(
    (state) => state?.clientMasterReducer?.clientData
  );
  const [supplierList, setSupplierList] = useState({
    supplier: "",
    client: "",
  });
  const excelData = getProduct.map((data) => ({
    sku: data.sku,
    name: data.name,
    minPrice: data.minPrice,
    maxPrice: data.maxPrice, // Assuming you want to correct the casing here
    price: data.price,
  }));

  const headers = [
    { label: "Sku", key: "sku" },
    { label: "Name", key: "name" },
    { label: "Min Price", key: "minPrice" },
    { label: "Max Price", key: "maxPrice" },
    { label: "Price", key: "price" },
  ];

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const filteredBrandCatalogueList = copyBrandCatalogue.filter((vendor) =>
    Object.values(vendor).some(
      (value) =>
        value &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handleChange = (e, name) => {
    const selectedSupplierName = e.target.value;
    if (selectedSupplierName === "Select" && name === "client") {
      dispatch(onGetAllClientProductMapping());
    } else if (selectedSupplierName === "Select" && name === "supplier") {
      setCopyBrandCatalogue(getProduct);
    } else if (name === "supplier") {
      const selectedSupplier = supplierMasterData.find(
        (supplier) => supplier.name === selectedSupplierName
      );
      if (selectedSupplier) {
        const filteredProducts = getProduct.filter(
          (product) =>
            product.supplierCode.toLowerCase() ===
            selectedSupplier.code.toLowerCase()
        );
        setCopyBrandCatalogue(filteredProducts);
      }
    } else if (name === "client") {
      dispatch(
        onClientProductMappingSubmit(
          e.target.selectedOptions.item("").getAttribute("name")
        )
      );
    }
    setSupplierList((prevState) => ({
      ...prevState,
      [name]: selectedSupplierName,
    }));
  };

  useEffect(() => {
    setShowLoader(false);
  }, [showLoader]);
  useEffect(() => {
    dispatch(onGetSupplierBrandList());
    dispatch(onGetSupplierList());
    dispatch(onGetAllClientProductMapping());
    dispatch(onClientMasterSubmit());
  }, []);

  const handleClick = (data) => {
    {
      LoginId.isAdminLogin
        ? navigate("/lc-admin/brand-detail", { state: data })
        : navigate("/lc-user-admin/brand-detail", { state: data });
    }
  };
  return (
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
                      {filteredBrandCatalogueList.length >= +0 && (
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
                      value={supplierList.supplier || ""}
                      className="form-select"
                      options={supplierMasterData?.map((item) => ({
                        label: item.name,
                        value: item.name,
                      }))}
                    />
                  </div>

                  {LoginId.isAdminLogin && (
                    <div className="col-sm-3 form-group mb-2">
                      <label htmlFor="client">{client}</label>
                      <Dropdown
                        onChange={(e) => handleChange(e, "client")}
                        value={supplierList?.client || ""}
                        className="form-select"
                        options={clientList?.map((item) => ({
                          label: item.name,
                          value: item.name,
                          data: item.id,
                        }))}
                      />
                    </div>
                  )}
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
                              {filteredBrandCatalogueList.length > 0 ? (



                               filteredBrandCatalogueList
                                  .slice(startIndex, endIndex)
                                  .map((data, index) => (
                                    <tr key={index}>
                                      <td>
                                        <img
                                          src={data.small}
                                          style={{ width: "50px" }}
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
                                  ))
                              ) : (
                                <NoRecord />
                              )}
                            </tbody>
                          </table>
                          {filteredBrandCatalogueList.length > 5 && (
                            <div className="pagination-container">
                              <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={" >"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(
                                  filteredBrandCatalogueList.length /
                                    rowsPerPage
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
