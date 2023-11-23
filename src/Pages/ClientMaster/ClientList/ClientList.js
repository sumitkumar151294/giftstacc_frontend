import React from 'react'
import { Link } from 'react-router-dom'

const ClientList = () => {
    const clientMasterList = [
        {
            name: "Jaswant Rawat",
            mobile: "9650531790",
            email: "jaswant@way2webworld.com",
            id: "#98878",
            status: "Active",
        },
        {
            name: "Manish Gautam",
            mobile: "7838345657",
            email: "manishgautam.1@way.webworld.com",
            id: "#98788",
            status: "Non-Active",
        },
        {
            name: "Naveen Jha",
            mobile: "9876680901",
            email: "naveenjha@way2webworld.com",
            id: "#78899",
            status: "Active",
        },
        {
            name: "Vithal Chaudhary",
            mobile: "7890654321",
            email: "vithalchaudhary@way2webworld.com",
            id: "#98766",
            status: "Non-Active",
        },
    ];
    return (
        <>
            <div class="container-fluid pt-0">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="container-fluid mt-2 mb-2">

                                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div class="card-header">
                                        <h4 class="card-title">Client List</h4>
                                    </div>
                                    <div class="customer-search mb-sm-0 mb-3">
                                        <div class="input-group search-area">
                                            <input type="text" class="form-control only-high" placeholder="Search here......" />
                                            <span class="input-group-text"><a href="javascript:void(0)"><i class="flaticon-381-search-2"></i></a></span>
                                        </div>
                                    </div>

                                    <div class="d-flex align-items-center flex-wrap">
                                        <a href="javascript:void(0);" class="btn btn-primary btn-sm btn-rounded me-3 mb-2"><i class="fa fa-file-excel me-2"></i>Export</a>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table header-border table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th>Contact Name</th>
                                                <th>Contact Number</th>
                                                <th>Contact Email</th>
                                                <th>Client ID</th>
                                                <th>Status</th>

                                                <th>Action</th>
                                                <th>Login</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clientMasterList.map((data) => (
                                                <tr>
                                                    <td>{data.name}<a href="javascript:void();"></a></td>
                                                    <td>{data.mobile}</td>
                                                    <td>
                                                        <span class="text-muted">{data.email}</span>
                                                    </td>
                                                    <td>{data.id}</td>
                                                    <td>
                                                        <span class="badge badge-success">{data.status}</span>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex">
                                                            <a href="#" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a>
                                                            <a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a class="btn btn-secondary btn-sm float-right"><i class="fa fa-user"></i>&nbsp;Login</a>
                                                    </td>
                                                    <td>
                                                        <Link to='/LC-admin/clientbrandlist' class="btn btn-primary btn-sm float-right"><i class="fa fa-eye"></i>&nbsp;Brands</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ClientList
