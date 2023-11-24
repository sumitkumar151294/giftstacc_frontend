import React, { useState } from "react";
 import "../ClientMasterForm/ClientMasterForm.css";
import { useDispatch } from "react-redux";
// import { onClientMasterSubmit } from "../../redux/modules/Admin/clientMasterSlice";
// import Loader from "../Loader/Loader";
import InputField from "../../../Componenets/InputField/InputField";
import Dropdown from "../../../Componenets/Dropdown/Dropdown";

const ClientMaster = () => {
    const statusoptions = [
        { value: "Active3", label: 'Active' },
        { value: "Active4", label: 'Non-Active' },

    ];

    const options = [
        { value: 'Active1', label: 'Theme 1' },
        { value: 'Non-Active1', label: 'Theme 2' },
        { value: 'Non-Active2', label: 'Theme 3' },
        { value: 'Non-Active4', label: 'Theme 4' },
    ];

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
    const [error, setError] = useState(false);
    const [clientData, setClientData] = useState({
        name: "", number: "", email: "", ipAddress: "", color: "", logoLink: "",
        theme: "", stagingKey: "", stagingSecretKey: "", productionKey: "", productionSecretKey: "", status: "", password: "", userName: ""
    });
    const [errors, setErrors] = useState({
        name: "", number: "", email: "", ipAddress: "", color: "", logoLink: "", theme: "",
        stagingKey: "", stagingSecretKey: "", productionKey: "", productionSecretKey: "", status: "", password: "", userName: ""
    });

    // const dispatch = useDispatch();

    const handleChange = (e, fieldName) => {
        setClientData({
            ...clientData,
            [fieldName]: e.target.value,
        });
        if (fieldName === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(e.target.value);

            setErrors({
                ...errors,
                [fieldName]: isValidEmail ? "" : "Invalid email address",
            });}
          else  if (fieldName === "number") {
                const phoneRegex = /^\d{10}$/;
                const isValidnumber = phoneRegex.test(e.target.value);
    
                setErrors({
                    ...errors,
                    [fieldName]: isValidnumber ? "" : "please enter 10 digit only",
                });
           
        } 


        // Remove the error message when the user starts typing

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = { ...errors };

        // Check if fields are empty and set corresponding error messages
        for (const key in clientData) {
            if (clientData[key] === '') {
                newErrors[key] = 'The Field is required';
                isValid = false;
            } else {
                newErrors[key] = '';
            }
        }

        // Email validation using the regexEmail pattern
        // const regexEmail = /[a-zA-Z0-9]+([\_\.\-{1}])?[a-zA-Z0-9]+\@[a-zA-Z0-9]+(\.[a-zA-Z\.]+)/g;
        // if (!regexEmail.test(clientData.email)) {
        //     newErrors.email = 'Invalid email format';
        //     isValid = false;
        // }
        setErrors(newErrors);

        if (isValid) {
            //   dispatch(onClientMasterSubmit(clientData));
        }
    };

    return (

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
                                                <label for="contact-name">Contact Name
                                                <span class="text-danger">*</span>
                                                </label>
                                                <InputField
                                                    type="text"
                                                    className="form-control"
                                                    name="contactName"
                                                    id="contact-name"
                                                    error={errors.name}
                                                    value={clientData.name}
                                                    onChange={(e) => handleChange(e, 'name')}
                                                />
                                               
                                            </div>
                                            <div class="col-sm-4 form-group mb-2">
                                                <label for="contact-number">Contact Number
                                                <span class="text-danger">*</span>
                                                </label>
                                                <InputField
                                                    type="number"
                                                    className="form-control"
                                                    name="contactNumber"
                                                    id="contact-number"
                                                    value={clientData.number}
                                                    error={errors.number}
                                                    maxLength={10}
                                                    onChange={(e) => handleChange(e, 'number')}
                                                />
                                                 { <p className="text-danger">{errors.number}</p>}
                                            </div>
                                            <div class="col-sm-4 form-group mb-2">
                                                <label for="contact-email">Contact Email
                                                <span class="text-danger">*</span>
                                                </label>
                                                <InputField
                                                    type="email"
                                                    className="form-control"
                                                    name="contactEmail"
                                                    id="contact-email"
                                                    value={clientData.email}
                                                    error={errors.email}
                                                    onChange={(e) => handleChange(e, 'email')}
                                                />
                                               { <p className="text-danger">{errors.email}</p>}
                                            </div>

                                            <div class="col-sm-4 form-group mb-2">
                                                <label for="ipAddress">Database IP Address
                                                <span class="text-danger">*</span>
                                                </label>
                                                <InputField
                                                    type="text"
                                                    className="form-control"
                                                    name="ipAddress"
                                                    id="ipAddress"
                                                    value={clientData.ipAddress}
                                                    error={errors.ipAddress}
                                                    onChange={(e) => handleChange(e, 'ipAddress')}
                                                />
                                            
                                            </div>
                                            <div class="col-sm-4 form-group mb-2">
                                                <label for="contact-name">Username
                                                <span class="text-danger">*</span>
                                                </label>
                                                <InputField
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    id="user-name"
                                                    value={clientData.userName}
                                                    error={errors.userName}
                                                    onChange={(e) => handleChange(e, 'userName')}
                                                />
                                              
                                            </div>
                                            <div class="col-sm-4 form-group mb-2">
                                                <label for="contact-name">Password
                                                <span class="text-danger">*</span>
                                                </label>
                                                <InputField
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    id="password"
                                                    value={clientData.password}
                                                    error={errors.password}
                                                    onChange={(e) => handleChange(e, 'password')}
                                                />
                                              
                                            </div>

                                            <div class="col-sm-4 form-group mb-2">
                                                <label for="status">Status
                                                <span class="text-danger">*</span>
                                                </label>
                                                <Dropdown
                                                    // value={StatusselectedOption}
                                                    onChange={(e) => handleChange(e, 'status')}
                                                    error={errors.status}
                                                    ariaLabel="Default select example"
                                                    className="form-select"
                                                    options={statusoptions}
                                                />
                                                <p>Selected Option: {clientData.status}</p>
                                                
                                            </div>

                                            <div class="col-sm-4 form-group mb-2">
                                                <label for="color">Color
                                                <span class="text-danger">*</span>
                                                </label>
                                                <InputField
                                                    type="color"
                                                    className="form-control"
                                                    name="color"
                                                    id="color"
                                                    error={errors.color}
                                                    value={clientData.color}
                                                    onChange={(e) => handleChange(e, 'color')}
                                                />
                                                
                                            </div>

                                            <div class="col-sm-6 form-group mb-2">
                                                <label for="logo">Logo Link
                                                <span class="text-danger">*</span>
                                                </label>
                                                <InputField
                                                    type="text"
                                                    className="form-control"
                                                    name="logo"
                                                    id="logo"
                                                    error={errors.logoLink}
                                                    value={clientData.logoLink}
                                                    onChange={(e) => handleChange(e, 'logoLink')}
                                                />
                                             
                                            </div>

                                            <div class="col-sm-6 form-group mb-2">
                                                <label for="status">Select Theme
                                                 <span class="text-danger">*</span>
                                                </label>
                                                <Dropdown
                                                    // value={selectedOption}
                                                    onChange={(e) => handleChange(e, 'theme')}
                                                    error={errors.theme}
                                                    ariaLabel="Default select example"
                                                    className="form-select"
                                                    options={options}
                                                />
                                                <p>Selected Option: {clientData.theme}</p>

                                              
                                            </div>

                                            <div class="row mt-2">
                                                <h3 style={{ borderBottom: "1px solid #ededed" }}>
                                                    Razorpay Payment Gateway
                                                </h3>

                                                <div class="col-lg-6 mt-2">
                                                    <div class="row p-0">
                                                        <h4>Staging
                                                        <span class="text-danger">*</span>
                                                        </h4>
                                                        <div class="col-sm-12 form-group mb-2">
                                                            <InputField
                                                                type="text"
                                                                className="form-control"
                                                                name="stagingKey"
                                                                id="staging-key"
                                                                placeholder="Key"
                                                                value={clientData.stagingKey}
                                                                error={errors.stagingKey}
                                                                onChange={(e) => handleChange(e, 'stagingKey')}
                                                            />
                                                         
                                                        </div>

                                                        <div class="col-sm-12 form-group mb-2">
                                                            <InputField
                                                                type="text"
                                                                className="form-control"
                                                                name="stagingSecretKey"
                                                                id="staging-secret-key"
                                                                error={errors.stagingSecretKey}
                                                                value={clientData.stagingSecretKey}
                                                                placeholder="Secret Key"
                                                                onChange={(e) => handleChange(e, 'stagingSecretKey')}
                                                            />
                                                           
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 mt-2">
                                                    <div class="row p-0">
                                                        <h4>Production
                                                        <span class="text-danger">*</span>
                                                        </h4>
                                                        <div class="col-sm-12 form-group mb-2">
                                                            <InputField
                                                                type="text"
                                                                className="form-control"
                                                                name="productionKey"
                                                                id="production-key"
                                                                placeholder="Key"
                                                                error={errors.productionKey}
                                                                value={clientData.productionKey}
                                                                onChange={(e) => handleChange(e, 'productionKey')}
                                                            />
                                                      
                                                        </div>

                                                        <div class="col-sm-12 form-group mb-2">
                                                            <InputField
                                                                type="text"
                                                                className="form-control"
                                                                name="productionSecretKey"
                                                                id="production-secret-key"
                                                                placeholder="Secret Key"
                                                                error={errors.productionSecretKey}
                                                                value={clientData.productionSecretKey}
                                                                onChange={(e) => handleChange(e, 'productionSecretKey')}
                                                            />
                            
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
            </div >
        </div >
    );
};

export default ClientMaster;
