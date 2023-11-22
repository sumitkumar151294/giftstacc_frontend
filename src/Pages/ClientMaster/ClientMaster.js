import React, { useState } from "react";
import "../ClientMaster/ClientMaster.css";
import { useDispatch } from "react-redux";
// import { onClientMasterSubmit } from "../../redux/modules/Admin/clientMasterSlice";
// import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const ClientMaster = () => {
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

    const [isLoading, setIsLoading] = useState("true");
    const [isformLoading, setIsFormLoading] = useState("true");

    const [clientData, setClientData] = useState({ name: "", number: "", email: "", ipAddress: "", color: "", logoLink: "", theme: "", stagingKey: "", stagingSecretKey: "", productionKey: "", productionSecretKey: "", status: "", password: "", userName: "" });
    const [errors, setErrors] = useState({ name: "", number: "", email: "", ipAddress: "", color: "", logoLink: "", theme: "", stagingKey: "", stagingSecretKey: "", productionKey: "", productionSecretKey: "", status: "", password: "", userName: "" });

    const dispatch = useDispatch();

    const handleChange = (e, fieldName) => {
        setClientData({
            ...clientData,
            [fieldName]: e.target.value,
        });

        // Remove the error message when the user starts typing
        setErrors({
            ...errors,
            [fieldName]: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = { ...errors };

        // Check if fields are empty and set corresponding error messages
        for (const key in clientData) {
            if (clientData[key] === '') {
                newErrors[key] = 'This field is required';
                isValid = false;
            } else {
                newErrors[key] = '';
            }
        }

        // Email validation using the regexEmail pattern
        const regexEmail = /[a-zA-Z0-9]+([\_\.\-{1}])?[a-zA-Z0-9]+\@[a-zA-Z0-9]+(\.[a-zA-Z\.]+)/g;
        if (!regexEmail.test(clientData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }
        setErrors(newErrors);

        if (isValid) {
            //   dispatch(onClientMasterSubmit(clientData));
        }
    };

    return (
        <div class="content-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-12 col-xxl-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Client Master</h4>
                            </div>
                            <div class="card-body position-relative">
                                {!isformLoading ? (
                                    <div style={{ height: "400px" }}>
                                        {/* <Loader classType={"absoluteLoader"} /> */}
                                    </div>
                                ) : (
                                    <div class="container mt-3">
                                        <form onSubmit={handleSubmit}>
                                            <div class="row">
                                                <div class="col-sm-4 form-group mb-2">
                                                    <label for="contact-name">Contact Name</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="contactName"
                                                        id="contact-name"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, 'name')}
                                                    />
                                                    <p className="text-danger">{errors.name}</p>
                                                </div>
                                                <div class="col-sm-4 form-group mb-2">
                                                    <label for="contact-number">Contact Number</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="contactNumber"
                                                        id="contact-number"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, 'number')}
                                                    />
                                                    <p className="text-danger">{errors.number}</p>
                                                </div>
                                                <div class="col-sm-4 form-group mb-2">
                                                    <label for="contact-email">Contact Email</label>
                                                    <input
                                                        type="email"
                                                        class="form-control"
                                                        name="contactEmail"
                                                        id="contact-email"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, 'email')}
                                                    />
                                                    <p className="text-danger">{errors.email}</p>
                                                </div>

                                                <div class="col-sm-4 form-group mb-2">
                                                    <label for="ipAddress">Database IP Address</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="ipAddress"
                                                        id="ipAddress"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, 'ipAddress')}
                                                    />
                                                    <p className="text-danger">{errors.ipAddress}</p>
                                                </div>
                                                <div class="col-sm-4 form-group mb-2">
                                                    <label for="contact-name">Username</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="username"
                                                        id="user-name"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, 'userName')}
                                                    />
                                                    <p className="text-danger">{errors.userName}</p>
                                                </div>
                                                <div class="col-sm-4 form-group mb-2">
                                                    <label for="contact-name">Password</label>
                                                    <input
                                                        type="password"
                                                        class="form-control"
                                                        name="password"
                                                        id="password"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, 'password')}
                                                    />
                                                    <p className="text-danger">{errors.password}</p>
                                                </div>

                                                <div class="col-sm-4 form-group mb-2">
                                                    <label for="status">Status</label>
                                                    <select
                                                        class="form-select"
                                                        name="status"
                                                        value={clientData?.status}
                                                        onChange={(e) => handleChange(e, 'status')}
                                                        id="status"
                                                        aria-label="Default select example"
                                                    >
                                                        <option selected>Select</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Non-Active">Non-Active</option>
                                                    </select>
                                                    <p className="text-danger">{errors.status}</p>
                                                </div>

                                                <div class="col-sm-4 form-group mb-2">
                                                    <label for="color">Color</label>
                                                    <input
                                                        type="color"
                                                        class="form-control"
                                                        name="color"
                                                        id="color"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, 'color')}
                                                    />
                                                    <p className="text-danger">{errors.color}</p>
                                                </div>

                                                <div class="col-sm-6 form-group mb-2">
                                                    <label for="logo">Logo Link</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="logo"
                                                        id="logo"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, 'logoLink')}
                                                    />
                                                    <p className="text-danger">{errors.logoLink}</p>
                                                </div>

                                                <div class="col-sm-6 form-group mb-2">
                                                    <label for="status">Select Theme</label>
                                                    <select
                                                        class="form-select"
                                                        value={clientData?.theme}
                                                        onChange={(e) => handleChange(e, 'theme')}
                                                        aria-label="Default select example"
                                                    >
                                                        <option selected>Select Theme</option>
                                                        <option value="Active">Theme 1</option>
                                                        <option value="Non-Active">Theme 2</option>
                                                        <option value="Non-Active">Theme 3</option>
                                                        <option value="Non-Active">Theme 4</option>
                                                    </select>
                                                    <p className="text-danger">{errors.theme}</p>
                                                </div>

                                                <div class="row mt-2">
                                                    <h3 style={{ borderBottom: "1px solid #ededed" }}>
                                                        Razorpay Payment Gateway
                                                    </h3>

                                                    <div class="col-lg-6 mt-2">
                                                        <div class="row p-0">
                                                            <h4>Staging</h4>
                                                            <div class="col-sm-12 form-group mb-2">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    name="stagingKey"
                                                                    id="staging-key"
                                                                    placeholder="Key"
                                                                    onChange={(e) => handleChange(e, 'stagingKey')}
                                                                />
                                                                <p className="text-danger">{errors.stagingKey}</p>
                                                            </div>

                                                            <div class="col-sm-12 form-group mb-2">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    name="stagingSecretKey"
                                                                    id="staging-secret-key"
                                                                    placeholder="Secret Key"
                                                                    onChange={(e) => handleChange(e, 'stagingSecretKey')}
                                                                />
                                                                <p className="text-danger">{errors.stagingSecretKey}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-6 mt-2">
                                                        <div class="row p-0">
                                                            <h4>Production</h4>
                                                            <div class="col-sm-12 form-group mb-2">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    name="productionKey"
                                                                    id="production-key"
                                                                    placeholder="Key"
                                                                    onChange={(e) => handleChange(e, 'productionKey')}
                                                                />
                                                                <p className="text-danger">{errors.productionKey}</p>
                                                            </div>

                                                            <div class="col-sm-12 form-group mb-2">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    name="productionSecretKey"
                                                                    id="production-secret-key"
                                                                    placeholder="Secret Key"
                                                                    onChange={(e) => handleChange(e, 'productionSecretKey')}
                                                                />
                                                                <p className="text-danger">{errors.productionSecretKey}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-sm-12 form-group mb-0 mt-2">
                                                    <button
                                                        type="submit"
                                                        class="btn btn-primary float-right pad-aa"
                                                    >
                                                        Add<i class="fa fa-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                                                    <td>{data.name}<a href="javascript:void();"></a>
                                                    </td>
                                                    <td>{data.mobile}</td>
                                                    <td><span class="text-muted">{data.email}</span>
                                                    </td>
                                                    <td>{data.id}</td>
                                                    <td><span class="badge badge-success">{data.status}</span>
                                                    </td>
                                                    <td><div class="d-flex">
                                                        <a href="#" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a>
                                                        <a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
                                                    </div></td>
                                                    <td>        <a class="btn btn-secondary btn-sm float-right"><i class="fa fa-user"></i>&nbsp;Login</a>
                                                    </td>
                                                    <td>        <Link to='/LC-admin/clientbrandlist' class="btn btn-primary btn-sm float-right"><i class="fa fa-eye"></i>&nbsp;Brands</Link>
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
        </div>
    );
};

export default ClientMaster;
