import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { onLoginSubmit } from "../../Store/Slices/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import InputField from "../../Componenets/InputField/InputField";
import Button from "../../Componenets/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Componenets/Loader/Loader";
import Footer from "../../Layout/Footer/Footer";
import { GetTranslationData } from "../../Componenets/GetTranslationData/GetTranslationData ";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [showLoder, setShowLoader] = useState(false);
  const loginDetails = useSelector((state) => state.loginReducer?.data?.message);
  const [loginData, setLoginData] = useState({ email: "",password: ""});
  const [errors, setErrors] = useState({ email: "",password: "" });
  const emailLabel = GetTranslationData("UIAdmin", "email_label");
  const emailPlaceholder = GetTranslationData("UIAdmin", "email_placeholder");
  const passwordLabel = GetTranslationData("UIAdmin", "password_label");
  const passwordPlaceholder = GetTranslationData( "UIAdmin","password_placeholder" );
  const sign = GetTranslationData("UIAdmin", "sign");
  const req_field = GetTranslationData("UIAdmin", "req_field");
  const remember = GetTranslationData("UIAdmin", "remember");
  const sign_me = GetTranslationData("UIAdmin", "sign_me");

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    const newLoginData = {
      ...loginData,
      [fieldName]: value,
    };
    setLoginData(newLoginData);

    if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
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
    setErrors(newErrors);

    if (isValid) {
      try {
        setShowLoader(true);
        dispatch(onLoginSubmit(loginData));
        const notify = () => {
          if (loginDetails === "Login Successfully.") {
            setShowLoader(false);
            toast.success(loginDetails);
          } else {
            setShowLoader(false);
            toast.error(loginDetails);
          }
        };
        notify();
      } catch (error) { }
    }
  };

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
                          <img
                            className="w-100"
                            src="https://beta.shop-loyalty.com/images/logo.png"
                            alt=""
                          />
                        </div>
                        <h4 className="text-center mb-4">{sign}</h4>

                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>{emailLabel}</strong>
                              <span className="text-danger">*</span>
                            </label>

                            <InputField
                              type="email"
                              className={` ${errors.email ? "border-danger" : "form-control"
                                }`}
                              placeholder={emailPlaceholder}
                              onChange={(e) => handleChange(e, "email")}
                              error={errors.email}
                            />
                            <p className="text-danger">{errors.email}</p>
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>{passwordLabel}</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="password"
                              className={` ${errors.password
                                  ? "border-danger"
                                  : "form-control"
                                }`}
                              onChange={(e) => handleChange(e, "password")}
                              placeholder={passwordPlaceholder}
                            />
                          </div>
                          {showLoder && <Loader />}
                          <div className="row d-flex justify-content-between mt-4 mb-2 d-nonemo">
                            <div className="mb-3">
                              <span
                                className="form-check-label"
                                for="basic_checkbox_1"
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
                                  for="basic_checkbox_1"
                                >
                                  {remember}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <Button onClick={handleSubmit} text={sign_me} />
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
