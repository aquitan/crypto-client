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

const AuthWrap = () => {
    const {store} = useContext(AuthContext)
    const location = useLocation()
    let userLocation = location.pathname.split(/[\\\/]/)

    const renderAdminRoutes = () => {
        if (store.isStaff) {
            return (
                <Route exact path='/staff' element={<AdminLayout/>}>
                    {
                        adminRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
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
                            authRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
                        }
                    </Route>
                    {
                        renderAdminRoutes()
                    }

                    {
                        store.isStaff ?  <Route path='*' element={<Navigate to={'/staff'}/>} /> : <Route path='*' element={<Navigate to={'/'}/>} />
                    }
                </Routes>
            </div>
            <Footer>
                <Link exact to='/'>Nowhere</Link>
                <Link exact to='/'>Nowhere</Link>
                <Link exact to='/'>Nowhere</Link>
                <Link exact to='/'>Nowhere</Link>
                <Link exact to='/'>Nowhere</Link>
                <Link exact to='/'>Nowhere</Link>
            </Footer>
        </>
    )
}

export default AuthWrap