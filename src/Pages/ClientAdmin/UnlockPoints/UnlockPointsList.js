/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import Loader from "../../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import PageError from "../../../Components/PageError/PageError";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { GetClientId } from "../../../Common/commonSlice/CommonSlice";
import UnlockPointsForm from "./UnlockPointsForm";
import { onUnlockPointsUpdate } from "../../../Store/Slices/ClientAdmin/unlockPointsSlice";

const UnlockPointsList = () => {
  const getId = GetClientId();
  const dispatch = useDispatch();
  const [prefilledValues, setPrefilledValues] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  // to get data from translation
  const section_name = GetTranslationData("UIClient", "section_name");
  const status = GetTranslationData("UIClient", "status");
  const displayOrder = GetTranslationData("UIClient", "display-order");
  const action = GetTranslationData("UIClient", "actionLabel");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const non_active_option = GetTranslationData("UIClient", "non_active_option");
  const active = GetTranslationData("UIAdmin", "active");
  //to get data from redux store
  const getUnlockPoints = useSelector((state) => state?.unlockPointsReducer);
  const getRoleAccess = useSelector(
    (state) => state?.moduleReducer?.filteredData
  );
  const getRoleAccessData = useSelector((state) => state?.moduleReducer);
  // to handle page error
  const showError = false;
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });
  // to handle edit
  const handleEdit = (data) => {
    const prefilled = data;
    setPrefilledValues(prefilled);
  };
// to handle pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  useEffect(() => {
    if (getUnlockPoints) {
      const totalItems = getUnlockPoints?.getData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    } else {
    }
  }, [getUnlockPoints]);
  //to handle delete
  const handleDelete = (data) => {
    const deletedData = {
      // sectionName: data?.sectionName,
      // displayOrder: data?.displayOrder,
      // status: data.status,
      id: data.id,
      enabled: false,
      deleted: true,
      clientId: data.clientId,
      icon:data.icon,
      title:data.title,
      sub_Title: data.sub_Title,
      description: data.description,
    };
    dispatch(onUnlockPointsUpdate(deletedData));
  };
  return (
    <div>
      <UnlockPointsForm
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
                    <h4 className="card-title">{"Unlock Points List"}</h4>
                  </div>
                </div>
                {getUnlockPoints?.isLoading || getRoleAccessData?.isLoading ? (
                  <div style={{ height: "400px" }}>
                    <Loader classNameType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="card-body card-body-user">
                    {getUnlockPoints?.getData?.length ? (
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm  allocateBrandTable">
                          <thead>
                            <tr>
                              <th>{section_name}</th>
                              <th>{"Mobile Icon "}</th>
                              <th>{"Web Icon"}</th>
                              <th>{"Title"}</th>
                              <th>{displayOrder}</th>
                              <th>{status}</th>
                              {getRoleAccess[0]?.editAccess && (
                                <th>{action}</th>
                              )}
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(getUnlockPoints?.getData) &&
                              getUnlockPoints?.getData
                                .slice(startIndex, endIndex)
                                .map((points, index) => (
                                  <tr key={index}>
                                    <td className="list-Width">
                                      <strong>{points.title}</strong>
                                    </td>
                                    <td>{""}</td>
                                    <td>{""}</td>
                                    <td>{points.description}</td>
                                    <td>{points.displayOrder}</td>
                                    <td>
                                      <span
                                        className={
                                          points.enabled
                                            ? "badge badge-success"
                                            : "badge badge-danger"
                                        }
                                      >
                                        {points.enabled
                                          ? active
                                          : non_active_option}
                                      </span>
                                    </td>{" "}
                                    {getRoleAccess[0]?.editAccess && (
                                      <td>
                                        <div className="d-flex">
                                          <Button
                                            className="btn btn-primary shadow btn-xs sharp me-1"
                                            icon={"fas fa-pencil-alt"}
                                            onClick={() => handleEdit(points)}
                                          />
                                          <Button
                                            className="btn btn-danger shadow btn-xs sharp"
                                            icon={"fa fa-trash"}
                                            onClick={() =>
                                              handleDelete(points)
                                            }
                                          />
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                        {getUnlockPoints?.getData?.length > 5 && (
                          <div className="pagination-container">
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={" >"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(
                                getUnlockPoints?.getData?.length / rowsPerPage
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
                          </div>
                        )}
                      </div>
                    ) : (
                      <NoRecord />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockPointsList;
