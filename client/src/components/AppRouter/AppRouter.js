import React, {useContext, useEffect} from 'react'
import {AuthContext} from "../../index";
import {observer} from "mobx-react-lite";
import AuthWrap from "../../layouts/AuthWrap/AuthWrap";
import NonAuthWrap from "../../layouts/NonAuthWrap/NonAuthWrap";
import RegisterConfirm from "../../pages/NonAuthPages/RegisterConfirm/RegisterConfirm";
import {detectBrowser} from "../../utils/detectBrowser";

const AppRouter = () => {
    const {store} = useContext(AuthContext)

    console.log('browser', detectBrowser())

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <h1>Loading...</h1>
    }

    const renderPages = () => {
        if (store.isAuth && store.showConfirmation) {
            return <RegisterConfirm />
        } else if (store.isAuth && store.isActivated || store.fullAccess || store.isAdmin) {
            return <AuthWrap />
        } else {
            return  <NonAuthWrap />
        }
    }

    return (
        <div className={`wrapper` } >
            {
                renderPages()
            }
        </div>
    )
}

export default observer(AppRouter)