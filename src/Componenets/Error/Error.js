import React from 'react'
import "./Error.css"

const Error = () => {
    return (
        <>
            <div className="card-body margin-top">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-12">
                            <div className="form-input-content text-center error-page">
                                <h1 className="error-text h1-error fw-bold">Please check after sometime</h1>
                                <h4 className='font-size'><i className="fa fa-times-circle text-danger font-size"></i> The term you search for couldn't find any record</h4>
                                <p>Please try with diffrent term</p>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;