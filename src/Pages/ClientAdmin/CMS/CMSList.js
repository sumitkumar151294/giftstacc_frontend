import React, { useEffect, useState } from "react";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import CMSForm from "./CMSForm";
import { onGetCms, onUpdateCms, onUpdateCmsReset } from "../../../Store/Slices/cmsSlice";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
const CMS = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const [Cmsprefilled, setCmsprefilled] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const id = GetTranslationData("UIClient", "id");
  const Page_Name = GetTranslationData("UIClient", "Page_Name");
  const short_description = GetTranslationData("UIClient", "short_description");
  const long_description = GetTranslationData("UIClient", "long_description");
  const action = GetTranslationData("UIClient", "action");
  const getdata = [
    {
        "title": "Terms and Conditions",
        "shortDescription": "About us",
        "longDescription": "<p>Description for the about us page</p>",
        "id": 1
    },
    {
        "title": "About us",
        "shortDescription": "Terms and conditons",
        "longDescription": "<p>Description for the about us page</p>",
        "id": 2
    },
    {
        "title": "Testing Page",
        "shortDescription": "Testing 1",
        "longDescription": "<p>Description for the about us page</p>",
        "id": 3
    },
    {
        "title": "Privacy Policy",
        "shortDescription": "Contact Us",
        "longDescription": "<p>Description for the about us page</p>",
        "id": 4
    },
  
];
  const updateCMSdata= useSelector((state)=>state.cmsReducer)
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };

  useEffect(() => {
    dispatch(onGetCms());
    setIsLoading(true);
  }, []);
  useEffect(() => {
    if (getdata) {
      setIsLoading(false);
    }
  }, [getdata]);
  const handleDelete = (data) => {
    const deletedData = {
      enabled: false,
      deleted: true,
      title: data?.title,
      shortDescription: data?.shortDescription,
      longDescription: data?.longDescription,
      id: data?.id,
    };
    setIsLoading(true);
    dispatch(onUpdateCms(deletedData));
  };
  const handleEdit = (data) => {
    setCmsprefilled({
      id:data?.id,
      title: data?.title,
      shortDescription: data?.shortDescription,
      longDescription: data?.longDescription
    });
  };
useEffect(()=>{
if(updateCMSdata.update_status_code==="201"){
  dispatch(onGetCms())
  dispatch(onUpdateCmsReset())
  toast.success(updateCMSdata.updateMessage)
}
},[updateCMSdata])
  return (
    <>
      <ScrollToTop />
      <CMSForm
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        Cmsprefilled={Cmsprefilled}
        setCmsprefilled={setCmsprefilled}
      />
      <div class="container-fluid mt-2 mb-2 pt-1">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div className="container-fluid mt-2 mb-2 pt-1">
                <div className="card-body" >
                {isLoading && getdata.length < 0 ? (
                 <NoRecord />
                ) : Array.isArray(getdata) && getdata.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>{id}</th>
                          <th>{Page_Name}</th>
                          <th>{short_description}</th>
                          <th>{long_description}</th>
                          <th>{action}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getdata.slice(startIndex, endIndex).map((data) => (
                          <tr>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
                            <td>{data.shortDescription}</td>
                            <td>{data.longDescription}</td>
                            <td>
                              <div className="d-flex">
                                <a
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  onClick={() => handleEdit(data)}
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </a>
                                <a
                                  className="btn btn-danger shadow btn-xs sharp"
                                  onClick={() => handleDelete(data)}
                                >
                                  <i className="fa fa-trash"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    {getdata.length > 5 && (
                      <div className="pagination-container">
                        <ReactPaginate
                          previousLabel={"<"}
                          nextLabel={" >"}
                          breakLabel={"..."}
                          pageCount={Math.ceil(getdata.length / rowsPerPage)}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                          initialPage={page - 1} // Use initialPage instead of forcePage
                          previousClassName={page === 1 ? "disabled" : ""}
                        />
                        <ToastContainer/>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ height: "400px" }}>
                  <Loader classType={"absoluteLoader"} />
                </div>
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

export default CMS;
