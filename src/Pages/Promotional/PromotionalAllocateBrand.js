import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { onProductByIdSubmit } from "../../Store/Slices/productSlice";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { onGetPromotionalAllocateBrandByPromotionalId, onPutPromotionalAllocateBrand, onPutPromotionalAllocateBrandReset } from "../../Store/Slices/promotionalAllocateBrandSlice";
import NoRecord from "../../Components/NoRecord/NoRecord";
const PromotionalAllocateBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getAllocateBrands = useSelector((state) => state?.promotionalAllocateBrandReducer);
  const [copyClientMapping, setCopyClientMapping] = useState([]);
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const promotional_Allocate_Brands = GetTranslationData("UIClient", "promotional_Allocate_Brands");
  const brand_name = GetTranslationData("UIClient", "brand_name");
  const displayOrder = GetTranslationData("UIClient", "display-order");
  const action = GetTranslationData("UIClient", "actionLabel");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const generateUniqueId = (index) => `toggleSwitch-${index}`;
  const productByIdReducer = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(
      onProductByIdSubmit({
        id: location?.state?.id,
        pageNumber: page,
        pageSize: rowsPerPage,
      })
    );
    dispatch(onGetPromotionalAllocateBrandByPromotionalId(location?.state?.promotionalId));
  }, []);

  useEffect(() => {
    if (getAllocateBrands?.update_status_code === "201") {
      toast.success(getAllocateBrands?.updateMessage);
      setShowLoader(false);
      dispatch(onPutPromotionalAllocateBrandReset());
      dispatch(onGetPromotionalAllocateBrandByPromotionalId(location?.state?.promotionalId));
    } else if (getAllocateBrands?.update_status_code === 400) {
      toast.error(getAllocateBrands?.updateMessage.data.ErrorMessage);
      setShowLoader(false);
      dispatch(onPutPromotionalAllocateBrandReset());
    }
  }, [getAllocateBrands?.update_status_code]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const filteredProducts = productByIdReducer.productById?.[0]?.products.filter(
    (item) => item.enabled === true
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
    if (Array.isArray(getAllocateBrands?.getAllDataById)) {
      const copyData = getAllocateBrands.getAllDataById.map((item) => ({
        ...item,
        enabled: item.enabled,
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

  const handleToggle = (id, name, e) => {
    debugger
    const existingIndex = copyClientMapping.findIndex(
      (item) => item.productId === id
    );

    if (existingIndex !== -1) {
      copyClientMapping[existingIndex] = {
        ...copyClientMapping[existingIndex],
        [name]: e.target.checked
      };
    } else {
      copyClientMapping.push({
        promotionalStripId: location?.state?.promotionalId,
        productId: id,
        [name]: e.target.checked,
      });
    }
    setCopyClientMapping([...copyClientMapping]);
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
        promotionalStripId: location?.state?.promotionalId,
        productId: ids,
        [name]: parseInt(newValue),
      });
    }
    setCopyClientMapping([...copyClientMapping]);
  };

  const handleSubmit = () => {
    setShowLoader(true);
    dispatch(onPutPromotionalAllocateBrand(copyClientMapping));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="container-fluid pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{promotional_Allocate_Brands}</h4>
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
                </div>
              </div>
              {showLoader || productByIdReducer.isLoading ? (
                <Loader />
              ) : (
                filteredBrandCatalogueList?.length>0 ? 
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
                                    ></div>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {filteredBrandCatalogueList?.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(
                            filteredProducts.length / rowsPerPage
                          )}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1}
                          previousClassName={page === 1 ? "disabled" : ""}
                        />
                        <ToastContainer />
                      </div>
                    )}
                  </div>
                  <Button
                    text="Submit"
                    icon={"fa fa-arrow-right"}
                    className="btn btn-primary float-right pad-aa"
                    onClick={handleSubmit}
                  />
                </div>
                :( <NoRecord />)
              )}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalAllocateBrand;
