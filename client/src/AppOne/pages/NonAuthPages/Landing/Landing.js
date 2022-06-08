import React, {useEffect, useState} from 'react'
import LandingHeader from '../../../components/LandingHeader/LandingHeader'
import cls from './Landing.modules.scss'
import {Link} from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import LandingContent from "./components/LandingContent/LandingContent";


const Landing = () => {
    return (
        <div className='landing_wrap'>
            <LandingHeader/>
            <div className='content_wrap'>
                <LandingContent />
                <Footer>
                    <Link to='/privacy-policy'>Privacy Policy</Link>
                    <Link to='/cookie-policy'>Cookie Policy</Link>
                    <Link to='/security-policy'>Security Policy</Link>
                    <Link to='/terms-conditions'>Terms & Conditions</Link>
                    <Link to='/about-us'>About us</Link>
                    <Link to='/contact-us'>Contact us</Link>
                </Footer>
            </div>
        </div>
    )
}

export default Landing