import React, {useContext} from 'react'
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {publicRoutes} from "../../router/routes";
import Footer from "../../components/Footer/Footer";
import {AuthContext} from "../../index";
import {v4 as uuid} from 'uuid'
import {observer} from "mobx-react-lite";

const NonAuthWrap = () => {
    const navigate = useNavigate()
    const {store} = useContext(AuthContext)
    if (store.isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Routes>
                {publicRoutes.map(route => <Route key={uuid()} path={route.path} element={route.component}/>)}
            </Routes>
        </>
    )
}

export default observer(NonAuthWrap)