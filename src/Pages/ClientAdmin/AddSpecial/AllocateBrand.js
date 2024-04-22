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
import NoRecord from "../../../Components/NoRecord/NoRecord";

const AllocateBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getAllocateBrands = useSelector((state) => state?.allocateBrandReducer);
  const [copyClientMapping, setCopyClientMapping] = useState([]);
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const allocateBrands = GetTranslationData("UIClient", "allocateBrands");
  const brand_name = GetTranslationData("UIClient", "brand_name");
  const displayOrder = GetTranslationData("UIClient", "display-order");
  const action = GetTranslationData("UIClient", "actionLabel");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const generateUniqueId = (index) => `toggleSwitch-${index}`;
  const productByIdReducer = useSelector((state) => state.productReducer);

  const SupplierBrandList = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const [getProduct, setGetProduct] = useState();
  const clientProductMapping = useSelector(
    (state) => state.clientProductMappingReducer?.clientData
  );

  useEffect(() => {
    dispatch(onGetSupplierBrandList());
    dispatch(onAllocateBrandById(location?.state?.data?.id));
    dispatch(onGetAllocateBrand());
  }, []);
  useEffect(() => {
    if (getAllocateBrands?.update_status_code === "201") {
      toast.success(getAllocateBrands?.updateMessage);
      dispatch(onUpdateAllocateBrandByIdReset());
      dispatch(onAllocateBrandById(location?.state?.data?.id));
    } else if (getAllocateBrands?.update_status_code === "400") {
      toast.error(getAllocateBrands?.updateMessage);
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

  const filteredBrandCatalogueList = Array.isArray(
    productByIdReducer.productById?.[0]?.products
  )
    ? productByIdReducer.productById?.[0]?.products.filter((vendor) =>
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

  const updateStatus = (data) => {
    const isUpdate =
      Array.isArray(copyClientMapping) &&
      copyClientMapping?.find((item) => item.productId === data?.id);

    const deletedData = [
      {
        enabled: isUpdate?.enabled === true ? false : true,
        deleted: false,
        productId: isUpdate?.productId,
        addSpecialId: isUpdate?.addSpecialId,
        displayOrder: isUpdate?.displayOrder,
        id: isUpdate?.id,
      },
    ];

    dispatch(onUpdateAllocateBrandById(deletedData));
  };
  useEffect(() => {
    // Make sure this runs whenever getAllocateBrands.getAllocateBrandsById changes
    if (Array.isArray(getAllocateBrands?.getAllocateBrandsById)) {
      const copyData = getAllocateBrands?.getAllocateBrandsById.map((item) => ({
        ...item,
      }));
      setCopyClientMapping(copyData);
    } else {
      setCopyClientMapping([]);
    }
  }, [getAllocateBrands]); // Fixed dependency array

  const getValues = (id, name) => {
    // Fixed typo in property name
    const data = copyClientMapping.find((item) => item.productId === id);
    return data && data[name] !== undefined ? data[name] : "";
  };

  const handleKeyPress = (e) => {
    // Preventing characters that are not numbers or navigation keys
    if (e.key === "e" || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }
  };

  const handleInputChange = (e, ids, name) => {
    const newValue = Math.max(0, e.target.value); // Ensures non-negative values
    const existingIndex = copyClientMapping.findIndex(
      (item) => item.productId === ids
    );

    const addSpecialIdForNewItem = copyClientMapping[0]?.addSpecialId;

    if (existingIndex !== -1) {
      // If item exists, update it directly
      copyClientMapping[existingIndex] = {
        ...copyClientMapping[existingIndex],
        [name]: parseInt(newValue),
      };
    } else {
      copyClientMapping.push({
        productId: ids,
        [name]: parseInt(newValue),
        addSpecialId: addSpecialIdForNewItem, // Use the determined value for new items
        enabled: true, // Assuming new items should be enabled by default
      });
    }

    setCopyClientMapping([...copyClientMapping]);
  };

  const clientCode = sessionStorage.getItem("clientCode");
  useEffect(() => {
    dispatch(
      onProductByIdSubmit({
        clientCode,
        pageNumber: page,
        pageSize: rowsPerPage,
      })
    );
  }, []);
  const handleSubmit = () => {
    const updates = copyClientMapping.map((product) => ({
      productId: product.productId,
      displayOrder: product.displayOrder,
      addSpecialId: product?.addSpecialId,
      id: product?.id,
    }));

    dispatch(onUpdateAllocateBrandById(updates));
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
                        <Link>
                          <i className="flaticon-381-search-2"></i>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {filteredBrandCatalogueList?.length > 0 ? (
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
                                    ></input>
                                    <label htmlFor={generateUniqueId(index)}>
                                      <div
                                        className="can-toggle__switch"
                                        data-unchecked={"OFF"}
                                        data-checked={"ON"}
                                        onClick={() =>
                                          updateStatus(data, index)
                                        }
                                      ></div>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            </>
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
                            getAllocateBrands?.getAllocateBrandData?.length /
                              rowsPerPage
                          )}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
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
                    onClick={handleSubmit} // Pass a reference to the function instead of calling it
                  />
                </div>
              ) : (
                <NoRecord />
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
