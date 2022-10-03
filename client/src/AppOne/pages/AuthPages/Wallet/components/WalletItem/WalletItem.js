import React, {useState} from 'react';
import cls from './WalletItem.module.scss'
import Button from "../../../../../components/UI/Button/Button";
import {imgMatch} from "../../../../../utils/imgMatch";
import classNames from "classnames/bind";
import {Col} from "react-bootstrap";
import {store} from '../../../../../../index';



const WalletItem = ({coinsBalance, coin, coinFullName, theme, onDepositOpen, onWithdrawOpen}) => {
    const [imgSrc, setImgSrc] = useState()
    const cx = classNames.bind(cls)
    const classes = cx('walletItem', theme)

    const renderCoinNameInBadge = () => {
      if (coinFullName === 'TRX/USDT') return 'TRC 20'
    }

    const setBalanceInUSD = () => {
        if (!coinFullName === 'TRX/USDT') {
            return (coinsBalance.toFixed(5) * store.rates[coinName.toLowerCase()]).toFixed(5)
        } else {
            return coinsBalance.toFixed(5) * store.rates.trxusdt.toFixed(5)
        }
    }

    const getImageFromStore = () => {
        let img = store.ratesFull.find(el => el.symbol === coin.toLowerCase())
        console.log('coin', coin.toLowerCase())
        if (!coin === 'TRC 20') {
            console.log('img', img.image)
        } else {
            console.log('this is trc 20');
        }
    }
    getImageFromStore()

    return (
        <div className={`${classes} d-flex`}>
            <Col className='d-flex align-items-center'>
                <img width={30} src={imgSrc} alt=""/>
                <b className='mx-3 d-none d-md-flex'>{coinFullName === 'TRX/USDT' ? 'Tether' : coinFullName}</b>
                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                  {coin === 'USDT' ? 'ERC 20' : coin}
                </div>
            </Col>
            <Col className='d-none d-xl-flex align-items-center'>
                ${setBalanceInUSD()}
            </Col>
            <Col className='d-flex align-items-center'>
                <b>{coinsBalance.toFixed(5)}</b>
            </Col>
            <Col className='d-flex align-items-center flex-column flex-md-row'>
                <Button style={{marginBottom: 5}} classname={['btnLink', theme]} onClick={() => onDepositOpen(coin, coinsBalance, coinFullName)}>
                    Deposit</Button>
                <Button style={{marginBottom: 5}} classname={['btnLink', theme]} onClick={() => onWithdrawOpen(coin, coinsBalance, coinFullName)}>Withdraw</Button>
            </Col>
        </div>
    )
}

export default WalletItem