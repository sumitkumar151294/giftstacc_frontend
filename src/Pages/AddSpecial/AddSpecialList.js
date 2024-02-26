import React from 'react'
import AddSpecialForm from './AddSpecialForm'

const AddSpecialList = () => {
    return (
        <>
            <AddSpecialForm />
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
                                <div className="card-body">
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
                                                            <a href="#" className="btn btn-primary shadow btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></a>
                                                            <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                        </div>
                                                    </td>
                                                    <td><a href="allocatebrands.html" className="btn btn-primary btn-sm float-right"><i className="fa fa-plus"></i>&nbsp;Allocate Brands</a></td>
                                                </tr>
                                                {/* More rows go here */}
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

export default AddSpecialList