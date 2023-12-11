import React, { useState } from 'react'
import { CSVLink } from "react-csv";
import Loader from '../../../Componenets/Loader/Loader';

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
       <div class="container-fluid pt-0">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="container mt-2 mb-2">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div class="card-header">
                    <h4 class="card-title  txt-admin txtt">Category List</h4>
                  </div>
                  <div class="customer-search mb-sm-0 mb-3">
                    <div class="input-group search-area">
                      <input
                        type="text"
                        class="form-control only-high"
                        placeholder="Search here......"
                      />
                      <span class="input-group-text">
                        <a href="javascript:void(0)">
                          <i class="flaticon-381-search-2"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center flex-wrap">
                    <CSVLink data={tableData} headers={headers}>
                      <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                        <i className="fa fa-file-excel me-2"></i>export
                      </button>
                    </CSVLink>
                  </div>
                </div>
              </div>
              <div class="card-body position-relative">
                {!isLoading ? (
                  <div style={{ height: "300px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div class="table-responsive">
                    <table class="table header-border table-responsive-sm">
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
                              <div class="d-flex">
                                <a
                                  href="#"
                                  class="btn btn-danger shadow btn-xs sharp"
                                >
                                  <i class="fa fa-trash"></i>
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
