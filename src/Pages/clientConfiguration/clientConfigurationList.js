import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import PageError from "../../Components/PageError/PageError";
import { onUpdateClientConfigurationSubmit } from "../../Store/Slices/ClientAdmin/clientConfigurationSlice";
import ClientConfiguration from "./clientConfiguration";

const ClientConfigurationList = () => {
  const dispatch = useDispatch();
  const [prefilledData, setPrefilledData] = useState();
  
  const [isDelete, setIsDelete]= useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  // to get data from translation
  const non_active_option = GetTranslationData("UIClient", "non_active_option");
  const active = GetTranslationData("UIAdmin", "active");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  // to get data from redux store
  const getClientConfiguration = useSelector(
    (state) => state.clientConfigurationReducer
  );
  const getClientConfigurationData = getClientConfiguration?.clientConfigurationData;
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer.filteredData
  );
  // to handle page change
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // to handle edit
  const handleEdit = (data) => {
    const prefilled = { ...data };
    setPrefilledData(prefilled);
  };
  //to handle delete
  const handleDelete = (data) => {
    setIsDelete(true);
    const deletedData = {
      id:data?.id,
      clientId: data?.clientId,
      enabled: false,
      deleted: true,
      price: data?.price,
      points: data?.points,
      phoneNumber: data?.phoneNumber,
      email:data?.email,
      cartInfoMessage: data?.cartInfoMessage,
      cartInfo: data?.cartInfo,
      consentRequired: data?.consentRequired,
      consentMessage: data?.consentMessage,
      enableQuickBy: data?.enableQuickBy,
      otpRedeem: data?.otpRedeem,
    };
    dispatch(onUpdateClientConfigurationSubmit(deletedData));
  };
  // to handle pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  useEffect(() => {
    if (getClientConfigurationData) {
      const totalItems = getClientConfigurationData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    } else {
    }
  }, [getClientConfigurationData]);

  return (
    <div>
      {getRoleAccess[0] !== undefined ? (
        <>
          {getRoleAccess[0]?.addAccess && (
            <ClientConfiguration
              prefilledData={prefilledData}
              setPrefilledData={setPrefilledData}
              isDelete={isDelete}
              setIsDelete={setIsDelete}
            />
          )}
          
          <div className="container-fluid pt-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="container-fluid pt-0">
                    <div className="card-header">
                      <h4 className="card-title">client Configuration List</h4>
                    </div>
                    {(isDelete ? isDelete : getClientConfiguration?.isLoading) ? (
                      <div style={{ height: "400px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : (
                      <div className="card-body">
                        {getClientConfigurationData &&
                        getClientConfigurationData?.length > 0 ? (
                          <div className="table-responsive">
                            <table className="table header-border table-responsive-sm">
                              <thead>
                                <tr>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Price</th>
                                  <th>Points</th>
                                  <th>Display Item Info Message </th>
                                  <th>Display Item Info Status</th>
                                  <th>Display Consent Message</th>
                                  <th>Display Consent Status</th>
                                  <th>Quick Buy</th>
                                  <th>OTP Redeem</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getClientConfigurationData
                                  .slice(startIndex, endIndex)
                                  .map((points) => (
                                    <tr key={points.id}>
                                      <td>{points.email}</td>
                                      <td>{points.phoneNumber}</td>
                                      <td>{points.price}</td>
                                      <td>{points.points}</td>
                                      <td>{points.cartInfoMessage}</td>
                                      <td>
                                        <span
                                          className={
                                            points.cartInfo
                                              ? "badge badge-success"
                                              : "badge badge-danger"
                                          }
                                        >
                                          {points.cartInfo
                                            ? active
                                            : non_active_option}
                                        </span>
                                      </td>
                                      <td>{points.consentRequired}</td>
                                      <td>
                                        <span
                                          className={
                                            points.consentMessage
                                              ? "badge badge-success"
                                              : "badge badge-danger"
                                          }
                                        >
                                          {points.consentMessage
                                            ? active
                                            : non_active_option}
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          className={
                                            points.enableQuickBy
                                              ? "badge badge-success"
                                              : "badge badge-danger"
                                          }
                                        >
                                          {points.enableQuickBy
                                            ? active
                                            : non_active_option}
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          className={
                                            points.otpRedeem
                                              ? "badge badge-success"
                                              : "badge badge-danger"
                                          }
                                        >
                                          {points.otpRedeem
                                            ? active
                                            : non_active_option}
                                        </span>
                                      </td>
                                      {getRoleAccess[0]?.editAccess && (
                                        <td>
                                          <div className="d-flex">
                                            <Button
                                              className="btn btn-primary shadow btn-xs sharp me-1"
                                              icon={"fas fa-pencil-alt"}
                                              onClick={() => handleEdit(points)}
                                            ></Button>
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
                            {getClientConfigurationData?.length > 5 && (
                              <div className="pagination-container">
                                <ReactPaginate
                                  previousLabel={"<"}
                                  nextLabel={" >"}
                                  breakLabel={"..."}
                                  pageCount={Math.ceil(
                                    getClientConfigurationData?.length /
                                      rowsPerPage
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
        </>
      ) : (
        <PageError
          pageError={{
            StatusCode: "401",
            ErrorName: "Permission Denied",
            ErrorDesription:
              "Your application url is not registerd to our application",
            url: "/",
            buttonText: "Back to Home",
          }}
        />
      )}
    </div>
  );
};
export default ClientConfigurationList;