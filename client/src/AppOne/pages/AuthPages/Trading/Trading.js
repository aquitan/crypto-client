import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './Trading.scss'
import {Col, Container, Form, Row} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import {getData, patchData, postData, putData} from "../../../services/StaffServices";
import Preloader from "../../../components/UI/Preloader/Preloader";
import Order from "./components/Order/Order";
import OrderItem from "./components/OrderItem/OrderItem";
import {v4 as uuid} from 'uuid'
import {store} from "../../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {SwalSimple} from "../../../utils/SweetAlert";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import CurrencyRates from "../../../components/CurrencyRates/CurrencyRates";
import {findPercent} from "../../../utils/findPercent";
import Select from "../../../components/UI/Select/Select";
import {coins} from "../../../../utils/tradingArr";
import {cleanup} from "@testing-library/react";

const Trading = () => {
    const [stateBalance, setStateBalance] = useState([])
    const [curVal, setCurVal] = useState(0)
    const [textVal, setTextVal] = useState({usd: 0, crypto: 0})
    const [formValueFirst, setFromValueFirst] = useState(0)
    const [formValueSecond, setFromValueSecond] = useState(0)
    const [textValTwo, setTextValTwo] = useState({usd: 0, crypto: 0})
    const [series, setSeries] = useState([])
    const [history, setHistory] = useState([])
    const [ask, setAsk] = useState([])
    const [bid, setBid] = useState([])
    const [limit, setLimit] = useState(0)
    const [data, setData] = useState(0)
    const [valCounter, setValCounter] = useState(0)
    const [coinRateCounter, setCoinRateCounter] = useState(0)

    const [orderBuy, setOrderBuy] = useState([])
    const [orderSell, setOrderSell] = useState([])
    const [coinPair, setCoinPair] = useState('BTC')
    const [state, setState] = useState({
        series: [
            {
                data: []
            }
        ],
        options: {
            chart: {
                type: 'candlestick',
                height: 550
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette2',
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
            }
        }
    })

    useEffect(() => {
        getOhlc()
        getSocket()
        getHistory()
        getTradingData()
        // getSocketOrder()
        getRateFromBinance()
        getBalance()
        setNewRate()
        // moveRate(24000, 22300)
        return () => {
            cleanup()
        }
    }, [])

    const getSocket = () => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${coinPair}usdt@miniTicker`)
        // socket.onopen = () => {
        //     socket.send(JSON.stringify({
        //         id: 1
        //     }))
        // }
        let stockObject = null;
        socket.onmessage = (e) => {
            // console.log('socket====', socket)
            // let stockObject = JSON.parse(e.data);
            // setCurVal(stockObject.c)
        }
    }
    // const getSocketOrder = () => {
    //     const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth20@1000ms')
    //     // socket.onopen = () => {
    //     //     socket.send(JSON.stringify({
    //     //         id: 1
    //     //     }))
    //     // }
    //     let stockObject = null;
    //     socket.onmessage = (e) => {
    //         let stockObject = JSON.parse(e.data);
    //         setAsk(stockObject.asks)
    //         setBid(stockObject.bids)
    //     }
    // }

    const getHistory = async () => {
        const res = await getData(`/trading/order_history/${store.user.id}/${limit}/10/`)
        setHistory(res.data)
    }
    const getTradingData = async () => {
        const res = await getData(`/trading/get_valid_trading_data/${window.location.host}`)
        setData(res.data[0].timeRangeInMs)
    }

    const sendOrderData = async (coinRate, coinValue, orderStatus, orderType) => {
        const obj = {
            userEmail: store.user.email,
            domainName: window.location.host,
            orderDate: dateToTimestamp(new Date()),
            coinName: 'BTC',
            coinRate,
            coinValue,
            orderStatus,
            orderType,
            valueInUsdt: +coinRate * +coinValue,
            userId: store.user.id
        }

        const res = await putData('/trading/make_order/', obj)
        if (res.status === 201) {
            SwalSimple('Order is created!')
        }
    }

    const getRateFromBinance = async () => {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${coinPair.toUpperCase()}USDT`)
        const data = await res.json()
        setCurVal(+data.lastPrice)
        console.log('res-binance', data)
    }
    const getBasicRate = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=fals')
        const data = await res.json()
        console.log('res----', data)
        // setCurVal(res.data)
    }

    const getOhlc = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1')
        let data = await res.json()
        let arr = []
        data.map(item => {
            let obj = {
                x: new Date(item[0]),
                y: [item[1], item[2], item[3], item[4]]
            }
            arr.push(obj)
        })
        setSeries(arr)
        setState({...state, series: [
                {
                    data: arr
                }
            ]})
    }

    const onChangeText = (e) => {
        let calc = +e.target.value * parseInt(textVal.crypto)
        setTextVal({...textVal, usd: +e.target.value})
        setFromValueFirst(calc)
    }
    const onChangeCrypto = (e) => {
        let calc = parseInt(textVal.usd) * +e.target.value
        setTextVal({...textVal, crypto: +e.target.value})
        setFromValueFirst(calc)
    }

    const onChangeSecondText = (e) => {
        let calc = +e.target.value * parseInt(textVal.crypto)
        setTextValTwo({...textValTwo, usd: +e.target.value})
        setFromValueSecond(calc)
    }
    const onChangeCryptoTwo = (e) => {
        let calc = parseInt(textValTwo.usd) * +e.target.value
        setTextValTwo({...textValTwo, crypto: +e.target.value})
        setFromValueSecond(calc)
    }

    const onSubmitFirstForm = (e) => {
        e.preventDefault()
        const data = JSON.stringify(textVal)
        setTextVal({text: '', mail: ''})
        console.log(data)
    }
    const onSubmitSecondForm = (e) => {
        e.preventDefault()
        const data = JSON.stringify(textValTwo)
        setTextValTwo({text: '', mail: ''})
        console.log(data)
    }

    const setValue = (val) => {
        // let calc = +val / parseInt(curVal)
        // setTextVal({text: val, mail: calc})
    }
    const setValueBuy = (val) => {
        // let calc = +val / parseInt(curVal)
        // setTextValTwo({text: val, mail: calc})
    }



    const onSell = async (e) => {
        e.preventDefault()
        let obj = {
            type: 'sell', price: textVal.usd, amount: textVal.crypto, total: textVal.usd
        }
        let idx = orderSell.findIndex(item => {
            return item.price === obj.price
        })
        if (idx !== -1) {
            setOrderSell([
                ...orderSell,
                orderSell[idx].total = (obj.price * (orderSell[idx].amount += obj.amount)),
                orderSell[idx].amount += obj.amount])
        }
        setOrderSell([obj, ...orderSell])
        await sendOrderData(textVal.usd, textVal.crypto, null, false)
        makeCandle()
        setTextVal({usd: '', crypto: ''})
    }

    const makeCandle = () => {
        let oldArr = state.series[0].data
        console.log('oldArr', oldArr)
        let object = {
            x: getCurrentDate(new Date()),
            y: [+curVal, +curVal+10, +curVal-10, +curVal+50]
        }
        setState({...state, series: [
                {
                    data: [...oldArr, object]
                }
            ]})

        // setInterval(() => {
        //     // setState({...state, series: [
        //     //         {
        //     //             data: [...state.series[0].data, +state.series[0].data[state.series[0].data.length-1].y[1]+10]
        //     //         }
        //     //     ]})
        // }, 1000)
    }

    const onBuy = async (e) => {
        e.preventDefault()
        let obj = {
            type: 'buy', price: textValTwo.usd, amount: textValTwo.crypto, total: textValTwo.usd
        }
        let idx = orderBuy.findIndex(item => {
            return item.price === obj.price
        })
        if (idx !== -1) {
            setOrderBuy([
                ...orderBuy,
                orderBuy[idx].total = (obj.price * (orderBuy[idx].amount += obj.amount)),
                orderBuy[idx].amount += obj.amount])
        }
        setOrderBuy([obj, ...orderBuy])
        // setOrderBuy([...orderBuy, obj])
        await sendOrderData(textValTwo.usd, textValTwo.crypto, null, true)
        setTextValTwo({crypto: '', usd: ''})
    }



    const makeRandomOrder = (min, max) => {
        if (min && max) {
            let val = min - 10 + Math.random() * (max - min + 10);
            let valCrypto = Math.random() * (0.0001 + 1);
            let obj = {
                type: 'buy',
                price: +val.toFixed(0),
                amount: valCrypto,
                total: +val.toFixed(0)
            }
            if (orderBuy.length > 0) {
                let idx = orderBuy.findIndex(item => {
                    return item.price === obj.price
                })
                if (idx !== -1) {
                    setOrderBuy([
                        ...orderBuy,
                        orderBuy[idx].total = (obj.price * (orderBuy[idx].amount += obj.amount)),
                        orderBuy[idx].amount += obj.amount])
                }
            }
            setOrderBuy([obj, ...orderBuy])

            if (orderBuy.length > 15) {
                setOrderBuy([...orderBuy.slice(0, -2), ...orderBuy.splice(-1,1)])
            }

        }
    }

    const makeRandomOrderSell = (min, max) => {
        if (min && max) {
            let val = min - 10 + Math.random() * (max - min + 10);
            let valCrypto = Math.random() * (0.0001 + 1);
            let obj = {
                type: 'sell',
                price: +val.toFixed(0),
                amount: valCrypto,
                total: +val.toFixed(0) * valCrypto
            }
            if (orderSell.length > 0) {
                let idx = orderSell.findIndex(item => {
                    return item.price === obj.price
                })
                if (idx !== -1) {
                    setOrderSell([
                        ...orderSell,
                        orderSell[idx].total = (obj.price * (orderSell[idx].amount += obj.amount)),
                        orderSell[idx].amount += obj.amount])
                }
            }
            setOrderSell([obj, ...orderSell])

            if (orderSell.length > 15) {
                console.log('length---', orderSell.length)
                setOrderSell([...orderSell.slice(0, -2), ...orderSell.splice(-1,1)])
            }

        }
    }

    useEffect(() => {
        makeRandomOrder(curVal, curVal)
        makeRandomOrderSell(curVal, curVal)
    }, [curVal])

    const onAbort = async (id) => {
        const res = await patchData(`/trading/cancel_order/${id}`)
        if (res.status === 202) {
            SwalSimple('Order deleted!')
            getHistory()
        }
    }

    useEffect(() => {
        getHistory()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    const onSuccessOrder = async () => {
        let obj = {
            orderId: '62a71b27010a771819a2d7e6',
            orderType: 'true'
        }
        const res = patchData('/trading/success_order/', obj)
    }

    const getBalance = async () => {
        const balance = await getData(`/get_user_balance/${store.user.id}`)
        console.log('balance', balance.data)
        setStateBalance(balance.data)
    }

    const countTotalBalance = () => {
        let total = 0
        let arr = []
        stateBalance.forEach(item => {
            if (item.coinName === 'BTC') {
                let val = item.coinBalance * findPercent(store.rates.btc, 0)
                arr.push(val)
            } else if (item.coinName === 'ETH') {
                let val = item.coinBalance * findPercent(store.rates.eth, 0)
                arr.push(val)
            } else if (item.coinName === 'BCH') {
                let val = item.coinBalance * findPercent(store.rates.bch, 0)
                arr.push(val)
            } else if (item.coinName === 'USDT') {
                let val = item.coinBalance * findPercent(store.rates.usdt, 0)
                arr.push(val)
            }

        })

        for (let i = 0; i <= arr.length - 1; i++) {
            total += arr[i]
        }
        store.setTotal(total.toFixed(3))
        return total.toFixed(3)
    }


    //  ================

    async function getRate(rate, val) {
        // calc final rate =>
        const growthTo = (rate / 100) * val
        const finalRate = rate + growthTo
        return finalRate
    }

    async function generateRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }


    useEffect(() => {
        functCounter(30000)
    }, [valCounter])


    const functCounter = (to) => {
        setTimeout(() => {
            if (valCounter < to) {
                setValCounter(valCounter+1)
            } else {
                setValCounter(0)
                resetBaseParams()
                onSuccessOrder()
            }
        }, 1000)
    }

    useEffect(() => {
        getSocket()
        getRateFromBinance()
    }, [coinPair])

    const onChangeCoinsPair = (e) => {
        setCurVal(0)
        setCoinPair(e.target.value)
    }

    useEffect(() => {
        setNewRate()
    }, [coinRateCounter])

    const setNewRate = () => {
        if (coinRateCounter < 300) {
            setTimeout(() => {
                let val = Math.random() * (1 + 10);
                setCoinRateCounter(coinRateCounter+1)
                setCurVal(prevState => prevState + val)
            }, 2000)
        }
        console.log('coinRateCounter', coinRateCounter)
    }

    const resetBaseParams = async () => {
        let data = {

        }
        const res = await patchData('/trading/send_base_params/', data)
    }


    return (
        <Container style={{maxWidth: 1700, width: '100%'}}>
            <Row>
                <Col className={'container-fluid'}>
                    <ButtonCard title={'Sell Orders'}>
                        <Order>
                            <Row style={{fontSize: 13}} className={'text-center mb-3'}>
                                <Col>Price USD</Col>
                                <Col>Amount Crypto</Col>
                                <Col>Total Price</Col>
                            </Row>
                            {
                                orderSell.length > 8?
                                    orderSell.map(order => {
                                        return <OrderItem key={uuid()} type={order.type} price={order.price} amount={order.amount} total={order.total} />
                                    })
                                    : <Preloader />
                            }
                            {/*{*/}
                            {/*    bid.length ?*/}
                            {/*        bid.map(order => {*/}
                            {/*            return <OrderItem key={uuid()} type={'sell'} price={order[0]} amount={+order[1]} total={order[0] * +order[1]} />*/}
                            {/*        })*/}
                            {/*        : null*/}
                            {/*}*/}
                        </Order>
                    </ButtonCard>
                    <ButtonCard title={'Buy Orders'}>
                        <Order>
                            <Row style={{fontSize: 13}} className={'text-center mb-3'}>
                                <Col>Price USD</Col>
                                <Col>Amount BTC</Col>
                                <Col>Total Price</Col>
                            </Row>
                            {
                                orderBuy.length > 8 ?
                                    orderBuy.map(order => {
                                        return <OrderItem key={uuid()} type={order.type} price={order.price} amount={order.amount} total={order.total} />
                                    })
                                    : <Preloader />
                            }
                            {/*{*/}
                            {/*    ask.length ?*/}
                            {/*        ask.map(order => {*/}
                            {/*            return <OrderItem key={uuid()} type={'buy'} price={order[0]} amount={+order[1]} total={order[0] * +order[1]} />*/}
                            {/*        })*/}
                            {/*        : null*/}
                            {/*}*/}
                        </Order>
                    </ButtonCard>
                </Col>
                <Col className={'col-12 col-lg-9'}>
                    <ButtonCard title={`${coinPair}: ${curVal.toFixed(5)} $`}>
                        <Row className={'mb-3'}>
                            <select style={{
                                backgroundColor: 'transparent',
                                color: '#fff',
                                maxWidth: 200,
                                padding: 10,
                                border: '1px solid #717579',
                                borderRadius: 20
                            }} onChange={onChangeCoinsPair} value={coinPair} >
                                {
                                    coins.map(coin => {
                                        return <option key={coin.value} value={coin.value}>{coin.text}</option>
                                    })
                                }
                            </select>
                        </Row>
                        {
                            series ?
                                <ReactApexChart options={state.options} series={state.series} type="candlestick" height={350} />
                                : <Preloader />
                        }
                    </ButtonCard>

                    {/*<ButtonCard>*/}
                    {/*    <div className="tradingview-widget-container">*/}
                    {/*        <div id="chartdiv"/>*/}
                    {/*    </div>*/}
                    {/*</ButtonCard>*/}
                    <ButtonCard title={'Make order'}>
                        <Button onClick={onSuccessOrder}>Success</Button>
                        <Row>
                            <Col>
                                <Row className="d-flex justify-content-between flex-wrap trading">
                                    <Col className={'col-12'}>
                                        <Form>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label='Amount in USD'
                                                    type="text"
                                                    placeholder='Enter your price'
                                                    onChange={onChangeText}
                                                    value={textVal.text}
                                                />
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label="Amount in Crypto"
                                                    type="text"
                                                    placeholder={'Enter your amount in crypto'}
                                                    onChange={onChangeCrypto}
                                                    value={textVal.mail}
                                                />
                                            </Row>
                                            <Row>
                                                <Col style={{padding: '0 15px'}} className={'d-flex justify-content-between'}>
                                                    <Button classname={['mb-3', 'round']} onClick={() => setValue(25)}>25%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={() => setValue(50)}>50%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={() => setValue(75)}>75%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={() => setValue(100)}>100%</Button>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Input readOnly value={formValueFirst} disabled placeholder={'Total in USD'}/>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p style={{fontSize: 12}}>Transaction fee is 1%</p>
                                                </Col>
                                                <Col>
                                                    <p style={{fontSize: 12}}>Balance is:&nbsp;
                                                        <b>{ (+countTotalBalance() / +findPercent(store.rates.btc, 0).toFixed(5)).toFixed(5)}</b> USDT</p>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Col>
                                                    <Button onClick={onSell} classname={['red_btn']} >Sell</Button>
                                                </Col>
                                            </Row>
                                        </Form>

                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className="d-flex justify-content-between flex-wrap trading">
                                    <Col className={'col-12'}>
                                        <Form>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label='Amount in USD'
                                                    type="text"
                                                    placeholder='Enter your price'
                                                    onChange={onChangeSecondText}
                                                    value={textValTwo.text}

                                                />
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label="Amount in Crypto"
                                                    type="text"
                                                    onChange={onChangeCryptoTwo}
                                                    placeholder={'Enter your amount in crypto'}
                                                />
                                            </Row>

                                            <Row>
                                                <Col style={{padding: '0 15px'}} className={'d-flex justify-content-between'}>
                                                    <Button classname={['mb-3', 'round']} onClick={() => setValueBuy(25)}>25%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={() => setValueBuy(50)}>50%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={() => setValueBuy(75)}>75%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={() => setValueBuy(100)}>100%</Button>
                                                </Col>
                                            </Row>

                                            <Row className={'mb-3'}>
                                                <Input readOnly value={formValueSecond} placeholder={'Total in USD'} />
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p style={{fontSize: 12}}>Transaction fee is 1%</p>
                                                </Col>
                                                <Col>
                                                    <p style={{fontSize: 12}}>Balance is:&nbsp;
                                                        <b>{(+countTotalBalance() / +findPercent(store.rates.btc, 0).toFixed(5)).toFixed(5)}</b> USDT</p>
                                                </Col>
                                            </Row>

                                            <Row className={'mb-3'}>
                                                <Col>
                                                    <Button onClick={onBuy} classname={['green_btn']} >Buy</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </ButtonCard>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonCard title={'History'}>
                        <Row style={{borderBottom: '1px solid #fff', marginBottom: 10, paddingBottom: 10}}>
                            <Col>Date</Col>
                            <Col>Type</Col>
                            <Col>Coin</Col>
                            <Col>Price</Col>
                            <Col>Amount</Col>
                            <Col>Action</Col>
                        </Row>
                        {
                            history.length ?
                                history.map(item => {
                                    return(
                                        <Row key={item._id} style={
                                            {
                                                borderBottom: '1px solid #fff',
                                                marginBottom: 10,
                                                paddingBottom: 10,
                                                color: item.orderStatus ? 'lightgreen' : item.orderStatus === null ? 'orange' : 'tomato'
                                            }}>
                                            <Col>{getCurrentDate(item.orderDate)}</Col>
                                            <Col>{item.orderType ? 'Buy' : 'Sell'}</Col>
                                            <Col>{item.coinName}</Col>
                                            <Col>{item.coinRate}</Col>
                                            <Col>{item.coinValue}</Col>
                                            <Col>
                                                <Button onClick={() => onAbort(item._id)} classname={['round', 'red']}>Abort</Button>
                                            </Col>
                                        </Row>
                                    )
                                })
                                : <h3>No orders!</h3>
                        }

                        <Row className={'mb-3 mt-3'}>
                            {
                                history.length >= 3 ?
                                    <AdminButton onClick={onMore} classname={['xs', 'green']}>Еще</AdminButton>
                                    : null
                            }
                            {
                                limit > 0 ?
                                    <AdminButton onClick={onLess} classname={['xs', 'green']}>Назад</AdminButton>
                                    : null
                            }
                        </Row>

                    </ButtonCard>
                </Col>
            </Row>
        </Container>
    )
}

Trading.propTypes = {
    
}
Trading.defaultProps = {
    
}

export default Trading