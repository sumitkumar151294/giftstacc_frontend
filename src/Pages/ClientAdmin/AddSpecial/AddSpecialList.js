/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AddSpecialForm from "./AddSpecialForm";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import Loader from "../../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { onAddSpecialUpdate } from "../../../Store/Slices/ClientAdmin/addSpecialListSlice";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import PageError from "../../../Components/PageError/PageError";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";

const AddSpecialList = () => {
  const section_name=GetTranslationData("UIClient", "section_name");
  const status = GetTranslationData("UIClient", "status");
  const displayOrder = GetTranslationData("UIClient", "display-order");
  const maxNoOfbrands = GetTranslationData("UIClient", "maxNoOfbrands");
  const action = GetTranslationData("UIClient", "actionLabel");
  const addSpecialList=GetTranslationData("UIClient", "addSpecialList");
  const allocateBrands=GetTranslationData("UIClient", "allocateBrands");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [prefilledValues, setPrefilledValues] = useState();
  const getAddSpecial = useSelector((state) => state.addSpecialReducer);
  const getRoleAccess = useSelector((state)=> state.moduleReducer.filteredData);
  const [showError, setShowError] = useState(false);
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleEdit = (data) => {
    const prefilled = data;
    setPrefilledValues(prefilled);
  };

  useEffect(() => {
    if (getAddSpecial) {
      const totalItems = getAddSpecial?.getData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    } else {
    }
  }, [getAddSpecial]);
  const handleDelete = (data) => {
    const deletedData = {
      sectionName: data.sectionName,
      displayOrder: data.displayOrder,
      status: data.status,
      maximumNumberOfBrands: data.maximumNumberOfBrands,
      id: data.id,
      enabled: false,
      deleted: true,
    };
    dispatch(onAddSpecialUpdate(deletedData));
  };

  return (
    <>
      {" "}
      {showError ? (
        <PageError pageError={pageError} />
      ) : (
        <>
          <AddSpecialForm
            prefilledValues={prefilledValues}
            setPrefilledValues={setPrefilledValues}
          />
          <div className="container-fluid pt-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="container-fluid pt-1">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                      <div className="card-header">
                        <h4 className="card-title">{addSpecialList}</h4>
                      </div>
                    </div>
                    {isLoading ? (
                      <div style={{ height: "400px" }}>
                        <Loader classNameType={"absoluteLoader"} />
                      </div>
                    ) : (
                      <div className="card-body card-body-user">
                        {getAddSpecial?.getData?.length > 0 ? (
                          <div className="table-responsive">
                            <table className="table header-border table-responsive-sm">
                              <thead>
                                <tr>
                                  <th>{section_name}</th>
                                  <th>{displayOrder}</th>
                                  <th>{maxNoOfbrands}</th>
                                  <th>{status}</th>
                                  {getRoleAccess[0]?.editAccess && (<th>{action}</th>)}
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.isArray(getAddSpecial?.getData) &&
                                  getAddSpecial?.getData
                                    .slice(startIndex, endIndex)
                                    .map((Special) => (
                                      <tr>
                                        <td>
                                          <strong>{Special.sectionName}</strong>
                                        </td>
                                        <td>{Special.displayOrder}</td>
                                        <td>{Special.maximumNumberOfBrands}</td>
                                        <td>
                                          <span
                                            className={
                                              Special.status === true
                                                ? "badge badge-success"
                                                : "badge badge-danger"
                                            }
                                          >
                                            {Special.status === true
                                              ? "Active"
                                              : "Non-Active"}
                                          </span>
                                        </td>{" "}
                                        {getRoleAccess[0]?.editAccess && (
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              className="btn btn-primary shadow btn-xs sharp me-1"
                                              icon={"fas fa-pencil-alt"}
                                              onClick={() =>
                                                handleEdit(Special)
                                              }
                                            />
                                            <Button
                                              className="btn btn-danger shadow btn-xs sharp"
                                              icon={"fa fa-trash"}
                                              onClick={() =>
                                                handleDelete(Special)
                                              }
                                            />
                                          </div>
                                        </td>
                                        )}
                                        <td>
                                          <Link
                                            to="/lc-user-admin/allocate-brand"
                                            className="btn btn-primary btn-sm float-right"
                                          >
                                            <i className="fa fa-plus"></i>&nbsp;
                                            {allocateBrands}
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                            {getAddSpecial?.getData?.length > 5 && (
                              <div className="pagination-container">
                                <ReactPaginate
                                  previousLabel={"<"}
                                  nextLabel={" >"}
                                  breakLabel={"..."}
                                  pageCount={Math.ceil(
                                    getAddSpecial?.getData?.length / rowsPerPage
                                  )}
                                  marginPagesDisplayed={2}
                                  onPageChange={handlePageChange}
                                  containerClassName={"pagination"}
                                  activeClassName={"active"}
                                  initialPage={page - 1} // Use initialPage instead of forcePage
                                  previousClassName={
                                    page === 1 ? "disabled" : ""
                                  }
                                />
                              </div>
                            )}
                          </div>
                        ) :(
                          <NoRecord />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddSpecialList;
/* eslint-enable react-hooks/exhaustive-deps */