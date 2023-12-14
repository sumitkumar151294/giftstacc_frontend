import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SupplierMasterDetails from "./SupplierMasterDetails/SupplierMasterDetails";
import SupplierList from "./SupplierList/SupplierList";

const SupplierMaster = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div class="content-body">
        <SupplierMasterDetails />
        <SupplierList />
      </div>
    </>
  );
};

export default SupplierMaster;
