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
    const {theme} = useThemeContext(ThemeContext)

    useEffect(() => {
        getBalance()
    }, [])


    const getBalance = async () => {
        const res = await getData(`/get_user_balance/${store.user.id}`)
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
        console.log('arr---', arr);
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



    return (
        <>

            <CustomModal size='lg' fullScreen='md-down' show={showDeposit} handleClose={() => setShowDeposit(false)} title={'Deposit'} btnClose={false}>
                <Deposit coin={deposit.coin} coinsBalance={deposit.coinsBalance} coinFullName={deposit.coinFullName} />
            </CustomModal>


            <CustomModal size='lg' fullScreen={'md-down'} show={showWithdraw} handleClose={() => setShowWithdraw(false)} title={'Withdraw'} btnClose={false}>
                <Withdraw coin={withdraw.coin} coinsBalance={withdraw.coinsBalance} coinFullName={withdraw.coinFullName} />
            </CustomModal>


            <Row>
                <ButtonCard theme={theme}>
                    <Row className='flex-column flex-lg-row'>
                        <Col className='p-0 mb-3'>
                            <Row>
                                <h2 style={{color: theme === 'light' ? '#9295A6' : '#fff'}}>Wallet</h2>
                                <p style={{color: '#9295A6', fontSize: 12}}>Updated {getCurrentDate()}</p>
                            </Row>
                            <Row>
                                <div style={{color: '#9295A6', fontSize: 16}}>Wallet balance:</div>
                                {/*{*/}
                                {/*    balancesArr ? <h2 className='mt-4' style={{fontWeight: 'bold', color: theme === 'light' ? '#9295A6' : '#fff'}}>*/}
                                {/*        ${*/}
                                {/*        isNaN((balancesArr.reduce((prev, cur) => {*/}
                                {/*            return prev + cur*/}
                                {/*        }, 0).toFixed(5))) ? 0.00000 : (balancesArr.reduce((prev, cur) => {*/}
                                {/*            return prev + cur*/}
                                {/*        }, 0).toFixed(5))*/}
                                {/*    }*/}
                                {/*    </h2> : <Preloader />*/}
                                {/*}*/}
                            </Row>
                            <Row>
                                {
                                    balances ? <h2 className='mt-4' style={{fontWeight: 'bold', color: theme === 'light' ? '#9295A6' : '#fff'}}>
                                        ${isNaN(countTotalBalance(balances).toLocaleString()) ? 0 : countTotalBalance(balances).toLocaleString()}
                                    </h2> : <Preloader />
                                }
                            </Row>
                        </Col>
                        <Col>
                            <div className='p-2' style={{
                                backgroundColor: theme === 'light' ? 'rgb(226, 242, 255)': 'rgb(18, 19, 24)',
                                color: theme === 'light' ? 'grey': '#fff'
                            }}>
                                <Row className='p-2 flex-column flex-sm-row mb-2 d-flex justify-content-between'>
                                    <Col className='d-flex align-items-center' style={{fontSize: 20, color: theme === 'light' ? '#9295A6': '#fff'}}>
                                        <img src={'/img/deposit-icon.svg'} alt=""/>
                                        <div className='px-2'>Total deposits:</div>
                                    </Col>
                                    <Col style={{color: theme === 'light' ? '#6C7080': '#fff'}}>
                                        <img className='px-2' src={'/img/in-icon.svg'} alt=""/>
                                        <b>$100500</b>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </ButtonCard>


                <ButtonCard theme={theme}>
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
                </ButtonCard>
            </Row>
        </>
    )
}

export default Wallet