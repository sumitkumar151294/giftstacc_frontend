import React from "react";
import "../ClientMaster/ClientMaster.css";
import ClientList from "./ClientList/ClientList";
import ClientMasterForm from "./ClientMasterForm/ClientMasterForm";
const ClientMaster = () => {
  return (
    <>
    
      <div className="content-body">
        <ClientMasterForm />
        <ClientList />
      </div>
    </>
  );
};
export default ClientMaster;