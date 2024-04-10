/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { onLoginSubmit } from "../../Store/Slices/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";
import Footer from "../../Layout/Footer/Footer";
import image from "../../Assets/img/logo.png";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";
import { onClientLoginSubmit } from "../../Store/Slices/loginSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoder, setShowLoader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const loginDetails = useSelector((state) => state.loginReducer);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const invalidEmail = GetTranslationData("UIAdmin", "invalid_Email");
  const sign = GetTranslationData("UIAdmin", "sign");
  const email_label = GetTranslationData("UIAdmin", "email_label");
  const email_placeholder = GetTranslationData("UIAdmin", "email_placeholder");
  const password_label = GetTranslationData("UIAdmin", "password_label");
  const password_placeholder = GetTranslationData(
    "UIAdmin",
    "password_placeholder"
  );
  const req_field = GetTranslationData("UIAdmin", "req_field");
  const remember = GetTranslationData("UIAdmin", "remember");
  const sign_me_label = GetTranslationData("UIAdmin", "sign_Me_Label");

  const handleChange = (e, fieldName) => {
    // Destructure the value from the event object
    const { value } = e.target;
    // Create a new object with updated field value
    const newLoginData = {
      ...loginData,
      [fieldName]: value,
    };
    // Update the state with the new login data
    setLoginData(newLoginData);

    if (fieldName === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const isValidEmail = emailRegex.test(value);

      setErrors({
        ...errors,
        [fieldName]: isValidEmail ? "" : invalidEmail,
      });
    } else {
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };

  const handleCheckboxChange = async (e) => {
    const { checked } = e.target;
    if (checked) {
      // To encrypt the passoword
      const hashedPassword = await bcrypt.hash(loginData.password, 10);

      localStorage.setItem("userEmail", loginData.email);
      localStorage.setItem("userPassword", hashedPassword);
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
    }
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    setIsSubmit(false);
    // Initialize a variable to track form validation status
    let isValid = true;

    // Create a copy of the errors state
    const newErrors = { ...errors };

    // Iterate through each key in loginData
    for (const key in loginData) {
      if (loginData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else if (key === "email" && newErrors[key] !== "") {
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    // Update the errors state with the new error messages
    setErrors(newErrors);

    if (isValid) {
      try {
        setShowLoader(true);

        // Wait for the dispatch to complete
        if (loginDetails?.partner_Key === "UIClient") {
          dispatch(onClientLoginSubmit(loginData));
        } else {
          dispatch(onLoginSubmit(loginData));
        }
        setIsSubmit(true);
        // Define a function to show a toast notification based on loginDetails
      } catch (error) {
        // Handle any errors during dispatch
      }
    }
  };
  useEffect(() => {
    if (
      loginDetails.partner_Key === "UIClient" &&
      loginDetails?.status_code === "201" &&
      isSubmit
    ) {
      setShowLoader(false);
      navigate("/lc-user-admin/dashboard");
    } else if (
      loginDetails.partner_Key === "UIAdmin" &&
      loginDetails?.status_code === "201" &&
      isSubmit
    ) {
      if (loginDetails?.data?.[0]?.adminRoleId) {
        setShowLoader(false);
        navigate("/lc-admin/dashboard");
      } else {
        setShowLoader(false);
        toast.error("Invalid Credentials");
      }
    } else if (isSubmit && loginDetails?.status_code) {
      setShowLoader(false);
      toast.error(loginDetails?.message);
    }
  }, [loginDetails]);

  // useEffect(() => {
  //   if (loginDetails.partner_Key === "UIAdmin") {
  //     navigate("/lc-admin/dashboard");
  //   } else if (loginDetails.partner_Key === "UIClient") {
  //     navigate("/lc-user-admin/dashboard");
  //   }
  // }, []);

  return (
    <>
      <div className="vh-100">
        <div className="authincation h-100">
          <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
              <div className="col-md-6">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form">
                        <div className="text-center mb-3">
                          <img className="w-100" src={image} alt="" />
                        </div>
                        <h4 className="text-center mb-4">{sign}</h4>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>{email_label}</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="email"
                              className={` ${
                                errors.email ? "border-danger" : "form-control"
                              }`}
                              placeholder={email_placeholder}
                              onChange={(e) => handleChange(e, "email")}
                              error={errors.email}
                            />
                            <p className="text-danger">{errors.email}</p>
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>{password_label}</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="password"
                              className={` ${
                                errors.password
                                  ? "border-danger"
                                  : "form-control"
                              }`}
                              onChange={(e) => handleChange(e, "password")}
                              placeholder={password_placeholder}
                            />
                          </div>
                          {showLoder && <Loader />}
                          <div className="row d-flex justify-content-between mt-4 mb-2 d-nonemo">
                            <div className="mb-3">
                              <span
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                              >
                                {req_field}
                              </span>
                              <div className="form-check custom-checkbox ms-1">
                                <InputField
                                  type="checkbox"
                                  className="form-check-input"
                                  id="basic_checkbox_1"
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="basic_checkbox_1"
                                >
                                  {remember}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <Button
                              text={sign_me_label}
                              className="btn btn-primary btn-block btn-sm float-right p-btn mt-2"
                            />
                            <ToastContainer />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default LoginPage;
/* eslint-enable react-hooks/exhaustive-deps */
