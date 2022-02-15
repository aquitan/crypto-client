import React, {useContext, useEffect} from 'react'
import {AuthContext, store} from "../../index";
import {observer} from "mobx-react-lite";
import AuthWrap from "../../layouts/AuthWrap/AuthWrap";
import NonAuthWrap from "../../layouts/NonAuthWrap/NonAuthWrap";
import RegisterConfirm from "../../pages/NonAuthPages/RegisterConfirm/RegisterConfirm";
import {detectBrowser} from "../../utils/detectBrowser";
import {getData} from "../../services/StaffServices";

const AppRouter = () => {
    const {store} = useContext(AuthContext)

    useEffect(async () => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
            const res = await getData(`/staff/domains/domain_detail/1`)
            store.setDomain(res.data)
            console.log('store--', store)
        }
    }, [])

    if (store.isLoading) {
        return <h1>Loading...</h1>
    }

    const domain = JSON.parse(JSON.stringify(store.domain))
    console.log('domain', domain)

    const renderPages = () => {
        if (store.isAuth && store.showConfirmation) {
            return <RegisterConfirm />
        }
        if (store.isAuth && store.isActivated || store.fullAccess || store.isAdmin) {
            return <AuthWrap />
        }
        return  <NonAuthWrap />
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