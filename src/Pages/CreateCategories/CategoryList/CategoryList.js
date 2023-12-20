import React, { useEffect, useState } from 'react'
import { CSVLink } from "react-csv";
import Loader from '../../../Componenets/Loader/Loader';
import './CategoryList.scss'
import { onGetCategory } from '../../../Store/Slices/createCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetTranslationData } from '../../../Componenets/GetTranslationData/GetTranslationData ';

const CategoryList = () => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState("true");

  const headers = [
    { label: "category", key: "category" },
    { label: "supplier", key: "supplier" },
    { label: "company", key: "company" },
  ];


  // To get the categories
  useEffect(() => {
    dispatch(onGetCategory());
  }, []);

  // To get the data from redux store 
  const getCategory = useSelector((state) => state.createCategoryReducer);
  const getCategoryData = getCategory.data.data;
 
  //To get the label form DB 

  const categoryList = GetTranslationData('UIAdmin', 'categoryList');
  const categoryName = GetTranslationData('UIAdmin', 'categoryName');
  const supplierName = GetTranslationData('UIAdmin', 'supplierName');
  const supplierBrand = GetTranslationData('UIAdmin', 'supplierBrand');
  const action = GetTranslationData('UIAdmin', 'action_label');
  const export_label = GetTranslationData('UIAdmin', 'export_label')



  return (
    <>
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
                        placeholder="Search here......"
                      />
                      <span className="input-group-text">
                        <Link>
                          <i className="flaticon-381-search-2"></i>
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <CSVLink data={''} headers={headers}>
                      <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                        <i className="fa fa-file-excel me-2"></i>{export_label}
                      </button>
                    </CSVLink>
                  </div>
                </div>
              </div>
              <div className="card-body position-relative">
                {!isLoading ? (
                  <div style={{ height: "300px" }}>
                    <Loader classNameType={"absoluteLoader"} />
                  </div>
                ) : (
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
                        {getCategoryData?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.categoryName}</td>
                            <td>
                              {item.supplierName} 
                            </td>
                            <td>{item.supplierBrand}</td>

                            <td>
                              <div className="d-flex">
                                <a href="#" className="btn btn-danger shadow btn-xs sharp">
                                  <i className="fa fa-trash"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
