import React, { useState } from "react";
import "./loginForm.scss";
import image from "../../Assets/logo (1).png";
import { onLoginSubmit } from "../../Store/Slices/loginSlice";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const dispatch = useDispatch();
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
    debugger;
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    // Check if fields are empty and set corresponding error messages

    for (const key in loginData) {
      debugger;
      if (loginData[key] === "") {
        newErrors[key] = "This field is Required ";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    if (isValid) {
      dispatch(onLoginSubmit(loginData));
    }
  };
  const loginDetails = {
    imageUrl: image,
    headerText: "Sign into your account",
    emailPlaceholder: "hello@example.com",
    email: "Email",
    password: "Password",
    passwordPlaceholder: "*****",
    remember: "Remember my preference",
    sign: "Sign Me In",
  };

  return (
    <>
      <div class="authincation h-100">
        <div class="container h-100">
          <div class="row justify-content-center h-100 align-items-center">
            <div class="col-md-6">
              <div class="authincation-content">
                <div class="row no-gutters">
                  <div class="col-xl-12">
                    <div class="auth-form">
                      <div class="text-center mb-3">
                        <a href="#">
                          <img
                            class="w-100"
                            // src={loginDetails.imageUrl}
                            alt=""
                          />
                        </a>
                      </div>
                      <h4 class="text-center mb-4">Sign into your account</h4>
                      <form action="index.html">
                        <div class="mb-3">
                          <label class="mb-1">
                            <strong>Email</strong>
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            value="hello@example.com"
                          />
                        </div>
                        <div class="mb-3">
                          <label class="mb-1">
                            <strong>Password</strong>
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            value="Password"
                          />
                        </div>
                        <div class="row d-flex justify-content-between mt-4 mb-2 d-nonemo">
                          <div class="mb-3">
                            <div class="form-check custom-checkbox ms-1">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="basic_checkbox_1"
                              />
                              <label
                                class="form-check-label"
                                for="basic_checkbox_1"
                              >
                                Remember my preference
                              </label>
                            </div>
                          </div>
                          <div class="mb-3 d-none">
                            <a href="">Forgot Password?</a>
                          </div>
                        </div>
                        <div class="text-center">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block"
                          >
                            Sign Me In
                          </button>
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
      <div class="footer">
        <div class="copyright">
          <p>Copyright © CC 2023 </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
