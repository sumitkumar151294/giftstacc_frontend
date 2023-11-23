import React, { useState } from "react";
// import Loader from "../../../Componenets/Loader/Loader";
import './RoleMaster.css'
// import { onRoleMasterSubmit } from "../../redux/modules/Admin/roleMasterSlice";
// import { useDispatch } from "react-redux";
import RoleMasterItems from "./RoleMasterItems";
import RoleMasterModule from "./RoleMasterModule";

const RoleMaster = () => {
    
    return (
        <>
            <div class="content-body">
                <RoleMasterItems />
                <RoleMasterModule />
            </div>

        </>
    )
}

export default RoleMaster