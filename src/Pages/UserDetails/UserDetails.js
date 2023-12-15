import React, { useEffect, useState } from "react";
import { onGetUser, onUserSubmit } from "../../Store/Slices/userMasterSlice";
import { useDispatch, useSelector } from 'react-redux';
import InputField from "../../Componenets/InputField/InputField";
import '../UserMaster/UserMaster.scss'
import { ToastContainer, toast } from "react-toastify";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
import Loader from "../../Componenets/Loader/Loader";
import { onClientMasterSubmit } from "../../Store/Slices/clientMasterSlice";
import {GetTranslationData} from "../../../src/Componenets/GetTranslationData/GetTranslationData "
const UserDetails = (prefilledValues) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.userMasterReducer.isLoading);
    const [userData, setUserData] = useState({ userName: '', password: '', mobile: '', email: '', role: '', accessClientIds: [], firstName:"", lastName:"" });
    const [errors, setErrors] = useState({ userName: '', password: '', mobile: '', email: '', role: '', accessClientIds: "", firstName:"", lastName:"" }); // Initialize 'role' error state
    const [onUpdate, setOnUpdate] = useState(false);
    const onSubmitData = useSelector((state) => state.userMasterReducer.data)
    const roleList = useSelector((state) => state.userRoleReducer);
    const clientList = useSelector((state) => state.clientMasterReducer.data)
    // console.log("CLIENT", clientList);
    const userMaster = GetTranslationData("UIAdmin", "user_Master_label");
    const email = GetTranslationData("UIAdmin", "email_label");
    const mobile = GetTranslationData("UIAdmin", "mobile_label");
    const username = GetTranslationData("UIAdmin", "usernamee_label");
    const password = GetTranslationData("UIAdmin", "password_label");
    const client = GetTranslationData("UIAdmin", "client_label");
    const role = GetTranslationData("UIAdmin", "role_name_label");
    const requiredLevel = GetTranslationData("UIAdmin", "required_label");
    const submit = GetTranslationData("UIAdmin", "submit_label");
    const invalidEmail = GetTranslationData("UIAdmin", "invalid_Email");
    const invalidMobile = GetTranslationData("UIAdmin", "number_Digit_Label");
    useEffect(() => {
        // user-role get api call
        dispatch(onGetUserRole());
        dispatch(onClientMasterSubmit());
        
        // dispatch(onGetUser())
    }, []);
    useEffect(() => {
        setUserData({
            userName: prefilledValues.prefilledValues?.firstName || "", password: prefilledValues.prefilledValues?.password || "", mobile: prefilledValues.prefilledValues?.mobile || "", email: prefilledValues.prefilledValues?.email || "", role: '', accessClientIds: [], firstName: prefilledValues.prefilledValues?.firstName || "",lastName: prefilledValues.prefilledValues?.lastName || "",
        })
    }, [prefilledValues.prefilledValues])
    // to get role module access list 


    const handleChange = (e, fieldName) => {
        const { name, value, type, checked, } = e.target;
        let newUserdetailData;
        if (fieldName === 'check') {
            let accessClientIds = userData.accessClientIds
            accessClientIds.push(value)
            newUserdetailData = {
                ...userData,
                accessClientIds,
            };
        } else {
            newUserdetailData = {
                ...userData,
                [fieldName]: value,
            };
        }
        setUserData(newUserdetailData)
        if (fieldName === "email") {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const isValidEmail = emailRegex.test(value);
            setErrors({
                ...errors,
                [fieldName]: isValidEmail ? "" : invalidEmail,
            });
        }
        else if (fieldName === "mobile") {
            const mobileRegex = /^[0-9]{10}$/;
            const isValidMobile = mobileRegex.test(value);
            setErrors({
                ...errors,
                [fieldName]: isValidMobile ? "" : invalidMobile,
            });
        }
        else {
            setErrors({
                ...errors,
                [fieldName]: "",
            });
        }
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        let isValid = true;
        const newErrors = { ...errors };
        // Check if fields are empty and set corresponding error messages
        for (const key in userData) {
            if (userData[key] === "") {
                newErrors[key] = " ";
                isValid = false;
            }
            else if (key === "email" && newErrors[key] !== "") {
                isValid = false;
            } else if (key === "mobile" && newErrors[key] !== "") {
                isValid = false;
            }
            else {
                newErrors[key] = "";
            }
        }
        setErrors(newErrors);
        // Check if a role has been selected
        if (userData.role === '') {
            newErrors.role = 'Please select a role';
            isValid = false;
        } else {
            newErrors.role = ''; // Clear the role error if a role is selected
        }
        setErrors(newErrors);
        // Check if a client has been selected
        if (userData.accessClientIds.length === 0) {
            newErrors.accessClientIds = 'Please select a client';
            isValid = false;
        } else {
            newErrors.accessClientIds = ''; // Clear the client error if a client is selected
        }
        setErrors(newErrors);
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const mobileRegex = /^[0-9]{10}$/;
        if (!emailRegex.test(userData.email)) {
            isValid = false;
        }
        else if (!mobileRegex.test(userData.mobile)) {
            isValid = false;
        }
        else {
            newErrors.email = '';
        }
        setErrors(newErrors);
        console.log(isValid)
        if (isValid) {
            // setShowLoader(true)
            setOnUpdate(true);
            const UsersData = {
                ...userData,
                // accessClientIds: ["1", "3"],
                adminRoleId: userData.role,
                adminRoleCode: 1,
                clientRoleId: 2,
                clientRoleCode: 2,
                // firstName: userData.userName,
                // lastName: userData.userName,
            }
            // Dispatch the form submission action if needed
            dispatch(onUserSubmit(UsersData));
        }
    };

    useEffect(() => {
        if (onUpdate) {
            if (onSubmitData.message === "User Added Successfully.") {
                toast.success(onSubmitData.message);
                setUserData({ userName: '', password: '', mobile: '', email: '', role: '', accessClientIds: [] ,  firstName:"", lastName:""})
            }
            else {
                toast.error(onSubmitData.message);
            }
        }
    }, [onSubmitData]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">{userMaster}</h4>
                            </div>
                            <div className="card-body position-relative">
                                {loading ? (
                                    <div style={{ height: "400px" }}>
                                        <Loader classNameType={"absoluteLoader"} />
                                    </div>
                                ) : (
                                    <div className="container mt-3">
                                        <form id="userForm" onSubmit={(e) => handleSubmit(e)}>
                                            <div className="row">
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">{email}
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        className={` ${errors.email ? "border-danger" : "form-control"}`}
                                                        onChange={(e) => handleChange(e, "email")}
                                                        placeholder=""
                                                        error={errors.email}
                                                        value={userData.email}
                                                    />
                                                    <p className="text-danger">{errors.email}</p>
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">{mobile}
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="number"
                                                        className={` ${errors.mobile ? "border-danger" : "form-control"}`}
                                                        onChange={(e) => handleChange(e, "mobile")}
                                                        placeholder=""
                                                        error={errors.mobile}
                                                        value={userData.mobile}
                                                    />
                                                    <p className="text-danger">{errors.mobile}</p>
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">{username}
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        className={` ${errors.userName ? "border-danger" : "form-control"}`} name="fname"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "userName")}
                                                        error={errors.userName}
                                                        value={userData.userName}
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">{password}
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="password"
                                                        className={` ${errors.password ? "border-danger" : "form-control"}`}
                                                        name="fname"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "password")}
                                                        error={errors.password}
                                                        value={userData.password}
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">First Name
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        className={` ${errors.firstName ? "border-danger" : "form-control"}`}
                                                        name="fname"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "firstName")}
                                                        error={errors.firstName}
                                                        value={userData.firstName}
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">Last Name
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        className={` ${errors.lastName ? "border-danger" : "form-control"}`}
                                                        name="lname"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "lastName")}
                                                        error={errors.lastName}
                                                        value={userData.lastName}
                                                    />
                                                </div>
                                                <div className="col-lg-12 br pt-2">
                                                    <label for="name-f">{client}</label>
                                                    <div className="row ml-4">
                                                        {Array.isArray(clientList) && clientList?.map((item) =>
                                                            <div
                                                                className="form-check mt-2 col-lg-3"
                                                                key={item.id}
                                                            >
                                                                <InputField
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    name={item.name}
                                                                    value={item.id}
                                                                    id={`flexCheckDefault-${item.id}`}
                                                                    checked={item.id}
                                                                    onChange={(e) => handleChange(e, 'check')}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`flexCheckDefault-${item.id}`}
                                                                >
                                                                    {item.name
                                                                        .replace(/([A-Z])/g, " $1")
                                                                        .split(" ")
                                                                        .map(
                                                                            (word) =>
                                                                                word.charAt(0).toUpperCase() +
                                                                                word.slice(1).toLowerCase()
                                                                        )
                                                                        .join(" ")}
                                                                </label>
                                                            </div>

                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 br pt-2">
                                                    <label for="name-f">{role}</label>
                                                    <div className="row ml-4 mb-10">
                                                        {roleList?.data?.data?.map((item) =>
                                                            <div className="form-check mt-2 col-lg-3">
                                                                <input
                                                                    id={item.id}
                                                                    type="radio"
                                                                    className="form-check-input"
                                                                    name="role"
                                                                    value={item.id}
                                                                    onChange={(e) => handleChange(e, "role")}
                                                                />
                                                                <label className="form-check-label" for={item.id}>{item.name}</label>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span
                                                        className="form-check-label"
                                                        for="basic_checkbox_1"
                                                        style={{ marginLeft: '5px', marginTop: '10px' }}
                                                    >
                                                        {requiredLevel}
                                                    </span>
                                                    <div className="col-sm-4 mt-2 mb-4">
                                                        <button className="btn btn-primary float-right pad-aa" >
                                                            {submit} <i className="fa fa-arrow-right"></i>
                                                        </button>
                                                        <ToastContainer />
                                                    </div>
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
        </>
    )
}

export default UserDetails