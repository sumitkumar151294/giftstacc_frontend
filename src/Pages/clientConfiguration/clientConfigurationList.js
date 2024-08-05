/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import { onUpdateBannerMaster } from "../../Store/Slices/ClientAdmin/bannerMasterSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import PageError from "../../Components/PageError/PageError";
import ClientConfiguration from "./clientConfiguration";
import { onClientConfiqurationSubmit } from "../../Store/Slices/clientConfiqurationSlice";
const ClientConfigurationList = () => {
  const title_label = GetTranslationData("UIClient", "title");
  const sub_title = GetTranslationData("UIClient", "sub-title");
  const link_label = GetTranslationData("UIClient", "link_label");
  const display_order = GetTranslationData("UIClient", "display-order");
  const status = GetTranslationData("UIClient", "status");
  const actionLabel = GetTranslationData("UIClient", "actionLabel");
  const non_active_option = GetTranslationData("UIClient", "non_active_option");
  const active = GetTranslationData("UIAdmin", "active");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const startDate = GetTranslationData("UIAdmin", "startDate");
  const endDate = GetTranslationData("UIAdmin", "endDate");
  const banner_link = GetTranslationData("UIClient", "banner-link");
  const [isDelete, setIsDelete]= useState(false);
  const dispatch = useDispatch();
  const getBannerMasterState = useSelector(
    (state) => state.bannerMasterReducer
  );

  const getBannerMaster = useSelector(
    (state) => state.bannerMasterReducer?.getData
  );
  const getListData = getBannerMasterState?.isLoading;
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer.filteredData
  );

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const [prefilledData, setPrefilledData] = useState();
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleEdit = (data) => {
    debugger
    const prefilled = { ...data };
    setPrefilledData(prefilled);
  };
  const handleDelete = (data) => { 
    setIsDelete(true)
    const deletedData = {
      clientId: data.clientId,
      // bannerPlacement: data.bannerPlacement,
      bannerTitle: data.bannerTitle,
      bannerSubtitle: data.bannerSubtitle,
      bannerLink: data.buttonLink,
      displayOrder: data.displayOrder,
      buttonText: data.buttonText,
      webImage: data.webImage,
      mobileImage: data.mobileImage,
      endDate:data?.endDate,
      startDate:data?.startDate,
      id: data?.id,
      enabled: false,
      deleted: true,
    };
    dispatch(onUpdateBannerMaster(deletedData));
  };
  useEffect(()=>{
    dispatch(onClientConfiqurationSubmit())
      },[]);
    
      const pointData = useSelector((state) => state.clientConfigurationSliceReducer?.clientConfiqurationData)
      console.log(pointData,"pointData");
    
  useEffect(() => {
    if (getBannerMaster) {
      const totalItems = getBannerMaster?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
    } else {
    }
  }, [getBannerMaster]);

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
                    {(isDelete ? isDelete : getListData)? (
                      <div style={{ height: "400px" }}>
                        <Loader classType={"absoluteLoader"} />
                      </div>
                    ) : (
                      <div className="card-body">
                        {pointData && pointData.length > 0 ? (
                          <div className="table-responsive">
                            <table className="table header-border table-responsive-sm">
                              <thead>
                                <tr>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Display Item Info Message </th>
                                  <th>Display Item Info Status</th>
                                  <th>Display Consonant</th>
                                  <th>Display Consonant Status</th>
                                  <th>Price Per Point</th>
                                 
                                </tr>
                              </thead>
                              <tbody>
                                {pointData
                                  .slice(startIndex, endIndex)
                                  .map((points) => (
                                    <tr key={points.id}>
                                    
                                      <td>{points.email}</td>
                                      <td>{points.phoneNumber}</td>
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
                                      <td>{points.points}</td>
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
                                              onClick={() => handleDelete(points)}
                                            />
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                            {getBannerMaster.length > 5 && (
                              <div className="pagination-container">
                                <ReactPaginate
                                  previousLabel={"<"}
                                  nextLabel={" >"}
                                  breakLabel={"..."}
                                  pageCount={Math.ceil(
                                    getBannerMaster.length / rowsPerPage
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
/* eslint-enable react-hooks/exhaustive-deps */
