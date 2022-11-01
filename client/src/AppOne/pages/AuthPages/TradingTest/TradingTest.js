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
import { Routes } from 'react-router-dom';
import TradingBCH from './components/BitcoinCash/BitcoinCash';
import { Button, Skeleton } from '@mui/material';
import UserPageSkeleton from '../../../components/UserPageSkeleton/UserPageSkeleton';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';

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
        const balance = await getData(`${getSwitchQuery('/get_user_balance/')}${store.user.id}`)
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
            {
                balance.length ? 
                <Row>
                    <Col>
                        <ButtonCard theme={theme}>
                            Chose currency you want to trade 
                            <Button sx={{mx: 1}} variant={'contained'} onClick={() => setCoinPair('ETH')}>ETH</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('BTC')}>BTC</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('BCH')}>BCH</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('TRX')}>TRX</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('USDT')}>USDT</Button>
                            <Button sx={{mx: 1}}  variant={'contained'} onClick={() => setCoinPair('SOL')}>SOL</Button>
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
                        <Bitcoin balance={fileteredBalance[0]} coinPair={coinPair}/>
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