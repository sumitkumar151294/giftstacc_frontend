import React from "react";
import './RoleMaster.scss'
import RoleMasterItems from "../RoleMaster/RoleMasterItems/RoleMasterItems";
import RoleMasterModule from "../RoleMaster/RoleMasterModule/RoleMasterModule";
const RoleMaster = () => {
    return (
        <>
            <div className="content-body">
                <RoleMasterItems />
                <RoleMasterModule />
            </div>
        </>
    )
}
export default RoleMaster