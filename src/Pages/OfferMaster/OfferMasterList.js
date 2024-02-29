import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OfferMasterForm from "./OfferMasterForm";
import ReactPaginate from "react-paginate";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Button from "../../Components/Button/Button";
import { onGetOfferMaster, onUpdateOfferMaster } from "../../Store/Slices/offerMasterSlice";
import Loader from "../../Components/Loader/Loader";
import tempImage from '../../Assets/img/pizz1.jpg'

const OfferMasterList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  
  // To get the label from translation API
  const [prefilledValues, setPrefilledValues] = useState();
  const offer_list=GetTranslationData("UIClient", "offer_list");
  const image=GetTranslationData("UIClient", "imageLabel");
  const title=GetTranslationData("UIClient", "title");
  const subtitle=GetTranslationData("UIClient", "sub-title");
  const link_level=GetTranslationData("UIClient", "link_label");
  const display_order=GetTranslationData("UIClient", "display-order");
  const status=GetTranslationData("UIClient", "status");
  const action=GetTranslationData("UIClient", "actionLabel");
  const dispatch = useDispatch();
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const offerMasterData = [
    {
        "placement": "Top",
        "title": "Get the most out of it ",
        "subtitle": "we provide the best offer and vouchers",
        "link": "https://demo1.way2webhost.com",
        "displayOrder": "1",
        "image": "C:\\fakepath\\krGkf.png",
        "enabled": true,
        "id": 21
    },
    {
      "placement": "Top",
      "title": "Get the most out of it ",
      "subtitle": "we provide the best offer and vouchers",
      "link": "https://demo1.way2webhost.com",
      "displayOrder": "1",
      "image": "C:\\fakepath\\krGkf.png",
      "enabled": true,
      "id": 21
  },
  {
    "placement": "Top",
    "title": "Get the most out of it ",
    "subtitle": "we provide the best offer and vouchers",
    "link": "https://demo1.way2webhost.com",
    "displayOrder": "1",
    "image": "C:\\fakepath\\krGkf.png",
    "enabled": false,
    "id": 21
},
{
  "placement": "Top",
  "title": "Get the most out of it ",
  "subtitle": "we provide the best offer and vouchers",
  "link": "https://demo1.way2webhost.com",
  "displayOrder": "1",
  "image": "C:\\fakepath\\krGkf.png",
  "enabled": true,
  "id": 21
},
   

]
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  useEffect(() => {
    dispatch(onGetOfferMaster());
    setIsLoading(true);
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
      status:data.status,
    };
    dispatch(onUpdateOfferMaster(deletedData));
    dispatch(onGetOfferMaster());
  };
  useEffect(() => {
    if(offerMasterData) {
      setIsLoading(false);
    }
  }, [offerMasterData]);
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
                      {offer_list}
                    </h4>
                  </div>
                </div>
                <div class="card-body">
                {isLoading && (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                )}
                  {offerMasterData?.length > 0 ? (
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
                          {offerMasterData
                            .slice(startIndex, endIndex)
                            .map((data) => (
                              <tr key={data.id}>
                                <td>
                                  <img
                                    src={tempImage}
                                    style={{ width: "50px" }}
                                  />
                                </td>
                                <td>{data.title}</td>
                                <td>{data.subtitle}</td>
                                <td>{data.link}</td>
                                <td>{data.displayOrder}</td>
                                <td>
                                  <span className={`badge ${data.enabled ? 'badge-success': 'badge-danger'}`}>
                                    {data.enabled ? 'Active' : 'Non-Active'}
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
