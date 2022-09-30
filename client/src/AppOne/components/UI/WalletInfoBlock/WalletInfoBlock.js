import React from 'react'
import cls from './WalletInfoBlock.module.scss'
import classNames from "classnames/bind";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Col, Row} from "react-bootstrap";
import {imgMatch} from "../../../utils/imgMatch";

const WalletInfoBlock = ({currency, status, amount, balance, rate, theme, img}) => {
    const cx = classNames.bind(cls)
    const classes = cx('wallet-block', status, theme)
    console.log('status', status)
    const statusColor = () => {
        return status >= 0;
    }

    return (
        <Row className={classes}>
            <Row className='mb-2'>
                <div className='d-flex align-items-center mb-2'>
                    <img src={img} height={40} alt=""/>
                    <div style={{fontSize: 20, fontWeight: 'bold'}} className='px-2'>{currency}</div>
                </div>
            </Row>
            <Row>
                <Col>
                    <div>
                        $<b>{rate.toLocaleString()}</b>
                    </div>
                    {/*<div>Balance: {balance.coinBalance} {currency}</div>*/}
                    <div>
                        <b style={{color:statusColor() ? 'green' : 'tomato'}}>{amount} %</b>
                    </div>
                </Col>
                <Col>
                    <img src={statusColor() ? '/img/vector-up.svg' : '/img/vector-down.svg'} alt=""/>
                </Col>
            </Row>
        </Row>
    )
}

export default WalletInfoBlock