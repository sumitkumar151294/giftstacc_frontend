import React from 'react'
import Sidebar from '../Layout/Sidebar/Sidebar';
import Header from '../Layout/Header/Header';
const Layout = (props) => {
    const { Component } = props;
    return (
        <>
            <div id="main-wrapper">
                <Header />
                <Sidebar />
                <Component />
            </div>
        </>
    )
}

export default Layout
