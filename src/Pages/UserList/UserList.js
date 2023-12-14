import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../UserMaster/UserMaster.scss'
import { Link } from "react-router-dom";
import { onGetUser } from "../../Store/Slices/userMasterSlice";
import UserDetails from "../UserDetails/UserDetails";

const UserList = () => {
    const dispatch = useDispatch();
    const[prefilledValues,setPrefilledValues]=useState();
   useEffect(()=>{
    dispatch(onGetUser());
   }, []);
   const userList = useSelector((state)=>state.userMasterReducer)
  
   console.log("user", userList);
    
    // const userList = [
    //     {
    //         roleName: 'Admin',
    //         email: 'thisisdummy@gmail.com',
    //         mobile: '9876543210',
    //         username: 'Dummy User',
    //         clients: ['Client 1', 'Client 2'],
    //     },
    //     {
    //         roleName: 'Data Analyst',
    //         email: 'DataAnalyst@gmail.com',
    //         mobile: '2323232323',
    //         username: 'Dummy User',
    //         clients: ['Client 1', 'Client 2'],
    //     },
    //     {
    //         roleName: 'Accountant	',
    //         email: 'Accountant@gmail.com',
    //         mobile: '9876543210',
    //         username: 'Dummy User',
    //         clients: ['Client 1', 'Client 2'],
    //     },
    //     {
    //         roleName: 'Manager',
    //         email: 'thisisdummy@gmail.com',
    //         mobile: '9876543210',
    //         username: 'Dummy User',
    //         clients: ['Client 1', 'Client 2'],
    //     },
        
    // ];
    const handleEdit=(data)=>{
        const prefilled =data;
        setPrefilledValues(prefilled)}

    return (
        <>
                <UserDetails  prefilledValues={prefilledValues}/>

            <div className="container-fluid pt-0">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">User List</h4>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table header-border table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th>Role Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>Username</th>
                                                <th>Clients</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userList?.data?.data?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.adminRoleId}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{`${item.firstName} ${item.lastName}`}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            {Array.isArray(userList.data) && userList.data?.map((client, idx) => (
                                                                <span key={idx} className="badge badge-secondary mr-10">
                                                                    {client.role}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-primary shadow btn-xs sharp me-1" onClick={()=>handleEdit(item)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList