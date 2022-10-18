import React, {useEffect, useState} from 'react'
import Bitcoin from './components/Bitcoin/Bitcoin';
import {getData} from '../../../services/StaffServices';
import {store} from '../../../../index';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {ValueContextProvider} from '../../../context/ValueContext';
import TradingEthereum from './components/Ethereum/Ethereum';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import { useThemeContext } from '../../../context/ThemeContext';
import { Row } from 'react-bootstrap';
import { Routes } from 'react-router-dom';
import TradingBCH from './components/BitcoinCash/BitcoinCash';

const TradingTest = () => {
    const [coinPair, setCoinPair] = useState('BTC')
    const [balance, setBalance] = useState([])
    const {theme} = useThemeContext()

    useEffect(() => {
        renderTrade()
        getBalance()
        return () => {
            renderTrade()
            getBalance()
        }
    }, [coinPair])

    const getBalance = async () => {
        const balance = await getData(`/get_user_balance/${store.user.id}`)
        console.log('balance.data', balance.data);
        setBalance(balance.data)
    }

    const renderTrade = () => {
        if (coinPair === 'BTC') return <Bitcoin balance={balance[0]}/>
        if (coinPair === 'BCH') return <TradingBCH balance={balance[1]}/>
        if (coinPair === 'ETH') return <TradingEthereum balance={balance[2]}/>
    }


    return(
        <>
            <Row>
                <ButtonCard theme={theme}>
                    Chose currency you want to trade
                </ButtonCard>
            </Row>
            <ValueContextProvider>
                {
                    balance.length ?
                        renderTrade()
                    : <Preloader/>
                }
            </ValueContextProvider>
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


        </>

    )
}

export default TradingTest