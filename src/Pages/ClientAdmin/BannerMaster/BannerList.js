/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import BannerForm from "./BannerMaster";
import ReactPaginate from "react-paginate";
import Button from "../../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import Loader from "../../../Components/Loader/Loader";
import { onUpdateBannerMaster } from "../../../Store/Slices/ClientAdmin/bannerMasterSlice";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
const BannerMasterList = () => {
  const title_label = GetTranslationData("UIClient", "title");
  const sub_title = GetTranslationData("UIClient", "sub-title");
  const link_label = GetTranslationData("UIClient", "link_label");
  const display_order = GetTranslationData("UIClient", "display-order");
  const status = GetTranslationData("UIClient", "status");
  const actionLabel = GetTranslationData("UIClient", "actionLabel");
  const dispatch = useDispatch();
  const getBannerMasterState = useSelector((state) => state.bannerMasterReducer);

  const getBannerMaster = useSelector(
    (state) => state.bannerMasterReducer?.getData
  );
  const getListData= getBannerMasterState?.isLoading;
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
    const prefilled = { ...data };
    setPrefilledData(prefilled);
  };
  const handleDelete = (data) => {
    const deletedData = {
      clientId: "strisng",
      bannerPlacement: data.bannerPlacement,
      bannerTitle: data.bannerTitle,
      bannerSubtitle: data.bannerSubtitle,
      bannerLink: data.bannerLink,
      displayOrder: data.displayOrder,
      buttonText: data.buttonText,  
      image: data.image,
      id: data?.id,
      enabled: false,
      deleted: true,
    };
    dispatch(onUpdateBannerMaster(deletedData));
  };
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
    <>
      <BannerForm
        prefilledData={prefilledData}
        setPrefilledData={setPrefilledData}
      />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid pt-0">
                <div className="card-header">
                  <h4 className="card-title">Banner List</h4>
                </div>
                {getListData ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <div className="card-body">
                    {getBannerMaster && getBannerMaster.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>{title_label}</th>
                              <th>{sub_title}</th>
                              <th>{link_label}</th>
                              <th>{display_order}</th>
                              <th>{status}</th>
                              <th>{actionLabel}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getBannerMaster
                              .slice(startIndex, endIndex)
                              .map((banner) => (
                                <tr key={banner.id}>
                                  <td>{banner.bannerTitle}</td>
                                  <td>{banner.bannerSubtitle}</td>
                                  <td>{banner.bannerLink}</td>
                                  <td>{banner.displayOrder}</td>
                                  <td>
                                    <span
                                      className={
                                        banner.enabled
                                          ? "badge badge-success"
                                          : "badge badge-danger"
                                      }
                                    >
                                      {banner.enabled ? "Active" : "Non-Active"}
                                    </span>
                                  </td>
                                  {getRoleAccess[0]?.editAccess && (
                                    <td>
                                      <div className="d-flex">
                                        <Button
                                          className="btn btn-primary shadow btn-xs sharp me-1"
                                          icon={"fas fa-pencil-alt"}
                                          onClick={() => handleEdit(banner)}
                                        ></Button>
                                        <Button
                                          className="btn btn-danger shadow btn-xs sharp"
                                          icon={"fa fa-trash"}
                                          onClick={() => handleDelete(banner)}
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
                              previousClassName={page === 1 ? "disabled" : ""}
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
  );
};
export default BannerMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
