import React from "react";
import "../ClientMaster/ClientMaster.scss";
import ClientList from "./ClientList/ClientList";
const ClientMaster = () => {
  return (
    <>
      <div className="content-body">
        <ClientList />
      </div>
    </>
  );
};
export default ClientMaster;
