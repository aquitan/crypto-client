import React from 'react'
import {Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";
import classNames from "classnames/bind";
import cls from './SecureDealTableItem.module.scss'
import {v4 as uuid} from 'uuid'

const SecureDealTableItem = ({amount, status, classname, onClick, coin, buyer, seller}) => {
    let cx = classNames.bind(cls)
    let classes = cx(
        'table_item',
        classname
    )
    return (
        <Row key={uuid()} className={classes}>
            <Col className='text-center'>
                {amount} <b>{coin}</b>
            </Col>
            <Col style={{fontSize: '12px'}} className='text-center'>
                <div><b>Buyer:</b><br/> {buyer}</div>
                <div style={{wordBreak: 'break-all'}}><b>Seller:</b><br/> {seller}</div>
            </Col>
            <Col className='d-flex justify-content-center text-center'>
                <Button style={{height: '30px', width: '80px', minWidth: '80px', margin: '0 0 0 15px'}} onClick={onClick} classname={status === 'failed' ? 'btnRed' : status === 'pending' ? 'btnOrange' : 'btnGreen'}>Details</Button>
            </Col>
        </Row>
    )
}

export default SecureDealTableItem