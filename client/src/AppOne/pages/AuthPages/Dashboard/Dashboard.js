import React, {useEffect, useState} from 'react'
import {Col, Modal, Row} from "react-bootstrap";
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import WalletInfoBlock from "../../../components/UI/WalletInfoBlock/WalletInfoBlock";
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {getGeoData} from "../../../queries/getSendGeoData";
import {currencyRateChangeIndicator} from "../../../utils/currencyRateChangeIndicator";
import {findPercent} from "../../../utils/findPercent";
import Preloader from "../../../components/UI/Preloader/Preloader";
import SlickSlider from "../../../components/UI/SlickSlider/SlickSlider";
import {observer} from "mobx-react-lite";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import MarketOverviewItem from "../../../components/MarketOverviewItem/MarketOverviewItem";
import Input from "../../../components/UI/Input/Input";
import InternalSwap from "../InternalSwap/InternalSwap";

const Dashboard = () => {
    const {theme} = useThemeContext(ThemeContext)
    const [search, setSearch] = useState('')
    const [state, setState] = useState([])
    const [balance, setBalance] = useState([])
    const [percent, setPercent] = useState([])
    const [markets, setMarkets] = useState([])
    const [show, setShow] = useState(false)
    const coinsArr = ['btc', 'eth', 'bch', 'usdt', 'sol', 'trx']

    const getDashboard = async () => {
        let geodata = await getGeoData()
        geodata.domainName = window.location.host
        geodata.id = store.user.id
        const res = await postData('/dashboard/', geodata)
    }
    useEffect(() => {
        const controller = new AbortController();
        getDashboard()
        getRates()
        getBalance()
        getMarketOverview()
        return () => {
            // cancel the request before component unmounts
            controller.abort();
        };
    }, [])

    useEffect(() => {
        let timeout = setTimeout(() => {
            getMarketOverview()
        }, 15000)
        return () => clearTimeout(timeout)
    }, [])

    if (store.isLoading) {
        return (
            <Preloader />
        )
    }
    const getRates = () => {
        setState(store.domain.domainParams.rateCorrectSum)
    }

    const getBalance = async () => {
        const res = await getData(`/get_user_balance/${store.user.id}`)
        setBalance(res.data)
    }

    const getMarketOverview = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
        const data = await res.json()
        setMarkets(data)
    }


    const countTotalBalance = () => {
        let total = 0
        let arr = []
        balance.forEach(item => {
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

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const filteredCoins = markets.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    const handleClose = () => {
        setShow(false)
    }

    return (
        <>

            <Modal
                style={{opacity: 1, zIndex: 99999}}
                show={show}
                onHide={handleClose}
                animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Exchange currencies</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InternalSwap />
                </Modal.Body>
            </Modal>

            <Row className='mb-3'>
                <Row>
                    {
                        balance.length ?
                            <b>Total balance: ${balance.length ? countTotalBalance().toLocaleString() : <Preloader/>}</b>
                            : <Preloader />
                    }

                </Row>
            </Row>

            <Row className='p-0'>
                <Col className='p-0 col-12 col-xl-8'>
                    <Row className='p-0'>
                        <Col>
                            <ButtonCard style={{paddingRight: 10, paddingLeft: 10}} theme={theme}>
                                <Row>
                                    <h2>Market coins</h2>
                                    <p>Daily updated coins info</p>
                                </Row>
                                <Row style={{margin: 0, padding: 0}}>
                                    {
                                        store.ratesChange.btc && store.rates.btc && balance.length ?
                                            <SlickSlider>
                                                {
                                                    coinsArr.map(item => {
                                                        return (
                                                          <WalletInfoBlock
                                                            key={item}
                                                            rate={store.rates[item]}
                                                            balance={balance.filter(el => el.coinName === item.toUpperCase())[0]}
                                                            currency={item.toUpperCase()}
                                                            amount={store.ratesChange[item]?.toFixed()}
                                                            status={currencyRateChangeIndicator(store.ratesChange[item].toFixed())}
                                                            theme={theme}
                                                          />
                                                        )
                                                    })
                                                }
                                            </SlickSlider>
                                            : <Preloader />
                                    }
                                </Row>
                            </ButtonCard>
                        </Col>
                        <Row className='mb-4 d-block d-xl-none'>
                            <Button classname='btnBlue' onClick={() => setShow(true)}>
                                Exchange currencies
                            </Button>
                        </Row>
                    </Row>
                    <Row>
                        <Row>
                            <ButtonCard theme={theme}>
                                <Row className='mb-5'>
                                    <Col>
                                        <h2>Market overview</h2>
                                    </Col>
                                    <Col>
                                        <Input classname='inputTransparent' placeholder='Search Coin Name' type="text" onChange={handleChange}/>
                                    </Col>
                                </Row>

                                {filteredCoins.map(item => {
                                    return (
                                        <MarketOverviewItem
                                            theme={theme}
                                            key={item.name}
                                            name={item.name}
                                            image={item.image}
                                            symbol={item.symbol}
                                            price={item.current_price}
                                            volume={item.market_cap}
                                            priceChange={item.price_change_percentage_24h}
                                        />
                                    )
                                })}
                            </ButtonCard>
                        </Row>
                    </Row>
                </Col>
                <Col className='d-none d-xl-block'>
                    <Row>
                        <InternalSwap />
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default observer(Dashboard)