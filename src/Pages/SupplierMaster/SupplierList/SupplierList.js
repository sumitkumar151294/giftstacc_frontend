import React, { useEffect, useState } from 'react'
import { CSVLink } from "react-csv";
import Loader from "../../../Componenets/Loader/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { onGetSupplierList } from '../../../Store/Slices/supplierMasterSlice';
import  NoRecord  from '../../../Componenets/NoRecord/NoRecord';
const SupplierList = () => {
    const [isLoading, setIsLoading] = useState("true");
    const [vendorData, setVendorData] = useState({
        name: "",
        secret: "",
        id: "",
        username: "",
        password: "",
        endPoint: "",
        code: "",
        status: "",
        amount: "",
    });
    const vendorList = [
        {
            SupplierName: "Jaswant Rawat",
            SupplierClientID: "#26589",
            Username: "JOJO",
            Password: "************",
            MinThresholdAmount: "₹500000",
            status: "Active",
        },
        {
            SupplierName: "Manish Gautam",
            SupplierClientID: "#58746",
            Username: "MG",
            Password: "************",
            MinThresholdAmount: "₹500000",
            status: "Active",
        },
        {
            SupplierName: "Naveen Jha",
            SupplierClientID: "#09808",
            Username: "It's Naveen Jha",
            Password: "************",
            MinThresholdAmount: "₹500000",
            status: "Active",
        },
        {
            SupplierName: "Vithal Chaudhary",
            SupplierClientID: "#45686",
            Username: "Mr.Vithal",
            Password: "************",
            MinThresholdAmount: "₹500000",
            status: "Non-Active",
        },
        {
            SupplierName: "Vithal Chaudhary",
            SupplierClientID: "#45686",
            Username: "Mr.Vithal",
            Password: "************",
            MinThresholdAmount: "₹500000",
            status: "Active",
        },
        {
            SupplierName: "Vithal Chaudhary",
            SupplierClientID: "#45686",
            Username: "Mr.Vithal",
            Password: "************",
            MinThresholdAmount: "₹500000",
            status: "Active",
        },
    ];
    const headers = [
        { label: "SupplierName", key: "SupplierName" },
        { label: "SupplierClientID	", key: "SupplierClientID" },
        { label: "Username", key: "Username" },
        { label: "Password", key: "Password" },
        { label: "MinThresholdAmount", key: "MinThresholdAmount" },
        { label: "status", key: "status" },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // for edit the table data
    const handleEdit = (vendor) => {
        setVendorData({
            name: vendor.SupplierName,
            secret: vendor.secret,
            id: vendor.SupplierClientID,
            username: vendor.Username,
            password: vendor.Password,
            endPoint: vendor.endPoint,
            code: vendor.code,
            status: vendor.status,
            amount: vendor.MinThresholdAmount,
        });
    };

    // for filtering the data into searchbar
    const filteredVendorList = vendorList.filter((vendor) =>
        Object.values(vendor).some(
            (value) =>
                value &&
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    const dispatch = useDispatch();
    useEffect(()=>{
     dispatch(onGetSupplierList());
    }, []);
    let data = useSelector((state)=>state.supplierMasterReducer.data);
    console.log("data", data);
    return (
        <>
            <div className="container-fluid pt-0">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Supplier List</h4>
                                <div class="customer-search mb-sm-0 mb-3">
                                    <div class="input-group search-area">
                                        <input
                                            type="text"
                                            class="form-control only-high"
                                            placeholder="Search here......"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                        <span class="input-group-text">
                                            <a href="javascript:void(0)">
                                                <i class="flaticon-381-search-2"></i>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center flex-wrap">
                                    <CSVLink data={vendorList} headers={headers}>
                                        <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                                            <i className="fa fa-file-excel me-2"></i>export
                                        </button>
                                    </CSVLink>
                                </div>
                            </div>
                            {!vendorList ? (
                            <div className="card-body position-relative">
                                {!isLoading ? (
                                    <div style={{ height: "200px" }}>
                                        <Loader classType={"absoluteLoader"} />
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table header-border table-responsive-sm">
                                            <thead>
                                                <tr>
                                                    <th>Supplier Name </th>
                                                    <th>Supplier Client ID </th>
                                                    <th>Username </th>
                                                    <th>Password</th>
                                                    <th>Min. Threshold Amount </th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredVendorList.length > 0 ? (
                                                    filteredVendorList.map((vendor, index) => (
                                                        <tr key={index}>
                                                            <td>{vendor.SupplierName}</td>
                                                            <td>{vendor.SupplierClientID}</td>
                                                            <td>
                                                                <span className="text-muted">
                                                                    {vendor.Username}
                                                                </span>
                                                            </td>

                                                            <td>{vendor.Password}</td>
                                                            <td>{vendor.MinThresholdAmount}</td>

                                                            <td>
                                                                <span
                                                                    className={`badge ${vendor.status === "Active"
                                                                        ? "badge-success"
                                                                        : "badge-danger"
                                                                        }`}
                                                                >
                                                                    {vendor.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <a
                                                                        className="btn btn-primary shadow btn-xs sharp me-1"
                                                                        onClick={() => handleEdit(vendor)}
                                                                    >
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn btn-danger shadow btn-xs sharp"
                                                                    >
                                                                        <i className="fa fa-trash"></i>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">
                                                            No data found
                                                        </td>
                                                    </tr>
                                                )}
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

export default SupplierList
