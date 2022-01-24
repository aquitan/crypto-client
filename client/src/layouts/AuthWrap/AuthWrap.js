import React, {useContext, useEffect} from 'react'
import cls from "../../components/AppRouter/AppRouter.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom";
import UserLayout from "../UserLayout/UserLayout";
import {adminRoutes, authRoutes} from "../../router/routes";
import AdminLayout from "../AdminLayout/AdminLayout";
import Footer from "../../components/Footer/Footer";
import {v4 as uuid} from 'uuid'
import {AuthContext} from "../../index";
import {getGeoData} from "../../queries/getSendGeoData";

const AuthWrap = () => {
    const {store} = useContext(AuthContext)
    const appLocation = useLocation()
    console.log('apppppppppp', appLocation)

    useEffect(() => {
        store.sendPath(appLocation.pathname)
        getGeoData()
        console.log('app location', appLocation)
    }, [appLocation])

    const renderAdminRoutes = () => {
        if (store.isAdmin) {
            return (
                <Route exact path='/admin' element={<AdminLayout/>}>
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
                <NavBar/>
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
                        store.isAdmin ?  <Route path='*' element={<Navigate to={'/admin'}/>} /> : <Route path='*' element={<Navigate to={'/'}/>} />
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