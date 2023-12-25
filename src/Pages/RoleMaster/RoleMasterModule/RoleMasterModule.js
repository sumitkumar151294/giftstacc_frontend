import React, { useEffect, useState } from "react";
import '../RoleMaster.scss'
import NoRecord from "../../../Componenets/NoRecord/NoRecord"
import Loader from "../../../Componenets/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { onGetUserRole, onUpdateUserRole } from "../../../Store/Slices/userRoleSlice";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";
import { ScrollRestoration } from "react-router-dom";
import ScrollToTop from "../../../Componenets/ScrollToTop/ScrollToTop";
import { onGetUserRoleModuleAccess } from "../../../Store/Slices/userRoleModuleAccessSlice";
const RoleMasterModule = () => {
    const [isLoading, setIsLoading] = useState("true");
    const dispatch =useDispatch();
    const handleUpdate = () =>{
        dispatch(onUpdateUserRole());
    }
    // To get the label from DB 
    const roleModuleAccessList = GetTranslationData("UIAdmin", "role-module-access-list");
    const roleName = GetTranslationData("UIAdmin", "role-name");
    const modules = GetTranslationData("UIAdmin", "modules");
    const action = GetTranslationData("UIAdmin", "action");
    const roleAccessListData = useSelector((state) => state.userRoleReducer?.data?.data);
    const moduleList = useSelector((state) => state.moduleReducer?.data?.data);    
    useEffect(() => {
        // user-role get api call 
        dispatch(onGetUserRole());
    }, []);

    const getModuleName = (id) =>{
        let moduleName = moduleList.filter((item)=>item.id===id)
        if(moduleName.length>0){
            return moduleName[0].name
        }else{
            return '';
        }
    }
    return (
        <>
        <ScrollToTop />
            <div className="container-fluid pt-0">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">{roleModuleAccessList}</h4>
                            </div>
                         {roleAccessListData ? (
                                <div className="card-body position-relative">
                                    {!isLoading ? (
                                        <div style={{ height: "400px" }}>
                                            <Loader classType={"absoluteLoader"} />
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table header-border table-responsive-sm">
                                                <thead key='thead'>
                                                    <tr>
                                                        <th>{roleName}</th>
                                                        <th>{modules}</th>
                                                        <th>{action}</th>
                                                    </tr>
                                                </thead>
                                                <tbody key='tbody'>
                                                    {roleAccessListData?.map((data) => (
                                                        <tr>
                                                            <td>{data.name}
                                                            </td>
                                                            <td><div className="d-flex">
                                                                {data.moduleIds?.map((items) => (
                                                                    <span className="badge badge-success mr-10">{getModuleName(items)}</span>
                                                                ))}
                                                            </div></td>
                                                            <td><a  onClick={handleUpdate} className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></a></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
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
        </>
    )
}
export default RoleMasterModule