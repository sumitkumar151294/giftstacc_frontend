import React, { useEffect, useState } from "react";
import "../ClientMaster/ClientMaster.css";
import ClientList from "./ClientList/ClientList";
import ClientMasterForm from "./ClientMasterForm/ClientMasterForm";
import Loader from "../../Componenets/Loader/Loader";

const ClientMaster = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="content-body">
                    <ClientMasterForm />
                    <ClientList />
                </div>
            )}
        </>
    );
};

export default ClientMaster;
