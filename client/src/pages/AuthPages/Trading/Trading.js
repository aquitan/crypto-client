import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './Trading.scss'
import {Col, Container, Form, Row} from "react-bootstrap";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

const Trading = () => {
    const [textVal, setTextVal] = useState({text: '', mail: 0})
    const [textValTwo, setTextValTwo] = useState({text: '', mail: 0})
    let btc = 57500
    const [pair, setPair] = useState('BTCUSD')
    const tradingView = window.TradingView

    useEffect(() => {
        new tradingView.widget(
            {
                "width": "100%",
                "height": 550,
                "symbol": pair,
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "Dark",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "withdateranges": true,
                "hide_side_toolbar": false,
                "allow_symbol_change": false,
                "show_popup_button": true,
                "popup_width": "1000",
                "popup_height": "650",
                "container_id": "chartdiv"
            }
        );
    }, [])

    const onChangeText = (e) => {
        let calc = +e.target.value / btc
        setTextVal({text: e.target.value, mail: calc})

    }

    const onChangeSecondText = (e) => {
        let calc = +e.target.value / btc
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
        let calc = +val / btc
        setTextVal({text: val, mail: calc})
    }
    const setValueBuy = (val) => {
        let calc = +val / btc
        setTextValTwo({text: val, mail: calc})
    }

    return (
        <Container>
            <h1 className={'mb-3'}>Trading</h1>
            <Row className={'mb-4'}>
                <Col className={'col-12 col-md-9'}>
                    <div className="tradingview-widget-container">
                        <div id="chartdiv"/>
                    </div>
                </Col>
                <Col className={'col-12 col-md-3'}>
                    <Col>
                        <p className={'text-center'}>Click Button to Quick Amount</p>
                        <Row className="d-flex justify-content-between flex-wrap trading">
                           <Col>
                               <Row className={'d-flex justify-content-around'}>
                                   <Button classname={['mb-3', 'logout']} onClick={() => setValue(500)}>500</Button>
                                   <Button classname={['mb-3', 'logout']} onClick={() => setValue(1000)}>1000</Button>
                                   <Button classname={['mb-3', 'logout']} onClick={() => setValue(2500)}>2500</Button>
                                   <Button classname={['mb-3', 'logout']} onClick={() => setValue(5000)}>5000</Button>
                               </Row>
                               <Row>
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
                                               <Button classname={['red_btn']} >Sell</Button>
                                           </Col>
                                           <Col>
                                               <Button classname={['green_btn']} >Buy</Button>
                                           </Col>
                                       </Row>
                                   </Form>
                               </Row>
                           </Col>
                        </Row>
                    </Col>
                </Col>
            </Row>
            {/*<ButtonCard>*/}
            {/*    <Row>*/}
            {/*        <Col>*/}
            {/*            <p>Click Button to Quick Amount</p>*/}
            {/*            <Row className="d-flex justify-content-between flex-wrap trading">*/}
            {/*                <Col className={'col-12 col-md-6'}>*/}
            {/*                    <Form>*/}
            {/*                        <Row className={'mb-3'}>*/}
            {/*                            <Input*/}
            {/*                                label='Amount in USD'*/}
            {/*                                type="number"*/}
            {/*                                placeholder='Enter amount'*/}
            {/*                                onChange={onChangeText}*/}
            {/*                                value={textVal.text}*/}

            {/*                            />*/}
            {/*                        </Row>*/}
            {/*                        <Row className={'mb-3'}>*/}
            {/*                            <Input*/}
            {/*                                label="Amount in Crypto"*/}
            {/*                                type="number"*/}
            {/*                                value={textVal.mail}*/}
            {/*                                disabled*/}
            {/*                            />*/}
            {/*                        </Row>*/}
            {/*                        <Row className={'mb-3'}>*/}
            {/*                            <Col>*/}
            {/*                                <Button classname={['red_btn']} >Sell</Button>*/}
            {/*                            </Col>*/}
            {/*                        </Row>*/}
            {/*                    </Form>*/}
            {/*                </Col>*/}
            {/*                <Col className={'col-12 col-md-6'}>*/}
            {/*                    <Button classname={['mb-3']} onClick={() => setValue(500)}>500</Button>*/}
            {/*                    <Button classname={['mb-3']} onClick={() => setValue(1000)}>1000</Button>*/}
            {/*                    <Button classname={['mb-3']} onClick={() => setValue(2500)}>2500</Button>*/}
            {/*                    <Button classname={['mb-3']} onClick={() => setValue(5000)}>5000</Button>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </Col>*/}
            {/*        <Col>*/}
            {/*            <p>Click Button to Quick Amount</p>*/}
            {/*            <Row className="d-flex justify-content-between flex-wrap trading">*/}
            {/*                <Col className={'col-12 col-md-6'}>*/}
            {/*                    <Form>*/}
            {/*                        <Row className={'mb-3'}>*/}
            {/*                            <Input*/}
            {/*                                label='Amount in USD'*/}
            {/*                                type="number"*/}
            {/*                                placeholder='Enter amount'*/}
            {/*                                onChange={onChangeSecondText}*/}
            {/*                                value={textValTwo.text}*/}

            {/*                            />*/}
            {/*                        </Row>*/}
            {/*                        <Row className={'mb-3'}>*/}
            {/*                            <Input*/}
            {/*                                label="Amount in Crypto"*/}
            {/*                                type="number"*/}
            {/*                                value={textValTwo.mail}*/}
            {/*                                disabled*/}
            {/*                            />*/}
            {/*                        </Row>*/}
            {/*                        <Row className={'mb-3'}>*/}
            {/*                            <Col>*/}
            {/*                                <Button classname={['green_btn']} >Buy</Button>*/}
            {/*                            </Col>*/}
            {/*                        </Row>*/}
            {/*                    </Form>*/}
            {/*                </Col>*/}
            {/*                <Col className={'col-12 col-md-6'}>*/}
            {/*                    <Button classname={['mb-3']} onClick={() => setValueBuy(500)}>500</Button>*/}
            {/*                    <Button classname={['mb-3']} onClick={() => setValueBuy(1000)}>1000</Button>*/}
            {/*                    <Button classname={['mb-3']} onClick={() => setValueBuy(2500)}>2500</Button>*/}
            {/*                    <Button classname={['mb-3']} onClick={() => setValueBuy(5000)}>5000</Button>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </Col>*/}

            {/*    </Row>*/}
            {/*</ButtonCard>*/}
            <ButtonCard title={'History'}>

            </ButtonCard>
        </Container>
    )
}

Trading.propTypes = {
    
}
Trading.defaultProps = {
    
}

export default Trading