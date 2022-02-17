import React, {useContext} from 'react'
import cls from "../../components/AppRouter/AppRouter.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom";
import UserLayout from "../UserLayout/UserLayout";
import {adminRoutes, authRoutes} from "../../router/routes";
import AdminLayout from "../AdminLayout/AdminLayout";
import Footer from "../../components/Footer/Footer";
import {v4 as uuid} from 'uuid'
import {AuthContext} from "../../index";
import Landing from "../../pages/NonAuthPages/Landing/Landing";

const AuthWrap = () => {
    const {store} = useContext(AuthContext)
    const location = useLocation()
    let userLocation = location.pathname.split(/[\\\/]/)
    console.log(store)

    const renderAdminRoutes = () => {
        if (store.isStaff || store.fullAccess || store.isAdmin) {
            return (
                <Route path='/staff' element={<AdminLayout/>}>
                    {
                        adminRoutes.map(route => <Route key={uuid()} path={route.path} element={route.component} />)
                    }
                </Route>
            )
        }
        return null
    }
    return (
        <>
            <div className={cls.content}>
                {
                    userLocation[1] === 'staff' ? null : <NavBar/>
                }
                <Routes>
                    <Route path='/' element={<UserLayout/>}>
                        {
                            authRoutes.map(route => <Route key={uuid()} path={route.path} element={route.component} />)
                        }
                    </Route>
                    {
                        renderAdminRoutes()
                    }
                    {
                        store.isStaff || store.fullAccess || store.isAdmin ?
                            <Route path='*' element={<Navigate to={'/staff'}/>} /> : <Route path='*' element={<Navigate to={'/'}/>} />
                    }
                    <Route path='*' element={<Navigate to={'/error'}/>} />
                </Routes>
            </div>
            <Footer>
                <Link to='/privacy-policy'>Privacy Policy</Link>
                <Link to='/cookie-policy'>Cookie Policy</Link>
                <Link to='/before-start'>Before you start</Link>
                <Link to='/security-policy'>Security policy</Link>
                <Link to='/terms-and-conditions'>Terms & Conditions</Link>
                <Link to='/general-basics'>General Basics</Link>
                <Link to='/about-us'>About Us</Link>
                <Link to='/contact-us'>Contact Us</Link>
                <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            </Footer>
        </>
    )
}

export default AuthWrap