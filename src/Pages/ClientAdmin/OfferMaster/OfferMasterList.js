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
import offerImage from "../../../Assets/img/pizz1.jpg";

const OfferMasterList = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  const dispatch = useDispatch();
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const offerMasterData = useSelector((state)=> state.offerMasterReducer.getData)
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  useEffect(() => {
    dispatch(onGetOfferMaster());
    setIsLoading(true);
  }, []);

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
      imagePlacement: data.imagePlacement,
      image: data.image,
    };
    dispatch(onUpdateOfferMaster(deletedData));
    dispatch(onGetOfferMaster());
  };
  useEffect(() => {
    if (offerMasterData) {
      setIsLoading(false);
    }
  }, [offerMasterData]);

  return (
    <>
      <OfferMasterForm data={prefilledValues} setData={setPrefilledValues} />
      <div className="container-fluid  pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title">{offer_list}</h4>
                  </div>
                </div>
                <div className="card-body">
                  {isLoading && (
                    <div style={{ height: "400px" }}>
                      <Loader classType={"absoluteLoader"} />
                    </div>
                  )}
                  {offerMasterData?.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>{image}</th>
                            <th>{title}</th>
                            <th>{subtitle}</th>
                            <th>{link_level}</th>
                            <th>{imagePlacement}</th>
                            <th>{status}</th>
                            <th>{action}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {offerMasterData
                            .slice(startIndex, endIndex)
                            .map((data) => (
                              <tr key={data.id}>
                                <td>
                                  {/* <img
                                    src={offerImage}
                                    style={{ width: "50px" }}
                                  /> */}
                                </td>
                                <td>{data.title}</td>
                                <td>{data.subtitle}</td>
                                <td>{data.link}</td>
                                <td>{data.imagePlacement}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      data.enabled
                                        ? "badge-success"
                                        : "badge-danger"
                                    }`}
                                  >
                                    {data.enabled ? "Active" : "Non-Active"}
                                  </span>
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    onClick={() => handleEdit(data)}
                                    icon={"fas fa-pencil-alt"}
                                  />
                                  <Button
                                    className="btn btn-danger shadow btn-xs sharp"
                                    onClick={() => handleDelete(data)}
                                    icon={"fa fa-trash"}
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {offerMasterData.length > 5 && (
                        <div className="pagination-container">
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={" >"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(
                              offerMasterData.length / rowsPerPage
                            )}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                            initialPage={page - 1}
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
      </div>
    </>
  );
};

export default OfferMasterList;
