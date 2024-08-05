/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OfferMasterForm from "./OfferMasterForm";
import ReactPaginate from "react-paginate";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import Button from "../../../Components/Button/Button";
import {
  onGetOfferMaster,
  onUpdateOfferMaster,
} from "../../../Store/Slices/ClientAdmin/offerMasterSlice";
import Loader from "../../../Components/Loader/Loader";
import PageError from "../../../Components/PageError/PageError";

const OfferMasterList = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // To get the label from translation API
  const [prefilledValues, setPrefilledValues] = useState();
  const offer_list = GetTranslationData("UIClient", "offer_list");
  const image = GetTranslationData("UIClient", "imageLabel");
  const title = GetTranslationData("UIClient", "title");
  const subtitle = GetTranslationData("UIClient", "sub-title");
  const link_level = GetTranslationData("UIClient", "link_label");
  const imagePlacement = GetTranslationData("UIClient", "image_placement");
  const status = GetTranslationData("UIClient", "status");
  const action = GetTranslationData("UIClient", "actionLabel");
  const active = GetTranslationData("UIAdmin", "active");
  const nonActive = GetTranslationData("UIAdmin", "nonActive");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const dispatch = useDispatch();
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const offerMasterData = useSelector((state) => state.offerMasterReducer);
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer.filteredData
  );

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const showError = false;
  const [pageError, setPageError] = useState({
    StatusCode: "",
    ErrorName: "",
    ErrorDesription: "",
    url: "",
    buttonText: "",
  });

  const OfferMasterState = useSelector((state) => state.offerMasterReducer);
  const getListData = OfferMasterState?.isLoading;
  useEffect(() => {
    dispatch(onGetOfferMaster());
    // setIsLoading(true);
  }, []);

  useEffect(() => {
    if (offerMasterData) {
      const totalItems = offerMasterData?.getData?.length;
      const totalPages = Math.ceil(totalItems / rowsPerPage);
      if (page > totalPages && page > 1) {
        setPage(page - 1);
      }
      // setIsLoading(false);
    } else {
      // setIsLoading(false);
    }
  }, [offerMasterData]);

  const handleEdit = (data) => {
    const prefilled = { ...data };
    setPrefilledValues(prefilled);
  };
  const handleDelete = (data) => {
    const deletedData = {
      deleted: true,
      enabled: false,
      id: data.id,
      placement: data.placement,
      title: data.title,
      subtitle: data.subtitle,
      link: data.link,
      linkText: data?.linkText,
      imagePlacement: data.imagePlacement,
      image: data.image,
    };
    dispatch(onUpdateOfferMaster(deletedData));
  };
  useEffect(() => {
    if (offerMasterData) {
      // setIsLoading(false);
    }
  }, [offerMasterData]);

  return (
    <div>
      {getRoleAccess[0] !== undefined ? (
        <>
          {showError ? (
            <PageError pageError={pageError} setPageError={setPageError} />
          ) : (
            <>
              {getRoleAccess[0]?.addAccess && (
                <OfferMasterForm
                  data={prefilledValues}
                  setPrefilledValues={setPrefilledValues}
                />
              )}
              <div className="container-fluid  pt-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="container-fluid pt-1">
                        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                          <div className="card-header">
                            <h4 className="card-title">{offer_list}</h4>
                          </div>
                        </div>

                        <div className="card-body">
                          {getListData ? (
                            <div style={{ height: "400px" }}>
                              <Loader classType={"absoluteLoader"} />
                            </div>
                          ) : (
                            <div className="table-responsive">
                              {offerMasterData?.getData?.length > 0 ? (
                                <>
                                  <table className="table header-border table-responsive-sm">
                                    <thead>
                                      <tr>
                                        <th>{image}</th>
                                        <th>MobileImage</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>{status}</th>
                                        {getRoleAccess[0]?.editAccess && (
                                          <th>{action}</th>
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {offerMasterData?.getData
                                        .slice(startIndex, endIndex)
                                        .map((data) => (
                                          <tr key={data.id}>
                                            <td>
                                              <img
                                                src={`${process.env.REACT_APP_CLIENT_URL}${data.image}`}
                                                style={{ width: "50px" }}
                                                alt={`${process.env.REACT_APP_CLIENT_URL}${data.image}`}
                                              />
                                            </td>
                                            <td>
                                              <img
                                                src={`${process.env.REACT_APP_CLIENT_URL}${data.mobileImage}`}
                                                style={{ width: "50px" }}
                                                alt={`${process.env.REACT_APP_CLIENT_URL}${data.mobileImage}`}
                                              />
                                            </td>
                                           
                                            <td>{data.startDate}</td>
                                            <td>{data.endDate}</td>
                                            <td>
                                              <span
                                                className={`badge ${
                                                  data.enabled
                                                    ? "badge-success"
                                                    : "badge-danger"
                                                }`}
                                              >
                                                {data.enabled
                                                  ? active
                                                  : nonActive}
                                              </span>
                                            </td>
                                            {getRoleAccess[0]?.editAccess && (
                                              <td>
                                                <div className="d-flex">
                                                  <Button
                                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                                    onClick={() =>
                                                      handleEdit(data)
                                                    }
                                                    icon={"fas fa-pencil-alt"}
                                                  />
                                                  <Button
                                                    className="btn btn-danger shadow btn-xs sharp"
                                                    onClick={() =>
                                                      handleDelete(data)
                                                    }
                                                    icon={"fa fa-trash"}
                                                  />
                                                </div>
                                              </td>
                                            )}
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                  {offerMasterData?.getData?.length > 5 && (
                                    <div className="pagination-container">
                                      <ReactPaginate
                                        previousLabel={"<"}
                                        nextLabel={" >"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(
                                          offerMasterData?.getData?.length /
                                            rowsPerPage
                                        )}
                                        marginPagesDisplayed={2}
                                        onPageChange={handlePageChange}
                                        containerClassName={"pagination"}
                                        activeClassName={"active"}
                                        initialPage={page - 1}
                                        previousClassName={
                                          page === 1 ? disabled_Text : ""
                                        }
                                      />
                                    </div>
                                  )}
                                </>
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
            </>
          )}
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

export default OfferMasterList;
/* eslint-enable react-hooks/exhaustive-deps */
