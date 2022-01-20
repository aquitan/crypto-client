import React, {useContext, useEffect} from 'react'
import {Routes, Route, Navigate, useNavigate, Link, useLocation} from 'react-router-dom'

import {AuthContext} from "../../index";
import {observer} from "mobx-react-lite";
import AuthWrap from "../../layouts/AuthWrap/AuthWrap";
import NonAuthWrap from "../../layouts/NonAuthWrap/NonAuthWrap";

const AppRouter = () => {
    const {store} = useContext(AuthContext)
    const appLocation = useLocation()

    useEffect(() => {
        // store.sendPath(appLocation)
    }, [appLocation])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // store.checkAuth()
        }

    }, [])

    if (store.isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={`wrapper` } >
            {
               store.isAuth
                ? <AuthWrap />
                : <NonAuthWrap />
            }
        </div>
    )
}

export default observer(AppRouter)