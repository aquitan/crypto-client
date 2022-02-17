import React, {useContext} from 'react'
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {publicRoutes} from "../../router/routes";
import Footer from "../../components/Footer/Footer";
import {AuthContext} from "../../index";
import {v4 as uuid} from 'uuid'

const NonAuthWrap = () => {
    const navigate = useNavigate()
    const {store} = useContext(AuthContext)
    if (store.showConfirmation) {
        navigate('/register-confirm')
    }
    if (store.isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Routes>
                {publicRoutes.map(route => <Route key={uuid()} path={route.path} element={route.component}/>)}
            </Routes>
            <Footer>
                <Link to='/privacy-policy'>Privacy Policy</Link>
                <Link to='/cookie-policy'>Cookie Policy</Link>
                <Link to='/security-policy'>Security Policy</Link>
                <Link to='/terms-conditions'>Terms & Conditions</Link>
                <Link to='/about-us'>About us</Link>
                <Link to='/contact-us'>Contact us</Link>
            </Footer>
        </>
    )
}

export default NonAuthWrap