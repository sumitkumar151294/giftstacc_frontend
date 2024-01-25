import React from 'react'
const PageError500 = () => {

    return (
        <>
            <div className="authincation justify-content-center align-items-center">
                <div className="text-center col-md-5">
                    <h1 className="error-text-500">500</h1>
                    <h4 className='server_error'><i className="fa fa-times-circle text-danger"></i> Internal Server Error</h4>
                    <p className='error_description'>You do not have permission to view this resource</p>
                    <div>
                        <a className="btn btn-primary" href="/">Back to Home</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageError500;