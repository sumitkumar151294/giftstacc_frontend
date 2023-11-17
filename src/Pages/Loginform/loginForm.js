import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./loginForm.scss";
import image from "../../Assets/logo (1).png";
import { CssBaseline } from "@mui/material";
const LoginPage = () => {
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
    const validEmail = localStorage.getItem("loginDetails");
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
      localStorage.setItem(loginData.email, "loginDetails");
      console.log(loginData, "sgf");
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
      <div className="cardWrapper">
        <div className="stackWrapper">
          <div className="boxWrapper">
            <div component="main" maxWidth="xs">
              <div className="containerWrapper">
                <img className="logoImage" src={loginDetails.imageUrl} />
                <div className="titleText">{loginDetails.headerText}</div>
                <form onSubmit={handleSubmit}>
                  <div noValidate className="formWrapper">
                    <div>
                      <label className="labelText" htmlFor="email">
                        {loginDetails.email}
                      </label>
                      <br />
                      <input
                        type="text"
                        placeholder={loginDetails.emailPlaceholder}
                        className={` ${
                          errors.email ? "border-danger" : "inputForm"
                        }`}
                        onChange={(e) => handleChange(e, "email")}
                      />
                      <br />
                      <p className="text-danger">{errors.email}</p>
                      <label
                        className="labelText"
                        htmlFor="password"
                        style={{ marginTop: "15px" }}
                      >
                        {loginDetails.password}
                      </label>
                      <br />
                      <input
                        type="password"
                        placeholder={loginDetails.passwordPlaceholder}
                        className={` ${
                          errors.password ? "border-danger" : "inputForm"
                        }`}
                        onChange={(e) => handleChange(e, "password")}
                      />
                      <p className="text-danger">{errors.password}</p>
                    </div>
                    <div className="gridWrapper">
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              className="Checkbox"
                              required
                              color="primary"
                            />
                          }
                          label={loginDetails.remember}
                          className="checkboxWrapper"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className="buttonWrapper"
                    >
                      {loginDetails.sign}
                    </button>
                  </div>
                </form>
              </div>
              <div className="footer">
                <div class="copyright">
                  <p>Copyright © CC 2023 </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
