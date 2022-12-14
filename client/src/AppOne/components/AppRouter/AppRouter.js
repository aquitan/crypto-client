import React from 'react'
import {useContext, useEffect} from 'react'
import {AuthContext, store} from '../../../index';
import {observer} from "mobx-react-lite";
import AuthWrap from "../../layouts/AuthWrap/AuthWrap";
import NonAuthWrap from "../../layouts/NonAuthWrap/NonAuthWrap";
import {getData, postData} from '../../services/StaffServices';
import {useLocation, useNavigate} from 'react-router-dom';
import {getRate} from "../../services/CurrencyService";
import Preloader from "../UI/Preloader/Preloader";
import {useNotifContext} from '../../context/notifContext';
import { getSwitchQuery } from '../../utils/getSwitchQuery';



const AppRouter = () => {
    const {store} = useContext(AuthContext)
    const {updateNotif} = useNotifContext()
    const navigate = useNavigate()
    const location = useLocation()

    const checkLeaving = async () => {
        window.addEventListener("beforeunload", alert('You are left trading'));
    }

    const checkLocation = () => {
        if (location.pathname === '/trading') {
            store.setTradingPath(true)
        } else {
            if (store.tradingPath === '/trading') {
                store.setTradingPath(false)
                checkLeaving()
            }
        }
    }

    useEffect( () => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
            // getNotification()
        }
        if (!localStorage.getItem('token')) {
            navigate('/')
        }
        sendDomainName()
        getRates()
    }, [])

    useEffect(() => {
        checkLocation()
    }, [location.pathname])

    const getRates = async () => {
        const res = await getRate()

        const obj = {
            btc: res.data[0].current_price,
            eth: res.data[1].current_price,
            usdt: res.data[2].current_price,
            sol: res.data[3].current_price,
            trx: res.data[4].current_price,
            bch: res.data[5].current_price,
            trxusdt: res.data[4].current_price,
        }
        const ratesChange = {
            btc: res.data[0].price_change_percentage_24h,
            eth: res.data[1].price_change_percentage_24h,
            usdt: res.data[2].price_change_percentage_24h,
            sol: res.data[3].price_change_percentage_24h,
            trx: res.data[4].price_change_percentage_24h,
            bch: res.data[5].price_change_percentage_24h,
        }
        store.setRatesChange(ratesChange)
        store.setRates(obj)
        store.setRatesFull(res.data)
    }

    const sendDomainName = async () => {
        const res = await getData(`${getSwitchQuery('/get_domain_params/')}${window.location.host}`)
        store.setDomain(res.data.domainInfo)
    }

    // const sendDomainName = async () => {
    //     const res = await fetch('http://164.92.245.8:8888/api/get_domain_params/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({domainName: window.location.host})
    //     })
    //     const datas = await res.json()
    //     store.setDomain(datas.domainInfo)
    // }


    if (store.isLoading) {
        return <Preloader />
    }

    const renderPages = () => {
        if (store.isAuth && store.isActivated || store.fullAccess || store.isAdmin) {
            return <AuthWrap />
        }
        return  <NonAuthWrap />
    }

    return (
        <>
            {
                renderPages()
            }
        </>
    )
}

export default observer(AppRouter)