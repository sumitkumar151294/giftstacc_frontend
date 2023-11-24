import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { onLoginSubmit } from "../../Store/Slices/loginSlice";
import { useDispatch } from "react-redux";
import { onTranslationSubmit } from "../../Store/Slices/translationSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import InputField from "../../Componenets/InputField/InputField";
import Button from "../../Componenets/Buttons/Button/Button";
import Snackbar from "../../Componenets/Snackbar/Snackbar";
const LoginPage = () => {
  const dispatch = useDispatch();
  const translationData = useSelector((state) => state.translationReducer);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    // Check if fields are empty and set corresponding error messages

    for (const key in loginData) {
      if (loginData[key] === "") {
        newErrors[key] = " ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    if (isValid) {
      dispatch(onLoginSubmit(loginData));
      setShowSnackbar(true); // Set showSnackbar to true when the form is submitted
    }
  };

  useEffect(() => {
    dispatch(onTranslationSubmit());
  }, []);

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
                        <h4 className="text-center mb-4">
                          Sign into your account
                        </h4>
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Email</strong>
                              <span className="text-danger">*</span>
                            </label>
                            <InputField
                              type="email"
                              className={` ${
                                errors.email ? "border-danger" : "form-control"
                              }`}
                              placeholder="hello@example.com"
                              onChange={(e) => handleChange(e, "email")}
                              error={errors.email}
                            />
                            <p className="text-danger">{errors.email}</p>
                          </div>
                          <div className="mb-3">
                            <label className="mb-1">
                              <strong>Password</strong>
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
                              placeholder="Password"
                            />
                          </div>
                          <div className="row d-flex justify-content-between mt-4 mb-2 d-nonemo">
                            <div className="mb-3">
                              <span
                                className="form-check-label"
                                for="basic_checkbox_1"
                              >
                                All the * fields are required.
                              </span>
                              <div className="form-check custom-checkbox ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="basic_checkbox_1"
                                />
                                <label
                                  className="form-check-label"
                                  for="basic_checkbox_1"
                                >
                                  Remember my preference
                                </label>
                              </div>
                            </div>
                            <div className="mb-3 d-none">
                              <a href="">Forgot Password?</a>
                            </div>
                          </div>
                          <div className="text-center">
                            <Button text="Sign In Me" />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Snackbar
                className="Snackbar"
                showSnackbar={showSnackbar}
                setShowSnackbar={setShowSnackbar}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="copyright">
          <p>Copyright © CC 2023 </p>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
