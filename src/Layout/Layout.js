import React, { useState } from 'react'
import Sidebar from '../Layout/Sidebar/Sidebar';
import Header from '../Layout/Header/Header';
import Footer from './Footer/Footer';
const Layout = (props) => {
    const { Component } = props;
    const [showSideBar, setShowSideBar] = useState(false)
    
    return (
        <>
            <div id="main-wrapper"  className={showSideBar? 'show menu-toggle' : 'show' }>
                <Header setSideBar = {setShowSideBar}  sidebar = {showSideBar}/>
                <Sidebar />
                <Component />
                <Footer />
            </div>
        </>
    )
}

export default Layout;
