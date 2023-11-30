import React from 'react'

const NoRecord = () => {
    return (
        <>
            <div className="card-body">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-12">
                            <div className="form-input-content text-center error-page">
                                <h1 className="error-text fw-bold">NO Record Found</h1>
                                <h4><i className="fa fa-times-circle text-danger"></i> The term you search for couldn't find any record</h4>
                                <p>Please try with diffrent term</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoRecord;