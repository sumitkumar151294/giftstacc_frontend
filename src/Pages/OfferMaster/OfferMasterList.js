import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OfferMasterForm from "./OfferMasterForm";
import ReactPaginate from "react-paginate";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Button from "../../Components/Button/Button";
import { onGetOfferMaster, onUpdateOfferMaster } from "../../Store/Slices/offerMasterSlice";

const OfferMasterList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [prefilledValues, setPrefilledValues] = useState();
  const image=GetTranslationData("UIClient", "image");
  const title=GetTranslationData("UIClient", "title");
  const subtitle=GetTranslationData("UIClient", "sub-title");
  const link_level=GetTranslationData("UIClient", "link_label");
  const display_order=GetTranslationData("UIClient", "display-order");
  const status=GetTranslationData("UIClient", "status");
  const action=GetTranslationData("UIClient", "action");
  const dispatch = useDispatch();
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const filteredOfferMasterList = useSelector(
    (state) => state.offerMasterReducer.getData
  );

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  useEffect(() => {
    dispatch(onGetOfferMaster());
  }, []);

  const handleEdit = (data) => {
    const prefilled = {...data};
    setPrefilledValues(prefilled); 
  };
  const handleDelete = (data) => {
    const deletedData = {
      deleted:true,
      id:data.id,
      placement: data.placement,
      title: data.title,
      subtitle:data.subtitle,
      link: data.link,
      displayOrder: data.displayOrder,
      image: data.image,
      status: data.status,
    };
    dispatch(onUpdateOfferMaster(deletedData));
  };
  return (
    <>
      <OfferMasterForm 
         data={prefilledValues}
         setData={setPrefilledValues}
      />
      <div class="container-fluid  pt-0">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="container-fluid">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div class="card-header">
                    <h4 class="card-title">
                      {GetTranslationData("UIClient", "offer_list")}
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                  {filteredOfferMasterList &&
                  filteredOfferMasterList?.length > 0 ? (
                    <div class="table-responsive">
                      <table class="table header-border table-responsive-sm">
                        <thead>
                          <tr>
                            <th>{image}</th>
                            <th>{title}</th>
                            <th>{subtitle}</th>
                            <th>{link_level}</th>
                            <th>{display_order}</th>
                            <th>{status}</th>
                            <th>{action}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOfferMasterList
                            .slice(startIndex, endIndex)
                            .map((data) => (
                              <tr key={data.id}>
                                <td>
                                  <img
                                    src={data.img}
                                    style={{ width: "50px" }}
                                  />
                                </td>
                                <td>{data.title}</td>
                                <td>{data.subtitle}</td>
                                <td>{data.link}</td>
                                <td>{data.displayOrder}</td>
                                <td><span className="badge badge-success">{data.status}</span></td>
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
                      {filteredOfferMasterList.length > 5 && (
                        <div className="pagination-container">
                          <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={" >"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(
                              filteredOfferMasterList.length / rowsPerPage
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
