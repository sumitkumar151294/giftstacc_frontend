/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputField from "../../../Components/InputField/InputField";
import Button from "../../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  onAllocateBrandById,
  onGetAllocateBrand,
  onUpdateAllocateBrandById,
  onUpdateAllocateBrandByIdReset,
} from "../../../Store/Slices/ClientAdmin/allocateBrandSlice";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { useLocation } from "react-router-dom";
import { onGetSupplierBrandList } from "../../../Store/Slices/supplierBrandListSlice";
import { Link } from "react-router-dom/dist";
import { onProductByIdSubmit } from "../../../Store/Slices/productSlice";
import Loader from "../../../Components/Loader/Loader";
import NoRecord from "../../../Components/NoRecord/NoRecord";

const AllocateBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getAllocateBrands = useSelector((state) => state?.allocateBrandReducer);
  const [copyClientMapping, setCopyClientMapping] = useState([]);
  const [maxBrands, setMaxBrands] = useState();
  const [activeBrandsCount, setActiveBrandsCount] = useState(0);
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const allocateBrands = GetTranslationData("UIClient", "allocateBrands");
  const brand_name = GetTranslationData("UIClient", "brand_name");
  const displayOrder = GetTranslationData("UIClient", "display-order");
  const action = GetTranslationData("UIClient", "actionLabel");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const generateUniqueId = (index) => `toggleSwitch-${index}`;
  const productByIdReducer = useSelector((state) => state.productReducer);
  const SupplierBrandList = useSelector((state) => state.supplierBrandListReducer.data);
  const [getProduct, setGetProduct] = useState();
  const clientProductMapping = useSelector(
    (state) => state.clientProductMappingReducer?.clientData
  );
  const loginAuthData = useSelector((state) => state.loginAuthReducer);

  useEffect(() => {
    if (location?.state?.maxBrands) {
      setMaxBrands(location.state.maxBrands);
    }
    // other effect code...
  }, [location?.state?.maxBrands]);
  useEffect(() => {
    // Count the number of active brands
    const countActiveBrands = copyClientMapping.filter(item => item.enabled).length;
    setActiveBrandsCount(countActiveBrands);
  }, [copyClientMapping]);


  useEffect(() => {
    dispatch(
      onProductByIdSubmit({
        id: loginAuthData?.data[0]?.clientId,
        pageNumber: 1,
        pageSize: 200,
      })
    );
    dispatch(onGetSupplierBrandList());
    dispatch(onAllocateBrandById(location?.state?.data?.id));
    dispatch(onGetAllocateBrand());
  }, []);
  useEffect(() => {
    if (getAllocateBrands?.update_status_code === "201") {
      toast.success(getAllocateBrands?.updateMessage);
      setShowLoader(false);
      dispatch(onUpdateAllocateBrandByIdReset());
      dispatch(onAllocateBrandById(location?.state?.data?.id));
    } else if (getAllocateBrands?.update_status_code === 400) {
      toast.error(getAllocateBrands?.updateMessage.data.ErrorMessage);
      setShowLoader(false);
      dispatch(onUpdateAllocateBrandByIdReset());
    }
  }, [getAllocateBrands?.update_status_code]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const matchingProductsData =
      Array.isArray(clientProductMapping) &&
      clientProductMapping
        .map((clientProduct) => {
          const matchingProduct =
            Array.isArray(SupplierBrandList) &&
            SupplierBrandList.find((supplierProduct) => {
              return (
                supplierProduct.id === clientProduct.productId &&
                supplierProduct.enabled === clientProduct.enabled
              );
            });

          return matchingProduct || null;
        })
        .filter((product) => product !== null);

    setGetProduct(matchingProductsData);
  }, [getAllocateBrands, SupplierBrandList]);

  const filteredProducts = productByIdReducer.productById?.[0]?.products.filter(
    (item) => {
      return item.enabled === true;
    }
  );

  const filteredBrandCatalogueList = Array.isArray(filteredProducts)
    ? filteredProducts.filter((vendor) =>
      Object.values(vendor).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    : [];

  useEffect(() => {
    if (getAllocateBrands) {
      const totalItems = filteredBrandCatalogueList.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    }
  }, [getAllocateBrands?.getAllocateBrandData]);


  useEffect(() => {
    if (Array.isArray(getAllocateBrands?.getAllocateBrandsById)) {
      const copyData = getAllocateBrands?.getAllocateBrandsById.map((item) => ({
        ...item,
      }));
      setCopyClientMapping(copyData);
    } else {
      setCopyClientMapping([]);
    }
  }, [getAllocateBrands]);

  const getValues = (id, name) => {
    const data = copyClientMapping.find((item) => item.productId === id);
    return data && data[name] !== undefined ? data[name] : "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "e" || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }
  };
  useEffect(() => {
    if (Array.isArray(getAllocateBrands?.getAllocateBrandsById)) {
      const copyData = getAllocateBrands.getAllocateBrandsById.map((item) => ({
        ...item,
        enabled: item.enabled,
      }));
      setCopyClientMapping(copyData);
    } else {
      setCopyClientMapping([]);
    }
  }, [getAllocateBrands]);

  const handleToggle = (id, name, e) => {
    // Check if the toggle is enabling a brand and if it exceeds the maximum allowed
    const isChecked = e.target.checked;
    const countActiveBrands = copyClientMapping.filter(item => item.enabled).length;

    if (name === "enabled" && isChecked && countActiveBrands >= maxBrands) {
      toast.warning(`You can only activate up to ${maxBrands} brands.`);
      e.target.checked = false;
      return;
    }
    // Update the client mapping state
    const updatedMapping = copyClientMapping.map((item) => {
      if (item.productId === id) {
        return { ...item, [name]: isChecked };
      }
      return item;
    });

    // If brand is not already in the mapping, add it
    if (!updatedMapping.find(item => item.productId === id)) {
      updatedMapping.push({
        addSpecialId: location.state.data.id,
        productId: id,
        [name]: isChecked,
      });
    }

    setCopyClientMapping(updatedMapping);
  };

  const handleInputChange = (e, ids, name) => {
    const newValue = Math.max(0, e.target.value);
    const existingIndex = copyClientMapping.findIndex(
      (item) => item.productId === ids
    );
    if (existingIndex !== -1) {
      copyClientMapping[existingIndex] = {
        ...copyClientMapping[existingIndex],
        [name]: parseInt(newValue),
      };
    } else {
      copyClientMapping.push({
        productId: ids,
        [name]: parseInt(newValue),
        addSpecialId: location.state.data.id,
      });
    }
    setCopyClientMapping([...copyClientMapping]);
  };
  const handleSubmit = () => {
    if (activeBrandsCount > maxBrands) {
      toast.warning(`You can only activate up to ${maxBrands} brands.`);
      return;
    }

    setShowLoader(true);

    copyClientMapping.forEach(item => {
      item.clientId = loginAuthData?.data[0]?.clientId;
    });

    dispatch(onUpdateAllocateBrandById(copyClientMapping));
  };


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="container-fluid pt-1">
                <div className="d-flex align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{allocateBrands}</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <InputField
                        type="text"
                        className="form-control only-high"
                        placeholder={searchLabel}
                        value={searchQuery}
                        onChange={handleSearch}
                      />{" "}
                      <span className="input-group-text">
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {showLoader ? (
                <Loader />
              ) : (
                filteredBrandCatalogueList?.length > 0 ?
                  <div className="card-body pt-0 card-body-user">
                    <div className="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>{brand_name}</th>
                            <th>{displayOrder}</th>
                            <th>{action}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBrandCatalogueList
                            .slice(startIndex, endIndex)
                            .map((data, index) => (
                              <>
                                {" "}
                                <tr key={index}>
                                  <td>{data?.name}</td>
                                  <td>
                                    <div className="input-group mb-2 w-11">
                                      <InputField
                                        type="number"
                                        className="form-control htt"
                                        placeholder={data.displayOrder}
                                        pattern="/^-?\d+\.?\d*$/"
                                        value={getValues(data.id, "displayOrder")}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e,
                                            data.id,
                                            "displayOrder"
                                          )
                                        }
                                        onKeyPress={(e) =>
                                          handleKeyPress(e, index)
                                        }
                                      />
                                    </div>
                                  </td>

                                  <td>
                                    <div className="can-toggle">
                                      <input
                                        id={generateUniqueId(index)}
                                        type="checkbox"
                                        checked={getValues(data?.id, "enabled")}
                                        onChange={(e) => handleToggle(data.id, "enabled", e)}
                                      />

                                      <label htmlFor={generateUniqueId(index)}>
                                        <div
                                          className="can-toggle__switch"
                                          data-unchecked={"OFF"}
                                          data-checked={"ON"}
                                        // onClick={() => handleSubmit(data, index)}
                                        ></div>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              </>
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
                          </div>
                        )}
                    </div>
                    <Button
                      text="Submit"
                      icon={"fa fa-arrow-right"}
                      className="btn btn-primary float-right pad-aa"
                      onClick={handleSubmit}
                    />
                  </div> : (<NoRecord />)
              )}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllocateBrand;
/* eslint-enable react-hooks/exhaustive-deps */
