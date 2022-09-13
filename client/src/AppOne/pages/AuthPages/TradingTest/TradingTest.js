import React, {useEffect, useState} from 'react'
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";

import TradingEthereum from "./components/TradingEthereum/TradingEthereum";
import TradingBitcoin from "./components/TradingBitcoin/TradingBitcoin";
import TradingTron from "./components/TradingTron/TradingTron";
import TradingBCH from "./components/TradingBCH/TradingBCH";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {useThemeContext} from '../../../context/ThemeContext';
import Bitcoin from './components/Bitcoin/Bitcoin';
import {getData} from '../../../services/StaffServices';
import {store} from '../../../../index';
import Preloader from '../../../components/UI/Preloader/Preloader';

const TradingTest = () => {
    const [coinPair, setCoinPair] = useState('BTC')
    const [balance, setBalance] = useState([])


    useEffect(() => {
        getBalance()
    }, [])

    useEffect(() => {
        renderTrade()
    }, [coinPair])

    const getBalance = async () => {
        const balance = await getData(`/get_user_balance/${store.user.id}`)
        setBalance(balance.data)
    }

    const renderTrade = () => {
        if (coinPair === 'BTC') return <Bitcoin balance={balance[0]}/>
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
        <>
            {/*<ButtonCard theme={theme}>*/}
            {/*    <Row>*/}
            {/*        <Col className='col-12 col-sm-2'>*/}
            {/*            <h2>Market Stats</h2>*/}
            {/*        </Col>*/}
            {/*        <Col className='col-12 col-sm-4'>*/}
            {/*            <select style={{*/}
            {/*                backgroundColor: 'transparent',*/}
            {/*                color: theme === 'light' ? '#121318' : '#fff',*/}
            {/*                maxWidth: 200,*/}
            {/*                width: '100%',*/}
            {/*                padding: 10,*/}
            {/*                border: '1px solid #717579',*/}
            {/*                borderRadius: 20,*/}
            {/*            }} onChange={onChangeCoinsPair} value={coinPair} >*/}
            {/*                {*/}
            {/*                    coins.map(coin => {*/}
            {/*                        return <option key={coin.value} value={coin.value}>{coin.text}</option>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </select>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</ButtonCard>*/}
            {
                balance.length ?
                  renderTrade()
                  : <Preloader/>
            }

        </>
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