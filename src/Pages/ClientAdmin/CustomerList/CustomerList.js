/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import InputField from '../../../Components/InputField/InputField';
import { GetTranslationData } from '../../../Components/GetTranslationData/GetTranslationData ';
import { onGetCustomer } from '../../../Store/Slices/ClientAdmin/customerListSlice';

export const CustomerList = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(onGetCustomer())
      },[])
          // To get the data of customer list from redux store
    const getCustomerList = useSelector((state) => state.customerListReducer?.customerData);
    const search_here_label = GetTranslationData("UIAdmin", "search_here_label");

    return (
        <>
            <ScrollToTop />
            <div className="container-fluid pt-0">
                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="container mt-2 mb-2">
                                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div className="card-header">
                                        <h4 className="card-title">Customer List</h4>
                                    </div>
                                    <div className="customer-search mb-sm-0 mb-3">
                                        <div className="input-group search-area">
                                            <InputField
                                                type="text"
                                                className="form-control only-high"
                                                placeholder={search_here_label}
                                            />
                                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <a className="btn btn-primary btn-rounded me-3 mb-2"><i className="fa fa-file-excel me-2"></i>Export</a>
                                    </div>
                                </div>
                                <div className="cd-body-responsive">
                                    <div className="table-responsive">
                                        <table className="table table-sm mb-0 table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Joined</th>
                                                </tr>
                                            </thead>
                                            <tbody id="customers">
                                                {getCustomerList
                                                    .map((customer, index) => (
                                                        <tr className="btn-reveal-trigger" key={index} >
                                                            <td className="py-3">
                                                                <div className="media-body">
                                                                    <h5 className="mb-0 fs--1">{customer.name}</h5>
                                                                </div>
                                                            </td>
                                                            <td className="py-2">{customer.email}</td>
                                                            <td className="py-2"> {customer.phone}</td>
                                                            <td className="py-2">{customer.joined}</td>
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
            </div>
        </>
    )
}
/* eslint-enable react-hooks/exhaustive-deps */