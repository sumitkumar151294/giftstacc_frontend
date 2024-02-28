import React, { useEffect, useState } from "react";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import CMSForm from "./CMSForm";
import { onGetCms } from "../../../Store/Slices/cmsSlice";

const CMS = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const getdata = useSelector((state) => state.cmsReducer.getCMSData);
  console.log(getdata);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  useEffect(()=>{
    dispatch(onGetCms());
    console.log("chirag-gupta")
  },[]);

  return (
    <>
      <CMSForm />
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12 col-xxl-12">
            <div class="card">
              <div className="card-body">
                {isLoading && getdata.length < 0 ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : Array.isArray(getdata) && getdata.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          {/* <th>{GetTranslationData("UIClient", "id")}</th>
                          <th>{GetTranslationData("UIClient", "Page_Name")}</th>
                          <th>
                            {GetTranslationData(
                              "UIClient",
                              "short_description"
                            )}
                          </th>
                          <th>
                            {GetTranslationData("UIClient", "long_description")}
                          </th>
                          <th>{GetTranslationData("UIClient", "action")}</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {getdata.slice(startIndex, endIndex).map((data) => (
                          <tr>
                            <td>{data.id}</td>
                            <td>{data.longDescription}</td>
                            <td>{data.shortDescription}</td>
                            {/* <td>{data}</td> */}
                            <td>
                              <div className="d-flex">
                                <a
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  // onClick={() => handleEdit(vendor)}
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </a>
                                <a
                                  className="btn btn-danger shadow btn-xs sharp"
                                  // onClick={() =>
                                  //   handleDelete(vendor)
                                  // }
                                >
                                  <i className="fa fa-trash"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {getdata.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(getdata.length / rowsPerPage)}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                          previousClassName={page === 1 ? "disabled" : ""}
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

export default CMS;
