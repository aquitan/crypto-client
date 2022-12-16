import React from 'react'
import cls from './WalletItem.module.scss'
import Button from "../../../../../components/UI/Button/Button";
import {imgMatch} from "../../../../../utils/imgMatch";
import classNames from "classnames/bind";
import {Col} from "react-bootstrap";
import {store} from '../../../../../../index';



const WalletItem = ({coinsBalance, coin, coinFullName, theme, onDepositOpen, onWithdrawOpen}) => {
    const cx = classNames.bind(cls)
    const classes = cx('walletItem', theme)


    return (
        <div className={`${classes} d-flex`}>
            <Col className='d-flex align-items-center'>
                <img width={30} src={`${window.location.origin}/img/${imgMatch(coin === 'TRC 20' ? 'USDT' : coin).toLowerCase()}.svg`} alt=""/>
                <b className='mx-3 d-none d-md-flex'>{coinFullName === 'TRX/USDT' ? 'Tether' : coinFullName === 'Teaser' ? 'Tether' : coinFullName}</b>
                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                  {coin === 'USDT' ? 'ERC 20' : coin}
                </div>
            </Col>
            <Col className='d-none d-xl-flex align-items-center '>
            ${coin !== 'TRC 20' ?
              isNaN(Number(coinsBalance * store.rates[coin.toLowerCase()]).toFixed(5)) ? 0 : Number(coinsBalance * store.rates[coin.toLowerCase()]).toFixed(5) :
              isNaN(Number(coinsBalance.toFixed(5) * store.rates.trxusdt).toFixed(5)) ? 0 : Number(coinsBalance.toFixed(5) * store.rates.trxusdt).toFixed(5)}
            </Col>
            <Col className='d-flex align-items-center justify-content-center'>
                <b>{coinsBalance.toFixed(5)}</b>
            </Col>
            <Col className='d-flex align-items-center flex-column flex-md-row'>
                <Button style={{marginBottom: 5}} classname={['btnLink', theme]} onClick={() => onDepositOpen(coin, coinsBalance, coinFullName)}>
                    Deposit <img width={15} src='/img/withdraw-icon.svg' /></Button>
                <Button style={{marginBottom: 5}} classname={['btnLink', theme]} onClick={() => onWithdrawOpen(coin, coinsBalance, coinFullName)}>Withdraw <img width={15} src='/img/withdraw-icon.svg' /></Button>
            </Col>
        </div>
    )
}

export default WalletItem