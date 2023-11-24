import React, { useState } from "react";
// import { onUserSubmit } from "../../../../customer-Capital/src/redux/modules/Admin/userSlice";
import { useDispatch } from 'react-redux';
// import { Link } from "react-router-dom";
// import Loader from "../../Componenets/Loader/Loader";
import UserDetails from "../UserDetails/UserDetails";
import UserList from "../UserList/UserList";

const UserMaster = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isformLoading, setIsFormLoading] = useState(true);
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

  const userList = [
    {
      roleName: 'Admin',
      email: 'thisisdummy@gmail.com',
      mobile: '9876543210',
      username: 'Dummy User',
      clients: ['Client 1', 'Client 2'],
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
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
  };

  const dispatch = useDispatch();

  const handleChange = (e, fieldName) => {
    setUserData({
      ...userData,
      [fieldName]: e.target.value,
    });

    // Remove the error message when the user starts typing
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };

    // Check if fields are empty and set corresponding error messages
    for (const key in userData) {
      if (userData[key] === "") {
        newErrors[key] = "This field is required";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    // Email and Phone validation using the regexEmail and regexPhone pattern
    const regexEmail = /[a-zA-Z0-9]+([\_\.\-{1}])?[a-zA-Z0-9]+\@[a-zAZ0-9]+(\.[a-zA-Z\.]+)/g;
    const regexPhone = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/g;

    if (!regexEmail.test(userData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!regexPhone.test(userData.mobile)) {
      newErrors.mobile = "Invalid phone number format";
      isValid = false;
    }

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

      // dispatch(onUserSubmit(submissionData));
    }
  };

  return (
    <>
      <div className="content-body">
        <UserDetails />
        <UserList />
      </div>
    </>
  );
};

export default UserMaster;
