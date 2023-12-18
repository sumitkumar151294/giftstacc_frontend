import React, { useEffect, useState } from "react";
import "./LoginPage.scss";
import { onLoginSubmit } from "../../Store/Slices/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import InputField from "../../Componenets/InputField/InputField";
import Button from "../../Componenets/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Componenets/Loader/Loader";
import Footer from "../../Layout/Footer/Footer";
import image from "../../Assets/logo.png";
import { GetTranslationData } from "../../Componenets/GetTranslationData/GetTranslationData ";
import { useNavigate } from "react-router";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoder, setShowLoader] = useState(false);
  const loginDetails = useSelector(
    (state) => state.loginReducer?.data?.message
  );
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const invalidEmail = GetTranslationData("UIAdmin", "invalid_Email")

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

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      localStorage.setItem("userEmail", loginData.email);
      localStorage.setItem("userPassword", loginData.password);
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
    }
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

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
        dispatch(onLoginSubmit(loginData));

        // Define a function to show a toast notification based on loginDetails
      } catch (error) {
        // Handle any errors during dispatch
        console.error(error);
      }
    }
  };
  useEffect(() => {
    if (loginDetails === "Login Successfully.") {
      setShowLoader(false);
      toast.success(loginDetails);
      sessionStorage.setItem('login', true)
      navigate('/Lc-admin/rolemaster');
    } else {
      setShowLoader(false);
      sessionStorage.removeItem('login')
      toast.error(loginDetails);
    }
  }, [loginDetails]);

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
                        <h4 className="text-center mb-4">{GetTranslationData("UIAdmin", "sign")}</h4>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>{GetTranslationData("UIAdmin", "email_label")}</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="email"
                              className={` ${
                                errors.email ? "border-danger" : "form-control"
                              }`}
                              placeholder={GetTranslationData("UIAdmin", "email_placeholder")}
                              onChange={(e) => handleChange(e, "email")}
                              error={errors.email}
                            />
                            <p className="text-danger">{errors.email}</p>
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>{GetTranslationData("UIAdmin", "password_label")}</strong>
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
                              placeholder={GetTranslationData("UIAdmin","password_placeholder")}
                            />
                          </div>
                          {showLoder && <Loader />}
                          <div className="row d-flex justify-content-between mt-4 mb-2 d-nonemo">
                            <div className="mb-3">
                              <span
                                className="form-check-label"
                                htmlFor="basic_checkbox_1"
                              >
                                {GetTranslationData("UIAdmin", "req_field")}
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
                                  {GetTranslationData("UIAdmin", "remember")}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <Button text={GetTranslationData("UIAdmin", "sign_me")} />
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