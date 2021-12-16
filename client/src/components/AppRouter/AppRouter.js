import React, {useContext, useEffect} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../../router/routes'
import {v4 as uuid} from 'uuid'
import {Context} from "../../index";

const AppRouter = () => {
    console.log(<Navigate />)
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])
    return (
        <div>
            {
                !store.isAuth
                    ?
                    <Routes>
                        {
                            publicRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
                        }
                        <Route path='*' element={<Navigate exact to='/'/>} />
                    </Routes>
                    :
                    <Routes>
                        {
                            authRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component} />)
                        }
                        <Route path='*' element={<Navigate exact to='/dashboard'/>} />
                    </Routes>
            }
        </div>
    )
}

export default AppRouter