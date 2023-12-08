import React, { useState } from "react";
import '../RoleMaster.css'
import NoRecord from "../../../Componenets/NoRecord/NoRecord"
import Loader from "../../../Componenets/Loader/Loader";
const RoleMasterModule = (props) => {
    const [isLoading, setIsLoading] = useState("true");
    return (
        <>
            <div className="container-fluid pt-0">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Role Module Access List</h4>
                            </div>
                            {props.roleAccessListData ? (
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
                                                        <th>Role Name</th>
                                                        <th>Modules</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody key='tbody'>
                                                    {props.roleAccessListData?.data?.data?.map((data) => (
                                                        <tr>
                                                            <td>{data.name}
                                                            </td>
                                                            <td><div className="d-flex">
                                                                {/* {data.modules.map((items) => (
                                                                    <span className="badge badge-success mr-10">{items}</span>
                                                                ))} */}
                                                            </div></td>
                                                            <td><a className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></a></td>
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