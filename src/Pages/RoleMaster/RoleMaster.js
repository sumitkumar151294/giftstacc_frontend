import React from "react";
import RoleMasterItems from "../RoleMasterItems/RoleMasterItems";
import RoleMasterModule from "../RoleMasterModule/RoleMasterModule";
import './RoleMaster.css'

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