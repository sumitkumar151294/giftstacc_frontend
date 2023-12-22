import React, { useEffect, useState } from 'react'
import { CSVLink } from "react-csv";
import Loader from '../../../Componenets/Loader/Loader';
import './CategoryList.scss'
import { onGetCategory, onPostCategory } from '../../../Store/Slices/createCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetTranslationData } from '../../../Componenets/GetTranslationData/GetTranslationData ';
import ScrollToTop from '../../../Componenets/ScrollToTop/ScrollToTop';
import NoRecord from '../../../Componenets/NoRecord/NoRecord';
import { Pagination } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const CategoryList = () => {

  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
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
  }, []);


  // To get the data from redux store 
  const getCreateCategory = useSelector((state) => state.createCategoryReducer);
  const getCategoryData = getCreateCategory.data.data;

  //To get the label form DB 
  const categoryList = GetTranslationData('UIAdmin', 'categoryList');
  const categoryName = GetTranslationData('UIAdmin', 'categoryName');
  const supplierName = GetTranslationData('UIAdmin', 'supplierName');
  const supplierBrand = GetTranslationData('UIAdmin', 'supplierBrand');
  const action = GetTranslationData('UIAdmin', 'action_label');
  const export_label = GetTranslationData('UIAdmin', 'export_label')
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");

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

  // For Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = () => {
    toast.error("Data Deleted")
  };

  return (
    <>
      <ScrollToTop />
      <div className="container-fluid pt-0">

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container mt-2 mb-2">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title  txt-admin txtt">{categoryList}</h4>
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
                      <CSVLink data={filteredCategoryList} headers={headers}>
                        {filteredCategoryList.length > 0 && (
                          <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                            <i className="fa fa-file-excel me-2"></i>{export_label}
                          </button>
                        )}
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-body">
              {showLoader ? (
                  <div style={{ height: "400px" }}>
                    <Loader classNameType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    {Array.isArray(filteredCategoryList) &&
                      filteredCategoryList.length > 0 ? (
                      <>
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
                                  .map((item,index) => (
                                <tr key={index}>
                                  <td>{item.categoryName}</td>
                                  <td>
                                    {item.supplierName}
                                  </td>
                                  <td>{item.supplierBrand}</td>

                                  <td>
                              <div className="d-flex">
                                <Link
                                  onClick={handleDelete}
                                  className="btn btn-danger shadow btn-xs sharp"
                                >
                                  <i className="fa fa-trash"></i>
                                </Link>
                                <ToastContainer/>
                              </div>
                            </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="pagination-container">
                            <Pagination
                              count={Math.ceil(filteredCategoryList.length / rowsPerPage)}
                              page={page}
                              onChange={handlePageChange}
                              color="primary"
                            />
                          </div>

                        </div>
                      </>
                    ) : (
                      <NoRecord />
                    )}
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryList
