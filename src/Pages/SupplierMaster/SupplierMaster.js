import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SupplierMasterFrom from "./SupplierMasterForm/SupplierMasterFrom";
import SupplierList from "./SupplierList/SupplierList";

const SupplierMaster = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="content-body">
        <SupplierMasterFrom />
        <SupplierList />
      </div>
    </>
  );
};

export default SupplierMaster;
