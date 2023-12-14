import React, { useState } from 'react'
import { CSVLink } from "react-csv";
import Loader from '../../../Componenets/Loader/Loader';
import './CategoryList.scss'

const CategoryList = () => {
    const [isLoading, setIsLoading] = useState("true");
    const headers = [
        { label: "category", key: "category" },
        { label: "supplier", key: "supplier" },
        { label: "company", key: "company" },
      ];
    let tableData = [
        {
          category: "E-Commerce",
          supplier: "Qucksilver",
          company: "Amazon",
        },
        {
          category: "E-Commerce",
          supplier: "Supplier 2",
          company: "Flipcart",
        },
        {
          category: "Shopping",
          supplier: "Supplier 3",
          company: "Nykaa",
        },
        {
          category: "Food",
          supplier: "Supplier 4",
          company: "KFC",
        },
      ];
  return (
    <>
       <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container mt-2 mb-2">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title  txt-admin txtt">Category List</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <input
                        type="text"
                        className="form-control only-high"
                        placeholder="Search here......"
                      />
                      <span className="input-group-text">
                        <a href="javascript:void(0)">
                          <i className="flaticon-381-search-2"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <CSVLink data={tableData} headers={headers}>
                      <button classNameName="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                        <i classNameName="fa fa-file-excel me-2"></i>export
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
                          <th>Category Name</th>
                          <th>Supplier Name</th>

                          <th>Supplier Brand</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((item) => (
                          <tr>
                            <td>{item.category}</td>
                            <td>
                              {item.supplier}
                              <a href="javascript:void();"></a>
                            </td>
                            <td>{item.company}</td>

                            <td>
                              <div className="d-flex">
                                <a
                                  href="#"
                                  className="btn btn-danger shadow btn-xs sharp"
                                >
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
