import React from 'react'

const Error = () => {
    return (
        <>
            <div className="card-body error-top">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-12">
                            <div className="form-input-content text-center error-page">
                                <h1 className="error-text h1-error fw-bold">We have some technical issue</h1>
                                <h4 className='error-size'><i className="fa fa-times-circle text-danger error-size"></i>Please check in sometime or contact administrator</h4>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;
