import React, { useEffect, useState } from "react";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import RoleMasterForm from "./RoleMasterForm";
import ReactPaginate from "react-paginate";
const RoleMasterList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  // To get the label from DB
  const roleModuleAccessList = GetTranslationData("UIAdmin", "role-module-access-list");
  const roleName = GetTranslationData("UIAdmin", "role-name");
  const modules = GetTranslationData("UIAdmin", "modules");
  const action = GetTranslationData("UIAdmin", "action");
  const roleAccessListData = useSelector((state) => state.userRoleReducer.userRoleData);
  const userRoleAccessListData = useSelector((state) => state.userRoleModuleAccessReducer.data);
  const moduleList = useSelector((state) => state.moduleReducer?.data);
  useEffect(() => {
    // user-role get api call
    dispatch(onGetUserRole());
    setIsLoading(true);
  }, []);

  const getModuleName = (id) => {
    if(Array.isArray(moduleList)){
      let moduleName = moduleList?.filter((item) => item.id === id);
      if (moduleName?.length > 0) {
        return moduleName[0].name;
      } else {
        return "";
      }  
    }
  };
  const [rowsPerPage] = useState(5);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleEdit = (data) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const prefilled = data;
    setData(prefilled);
  };
  useEffect(() => {
    if (roleAccessListData) {
      setIsLoading(false);
    }
  }, [roleAccessListData]);
  return (
    <>
      <ScrollToTop />
      <RoleMasterForm
        data={data}
        setData={setData}
      />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{roleModuleAccessList}</h4>
              </div>
              <div className="card-body position-relative">
                {isLoading && (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                )}
                {roleAccessListData?.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead key="thead">
                        <tr>
                          <th>{roleName}</th>
                          <th>{modules}</th>
                          <th>{action}</th>
                        </tr>
                      </thead>
                      <tbody key="tbody">
                        {Array.isArray(roleAccessListData) &&
                          roleAccessListData
                            .slice(startIndex, endIndex)
                            .map((data, index) => (
                              <tr key={index}>
                                <td>{data.name}</td>
                                <td>  
                                <div className="d-flex">
                                {
                                 Array.isArray(userRoleAccessListData) && userRoleAccessListData?.filter(item=> (item.roleId===data?.id && (item.viewAccess || item.addAccess || item.editAccess))).map(moduleData=>(
                                      <span
                                        className="badge badge-success mr-10"
                                        key={index}
                                      >
                                       {getModuleName(moduleData?.moduleId)}
                                      </span>
                                 
                                  ))
                                }             

                                 </div>                
                                 
                                </td>
                                <td>
                                  <a
                                    onClick={() => handleEdit(data)}
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </a>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                      {roleAccessListData.length > 5 &&
                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={" >"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(
                          roleAccessListData.length / rowsPerPage
                        )}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        initialPage={page - 1} // Use initialPage instead of forcePage
                        previousClassName={page === 0 ? "disabled" : ""}
                      />}
                    </div>
                  </div>
                ) : (
                  <NoRecord />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RoleMasterList;
