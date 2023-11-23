import React, { useState } from "react";
import Loader from "../../../Componenets/Loader/Loader";
import './RoleMaster.css'
// import { onRoleMasterSubmit } from "../../redux/modules/Admin/roleMasterSlice";
import { useDispatch } from "react-redux";


const RoleMasterModule = () => {
    const [isLoading, setIsLoading] = useState("true");
    const [isformLoading, setIsFormLoading] = useState("true");

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
            <div class="container-fluid pt-0">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Role Module Access List</h4>
                            </div>

                            <div class="card-body position-relative">
                                {!isLoading ? (
                                    <div style={{ height: "400px" }}>
                                        <Loader classType={"absoluteLoader"} />
                                    </div>
                                ) : (
                                    <div class="table-responsive">
                                        <table class="table header-border table-responsive-sm">
                                            <thead>
                                                <tr>
                                                    <th>Role Name</th>
                                                    <th>Modules</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roleData.map((data) => (
                                                    <tr>
                                                        <td>{data.roleName}<a href="javascript:void();"></a>
                                                        </td>

                                                        <td><div class="d-flex">
                                                            {data.modules.map((items) => (
                                                                <span class="badge badge-success mr-10">{items}</span>
                                                            ))}
                                                        </div></td>
                                                        <td><a class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a></td>
                                                    </tr>

                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleMasterModule