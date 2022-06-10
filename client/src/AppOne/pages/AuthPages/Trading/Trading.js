import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './Trading.scss'
import {Col, Container, Form, Row} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";
import {getData} from "../../../services/StaffServices";
import Preloader from "../../../components/UI/Preloader/Preloader";
import Order from "./components/Order/Order";
import OrderItem from "./components/OrderItem/OrderItem";
import {v4 as uuid} from 'uuid'

const Trading = () => {
    const [textVal, setTextVal] = useState({text: '', mail: 0})
    const [textValTwo, setTextValTwo] = useState({text: '', mail: 0})
    const [series, setSeries] = useState([])
    const [curVal, setCurVal] = useState(0)
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
            title: {
                text: 'CandleStick Chart',
                align: 'left'
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
        let calc = +e.target.value / parseInt(curVal)
        setTextVal({text: e.target.value, mail: calc})

    }

    const onChangeSecondText = (e) => {
        let calc = +e.target.value / parseInt(curVal)
        setTextValTwo({text: e.target.value, mail: calc})
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
        let calc = +val / parseInt(curVal)
        setTextVal({text: val, mail: calc})
    }
    const setValueBuy = (val) => {
        let calc = +val / parseInt(curVal)
        setTextValTwo({text: val, mail: calc})
    }



    const onSell = (e) => {
        e.preventDefault()
        let obj = {
            type: 'sell', price: curVal, amount: textVal.mail, total: curVal
        }
        console.log('obj', obj)
        setOrderSell([...orderSell, obj])
        setTextVal({text: '', mail: 0})
    }
    const onBuy = (e) => {
        e.preventDefault()
        let obj = {
            type: 'buy', price: curVal, amount: textValTwo.mail, total: curVal
        }
        console.log('obj', obj)
        setOrderBuy([...orderBuy, obj])
        setTextValTwo({text: '', mail: 0})
    }

    return (
        <Container>
            <h1 className={'mb-3'}>Trading</h1>

            <Row>
                <Col className={'col-12 col-lg-4'}>
                    <ButtonCard title={'Sell Orders'}>
                        <Order>
                            <Row className={'text-center mb-3'}>
                                <Col>Price USD</Col>
                                <Col>Amount BTC</Col>
                                <Col>Total Price</Col>
                            </Row>
                            {
                                orderSell.length ?
                                    orderSell.map(order => {
                                        return <OrderItem key={uuid()} type={order.type} price={order.price} amount={order.amount} total={order.total} />
                                    })
                                    : null
                            }
                        </Order>
                    </ButtonCard>
                    <ButtonCard title={'Buy Orders'}>
                        <Order>
                            <Row className={'text-center mb-3'}>
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
                        </Order>
                    </ButtonCard>
                </Col>
                <Col className={'col-12 col-lg-8'}>
                    <ButtonCard title={`${parseInt(curVal).toFixed(5)} $`}>
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
                    <ButtonCard>
                        <Row>
                            <Col>
                                <p>Click Button to Quick Amount</p>
                                <Row className="d-flex justify-content-between flex-wrap trading">
                                    <Col className={'col-12 col-md-6'}>
                                        <Form>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label='Amount in USD'
                                                    type="number"
                                                    placeholder='Enter amount'
                                                    onChange={onChangeText}
                                                    value={textVal.text}

                                                />
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label="Amount in Crypto"
                                                    type="number"
                                                    value={textVal.mail}
                                                    disabled
                                                />
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Col>
                                                    <Button onClick={onSell} classname={['red_btn']} >Sell</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                    <Col className={'col-12 col-md-6'}>
                                        <Button classname={['mb-3', 'logout']} onClick={() => setValue(500)}>500</Button>
                                        <Button classname={['mb-3', 'logout']} onClick={() => setValue(1000)}>1000</Button>
                                        <Button classname={['mb-3', 'logout']} onClick={() => setValue(2500)}>2500</Button>
                                        <Button classname={['mb-3', 'logout']} onClick={() => setValue(5000)}>5000</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <p>Click Button to Quick Amount</p>
                                <Row className="d-flex justify-content-between flex-wrap trading">
                                    <Col className={'col-12 col-md-6'}>
                                        <Form>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label='Amount in USD'
                                                    type="number"
                                                    placeholder='Enter amount'
                                                    onChange={onChangeSecondText}
                                                    value={textValTwo.text}

                                                />
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Input
                                                    label="Amount in Crypto"
                                                    type="number"
                                                    value={textValTwo.mail}
                                                    disabled
                                                />
                                            </Row>
                                            <Row className={'mb-3'}>
                                                <Col>
                                                    <Button onClick={onBuy} classname={['green_btn']} >Buy</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                    <Col className={'col-12 col-md-6'}>
                                        <Button classname={['mb-3', 'logout']} onClick={() => setValueBuy(500)}>500</Button>
                                        <Button classname={['mb-3', 'logout']} onClick={() => setValueBuy(1000)}>1000</Button>
                                        <Button classname={['mb-3', 'logout']} onClick={() => setValueBuy(2500)}>2500</Button>
                                        <Button classname={['mb-3', 'logout']} onClick={() => setValueBuy(5000)}>5000</Button>
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