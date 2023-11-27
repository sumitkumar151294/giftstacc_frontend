import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { onVendorSubmit } from "../../redux/modules/Admin/vendorSlice";
import SupplierMasterFrom from "./SupplierMasterForm/SupplierMasterFrom";
import SupplierList from "./SupplierList/SupplierList";

const SupplierMaster = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div class="content-body">
        <SupplierMasterFrom />
        <SupplierList />
      </div>
    </>
  );
};

export default SupplierMaster;
