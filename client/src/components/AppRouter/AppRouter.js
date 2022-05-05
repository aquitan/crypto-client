import React, {useContext, useEffect, useState} from 'react'
import {AuthContext, store} from "../../index";
import {observer} from "mobx-react-lite";
import AuthWrap from "../../layouts/AuthWrap/AuthWrap";
import NonAuthWrap from "../../layouts/NonAuthWrap/NonAuthWrap";
import {getData, postData} from "../../services/StaffServices";
import {useNavigate} from "react-router-dom";
import {getRate} from "../../services/CurrencyService";
import {useQuery} from 'react-query'

const AppRouter = () => {
    const {store} = useContext(AuthContext)
    const navigate = useNavigate()
    // const {isLoading, data, error} = useQuery('notif query', async () => {
    //     const res = await postData('/get_domain_params/', {domainName: window.location.host})
    //     store.setDepositFee(res.data.domainInfo.domainParams.depositFee)
    //     store.setDomain(res.data.domainInfo)
    // })

    useEffect( () => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        sendDomainName()
        getRates()
    }, [])

    const getRates = async () => {
        const res = await getRate()
        const obj = {
            btc: res.data.bitcoin,
            eth: res.data.ethereum,
            bch: res.data['bitcoin-cash'],
            usdt: res.data.tether
        }
        store.setRates(obj)
    }

    const sendDomainName = async () => {
        const res = await postData('/get_domain_params/', {domainName: window.location.host})
        store.setDomain(res.data.domainInfo)
    }

    if (store.isLoading) {
        console.log('store is loading...')
        return <h1>Loading...</h1>
    }

    const renderPages = () => {
        // if (store.isAuth && store.showConfirmation) {
        //     return <RegisterConfirm />
        // }
        // if (store.isAuth && store.isActivated || store.fullAccess || store.isAdmin) {
        //     return <AuthWrap />
        // }
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