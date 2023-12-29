import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Loader from "../../../Components/Loader/Loader";
import "./CategoryList.scss";
import {
  onGetCategory,
  onUpdateCategory,
} from "../../../Store/Slices/createCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import { Pagination } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import CategoryForm from "../CategoryForm/CategoryForm";

const CategoryList = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage] = useState(5);

  const headers = [
    { label: "categoryName", key: "categoryName" },
    { label: "supplierName", key: "supplierName" },
    { label: "supplierBrand", key: "supplierBrand" },
  ];

  // To get the categories
  useEffect(() => {
    dispatch(onGetCategory());
    setIsLoading(true);
  }, []);

  // To get the data from redux store
  const getCreateCategory = useSelector((state) => state.createCategoryReducer);
  const getCategoryData = getCreateCategory?.categoryData?.data;

  //To get the label form DB
  const categoryList = GetTranslationData("UIAdmin", "categoryList");
  const categoryName = GetTranslationData("UIAdmin", "categoryName");
  const supplierName = GetTranslationData("UIAdmin", "supplierName");
  const supplierBrand = GetTranslationData("UIAdmin", "supplierBrand");
  const action = GetTranslationData("UIAdmin", "action_label");
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const categoryDeleteMessage = GetTranslationData(
    "UIAdmin",
    "category_deleted"
  );

  // To search the data
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const filteredCategoryList = Array.isArray(getCategoryData)
    ? getCategoryData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  useEffect(() => {
    if (getCategoryData) {
      setIsLoading(false);
    }
  }, [getCategoryData]);

  // For Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  //To delete the data
  const handleDelete = (data) => {
    const deletedData = {
      id: data.id,
      categoryName: data.categoryName,
      supplierName: data.supplierName,
      supplierBrand: data.supplierBrand,
      deleted: true,
    };
    dispatch(onUpdateCategory(deletedData));
    setTimeout(() => {
      dispatch(onGetCategory());
      toast.success(categoryDeleteMessage);
    }, 1000);
    setIsLoading(true);
  };

  return (
    <>
      <ScrollToTop />
      <CategoryForm setIsLoading={setIsLoading} />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container mt-2 mb-2">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title  txt-admin txtt">
                      {categoryList}
                    </h4>
                  </div>

                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <input
                        type="text"
                        className="form-control only-high"
                        placeholder={searchLabel}
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <span className="input-group-text">
                        <Link>
                          <i className="flaticon-381-search-2"></i>
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    {getCategoryData && getCategoryData.length > 0 && (
                      <CSVLink
                        data={filteredCategoryList}
                        headers={headers}
                        filename={"Category.csv"}
                      >
                        {filteredCategoryList.length > 0 && (
                          <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                            <i className="fa fa-file-excel me-2"></i>
                            {export_label}
                          </button>
                        )}
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-body">
                {isLoading && (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                )}
                {Array.isArray(filteredCategoryList) &&
                filteredCategoryList.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>{categoryName}</th>
                          <th>{supplierName}</th>
                          <th>{supplierBrand}</th>
                          <th>{action}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCategoryList
                          .slice(startIndex, endIndex)
                          .map((data) => (
                            <tr key={data.id}>
                              <td>{data.categoryName}</td>
                              <td>{data.supplierName}</td>
                              <td>{data.supplierBrand}</td>

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
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                      <Pagination
                        count={Math.ceil(
                          filteredCategoryList.length / rowsPerPage
                        )}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                      />
                    </div>
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
