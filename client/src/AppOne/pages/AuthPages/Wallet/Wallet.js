import React, {useEffect, useState} from 'react'
import {Col, Modal, Row} from "react-bootstrap";
import WalletItem from "./components/WalletItem/WalletItem";
import {getData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import Deposit from "../Deposit/Deposit";
import Withdraw from "../Withdraw/Withdraw";
import './Wallet.scss'
import '../InternalSwap/InternalSwapTabs.scss'
import Preloader from '../../../components/UI/Preloader/Preloader';
import {findPercent} from '../../../utils/findPercent';
import {countTotalBalance} from '../../../utils/countTotalBalance';
import CustomModal from '../../../components/CustomModal/CustomModal';
import UserPageSkeleton from '../../../components/UserPageSkeleton/UserPageSkeleton';
import { Skeleton } from '@mui/material';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';
import SkeletonBlocks from '../../../components/SkeletonBlocks/SkeletonBlocks';
import Watchlist from '../../../components/Watchlist/Watchlist';

const Wallet = () => {
    const [balances, setBalances] = useState([])
    const [percent, setPercent] = useState(0)
    const [deposit, setDeposit] = useState({
        coin: '',
        coinsBalance: '',
        coinsFullName: ''
    })
    const [withdraw, setWithdraw] = useState({
        coin: '',
        coinsBalance: '',
        coinsFullName: ''
    })
    const [showDeposit, setShowDeposit] = useState(false)
    const [showWithdraw, setShowWithdraw] = useState(false)
    const [balancesArr, setBalancesArr] = useState([])
    const [markets, setMarkets] = useState([])
    const {theme} = useThemeContext(ThemeContext)

    useEffect(() => {
        getBalance()
        getMarketOverview()
    }, [])


    const getBalance = async () => {
        const res = await getData(`${getSwitchQuery('/get_user_balance/')}${store.user.id}`)
        setBalances(res.data)
        let arr = []
        res.data.forEach((item, index, array) => {
            if (!item.coinName === 'TRX/USDT') {
                arr.push(Number((item.coinBalance * store.rates[item.coinName.toLowerCase()])))
            }
            else {
                arr.push(Number((item.coinBalance * store.rates.trxusdt)))
            }
        })
        setBalancesArr(arr)
    }

    const onDepositOpen = (coin, coinsBalance, coinFullName) => {
        setDeposit({
            coin,
            coinsBalance,
            coinFullName
        })
        setShowDeposit(true)
    }
    const onWithdrawOpen = (coin, coinsBalance ,coinFullName) => {
        setWithdraw({
            coin,
            coinsBalance,
            coinFullName
        })
        setShowWithdraw(true)
    }
    const getMarketOverview = async () => {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
        const data = await res.json()
        setMarkets(data)
    }



    return (
        <>

            <CustomModal size='md' fullScreen='md-down' show={showDeposit} handleClose={() => setShowDeposit(false)} title={'Deposit'} btnClose={false}>
                <Deposit coin={deposit.coin} coinsBalance={deposit.coinsBalance} coinFullName={deposit.coinFullName} />
            </CustomModal>


            <CustomModal size='md' fullScreen={'md-down'} show={showWithdraw} handleClose={() => setShowWithdraw(false)} title={'Withdraw'} btnClose={false}>
                <Withdraw coin={withdraw.coin} coinsBalance={withdraw.coinsBalance} coinFullName={withdraw.coinFullName} />
            </CustomModal>


            <Row>
                <Col className='col-12 col-lg-9'>
                    <ButtonCard theme={theme}>
                        {
                            typeof balances !== 'string' ?
                            <Row className='flex-column flex-sm-row'>
                                <Col className='p-0 mb-3'>
                                    <Row>
                                        <h2 style={{color: theme === 'light' ? '#9295A6' : '#fff'}}>Wallet</h2>
                                        <p style={{color: '#9295A6', fontSize: 12}}>Updated {getCurrentDate()}</p>
                                    </Row>
                                    <Row>
                                        <div style={{color: '#9295A6', fontSize: 16}}>Available Balance in BTC:</div>
                                    </Row>
                                    <Row>
                                        {
                                            balances ? <h4 className='mt-4 align-items-center d-flex' style={{fontWeight: 'bold', color: theme === 'light' ? '#9295A6' : '#fff'}}>
                                                <img src='/static/img/btc.svg' width={30} alt='btc'/> <span style={{marginLeft: 10}}>{isNaN(countTotalBalance(balances).toLocaleString()) ? 0 : (countTotalBalance(balances) / store.rates.btc).toLocaleString()}</span>
                                            </h4> : <Preloader />
                                        }
                                    </Row>
                                </Col>
                                <Col className='d-flex justify-content-start justify-content-md-end align-items-end'>
                                    <div className='p-2' style={{
                                        backgroundColor: theme === 'light' ? '#b9ddff': 'rgb(18, 19, 24)',
                                        color: theme === 'light' ? 'grey': '#fff'
                                    }}>
                                        <Row className='p-2 flex-column flex-sm-row mb-2 d-flex justify-content-between align-items-center'>
                                            <Col className='d-flex align-items-start flex-column' style={{fontSize: 20, color: theme === 'light' ? '#9295A6': '#fff'}}>
                                                
                                                <div className='py-2'>
                                                    <img style={{marginRight: 10}} src={'/img/deposit-icon.svg'} alt=""/>
                                                    <span>Ballance in USD:</span>
                                                </div>
                                                {
                                                    balances ? <div style={{fontWeight: 'bold', color: theme === 'light' ? '#9295A6' : '#fff', fontSize: '18px'}}>
                                                        ${isNaN(countTotalBalance(balances).toLocaleString()) ? 0 : countTotalBalance(balances).toLocaleString()}
                                                    </div> : <Preloader />
                                                }
                                            </Col>
                                            
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            : <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{width: '100%', margin: '0 10px'}}>
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} />
                                </div>
                                <div style={{width: '100%', margin: '0 10px'}}>
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={'40%'} />
                                </div>
                            </div>
                        }
                    </ButtonCard>


                    <ButtonCard theme={theme}>
                        {
                            typeof balances !== 'string' ?
                            <>
                                <h2>Wallet list</h2>
                                {
                                    typeof balances !== 'string' ?
                                        balances.map(item => {
                                            return (
                                            <WalletItem
                                                key={item._id}
                                                onDepositOpen={onDepositOpen}
                                                onWithdrawOpen={onWithdrawOpen}
                                                coinsBalance={item.coinBalance}
                                                coinFullName={item.coinFullName}
                                                theme={theme}
                                                coin={item.coinName === 'TRX/USDT' ? 'TRC 20' : item.coinName} />
                                            )
                                        }) : <h2>No wallets</h2>
                                }
                            </> : <div>
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
                                    <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={60} />
                                </div>
                        }
                    </ButtonCard>
                </Col>
                <Col className='col-12 col-lg-3'>
                    <ButtonCard theme={theme}>
                            <Row style={{borderBottom: '1px solid rgb(204, 206, 217)', paddingBottom: 20, color: '#6c7080', fontSize: 14}}>
                                <Col>
                                    Name
                                </Col>
                                <Col>
                                    Price
                                </Col>
                                <Col>
                                    24h %
                                </Col>
                            </Row>
                            <Row style={{maxHeight: 600, overflowY: 'auto'}}>
                                {
                                    markets.length ? 
                                    markets.map(item => {
                                        console.log('item watchlist', item);
                                        return (
                                            <Watchlist
                                            theme={theme}
                                            key={item.name}
                                            name={item.name}
                                            image={item.image}
                                            symbol={item.symbol}
                                            price={item.current_price}
                                            priceChange={item.price_change_percentage_24h}
                                        />
                                        )
                                    }) : <SkeletonBlocks/>
                                }
                            </Row>
                       </ButtonCard>
                </Col>
            </Row>
        </>
    )
}

export default Wallet