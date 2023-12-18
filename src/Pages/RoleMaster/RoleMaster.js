import React, { useEffect } from "react";
import './RoleMaster.scss'
import RoleMasterItems from "../RoleMaster/RoleMasterItems/RoleMasterItems";
import RoleMasterModule from "../RoleMaster/RoleMasterModule/RoleMasterModule";
import { useDispatch, useSelector } from "react-redux";
import { onGetUserRole } from "../../Store/Slices/userRoleSlice";
const RoleMaster = () => {
    const dispatch = useDispatch();
    const roleAccessListData = useSelector((state) => state.userRoleReducer);  // to get role module access list 
    useEffect(() => {
        // user-role get api call 
        dispatch(onGetUserRole());
    }, []);
    return (
        <>
            <div className="content-body">
                <RoleMasterItems />
                <RoleMasterModule roleAccessListData={roleAccessListData} />
            </div>
        </>
    )
}
export default RoleMaster