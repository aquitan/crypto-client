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
import { Button } from '@mui/material';

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
        if (coinPair === 'BTC') return <Bitcoin balance={balance[0]} coinPair={coinPair}/>
        if (coinPair === 'BCH') return <TradingBCH balance={balance[1]}/>
        if (coinPair === 'ETH') return <TradingEthereum balance={balance[2]} coinPair={coinPair} />
    }

    const fileteredBalance = balance.filter(el => el.coinName === coinPair)


    return(
        <>
            <Row>
                <ButtonCard theme={theme}>
                    Chose currency you want to trade 
                    <Button sx={{mx: 1}} variant={'contained'} onClick={() => setCoinPair('ETH')}>ETH</Button>
                    <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('BTC')}>BTC</Button>
                    <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('BCH')}>BCH</Button>
                    <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('TRX')}>TRX</Button>
                    <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('USDT')}>USDT</Button>
                    <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('SOL')}>SOL</Button>
                </ButtonCard>
            </Row>
            <ValueContextProvider>
                {
                    balance.length ?
                        <Bitcoin balance={fileteredBalance[0]} coinPair={coinPair}/>
                    : <Preloader/>
                }
            </ValueContextProvider>
        </>

    )
}

export default TradingTest