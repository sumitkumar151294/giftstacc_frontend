/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import CMSForm from "./CMSForm";
import {
  onGetCms,
  onUpdateCms,
} from "../../../Store/Slices/ClientAdmin/cmsSlice";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import PageError from "../../../Components/PageError/PageError";
const CMS = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [Cmsprefilled, setCmsprefilled] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const id = GetTranslationData("UIAdmin", "id");
  const Page_Name = GetTranslationData("UIClient", "Page_Name");
  const short_description = GetTranslationData("UIClient", "short_description");
  const long_description = GetTranslationData("UIClient", "long_description");
  const action = GetTranslationData("UIAdmin", "action");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const getData = useSelector((state) => state.cmsReducer.getCMSData);
  const getCmsData = useSelector((state) => state.cmsReducer);
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer.filteredData
  );
  const [showError, setShowError] = useState(false);
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  useEffect(() => {
    dispatch(onGetCms());
    setIsLoading(true);
  }, []);
  useEffect(() => {
    if (getData) {
      const totalItems = getData.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [getData]);
  const handleDelete = (data) => {
    const deletedData = {
      enabled: false,
      deleted: true,
      clientId: "123",
      title: data?.title,
      shortDescription: data?.shortDescription,
      longDescription: data?.longDescription,
      id: data?.id,
    };
    setIsLoading(true);
    dispatch(onUpdateCms(deletedData));
  };
  const handleEdit = (data) => {
    setCmsprefilled({
      id: data?.id,
      title: data?.title,
      shortDescription: data?.shortDescription,
      longDescription: data?.longDescription,
    });
  };
  return (
    <>
      <ScrollToTop />
      {/* {showError ? (
        <PageError pageError={pageError} />
      ) : ( */}
      <>
        {getRoleAccess[0]?.addAccess && (
          <CMSForm
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            Cmsprefilled={Cmsprefilled}
            setCmsprefilled={setCmsprefilled}
          />
        )}
        <div class="container-fluid mt-2 mb-2 pt-1">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div className="container-fluid mt-2 mb-2 pt-1">
                  <div className="card-body">
                    {isLoading ? (
                      <div style={{ height: "400px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : Array.isArray(getData) && getData.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr key={{ id }}>
                              <th>{id}</th>
                              <th>{Page_Name}</th>
                              <th>{short_description}</th>
                              <th>{long_description}</th>
                              {getRoleAccess[0]?.editAccess && (
                                <th>{action}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {getData.slice(startIndex, endIndex).map((data) => (
                              <tr>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.shortDescription}</td>
                                <td>{data.longDescription}</td>
                                {getRoleAccess[0]?.editAccess && (
                                  <td>
                                    <div className="d-flex">
                                      <a
                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                        onClick={() => handleEdit(data)}
                                      >
                                        <i className="fas fa-pencil-alt"></i>
                                      </a>
                                      <a
                                        className="btn btn-danger shadow btn-xs sharp"
                                        onClick={() => handleDelete(data)}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </a>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {getData.length > 5 && (
                          <div className="pagination-container">
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={" >"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(
                                getData.length / rowsPerPage
                              )}
                              marginPagesDisplayed={2}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                              initialPage={page - 1} // Use initialPage instead of forcePage
                              previousClassName={
                                page === 1 ? disabled_Text : ""
                              }
                            />
                            <ToastContainer />
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
        </div>
      </>
      {/* )} */}
    </>
  );
};

export default CMS;
/* eslint-enable react-hooks/exhaustive-deps */
