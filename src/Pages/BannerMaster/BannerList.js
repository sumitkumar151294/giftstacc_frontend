import React, { useState } from "react";
import BannerForm from "./BannerMaster";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";
import { useDispatch } from "react-redux";
import { onUpdateBannerMaster } from "../../Store/Slices/bannerMasterSlice";
const BannerMasterList = () => {
  const dispatch = useDispatch();
  const banners = [
    {
      id: 1,
      title: "Get the most out of it",
      subtitle: "We",
      link: "https://example.com",
      order: 2,
      status: "Active",
    },
    {
      id: 1,
      title: "Get the most out of it",
      subtitle: "are",
      link: "https://example.com",
      order: 2,
      status: "Active",
    },
    {
      id: 1,
      title: "Get the most out of it",
      subtitle: "We provide the best offer and vouchers",
      link: "https://example.com",
      order: 2,
      status: "Active",
    },
    {
      id: 1,
      title: "Get the most out of it",
      subtitle: "We provide the best offer and vouchers",
      link: "https://example.com",
      order: 2,
      status: "Active",
    },
    {
      id: 1,
      title: "Get the most out of it",
      subtitle: "We provide the best offer and vouchers",
      link: "https://example.com",
      order: 2,
      status: "Active",
    },
  ];
  const [rowsPerPage] = useState(5);
  const [prefilledData, setPrefilledData] = useState();
  const [page, setPage] = useState(1);
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleEdit = (data) => {
    debugger;
    setPrefilledData(data);
  };
  const handleDelete = (data) => {
    const deletedData = {
      bannerPlacement: data,
      bannerTitle: data?.title,
      bannerSubtitle: data?.subtitle,
      bannerLink: data?.link,
      displayOrder: data?.order,
      status: data?.status,
      image: "",
      enabled: false,
      deleted: true,
    };
    dispatch(onUpdateBannerMaster(deletedData));
  };
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
                        {banners.map((banner) => (
                          <tr key={banner.id}>
                            <td>{banner.title}</td>
                            <td>{banner.subtitle}</td>
                            <td>{banner.link}</td>
                            <td>{banner.order}</td>
                            <td>
                              <span
                                className={`badge ${
                                  banner.status === "Active"
                                    ? "badge-success"
                                    : "badge-secondary"
                                }`}
                              >
                                {banner.status}
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
                    {banners.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(banners.length / rowsPerPage)}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                          previousClassName={page === 0 ? "disabled" : ""}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerMasterList;
