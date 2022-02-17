import React, {useContext, useEffect} from 'react'
import {AuthContext, store} from "../../index";
import {observer} from "mobx-react-lite";
import AuthWrap from "../../layouts/AuthWrap/AuthWrap";
import NonAuthWrap from "../../layouts/NonAuthWrap/NonAuthWrap";
import RegisterConfirm from "../../pages/NonAuthPages/RegisterConfirm/RegisterConfirm";
import {detectBrowser} from "../../utils/detectBrowser";
import {getData, postData} from "../../services/StaffServices";

const AppRouter = () => {
    const {store} = useContext(AuthContext)

    useEffect(async () => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        sendDomainName()
    }, [])

    const sendDomainName = async () => {
        const res = await postData('/get_domain_params/', {domainName: window.location.host})
        store.setDomain(res.data.domainInfo.domain_info)
        store.setTerms(res.data.domainInfo.domain_terms)
    }

    console.log('store-wrap', store)


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