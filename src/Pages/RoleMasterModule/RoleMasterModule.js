import React, { useState } from "react";
import Loader from "../../Componenets/Loader/Loader";
import '../RoleMaster/RoleMaster.css'
import NoRecord from "../../Componenets/NoRecord/NoRecord"

const RoleMasterModule = () => {
    const [isLoading, setIsLoading] = useState("true");

    const roleData = [
        {
            roleName: "Admin",
            modules: [
                "Module Access 1",
                "Module Access 2",
                "Module Access 3",
                "Module Access 4",
            ],
        },
        {
            roleName: "Data Analyst",
            modules: [
                "Module Access 1",
                "Module Access 2",
                "Module Access 3",
                "Module Access 4",
                "Module Access 4",
                "Module Access 4",
            ],
        },
        {
            roleName: "Accountant",
            modules: ["Module Access 1", "Module Access 2", "Module Access 3"],
        },
        {
            roleName: "Manager",
            modules: [
                "Module Access 1",
                "Module Access 2",
                "Module Access 3",
                "Module Access 4",
                "Module Access 4",
                "Module Access 4",
                "Module Access 4",
            ],
        },
    ];
    return (
        <>
            <div className="container-fluid pt-0">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Role Module Access List</h4>
                            </div>
                            {roleData ? (
                                <div className="card-body position-relative">
                                    {!isLoading ? (
                                        <div style={{ height: "400px" }}>
                                            <Loader classNameType={"absoluteLoader"} />
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
                                                    {roleData.map((data) => (
                                                        <tr>
                                                            <td>{data.roleName}
                                                            </td>
                                                            <td><div className="d-flex">
                                                                {data.modules.map((items) => (
                                                                    <span className="badge badge-success mr-10">{items}</span>
                                                                ))}
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