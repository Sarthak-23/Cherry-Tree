import React from 'react'
import Navbar from '../components/Header/Navbar';
import Jumbo from '../components/Jumbo_Res/Jumbo';
import Footer from '../components/Footer/Footer';

const Restaurants = props => {
    return (
        <>
            <Navbar {...props}/>
            <Jumbo/>
            {props.children}
            <Footer /> 
        </>
    )
}

export default Restaurants
