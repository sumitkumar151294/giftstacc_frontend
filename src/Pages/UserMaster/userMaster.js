import React, { useState } from "react";
// import { onUserSubmit } from "../../../../customer-Capital/src/redux/modules/Admin/userSlice";
// import { useDispatch } from 'react-redux';
// import { Link } from "react-router-dom";
// import Loader from "../../Componenets/Loader/Loader";
import UserDetails from "../UserDetails/UserDetails";
import UserList from "../UserList/UserList";

const UserMaster = () => {


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
