import React from 'react'
import cls from './WalletItem.module.scss'
import Button from "../../../../../components/UI/Button/Button";
import {imgMatch} from "../../../../../utils/imgMatch";
import classNames from "classnames/bind";
import {Col} from "react-bootstrap";



const WalletItem = ({coinsBalance, balanceUsd, coin, coinFullName, theme, onDepositOpen, onWithdrawOpen}) => {

    const cx = classNames.bind(cls)
    const classes = cx('walletItem', theme)

    return (




        <div className={`${classes} d-flex`}>
            <Col className='d-flex align-items-center'>
                <img width={30} src={`/img/${imgMatch(coin)}.svg`} alt=""/>
                <b className='mx-3 d-none d-md-flex'>{coinFullName}</b>
                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">{coin}</div>
            </Col>
            <Col className='d-none d-xl-flex align-items-center'>
                ${balanceUsd.toLocaleString()}
            </Col>
            <Col className='d-flex align-items-center'>
                <b>{coinsBalance.toFixed(5)}</b> <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8', marginLeft: 5}} className="badge d-none d-sm-flex">{coin}</div>
            </Col>
            <Col className='d-flex align-items-center flex-column flex-md-row'>
                <Button style={{marginBottom: 5}} classname={['btnLink', theme]} onClick={() => onDepositOpen(coin, coinsBalance ,coinFullName)}>
                    Deposit</Button>
                <Button style={{marginBottom: 5}} classname={['btnLink', theme]} onClick={() => onWithdrawOpen(coin, coinsBalance ,coinFullName)}>Withdraw</Button>
            </Col>
        </div>
    )
}

export default WalletItem