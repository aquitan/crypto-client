import React, {useContext, useEffect} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../../router/routes'
import {v4 as uuid} from 'uuid'
import {AuthContext} from "../../index";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {store} = useContext(AuthContext)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        console.log('store', store)
    }, [])

    return (
        <div className='wrapper' >
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

export default observer(AppRouter)