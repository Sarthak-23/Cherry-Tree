import React from 'react'
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = props => {
    return (
        <>
            <Navbar {...props}/>
            {props.children}
            <Footer/>   
        </>
    )   
}

export default MainLayout
