import React, {useContext} from 'react'
import cls from "../../components/AppRouter/AppRouter.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom";
import UserLayout from "../UserLayout/UserLayout";
import {adminRoutes, authRoutes} from "../../router/routes";
import AdminLayout from "../AdminLayout/AdminLayout";
import Footer from "../../components/Footer/Footer";
import {v4 as uuid} from 'uuid'
import {AuthContext} from "../../../index";
import Landing from "../../pages/NonAuthPages/Landing/Landing";

const AuthWrap = () => {
    const {store} = useContext(AuthContext)
    const location = useLocation()
    let userLocation = location.pathname.split(/[\\\/]/)

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
            {
                userLocation[1] === 'staff' ? null : <NavBar/>
            }
            <div className={cls.content}>

                <Routes>
                    {
                        !store.fullAccess ?
                            <Route path='/' element={<UserLayout/>}>
                                {
                                    authRoutes.map(route => <Route key={uuid()} path={route.path} element={route.component} />)
                                }
                            </Route>
                            : null
                    }
                    {
                        renderAdminRoutes()
                    }
                    {
                        store.isStaff || store.fullAccess || store.isAdmin ?
                            <Route path='*' element={<Navigate to={'/staff'}/>} /> : <Route path='*' element={<Navigate to={'/'}/>} />
                    }
                    <Route path='*' element={<Navigate to={'/error'}/>} />
                </Routes>
                {
                    userLocation[1] === 'staff' ? null :
                        <Footer>
                            <div className={cls.footer_block}>
                                <Link className='me-2' to='/privacy-policy'>Privacy Policy</Link>
                                <Link className='me-2' to='/cookie-policy'>Cookie Policy</Link>
                                <Link className='me-2' to='/before-start'>Before you start</Link>
                            </div>
                            <div className={cls.footer_block}>
                                <Link className='me-2' to='/security-policy'>Security policy</Link>
                                <Link className='me-2' to='/terms-and-conditions'>Terms & Conditions</Link>
                                <Link className='me-2' to='/general-basics'>General Basics</Link>
                            </div>
                            <div className={cls.footer_block}>
                                <Link className='me-2' to='/about-us'>About Us</Link>
                                <Link className='me-2' to='/contact-us'>Contact Us</Link>
                                <Link className='me-2' to='/cryptocurrencies'>Cryptocurrencies</Link>
                            </div>
                        </Footer>
                }
            </div>


        </>
    )
}

export default AuthWrap