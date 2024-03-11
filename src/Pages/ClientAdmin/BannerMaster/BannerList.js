import React, { useState, useEffect } from "react";
import BannerForm from "./BannerMaster";
import ReactPaginate from "react-paginate";
import Button from "../../../Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import Loader from "../../../Components/Loader/Loader";
import { onUpdateBannerMaster } from "../../../Store/Slices/ClientAdmin/bannerMasterSlice";
const BannerMasterList = () => {
  const dispatch = useDispatch();
  const getBannerMaster = useSelector(
    (state) => state.bannerMasterReducer?.getData
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
    setPrefilledData(data);
  };
  const handleDelete = (data) => {
    const deletedData = {
      clientId: "strisng",
      bannerPlacement: data.bannerPlacement,
      bannerTitle: data.bannerTitle,
      bannerSubtitle: data.bannerSubtitle,
      bannerLink: data.bannerLink,
      displayOrder: data.displayOrder,
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
      <BannerForm prefilledData={prefilledData} />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid">
                <div className="card-header">
                  <h4 className="card-title">Banner List</h4>
                </div>
                {getBannerMaster?.length > 0 ? (
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Link</th>
                            <th>Display Order</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(getBannerMaster) &&
                            getBannerMaster
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
                                        banner.enabled === true
                                          ? "badge badge-success"
                                          : "badge badge-danger"
                                      }
                                    >
                                      {banner.enabled === true
                                        ? "Active"
                                        : "Non-Active"}
                                    </span>
                                  </td>
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
                                </tr>
                              ))}
                        </tbody>
                      </table>
                      {getBannerMaster?.length > 5 && (
                        <div className="pagination-container">
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={" >"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(
                              getBannerMaster?.length / rowsPerPage
                            )}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            initialPage={page - 1} // Use initialPage instead of forcePage
                            previousClassName={page === 1 ? "disabled" : ""}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : getBannerMaster?.length < 0 ? (
                  <NoRecord />
                ) : (
                  <Loader />
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
