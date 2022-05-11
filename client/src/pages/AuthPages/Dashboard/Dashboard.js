import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../index";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import WalletInfoBlock from "../../../components/UI/WalletInfoBlock/WalletInfoBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {getGeoData} from "../../../queries/getSendGeoData";
import {currencyRateChangeIndicator} from "../../../utils/currencyRateChangeIndicator";
import CurrencyRates from "../../../components/CurrencyRates/CurrencyRates";
import {findPercent} from "../../../utils/findPercent";
import Preloader from "../../../components/UI/Preloader/Preloader";

const Dashboard = () => {
    const [state, setState] = useState([])
    const [percent, setPercent] = useState([])
    const getDashboard = async () => {
        let geodata = await getGeoData()
        geodata.domainName = window.location.host
        geodata.id = store.user.id
        const res = await postData('/dashboard/', geodata)
    }
    const navigate = useNavigate()
    useEffect(() => {
        getDashboard()
        getRates()
        getBalance()
    }, [])

    if (store.isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
    const getRates = () => {
        setState(store.domain.domainParams.rateCorrectSum)
    }

    const getBalance = async () => {
        const balance = await getData(`/get_user_balance/${store.user.id}`)
        setState(balance.data)
        setPercent(store.domain.domainParams.rateCorrectSum)
        // countTotalBalance()
    }

    // const countTotalBalance = () => {
    //     console.log('blance state', state)
    //     let total = 0
    //     let arr = []
    //     state.forEach(item => {
    //         if (item.coinName === 'BTC') {
    //             let val = item.coinBalance * findPercent(store.rates.btc, percent)
    //             arr.push(val)
    //         } else if (item.coinName === 'ETH') {
    //             let val = item.coinBalance * findPercent(store.rates.eth, percent)
    //             arr.push(val)
    //         } else if (item.coinName === 'BCH') {
    //             let val = item.coinBalance * findPercent(store.rates.bch, percent)
    //             arr.push(val)
    //         } else if (item.coinName === 'USDT') {
    //             let val = item.coinBalance * findPercent(store.rates.usdt, percent)
    //             arr.push(val)
    //         }
    //
    //     })
    //
    //     for (let i = 0; i <= arr.length - 1; i++) {
    //         total += arr[i]
    //     }
    //     store.setTotal(total.toFixed(3))
    // }

    console.log('store-rates', store.ratesChange.btc)

    return (
        <Container>
            <CurrencyRates/>
            <Row className='mb-3'>
                <Row>
                    <Col className='col-1'>
                        <h5>Welcome!</h5>
                    </Col>
                    <Col>
                        <span>{store.user.name ? store.user.name : store.userEmail}</span>
                    </Col>
                </Row>
                <Row>
                    <b>Total balance: $ {store.total}</b>
                </Row>
            </Row>

            <ButtonCard>
                <Row>
                    {
                        store.ratesChange.btc ?
                            <>
                                <Col className='col-12 col-md-3 mb-3'>
                                    <WalletInfoBlock
                                        currency='BTC'
                                        amount={store.ratesChange.btc?.toFixed()}
                                        status={currencyRateChangeIndicator(store.ratesChange.btc.toFixed())}
                                        color='BTC' />
                                </Col>
                                <Col className='col-12 col-md-3 mb-3'>
                                    <WalletInfoBlock
                                        currency='ETH'
                                        amount={store.ratesChange.eth?.toFixed()}
                                        status={currencyRateChangeIndicator(store.ratesChange.eth.toFixed())}
                                        color='ETH' />
                                </Col>
                                <Col className='col-12 col-md-3 mb-3'>
                                    <WalletInfoBlock
                                        currency='BCH'
                                        amount={store.ratesChange.bch?.toFixed()}
                                        status={currencyRateChangeIndicator(store.ratesChange.bch.toFixed())}
                                        color='BCH'
                                    />
                                </Col>
                                <Col className='col-12 col-md-3 mb-3'>
                                    <WalletInfoBlock
                                        currency='USDT'
                                        amount={store.ratesChange.usdt?.toFixed()}
                                        status={currencyRateChangeIndicator(store.ratesChange.usdt.toFixed())}
                                        color='BCH' />
                                </Col>
                            </>
                        : <Preloader />
                    }
                </Row>
            </ButtonCard>
            <ButtonCard>
                <Row>
                    <Col className='col-12 col-md-2 align-items-center'>
                        <FontAwesomeIcon icon={faEnvelope} size='lg' />
                    </Col>
                    <Col className='col-12 col-md-8'>
                        Ask a question or file a support ticket, manage requests or report an issues. Our Support team will get back to you by chat.
                    </Col>
                    <Col className='col-12 col-md-2'>
                        <Button onClick={() => navigate('/support')}>Go to support</Button>
                    </Col>
                </Row>
            </ButtonCard>
        </Container>
    )
}

export default Dashboard