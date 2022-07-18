import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../../index";
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
import SlickSlider from "../../../components/UI/SlickSlider/SlickSlider";
import {observer} from "mobx-react-lite";
import MarketDepth from "../../../components/MarketDepth/MarketDepth";

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
        const controller = new AbortController();
        getDashboard()
        getRates()
        getBalance()
        return () => {
            // cancel the request before component unmounts
            controller.abort();
        };
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
    }

    const countTotalBalance = () => {
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
        return total.toFixed(3)
    }

    return (
        <Container>
            {/*<Row>*/}
            {/*    <CurrencyRates/>*/}
            {/*</Row>*/}
            <Row className='mb-3'>
                {/*<Row>*/}
                {/*    <Col className='col-1'>*/}
                {/*        <h5>Welcome!</h5>*/}
                {/*    </Col>*/}
                {/*    <Col>*/}
                {/*        <span>{store.user.name ? store.user.name : store.userEmail}</span>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <Row>
                    {
                        state ?
                            <b>Total balance: ${state ? countTotalBalance() : <Preloader/>}</b>
                            : <Preloader />
                    }

                </Row>
            </Row>

            <Row>
                <Col>
                    <ButtonCard>
                        <Row>
                            {
                                store.ratesChange.btc && store.rates.btc ?
                                    <SlickSlider>
                                        <div>
                                            <div className='' style={{padding: '0 5px', margin: '0 5px'}}>
                                                <WalletInfoBlock
                                                    balance={store.rates.btc}
                                                    currency='BTC'
                                                    amount={store.ratesChange.btc?.toFixed()}
                                                    status={currencyRateChangeIndicator(store.ratesChange.btc.toFixed())}
                                                    color='BTC' />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='' style={{padding: '0 5px'}}>
                                                <WalletInfoBlock
                                                    balance={store.rates.eth}
                                                    currency='ETH'
                                                    amount={store.ratesChange.eth?.toFixed()}
                                                    status={currencyRateChangeIndicator(store.ratesChange.eth.toFixed())}
                                                    color='ETH' />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='' style={{padding: '0 5px'}}>
                                                <WalletInfoBlock
                                                    balance={store.rates.bch}
                                                    currency='BCH'
                                                    amount={store.ratesChange.bch?.toFixed()}
                                                    status={currencyRateChangeIndicator(store.ratesChange.bch.toFixed())}
                                                    color='BCH'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='' style={{padding: '0 5px'}}>
                                                <WalletInfoBlock
                                                    balance={store.rates.usdt}
                                                    currency='USDT'
                                                    amount={store.ratesChange.usdt?.toFixed()}
                                                    status={currencyRateChangeIndicator(store.ratesChange.usdt.toFixed())}
                                                    color='BCH' />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='' style={{padding: '0 5px'}}>
                                                <WalletInfoBlock
                                                    balance={store.rates.sol}
                                                    currency='SOL'
                                                    amount={store.ratesChange.sol?.toFixed()}
                                                    status={currencyRateChangeIndicator(store.ratesChange.sol.toFixed())}
                                                    color='SOL' />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='' style={{padding: '0 5px'}}>
                                                <WalletInfoBlock
                                                    balance={store.rates.trx}
                                                    currency='TRX'
                                                    amount={store.ratesChange.trx?.toFixed()}
                                                    status={currencyRateChangeIndicator(store.ratesChange.trx.toFixed())}
                                                    color='TRX' />
                                            </div>
                                        </div>
                                    </SlickSlider>
                                    : <Preloader />
                            }
                        </Row>
                    </ButtonCard>
                </Col>
            </Row>
            <Row>
                <Col className={'col-12 col-md-6'}>
                    <ButtonCard title={'Market depth'}>
                        <MarketDepth />
                    </ButtonCard>
                </Col>
                <Col className={'col-12 col-md-6'}>
                    <ButtonCard title={'Crypto Statistics'}>
                        <div className="tradingview-widget-container" id="dashboard-trading-widget"
                             style={{width: '100%', height: 320}}>
                            <iframe scrolling="no" frameBorder="0"
                                    src="https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22BINANCE%3ABTCUSDT%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A320%2C%22dateRange%22%3A%2212M%22%2C%22colorTheme%22%3A%22dark%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22%22%2C%22utm_source%22%3A%22bitluck.club%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%7D"
                                    style={{boxSizing: 'border-box', height: 320, width: '100%'}}></iframe>
                        </div>
                    </ButtonCard>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonCard>
                        <Row className={'justify-content-center'}>
                            <Col className='col-12 col-md-8 mb-3'>
                                <FontAwesomeIcon style={{marginRight: 20}} icon={faEnvelope} size='lg' />Ask a question or file a support ticket, manage requests or report an issues. Our Support team will get back to you by chat.
                            </Col>
                            <Col className='col-12 col-md-2'>
                                <Button onClick={() => navigate('/support')}>Go to support</Button>
                            </Col>
                        </Row>
                    </ButtonCard>
                </Col>
            </Row>
        </Container>
    )
}

export default observer(Dashboard)