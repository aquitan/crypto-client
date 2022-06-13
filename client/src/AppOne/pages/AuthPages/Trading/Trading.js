import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './Trading.scss'
import {Col, Container, Form, Row} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import {getData, patchData, putData} from "../../../services/StaffServices";
import Preloader from "../../../components/UI/Preloader/Preloader";
import Order from "./components/Order/Order";
import OrderItem from "./components/OrderItem/OrderItem";
import {v4 as uuid} from 'uuid'
import {store} from "../../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {SwalSimple} from "../../../utils/SweetAlert";

const Trading = () => {
    const [curVal, setCurVal] = useState(0)
    const [textVal, setTextVal] = useState({usd: 0, crypto: 0})
    const [formValueFirst, setFromValueFirst] = useState(0)
    const [formValueSecond, setFromValueSecond] = useState(0)
    const [textValTwo, setTextValTwo] = useState({usd: 0, crypto: 0})
    const [series, setSeries] = useState([])
    const [history, setHistory] = useState([])
    const [ask, setAsk] = useState([])
    const [bid, setBid] = useState([])

    const [orderBuy, setOrderBuy] = useState([])
    const [orderSell, setOrderSell] = useState([])
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

    const [pair, setPair] = useState('BTCUSD')
    // const tradingView = window.TradingView
    //
    // useEffect(() => {
    //     new tradingView.widget(
    //         {
    //             "width": "100%",
    //             "height": 550,
    //             "symbol": pair,
    //             "interval": "D",
    //             "timezone": "Etc/UTC",
    //             "theme": "Dark",
    //             "style": "1",
    //             "locale": "en",
    //             "toolbar_bg": "#f1f3f6",
    //             "enable_publishing": false,
    //             "withdateranges": true,
    //             "hide_side_toolbar": false,
    //             "allow_symbol_change": false,
    //             "show_popup_button": true,
    //             "popup_width": "1000",
    //             "popup_height": "650",
    //             "container_id": "chartdiv"
    //         }
    //     );
    // }, [])

    useEffect(() => {
        getOhlc()
        getSocket()
        getHistory()
        getTradingData()
        getSocketOrder()
        getBinanceCnadlestickApi()
    }, [])


    const getSocket = () => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
        // socket.onopen = () => {
        //     socket.send(JSON.stringify({
        //         id: 1
        //     }))
        // }
        let stockObject = null;
        socket.onmessage = (e) => {
            let stockObject = JSON.parse(e.data);
            setCurVal(stockObject.p)
        }
    }
    const getSocketOrder = () => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth20@1000ms')
        // socket.onopen = () => {
        //     socket.send(JSON.stringify({
        //         id: 1
        //     }))
        // }
        let stockObject = null;
        socket.onmessage = (e) => {
            let stockObject = JSON.parse(e.data);
            setAsk(stockObject.asks)
            setBid(stockObject.bids)
        }
    }

    const getHistory = async () => {
        const res = await getData(`/trading/order_history/${store.user.id}/${0}/10/`)
        setHistory(res.data)
    }
    const getTradingData = async () => {
        const res = await getData(`/trading/get_valid_trading_data/${window.location.host}`)
        console.log('history', res.data)
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
            userId: store.user.id
        }

        const res = await putData('/trading/make_order/', obj)
        if (res.status === 201) {
            SwalSimple('Order is created!')
        }
    }

    const getBinanceCnadlestickApi = async () => {
        const res = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m', {
            mode: 'cors'
        })
        console.log('res-binance', res.data)
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
        setOrderSell([...orderSell, obj])
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
        console.log('obj', obj)
        setOrderBuy([...orderBuy, obj])
        await sendOrderData(textValTwo.usd, textValTwo.crypto, null, true)
        setTextValTwo({crypto: '', usd: ''})
    }

    const makeRandomOrder = (min, max) => {
        let val = min - 10 + Math.random() * (max - min + 10);
        let obj = {
            price: val, amount: 0.0123, total: val
        }
        // setOrderBuy([...orderBuy, obj])
        // if (orderBuy.length > 15) {
        //     setOrderBuy(prevState => {
        //         prevState.shift()
        //     })
        // }
    }
    makeRandomOrder(curVal, curVal)

    const onAbort = async (id) => {
        const res = await patchData(`/trading/cancel_order/${id}`)
        if (res.status === 202) {
            SwalSimple('Order deleted!')
            getHistory()
        }
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
                                orderSell.length ?
                                    orderSell.map(order => {
                                        return <OrderItem key={uuid()} type={order.type} price={order.price} amount={order.amount} total={order.total} />
                                    })
                                    : null
                            }
                            {
                                bid.length ?
                                    bid.map(order => {
                                        return <OrderItem key={uuid()} type={'sell'} price={order[0]} amount={+order[1]} total={order[0] * +order[1]} />
                                    })
                                    : null
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
                                        return <OrderItem key={uuid()} type={order.type} price={order.price} amount={order.amount} total={order.total} />
                                    })
                                    : null
                            }
                            {
                                ask.length ?
                                    ask.map(order => {
                                        return <OrderItem key={uuid()} type={'buy'} price={order[0]} amount={+order[1]} total={order[0] * +order[1]} />
                                    })
                                    : null
                            }
                        </Order>
                    </ButtonCard>
                </Col>
                <Col className={'col-12 col-lg-9'}>
                    <ButtonCard title={`BTC: ${parseInt(curVal).toFixed(5)} $`}>
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
                                                <Input value={formValueFirst} disabled placeholder={'Total in USD'}/>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p style={{fontSize: 12}}>Transaction fee is 1%</p>
                                                </Col>
                                                <Col>
                                                    <p style={{fontSize: 12}}>Balance is: 14124124</p>
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
                                                <Input value={formValueSecond} placeholder={'Total in USD'} />
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p style={{fontSize: 12}}>Transaction fee is 1%</p>
                                                </Col>
                                                <Col>
                                                    <p style={{fontSize: 12}}>Balance is: 14124124 USDT</p>
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
                                        <Row style={{borderBottom: '1px solid #fff', marginBottom: 10, paddingBottom: 10, color: 'lightgreen'}}>
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