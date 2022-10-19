import React from 'react'
import Navbar from '../components/Header/Navbar';

const MainLayout = props => {
    return (
        <>
            <Navbar {...props}/>
            {props.children}
        </>
    )   
}

export default MainLayout
