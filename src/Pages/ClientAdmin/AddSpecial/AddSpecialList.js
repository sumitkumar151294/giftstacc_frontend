import React, { useState } from 'react'
import AddSpecialForm from './AddSpecialForm'
import { Link } from 'react-router-dom'
import Button from '../../../Components/Button/Button'
import Loader from '../../../Components/Loader/Loader'

const AddSpecialList = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [prefilledValues, setPrefilledValues] = useState();

    const handleEdit = (data) => {
        const prefilled = data;
        setPrefilledValues(prefilled);
    };

    return (
        <>
            <AddSpecialForm
                prefilledValues={prefilledValues}
                setPrefilledValues={setPrefilledValues}
            />
            <div className="container-fluid pt-0">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="container-fluid pt-1">
                                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div className="card-header">
                                        <h4 className="card-title">Add Special List</h4>
                                    </div>
                                </div>
                                {isLoading ? (
                                    <div style={{ height: "400px" }}>
                                        <Loader classNameType={"absoluteLoader"} />
                                    </div>) : (
                                    <div className="card-body card-body-user">
                                        <div className="table-responsive">
                                            <table className="table header-border table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Section Name</th>
                                                        <th>Display Order</th>
                                                        <th>Max. no. of Brands</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr>
                                                        <td><strong>Recommended Gifts</strong></td>
                                                        <td>1</td>
                                                        <td>5</td>
                                                        <td><span className="badge badge-success">Active</span></td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Button
                                                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                                                    icon={"fas fa-pencil-alt"}
                                                                    onClick={(e) => handleEdit(e)}
                                                                />
                                                                <Button
                                                                    className="btn btn-danger shadow btn-xs sharp"
                                                                    icon={"fa fa-trash"}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to="/lc-user-admin/allocate-brand"
                                                                className="btn btn-primary btn-sm float-right"
                                                            >
                                                                <i className="fa fa-plus"></i>&nbsp;
                                                                Allocate Brands
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSpecialList