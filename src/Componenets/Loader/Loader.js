import React from 'react'
import './Loader.css'
const Loader = ({classType}) => {
    return (
        <div className={classType} id="preloader">
            <div class="gooey">
                <span class="dot"></span>
                <div class="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default Loader
