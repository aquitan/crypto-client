import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {getData, patchData, postData} from "../../../../../services/StaffServices";
import {store} from "../../../../../../index";
import {generateRandomInt} from "../../../../../utils/generateRandomInt";
import {shaffleData} from "../../../../../utils/shaffleData";
import {sortDataArray} from "../../../../../utils/sortArr";
import {SwalSimple} from "../../../../../utils/SweetAlert";
import {Col, Container, Form, Row} from "react-bootstrap";
import ButtonCard from "../../../../../components/ButtonCard/ButtonCard";
import Order from "../../../Trading/components/Order/Order";
import OrderItem from "../../../Trading/components/OrderItem/OrderItem";
import {v4 as uuid} from "uuid";
import ReactApexChart from "react-apexcharts";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import {coins} from "../../../../../../utils/tradingArr";
import Input from "../../../../../components/UI/Input/Input";
import Button from "../../../../../components/UI/Button/Button";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";

const TradingEthereum = () => {
    const [stateBalance, setStateBalance] = useState([])
    const [formValueFirst, setFromValueFirst] = useState(0)
    const [formValueSecond, setFromValueSecond] = useState(0)
    const [orderSell, setOrderSell] = useState([])
    const [orderBuy, setOrderBuy] = useState([])
    const [series, setSeries] = useState([])
    const [curVal, setCurVal] = useState(0)
    const [initialRate, setInitialRate] = useState(0)
    const [coinPair, setCoinPair] = useState('BTC')
    const [textVal, setTextVal] = useState({usd: '', crypto: ''})
    const [textValTwo, setTextValTwo] = useState({usd: '', crypto: ''})
    const [history, setHistory] = useState([])
    const [limit, setLimit] = useState(0)
    const [data, setData] = useState(0)
    const [ratePercent, setRatePercent] = useState(5)
    const [counter, setCounter] = useState(0)
    const [priceVal, setPriceVal] = useState({
        sell: 0,
        buy: 0
    })
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
        getRateFromBinance()
        getOhlc()
        getHistory()
        getBalance()
    }, [])

    const getHistory = async () => {
        const res = await getData(`/trading/order_history/${store.user.id}/${limit}/10/`)
        setHistory(res.data)
    }
    const getTradingData = async () => {
        const res = await getData(`/trading/get_valid_trading_data/${window.location.host}`)
        setData(res.data[0].timeRangeInMs)
    }
    const getBalance = async () => {
        const balance = await getData(`/get_user_balance/${store.user.id}`)
        console.log('balance', balance.data)
        setStateBalance(balance.data)
    }

    const getRateFromBinance = async () => {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT`)
        const datas = await res.json()
        setInitialRate(+datas.lastPrice)
        setCurVal(+datas.lastPrice)
        generateOrders(+datas.lastPrice, 300000, +datas.lastPrice)
        generateOrdersBuy(+datas.lastPrice, 300000)
        console.log('res-binance', datas)
    }

    const getOhlc = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=1')
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

    const generateOrders = (currentValue, timeLimit, initialRate) => {

        let dataArray = []
        let validArray = []
        async function emulateOrders(len, curRate) {
            for (let x = 0; x <= len; x++) {
                const rand = await generateRandomInt(0.5, 1.3)
                const valueUp = await generateRandomInt(40, 130)
                let valueData = await shaffleData(curRate)
                let obj = {
                    price: (+valueData.price + +rand).toFixed(2),
                    amountInCrypto: valueData.amountInCrypto,
                }
                console.log('valueData', valueData)
                if (dataArray.length > 17) {
                    dataArray.shift(dataArray[0])
                }
                for (let n = 0; n <= dataArray.length - 1; n++) {
                    if (dataArray[n].price === obj.price) {
                        obj.price = (+obj.price + valueUp).toFixed(3)
                    }
                }
                dataArray.push(obj)
            }
            // console.log('data arr len is', dataArray.length, 'elems => ', dataArray);
            validArray = await sortDataArray(dataArray)

            return validArray
        }
        emulateOrders(17, currentValue)
// ===================

        let percentOfRate = initialRate * ratePercent / 100
        let period = parseInt((timeLimit / percentOfRate).toFixed(0)) * 1000
        let counter = 0
        async function moveRate(from, to) {
            let curTime = await generateRandomInt(1300, 3500)
            let randRate = await generateRandomInt(0.1, 1)

            if (counter <= to) {

                setTimeout(async () => {
                    await moveRate(from, to)
                    validArray.shift(validArray[0])
                    let dataToOrderList = await shaffleData(from)
                    validArray.push(dataToOrderList)
                    setOrderSell(validArray)
                    counter = counter + curTime
                    setCounter(prevState => prevState + curTime)
                    setCurVal(prevState => +(prevState + randRate).toFixed(5))
                }, curTime)
            } else {
                console.log('ended')
            }
        }
        moveRate(currentValue, 300000)
    }

    const sendResult = async () => {
        const res = await postData('/api/123', {status: false})
    }


    ////////
    const generateOrdersBuy = (currentValue, timeLimit) => {
        let dataArray = []
        let validArray = []
        async function emulateOrders(len, curRate) {
            for (let x = 0; x <= len; x++) {
                const rand = await generateRandomInt(0.05, 0.2)
                const valueUp = await generateRandomInt(40, 130)
                let valueData = await shaffleData(curRate)
                let obj = {
                    price: (+valueData.price + +rand).toFixed(2),
                    amountInCrypto: valueData.amountInCrypto,
                }
                console.log('valueData', valueData)
                if (dataArray.length > 17) {
                    dataArray.shift(dataArray[0])
                }
                for (let n = 0; n <= dataArray.length - 1; n++) {
                    if (dataArray[n].price === obj.price) {
                        obj.price = (+obj.price + valueUp).toFixed(3)
                    }
                }
                dataArray.push(obj)
            }
            // console.log('data arr len is', dataArray.length, 'elems => ', dataArray);
            validArray = await sortDataArray(dataArray)

            return validArray
        }
        emulateOrders(17, currentValue)
// ===================

        let percentOfRate = initialRate * ratePercent / 100
        let period = parseInt((timeLimit / percentOfRate).toFixed(0)) * 1000
        let counter = 0
        async function moveRate(from, to) {
            let curTime = await generateRandomInt(1300, 3500)
            let randRate = await generateRandomInt(0.05, 0.2)

            if (counter <= to) {

                setTimeout(async () => {
                    await moveRate(from, to)
                    validArray.shift(validArray[0])
                    let dataToOrderList = await shaffleData(from)
                    validArray.push(dataToOrderList)
                    setOrderBuy(validArray)
                    counter = counter + curTime
                }, curTime)
            } else {
                console.log('ended')
            }
        }
        moveRate(currentValue, 300000)
    }

    const onChangeCoinsPair = (e) => {
        setCurVal(0)
        setOrderSell([])
        setCoinPair(e.target.value)
        generateOrders(curVal, 100000, initialRate)
    }

    /// Make order forms

    const onChangeText = (e) => {
        setTextVal({...textVal, usd: e.target.value,})
        console.log('e-target', e.target.value)
        let calc = +e.target.value * +textVal.crypto
        setFromValueFirst(calc)
    }
    const onChangeCrypto = (e) => {
        console.log('target-crypto', e.target.value)
        setTextVal({...textVal, crypto: e.target.value})
        let calc = +textVal.usd * +e.target.value
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


    const setValue = (val, e) => {
        e.preventDefault()

        let coinBal = stateBalance[0].coinBalance / curVal
        let calc = coinBal * +val / 100
        console.log('percent', calc)
        let calcResult = +textVal.usd * +calc.toFixed(5)
        setFromValueFirst(calcResult)
        setTextVal({...textVal, crypto: calc.toFixed(5)})
    }
    const setValueBuy = (val, e) => {
        e.preventDefault()
        let coinBal = stateBalance[0].coinBalance / curVal
        let calc = coinBal * +val / 100
        console.log('percent', calc)
        let calcResult = +textVal.usd * +calc.toFixed(5)
        setFromValueSecond(calcResult)
        setTextValTwo({...textValTwo, crypto: calc.toFixed(5)})
    }

    const onSell = async (e) => {
        e.preventDefault()
        let obj = {
            type: 'sell', price: textVal.usd, amountInCrypto: textVal.crypto, total: textVal.usd
        }
        let idx = orderSell.findIndex(item => {
            return item.price === obj.price
        })
        if (idx !== -1) {
            setOrderSell([
                ...orderSell,
                orderSell[idx].total = (obj.price * (orderSell[idx].amountInCrypto += obj.amount)),
                orderSell[idx].amountInCrypto += obj.amount])
        }
        setOrderSell([obj, ...orderSell])
        setPriceVal({...priceVal, sell: +textVal.usd})
        // await sendOrderData(textVal.usd, textVal.crypto, null, false)
        // makeCandle()
        setTextVal({usd: '', crypto: ''})
    }

    const onBuy = async (e) => {
        e.preventDefault()
        let obj = {
            type: 'buy', price: textValTwo.usd, amountInCrypto: textValTwo.crypto, total: textValTwo.usd
        }
        let idx = orderBuy.findIndex(item => {
            return item.price === obj.price
        })
        if (idx !== -1) {
            setOrderBuy([
                ...orderBuy,
                orderBuy[idx].total = (obj.price * (orderBuy[idx].amountInCrypto += obj.amount)),
                orderBuy[idx].amountInCrypto += obj.amount])
        }
        setOrderBuy([obj, ...orderBuy])
        setPriceVal({...priceVal, buy: textValTwo.usd})
        // await sendOrderData(textVal.usd, textVal.crypto, null, false)
        // makeCandle()
        setTextValTwo({usd: '', crypto: ''})
    }
    const onAbort = async (id) => {
        const res = await patchData(`/trading/cancel_order/${id}`)
        if (res.status === 202) {
            SwalSimple('Order deleted!')
            getHistory()
        }
    }
    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    return (
        <Container>
            <Row>
                <Col className={'col-12 col-md-3'}>
                    <ButtonCard title={'Sell Orders'}>
                        <Order>
                            <Row style={{fontSize: 13}} className={'text-center mb-3'}>
                                <Col>Price USD</Col>
                                <Col>Amount Crypto</Col>
                                <Col>Total Price</Col>
                            </Row>
                            {
                                orderSell.length > 2 ?
                                    orderSell.map(order => {
                                        return (
                                            <OrderItem
                                                key={uuid()}
                                                type={'sell'}
                                                price={order.price}
                                                amount={order.amountInCrypto}
                                                total={(order.price * order.amountInCrypto).toFixed(5)} />
                                        )
                                    })
                                    : <Preloader />
                            }
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
                                orderBuy.length ?
                                    orderBuy.map(order => {
                                        return <OrderItem
                                            key={uuid()}
                                            type={'buy'}
                                            price={order.price}
                                            amount={order.amountInCrypto}
                                            total={(order.price * order.amountInCrypto).toFixed(5)} />
                                    })
                                    : <Preloader />
                            }
                        </Order>
                    </ButtonCard>
                </Col>
                <Col className={'col-12 col-md-9'}>
                    <ButtonCard title={`ETH: ${curVal.toFixed(5)} $`}>
                        {
                            series ?
                                <ReactApexChart options={state.options} series={state.series} type="candlestick" height={350} />
                                : <Preloader />
                        }
                    </ButtonCard>
                    <ButtonCard title={'Make order'}>
                        <Row>
                            <Col className={'p-0 col-12 col-md-6'}>
                                <Row className="d-flex justify-content-between flex-wrap trading">
                                    <Col className={'col-12 p-0'}>
                                        <Form>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label='Amount in USD'
                                                    type="text"
                                                    placeholder='Enter your price'
                                                    onChange={onChangeText}
                                                    value={textVal.usd}
                                                />
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label="Amount in Crypto"
                                                    type="text"
                                                    placeholder={'Enter your amount in crypto'}
                                                    onChange={onChangeCrypto}
                                                    value={textVal.crypto}
                                                />
                                            </Row>
                                            <Row>
                                                <Col style={{padding: '0 15px'}} className={'d-flex justify-content-between'}>
                                                    <Button classname={['mb-3', 'round']} onClick={(e) => setValue(25, e)}>25%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={(e) => setValue(50, e)}>50%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={(e) => setValue(75, e)}>75%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={(e) => setValue(100, e)}>100%</Button>
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
                                                        {/*<b>{ */}
                                                        {/*    (+countTotalBalance() / +findPercent(store.rates.btc, */}
                                                        {/*        0).toFixed(5)).toFixed(5)}</b> USDT*/}
                                                    </p>
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
                            <Col className={'p-0 col-12 col-md-6'}>
                                <Row className="d-flex justify-content-between flex-wrap trading">
                                    <Col className={'col-12 p-0'}>
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
                                                    <Button classname={['mb-3', 'round']} onClick={(e) => setValueBuy(25, e)}>25%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={(e) => setValueBuy(50, e)}>50%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={(e) => setValueBuy(75, e)}>75%</Button>
                                                    <Button classname={['mb-3', 'round']} onClick={(e) => setValueBuy(100, e)}>100%</Button>
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
                                                        {/*<b>{*/}
                                                        {/*    (+countTotalBalance() / +findPercent(store.rates.btc, */}
                                                        {/*        0).toFixed(5)).toFixed(5)}</b> USDT*/}
                                                    </p>
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
                        <Row style={{maxHeight: 400, overflowY: 'auto'}}>
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
                        </Row>

                        <Row className={'mb-3 mt-3'}>
                            {
                                history.length >= 3 ?
                                    <AdminButton onClick={onMore} classname={['xs', 'green']}>More</AdminButton>
                                    : null
                            }
                            {
                                limit > 0 ?
                                    <AdminButton onClick={onLess} classname={['xs', 'green']}>Back</AdminButton>
                                    : null
                            }
                        </Row>

                    </ButtonCard>
                </Col>
            </Row>
        </Container>
    )
}

TradingEthereum.propTypes = {
    
}
TradingEthereum.defaultProps = {
    
}

export default TradingEthereum