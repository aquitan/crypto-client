import React, {useEffect, useState} from 'react'
import Bitcoin from './components/Bitcoin/Bitcoin';
import {getData} from '../../../services/StaffServices';
import {store} from '../../../../index';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {ValueContextProvider} from '../../../context/ValueContext';
import TradingEthereum from './components/Ethereum/Ethereum';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import { useThemeContext } from '../../../context/ThemeContext';
import { Col, Row } from 'react-bootstrap';
import { Routes, useLocation } from 'react-router-dom';
import { Button, Skeleton } from '@mui/material';
import UserPageSkeleton from '../../../components/UserPageSkeleton/UserPageSkeleton';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';

const TradingTest = () => {
    const [coinPair, setCoinPair] = useState('BTC')
    const [initialBtc, setInitialBtc] = useState([])
    const [initialEth, setInitialEth] = useState([])
    const [initialBch, setInitialBch] = useState([])
    const [initialTrx, setInitialTrx] = useState([])
    const [initialSol, setInitialSol] = useState([])
    const [balance, setBalance] = useState([])
    const {theme} = useThemeContext()

    useEffect(() => {
        renderTrade()
        getBalance()
        getInitialChartData()
        getEthInitial()
        getBCHInitial()
        getTRXInitial()
        getSOLInitial()
        return () => {
            renderTrade()
            getBalance()
            getInitialChartData()
            getEthInitial()
            getBCHInitial()
            getTRXInitial()
            getSOLInitial()
        }
    }, [coinPair])

    const getBalance = async () => {
        const balance = await getData(`${getSwitchQuery('/get_user_balance/')}${store.user.id}`)
        console.log('balance.data', balance.data);
        setBalance(balance.data)
    }

    const renderTrade = () => {
        if (coinPair === 'BTC') return <Bitcoin balance={balance[0]} coinPair={coinPair}/>
        if (coinPair === 'ETH') return <TradingEthereum balance={balance[2]} coinPair={coinPair} />
    }

    const fileteredBalance = balance.filter(el => el.coinName === coinPair)


    const getInitialChartData = async () => {
        const resBtc = await fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100`)
        const dataBtc = await resBtc.json()
        setInitialBtc(dataBtc.slice(0).reverse())
      }
    const getEthInitial = async () => {
        const resEth = await fetch(`https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&limit=100`)
        const dataEth = await resEth.json()
        setInitialEth(dataEth.slice(0).reverse())
    }
    const getBCHInitial = async () => {
        const resBch = await fetch(`https://api.binance.com/api/v3/klines?symbol=BCHUSDT&interval=1m&limit=100`)
        const dataBch = await resBch.json()
        setInitialBch(dataBch.slice(0).reverse())
    }
    const getTRXInitial = async () => {
        const resTrx = await fetch(`https://api.binance.com/api/v3/klines?symbol=TRXUSDT&interval=1m&limit=100`)
        const dataTrx = await resTrx.json()
        setInitialTrx(dataTrx.slice(0).reverse())
    }
    const getSOLInitial = async () => {
        const resSol = await fetch(`https://api.binance.com/api/v3/klines?symbol=SOLUSDT&interval=1m&limit=100`)
        const dataSol = await resSol.json()
        setInitialSol(dataSol.slice(0).reverse())
    }
    


    return(
        <>
            {
                balance.length ? 
                <Row>
                    <Col>
                        <ButtonCard theme={theme}>
                            <h3 className='mb-2'>Chose currency you want to trade</h3> 
                            <div className='d-flex'>
                                <div style={{padding: '0 5px', cursor: 'pointer'}} onClick={() => setCoinPair('BTC')}>
                                    <img width={30} src='/img/btc.svg' alt='coin' />
                                </div>
                                <div style={{padding: '0 5px', cursor: 'pointer'}} onClick={() => setCoinPair('ETH')}>
                                    <img width={30} src='/img/eth.svg' alt='coin' />
                                </div>
                                <div style={{padding: '0 5px', cursor: 'pointer'}} onClick={() => setCoinPair('BCH')}>
                                    <img width={30} src='/img/bch.svg' alt='coin' />
                                </div>
                                <div style={{padding: '0 5px', cursor: 'pointer'}} onClick={() => setCoinPair('TRX')}>
                                    <img width={30} src='/img/trx.svg' alt='coin' />
                                </div>
                                <div style={{padding: '0 5px', cursor: 'pointer'}} onClick={() => setCoinPair('USDT')}>
                                    <img width={30} src='/img/usdt.svg' alt='coin' />
                                </div>
                                <div style={{padding: '0 5px', cursor: 'pointer'}} onClick={() => setCoinPair('SOL')}>
                                    <img width={30} src='/img/sol.svg' alt='coin' />
                                </div>
                            </div>
                            {/* <Button sx={{mx: 1}} variant={'contained'} onClick={() => setCoinPair('ETH')}>ETH</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('BTC')}>BTC</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('BCH')}>BCH</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('TRX')}>TRX</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('USDT')}>USDT</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('SOL')}>SOL</Button> */}
                        </ButtonCard>
                    </Col>
                </Row> : <Row>
                    <Col>
                        <ButtonCard theme={theme}>
                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={50} />
                        </ButtonCard>
                    </Col>
                </Row>
            }
            <ValueContextProvider>
                {
                    balance.length ?
                        <Bitcoin balance={fileteredBalance[0]} coinPair={coinPair} initialSol={initialSol} initialTrx={initialTrx} initialBch={initialBch} initialBtc={initialBtc} initialEth={initialEth}/>
                    : <>
                        <Row>
                            <Col className="col-12 col-md-8">
                                <ButtonCard theme={theme}>
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : ''}} variant="rectangular" width={'100%'} height={300} />
                                </ButtonCard>
                                <ButtonCard theme={theme}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                        <UserPageSkeleton/>
                                        <UserPageSkeleton/>
                                    </div>
                                </ButtonCard>
                            </Col>
                            <Col>
                                <ButtonCard theme={theme}>
                                    <UserPageSkeleton/>
                                </ButtonCard>
                                <ButtonCard theme={theme}>
                                    <UserPageSkeleton/>
                                </ButtonCard>
                            </Col>
                        </Row>
                        <Row>
                            <Row>
                                <ButtonCard theme={theme}>
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                                </ButtonCard>
                            </Row>
                        </Row>
                    </>
                }
            </ValueContextProvider>
        </>

    )
}

export default TradingTest