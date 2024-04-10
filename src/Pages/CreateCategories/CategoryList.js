/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Loader from "../../Components/Loader/Loader";
import {
  onGetCategory,
  onUpdateCategory,
} from "../../Store/Slices/createCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import NoRecord from "../../Components/NoRecord/NoRecord";
import { ToastContainer } from "react-toastify";
import CategoryForm from "./CategoryForm";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";

const CategoryList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage] = useState(5);
  const supplierMaster = useSelector(
    (state) => state?.supplierMasterReducer?.data
  );
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer.filteredData
  );
  const supplierBrandData = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const headers = [
    { label: "Category Name", key: "name" },
    { label: "Supplier Name", key: "supplierId" },
    { label: "Supplier Brand Name", key: "supplierBrandId" },
  ];

  // To get the categories
  useEffect(() => {
    dispatch(onGetCategory());
  }, []);

  // To get the data from redux store
  const getCreateCategory = useSelector((state) => state.createCategoryReducer);
  const getCategoryData = getCreateCategory?.categoryData;
  const getListData = getCreateCategory?.isLoading;
  //To get the label form DB
  const categoryList = GetTranslationData("UIAdmin", "categoryList");
  const categoryName = GetTranslationData("UIAdmin", "categoryName");
  const supplierName = GetTranslationData("UIAdmin", "supplierName");
  const supplierBrand = GetTranslationData("UIAdmin", "supplierBrand");
  const action = GetTranslationData("UIAdmin", "action_label");
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");


  // To get the Supplier Name in the Category List
  const getSupplierName = (supplierId) => {
    const supplier =
      Array.isArray(supplierMaster) &&
      supplierMaster.find((s) => s.id === supplierId);
    return supplier ? supplier.name : "";
  };
  // To get the Supplier Brand Name in the Category List
  const getSupplierBrand = (supplierBrandId) => {
    const supplier =
      Array.isArray(supplierBrandData) &&
      supplierBrandData.find((s) => s.id === supplierBrandId);
    return supplier ? supplier.name : "";
  };

  // To search the data
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const filteredCategoryList = Array.isArray(getCategoryData)
    ? getCategoryData.filter(
        (item) =>
          Object.values(item).some(
            (value) =>
              value &&
              typeof value === "string" &&
              value.toLowerCase().includes(searchQuery)
          ) ||
          getSupplierName(item.supplierId)
            .toLowerCase()
            .includes(searchQuery) ||
          getSupplierBrand(item.supplierBrandId)
            .toLowerCase()
            .includes(searchQuery)
      )
    : [];

  const namesArray = filteredCategoryList.map((data) => ({
    name: data.name,
    supplierId: getSupplierName(data.supplierId),
    supplierBrandId: getSupplierBrand(data.supplierBrandId),
  }));

  // For Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  //To delete the data
  const handleDelete = (data) => {
    const deletedData = {
      enabled: false,
      deleted: true,
      supplierId: data?.supplierId,
      supplierBrandId: data?.supplierBrandId,
      name: data?.name,
      id: data?.id,
      description: "string",
    };
    dispatch(onUpdateCategory(deletedData));
  };

  return (
    <>
      <ScrollToTop />
      {getRoleAccess[0]?.addAccess && <CategoryForm />}
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid pt-1">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title  txt-admin txtt">
                      {categoryList}
                    </h4>
                  </div>

                  <div className="customer-search mb-sm-0 mb-3">
                    {getCategoryData && getCategoryData.length > 0 && (
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
                    )}
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    {getCategoryData && getCategoryData.length > 0 && (
                      <CSVLink
                        data={namesArray}
                        headers={headers}
                        filename={"Category.csv"}
                      >
                        {filteredCategoryList.length > 0 && (
                          <Button
                            className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                            text={export_label}
                            icons={"fa fa-file-excel"}
                          />
                        )}
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-body">
                {getListData ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : Array.isArray(filteredCategoryList) &&
                  filteredCategoryList.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>{categoryName}</th>
                          <th>{supplierName}</th>
                          <th>{supplierBrand}</th>
                          {getRoleAccess[0]?.editAccess && <th>{action}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCategoryList
                          .slice(startIndex, endIndex)
                          .map((data) => (
                            <tr key={data.id}>
                              <td>{data.name}</td>
                              <td>{getSupplierName(data.supplierId)}</td>
                              <td>{getSupplierBrand(data.supplierBrandId)}</td>
                              {getRoleAccess[0]?.editAccess && (
                                <td>
                                  <div className="d-flex">
                                    <Link
                                      onClick={() => handleDelete(data)}
                                      className="btn btn-danger shadow btn-xs sharp"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </Link>
                                    <ToastContainer />
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {filteredCategoryList.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(
                            filteredCategoryList.length / rowsPerPage
                          )}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                          previousClassName={page === 1 ? disabled_Text : ""}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <NoRecord />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
/* eslint-enable react-hooks/exhaustive-deps */
