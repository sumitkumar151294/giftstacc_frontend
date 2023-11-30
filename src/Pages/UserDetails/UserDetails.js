import React, { useState } from "react";
// import { onUserSubmit } from "../../../../customer-Capital/src/redux/modules/Admin/userSlice";
import { onUserSubmit } from "../../Store/Slices/userMasterSlice";
import { useDispatch } from 'react-redux';
import InputField from "../../Componenets/InputField/InputField";
// import Button from "../../Componenets/Buttons/Button/Button";
// import Snackbar from "../../Componenets/Snackbar/Snackbar";
import '../UserMaster/UserMaster.css'

// import { Link } from "react-router-dom";
// import Loader from "../../Componenets/Loader/Loader";

const UserDetails = () => {
    const dispatch = useDispatch();
    // const translationData = useSelector((state) => state.translationReducer);
    //   const userDetails = useSelector(
    //     (state) => state.userReducer?.data?.message
    //   );

    const [showSnackbar, setShowSnackbar] = useState(false);

    // const [isLoading, setIsLoading] = useState(true);
    const [isformLoading, setIsFormLoading] = useState(true);
    // const translationData = useSelector((state) => state.translationReducer);
    const [userData, setUserData] = useState({ userName: '', password: '', mobile: '', email: '', role: 'Admin' });
    const [errors, setErrors] = useState({ userName: '', password: '', mobile: '', email: '', role: '' }); // Initialize 'role' error state
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

    const handleChange = (e, fieldName) => {
        const { name, value, type, checked } = e.target;
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
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        // if (!regexPhone.test(userData.mobile)) {
        //     newErrors.mobile = "Invalid phone number format";
        //     isValid = false;
        // }
        // if (fieldName === "mobile") {
           
        //     const regexPhone = /^[0-9]{10}$/;
        //     const isValidMobile = regexPhone.test(value);

        //     setErrors({
        //         ...errors,
        //         [fieldName]: isValidMobile ? "" : "Invalid phone number",
        //     });
        // } else {
        //     setErrors({
        //         ...errors,
        //         [fieldName]: "",
        //     });
        // }


        if (fieldName === "email") {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const isValidEmail = emailRegex.test(value);

            setErrors({
                ...errors,
                [fieldName]: isValidEmail ? "" : "Invalid email address",
            });
        } else {
            setErrors({
                ...errors,
                [fieldName]: "",
            });
        }

        if (fieldName === "mobile") {
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






    // const handleChange = (e, fieldName) => {
    //     setUserData({
    //         ...userData,
    //         [fieldName]: e.target.value,
    //     });

    //     // Remove the error message when the user starts typing
    //     setErrors({
    //         ...errors,
    //         [fieldName]: "",
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = { ...errors };

        // Check if fields are empty and set corresponding error messages

        for (const key in userData) {
            if (userData[key] === "") {
                newErrors[key] = " ";
                isValid = false;
            } else {
                newErrors[key] = "";
            }
        }
        setErrors(newErrors);

        // Email and Phone validation using the regexEmail and regexPhone pattern
        // const regexEmail = /[a-zA-Z0-9]+([\_\.\-{1}])?[a-zA-Z0-9]+\@[a-zAZ0-9]+(\.[a-zA-Z\.]+)/g;

        // if (!regexEmail.test(userData.email)) {
        //     newErrors.email = "Invalid email format";
        //     isValid = false;
        // }



        // Check if a role has been selected
        if (userData.role === '') {
            newErrors.role = 'Please select a role';
            isValid = false;
        } else {
            newErrors.role = ''; // Clear the role error if a role is selected
        }

        setErrors(newErrors);

        if (isValid) {
            const submissionData = {
                formData: userData,
                checkboxData: formData.modules,
            };

            // Print the combined data to the console
            console.log('Submission Data:', submissionData);

            dispatch(onUserSubmit(submissionData));
        }
    };

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
                                {!isformLoading ? (
                                    <div style={{ height: "400px" }}>
                                        {/* <Loader classNameType={"absoluteLoader"} /> */}
                                    </div>
                                ) : (
                                    <div className="container mt-3">
                        <form onSubmit={(e) => handleSubmit(e)}>
                                            <div className="row">
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">Email
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="email"
                                                        className={` ${errors.email ? "border-danger" : "form-control"
                                                            }`}
                                                        onChange={(e) => handleChange(e, "email")}
                                                        // id="name-f"
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
                                                        className={` ${errors.mobile ? "border-danger" : "form-control"
                                                            }`}
                                                        name="fname"
                                                        id="name-f"
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
                                                        className="form-control"
                                                        name="fname"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "userName")}
                                                        error={errors.userName}
                                                    />
                                                    {/* <p className="text-danger">{errors.userName}</p> */}
                                                </div>
                                                <div className="col-sm-4 form-group mb-2">
                                                    <label for="name-f">Password
                                                        <span class="text-danger">*</span>
                                                    </label>
                                                    <InputField
                                                        type="password"
                                                        className="form-control"
                                                        name="fname"
                                                        id="name-f"
                                                        placeholder=""
                                                        onChange={(e) => handleChange(e, "password")}
                                                        error={errors.password}
                                                    />
                                                    {/* <p className="text-danger">{errors.password}</p> */}
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
                                                                        onChange={handleChange}
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

                                                    <div className="row ml-4">
                                                        <div className="form-check mt-2 col-lg-3">
                                                            <input
                                                                id="ctl00_rbtnlist_0"
                                                                type="radio"
                                                                className="form-check-input"
                                                                name="role"
                                                                value="Admin"
                                                                checked={userData.role === "Admin"}
                                                                onChange={(e) => handleChange(e, "role")}
                                                            />
                                                            <label className="form-check-label" for="ctl00_rbtnlist_0">Admin</label>
                                                        </div>

                                                        <div className="form-check mt-2 col-lg-3">
                                                            <input
                                                                id="ctl00_rbtnlist_0"
                                                                type="radio"
                                                                className="form-check-input"
                                                                name="role"
                                                                value="Data Analyst"
                                                                checked={userData.role === "Data Analyst"}
                                                                onChange={(e) => handleChange(e, "role")}
                                                            />
                                                            <label className="form-check-label" for="ctl00_rbtnlist_0">Data Analyst</label>
                                                        </div>

                                                        <div className="form-check mt-2 col-lg-3">
                                                            <input
                                                                id="ctl00_rbtnlist_0"
                                                                type="radio"
                                                                className="form-check-input"
                                                                name="role"
                                                                value="Accountant"
                                                                checked={userData.role === "Accountant"}
                                                                onChange={(e) => handleChange(e, "role")}
                                                            />
                                                            <label className="form-check-label" for="ctl00_rbtnlist_0">Accountant</label>
                                                        </div>
                                                        <div className="form-check mt-2 col-lg-3">
                                                            <input
                                                                id="ctl00_rbtnlist_0"
                                                                type="radio"
                                                                className="form-check-input"
                                                                name="role"
                                                                value="Manager"
                                                                checked={userData.role === "Manager"}
                                                                onChange={(e) => handleChange(e, "role")}
                                                            />
                                                            <label className="form-check-label" for="ctl00_rbtnlist_0">Manager</label>
                                                        </div>
                                                    </div>
                                                    <p className="text-danger">{errors.role}</p>
                                                    <div className="col-sm-4 mt-2 mb-4">
                                                        <button className="btn btn-primary float-right pad-aa" >
                                                            Submit <i className="fa fa-arrow-right"></i>
                                                        </button>
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