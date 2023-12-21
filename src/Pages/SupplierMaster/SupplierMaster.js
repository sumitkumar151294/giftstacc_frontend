import React, { useEffect, useState } from "react";
import SupplierList from "./SupplierList/SupplierList";

const SupplierMaster = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, [loading]);
  return (
    <>
      <div className="content-body">
        <SupplierList />
      </div>
    </>
  );
};

export default SupplierMaster;
