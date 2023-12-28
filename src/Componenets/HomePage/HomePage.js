import React from 'react'
import { useNavigate } from 'react-router'
import "./HomePage.css"
const HomePage = () => {
    const navigate = useNavigate();
    const handleGoToLogin=()=>{
        navigate("/lc-Admin/login")
    }
    return (
        <div className='under_maintenance'>
            <div className="text-center nav-text">
                <h1>Website under Maintenance</h1>
                <h4>If you want to login, Click on Login button</h4>
                <button onClick={handleGoToLogin} className="btn btn-primary btn-sm btn-rounded me-3 mb-2 mt-3">Go to Login</button>
            </div>
        </div>
    )
}
export default HomePage;