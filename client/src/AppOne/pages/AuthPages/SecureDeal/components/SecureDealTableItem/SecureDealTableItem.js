import React from 'react'
import {Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";
import classNames from "classnames/bind";
import cls from './SecureDealTableItem.module.scss'
import {v4 as uuid} from 'uuid'

const SecureDealTableItem = ({amount, status, classname, onClick}) => {
    let cx = classNames.bind(cls)
    let classes = cx(
        'table_item',
        classname
    )
    console.log('classes', classes)
    return (
        <Row key={uuid()} className={classes}>
            <Col className='text-center'>
                {amount}
            </Col>
            <Col className='text-center'>
                {status}
            </Col>
            <Col className='d-flex justify-content-center text-center'>
                <Button onClick={onClick} classname='btnOrange'>View details</Button>
            </Col>
        </Row>
    )
}

export default SecureDealTableItem