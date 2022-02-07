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
                {publicRoutes.map(route => <Route key={uuid()} exact path={route.path} element={route.component}/>)}
                {/* <Route path='*' element={<Navigate to='/'/>} /> */}
            </Routes>
            <Footer>
                <Link to='/'>Somwhere</Link>
                <Link to='/'>Somwhere</Link>
                <Link to='/'>Somwhere</Link>
                <Link to='/'>Somwhere</Link>
                <Link to='/'>Somwhere</Link>
                <Link to='/'>Somwhere</Link>
            </Footer>
        </>
    )
}

export default NonAuthWrap