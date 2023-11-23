import React from "react";
import RoleMasterItems from "../RoleMasterItems/RoleMasterItems";
import RoleMasterModule from "../RoleMasterModule/RoleMasterModule";
// import Loader from "../../../Componenets/Loader/Loader";
import './RoleMaster.css'
// import { onRoleMasterSubmit } from "../../redux/modules/Admin/roleMasterSlice";
// import { useDispatch } from "react-redux";

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