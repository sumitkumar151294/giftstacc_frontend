import React from 'react'
import InputField from '../../../Components/InputField/InputField';
import Button from '../../../Components/Button/Button';
import { useDispatch } from 'react-redux';
import { onPostAllocateBrand } from '../../../Store/Slices/ClientAdmin/allocateBrandSlice';

const AllocateBrand = () => {
    const dispatch = useDispatch();
    const handleSubmit=()=>{
        dispatch(onPostAllocateBrand({
            name:"asd"
        }))
    }
    return (
        <>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="container-fluid pt-1">
                                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div className="card-header">
                                        <h4 className="card-title">Allocate Brands</h4>
                                    </div>
                                    <div className="customer-search mb-sm-0 mb-3">
                                        <div className="input-group search-area">
                                            <input type="text" className="form-control only-high" placeholder="Search here......" />
                                            <span className="input-group-text"><a href="javascript:void(0)"><i className="flaticon-381-search-2"></i></a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0 card-body-user">
                                <div className="table-responsive">
                                    <table className="table header-border table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th>Brands Name</th>
                                                <th>Display Order</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Amazon Pay</td>
                                                <td>
                                                    <div className="input-group mb-2 w-11">
                                                        <InputField type="number" className="form-control" placeholder="1" pattern="/^-?\d+\.?\d*$/" onKeyPress={(event) => { if (event.target.value.length === 2) return false; }} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="can-toggle">
                                                        <InputField id="a" type="checkbox" />
                                                        <label htmlFor="a">
                                                            <div className="can-toggle__switch" data-checked="On" data-unchecked="Off"></div>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Flipkart</td>
                                                <td>
                                                    <div className="input-group mb-2 w-11">
                                                        <InputField type="number" className="form-control" placeholder="1" pattern="/^-?\d+\.?\d*$/" onKeyPress={(event) => { if (event.target.value.length === 2) return false; }} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="can-toggle">
                                                        <InputField id="a" type="checkbox" />
                                                        <label htmlFor="a">
                                                            <div className="can-toggle__switch" data-checked="On" data-unchecked="Off"></div>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Add more table rows here */}
                                        </tbody>
                                    </table>
                                </div>
                                <Button
                                    text="Submit"
                                    icon={"fa fa-arrow-right"}
                                    className="btn btn-primary float-right pad-aa"
                                    onClick={()=>handleSubmit()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllocateBrand