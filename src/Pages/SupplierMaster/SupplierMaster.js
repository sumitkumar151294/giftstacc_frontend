import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SupplierList from "./SupplierList/SupplierList";
import Loader from "../../Componenets/Loader/Loader";

const SupplierMaster = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
  }, [loading]);
  return (
    <>
      <div class="content-body">
        <SupplierList />
      </div>
    </>
  );
};

export default SupplierMaster;
