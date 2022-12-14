import React from 'react'
import {Col, Row} from "react-bootstrap";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import Button from "../Button/Button";
import cls from './TableItemUser.module.scss'
import classNames from "classnames/bind";

const TableitemUser = ({date, usdAmount, cryptoAmount, coinName, status, onShow, address}) => {
    const cx = classNames.bind(cls)
    const classnames = cx('complete')

    return (
        <Row className={`mt-3 mb-3 align-items-center ${cls.item}`}>
            <Col className='text-center' style={{whiteSpace: 'pre-wrap'}}>{date}</Col>
            <Col className='text-center'>${usdAmount}<br/> ({cryptoAmount.toFixed(5)} {coinName})</Col>
            <Col className='d-flex text-center justify-content-center'>
                <Button onClick={() => onShow(date, usdAmount, cryptoAmount, coinName, address, status)}
                        classname={`${status === 'pending' ? 'btnOrange' : status === 'success' ? 'btnGreen' : 'btnRed'}`}>Details</Button>
            </Col>
        </Row>
    )
}

export default TableitemUser