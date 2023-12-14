import React, { useState } from "react";
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
