import React, {useEffect, useState} from 'react'
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";

import TradingEthereum from "./components/TradingEthereum/TradingEthereum";
import TradingBitcoin from "./components/TradingBitcoin/TradingBitcoin";
import TradingTron from "./components/TradingTron/TradingTron";
import TradingBCH from "./components/TradingBCH/TradingBCH";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";

const TradingTest = () => {
    const [coinPair, setCoinPair] = useState('BTC')
    const onChangeCoinsPair = (e) => {
        setCoinPair(e.target.value)
    }

    useEffect(() => {
        renderTrade()
    }, [coinPair])

    const renderTrade = () => {
        if (coinPair === 'BTC') return <TradingBitcoin/>
        if (coinPair === 'ETH') return <TradingEthereum />
        if (coinPair === 'TRX') return <TradingTron />
        if (coinPair === 'BCH') return <TradingBCH />
    }
    const coins = [
        {value: 'BTC', text: 'BTC'},
        {value: 'ETH', text: 'ETH'},
        {value: 'TRX', text: 'TRX'},
        {value: 'BCH', text: 'BCH'},
    ]


    return(
        <Container>
            <Row className={'mb-3'}>
                <Row>
                    <Col>
                        <ButtonCard>
                            <Row>
                                <Col className='col-12 col-sm-2'>
                                    <h2>Choose coin</h2>
                                </Col>
                                <Col className='col-12 col-sm-4'>
                                    <select style={{
                                        backgroundColor: 'transparent',
                                        color: '#fff',
                                        maxWidth: 200,
                                        width: '100%',
                                        padding: 10,
                                        border: '1px solid #717579',
                                        borderRadius: 20,
                                    }} onChange={onChangeCoinsPair} value={coinPair} >
                                        {
                                            coins.map(coin => {
                                                return <option key={coin.value} value={coin.value}>{coin.text}</option>
                                            })
                                        }
                                    </select>
                                </Col>
                            </Row>
                        </ButtonCard>
                    </Col>
                </Row>
            </Row>
            {renderTrade()}

        </Container>
        // <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3">
        //     <Tab eventKey="0" title="Bitcoin">
        //         <TradingBitcoin/>
        //     </Tab>
        //     <Tab eventKey="1" title="Ethereum">
        //         <TradingEthereum />
        //     </Tab>
        //     <Tab eventKey="2" title="Bitcoin Cash">
        //         <TradingBCH />
        //     </Tab>
        //     <Tab eventKey="3" title="Tron">
        //         <TradingTron />
        //     </Tab>
        // </Tabs>
    )
}

TradingTest.propTypes = {
    
}
TradingTest.defaultProps = {
    
}

export default TradingTest