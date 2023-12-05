import React from 'react'
import Sidebar from '../Layout/Sidebar/Sidebar';
import Header from '../Layout/Header/Header';
import Footer from './Footer/Footer';
const Layout = (props) => {
    const { Component } = props;
    return (
        <>
            <div id="main-wrapper">
                <Header />
                <Sidebar />
                <Component />
                <Footer />
            </div>
        </>
    )
}

export default Layout;