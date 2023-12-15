import React, { useEffect, useState } from "react";
import './UserDetails.scss';
// import { onUserSubmit } from "../../../../customer-Capital/src/redux/modules/Admin/userSlice";
// import { useDispatch } from 'react-redux';
// import Button from "../../Componenets/Buttons/Button/Button";
// import Snackbar from "../../Componenets/Snackbar/Snackbar";
// import '../UserMaster/UserMaster.scss'
// import { Link } from "react-router-dom";
// import Loader from "../../Componenets/Loader/Loader";
import { onUserSubmit } from "../../Store/Slices/userMasterSlice";
import { useDispatch, useSelector } from 'react-redux';
import InputField from "../../Componenets/InputField/InputField";
import '../UserMaster/UserMaster.scss'
import { ToastContainer, toast } from "react-toastify";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
import Loader from "../../Componenets/Loader/Loader";
const UserDetails = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.userMasterReducer.isLoading);
    const [userData, setUserData] = useState({ userName: '', password: '', mobile: '', email: '', role: '' });
    const [errors, setErrors] = useState({ userName: '', password: '', mobile: '', email: '', role: '' }); // Initialize 'role' error state
    const [onUpdate, setOnUpdate] = useState(false);
    const [formData, setFormData] = useState({
        modules: {
            client1: false,
            client2: false,
            client3: false,
            client4: false,
            client5: false,
            client6: false,
            client7: false,
            client8: false,
        },
    });
    const onSubmitData = useSelector((state) => state.userMasterReducer.data)
    useEffect(() => {
        // user-role get api call
        dispatch(onGetUserRole());
    }, []);
    // to get role module access list 
    const roleList = useSelector((state) => state.userRoleReducer);

    const handleChange = (e, fieldName) => {
        const { name, value, type, checked } = e.target; debugger
        const newUserdetailData = {
            ...userData,
            [fieldName]: value,
        };
        setUserData(newUserdetailData)
        if (type === "checkbox") {
            setFormData({
                ...formData,
                modules: {
                    ...formData.modules,
                    [name]: checked,
                },
            });
        }
        else if (fieldName === "email") {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const isValidEmail = emailRegex.test(value);
            setErrors({
                ...errors,
                [fieldName]: isValidEmail ? "" : "Invalid email address",
            });
        }
        else if (fieldName === "mobile") {
            const mobileRegex = /^[0-9]{10}$/;
            const isValidMobile = mobileRegex.test(value);
            setErrors({
                ...errors,
                [fieldName]: isValidMobile ? "" : "Invalid phone number",
            });
        } else {
            setErrors({
                ...errors,
                [fieldName]: "",
            });
        }
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        let isValid = true;
        const newErrors = {};
        // Check if fields are empty and set corresponding error messages
        for (const key in userData) {
            if (userData[key] === "") {
                newErrors[key] = " ";
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
                accessClientIds: ["1", "3"],
                adminRoleId: 1,
                adminRoleCode: 1,
                clientRoleId: 2,
                clientRoleCode: 2,
                firstName: "John",
                lastName: "Doe"
            }
            // Dispatch the form submission action if needed
            dispatch(onUserSubmit(UsersData));
        }
    };
  
    useEffect(() => {
        if (onUpdate) {
            if (onSubmitData.message === "User Added Successfully.") {
                toast.success(onSubmitData.message);
                document.getElementById("userForm").reset();
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
                                <h4 className="card-title">User Master</h4>
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
                                                    <label for="name-f">Email
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        className={` ${errors.email ? "border-danger" : "form-control"}`}
                                                        onChange={(e) => handleChange(e, "email")}
                                                        placeholder=""
                                                        error={errors.email}
                                                    />
                                                    <p className="text-danger">{errors.email}</p>
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">Mobile
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        className={` ${errors.mobile ? "border-danger" : "form-control"}`}
                                                        onChange={(e) => handleChange(e, "mobile")}
                                                        placeholder=""
                                                        error={errors.mobile}
                                                    />
                                                    <p className="text-danger">{errors.mobile}</p>
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">Username
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="text"
                                                        className={` ${errors.userName ? "border-danger" : "form-control"}`} name="fname"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "userName")}
                                                        error={errors.userName}
                                                    />
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">Password
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
                                                    />
                                                </div>
                                                <div className="col-lg-12 br pt-2">
                                                    <label for="name-f">Client</label>
                                                    <div className="row ml-4">
                                                        {Object.entries(formData.modules).map(
                                                            ([module, checked]) => (
                                                                <div
                                                                    className="form-check mt-2 col-lg-3"
                                                                    key={module}
                                                                >
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        name={module}
                                                                        value={checked}
                                                                        id={`flexCheckDefault-${module}`}
                                                                        checked={checked}
                                                                        onChange={(e) => handleChange(e, 'check')}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor={`flexCheckDefault-${module}`}
                                                                    >
                                                                        {module
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
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 br pt-2">
                                                    <label for="name-f">Role</label>
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
                                                        All the * fields are required.
                                                    </span>
                                                    <div className="col-sm-4 mt-2 mb-4">
                                                        <button className="btn btn-primary float-right pad-aa" >
                                                            Submit <i className="fa fa-arrow-right"></i>
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