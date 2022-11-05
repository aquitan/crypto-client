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
            <Col style={{fontSize: '14px'}} className='text-center'>
                <div><b>Buyer:</b> {buyer}</div>
                <div><b>Seller:</b> {seller}</div>
            </Col>
            <Col className='d-flex justify-content-center text-center'>
                <Button onClick={onClick} classname={status === 'failed' ? 'btnRed' : status === 'pending' ? 'btnOrange' : 'btnGreen'}>View details</Button>
            </Col>
        </Row>
    )
}

export default SecureDealTableItem