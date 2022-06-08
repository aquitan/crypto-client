import React, {useContext, useEffect, useState} from 'react'
import {AuthContext, store} from "../../../index";
import {observer} from "mobx-react-lite";
import AuthWrap from "../../layouts/AuthWrap/AuthWrap";
import NonAuthWrap from "../../layouts/NonAuthWrap/NonAuthWrap";
import {getData, postData} from "../../services/StaffServices";
import {useNavigate} from "react-router-dom";
import {getRate} from "../../services/CurrencyService";
import {useQuery} from 'react-query'
import {findPercent} from "../../utils/findPercent";


const AppRouter = () => {
    const {store} = useContext(AuthContext)
    const [state, setState] = useState([])
    const [percent, setPercent] = useState([])
    const navigate = useNavigate()
    // const {isLoading, data, error} = useQuery('notif query', async () => {
    //     if (store.isAuth) {
    //         const res = await postData('/get_domain_params/', {domainName: window.location.host})
    //         if (res.data) {
    //             const balance = await getData(`/get_user_balance/${store.user.id}`)
    //             setState(balance.data)
    //             countTotalBalance()
    //         }
    //         setPercent(store.domain.domainParams.rateCorrectSum)
    //         store.setDepositFee(res.data.domainInfo.domainParams.depositFee)
    //         store.setDomain(res.data.domainInfo)
    //     }
    // })

    useEffect( () => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        if (!localStorage.getItem('token')) {
            console.log('to landing')
            navigate('/')
        }
        sendDomainName()
        getRates()

    }, [])

    const countTotalBalance = () => {
        console.log('blance state', state)
        let total = 0
        let arr = []
        state.forEach(item => {
            if (item.coinName === 'BTC') {
                let val = item.coinBalance * findPercent(store.rates.btc, percent)
                arr.push(val)
            } else if (item.coinName === 'ETH') {
                let val = item.coinBalance * findPercent(store.rates.eth, percent)
                arr.push(val)
            } else if (item.coinName === 'BCH') {
                let val = item.coinBalance * findPercent(store.rates.bch, percent)
                arr.push(val)
            } else if (item.coinName === 'USDT') {
                let val = item.coinBalance * findPercent(store.rates.usdt, percent)
                arr.push(val)
            }
        })

        for (let i = 0; i <= arr.length - 1; i++) {
            total += arr[i]
        }
        store.setTotal(total.toFixed(3))
    }

    const getRates = async () => {
        const res = await getRate()

        console.log('res data rates', res.data)
        const obj = {
            btc: res.data[0].current_price,
            eth: res.data[1].current_price,
            usdt: res.data[2].current_price,
            sol: res.data[3].current_price,
            trx: res.data[4].current_price,
            bch: res.data[5].current_price,
        }
        const ratesChange = {
            btc: res.data[0].price_change_24h,
            eth: res.data[1].price_change_24h,
            usdt: res.data[2].price_change_24h,
            sol: res.data[3].price_change_24h,
            trx: res.data[4].price_change_24h,
            bch: res.data[5].price_change_24h,
        }
        store.setRatesChange(ratesChange)
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