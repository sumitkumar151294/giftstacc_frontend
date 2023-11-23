import React, { useState } from "react";
// import "../ClientMaster/ClientMaster.css";
import ClientList from "./ClientList/ClientList";
import ClientMasterForm from "./ClientMasterForm/ClientMasterForm";
const ClientMaster = () => {

    

    return (
        <div class="content-body">
            <ClientMasterForm/>
            <ClientList />
        </div>
    );
};

export default ClientMaster;
