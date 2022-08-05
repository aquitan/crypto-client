import React from 'react'
import {Col, Row} from "react-bootstrap";
import cls from './OrderItem.module.scss'
import classNames from "classnames/bind";

const OrderItem = ({price, amount, total, type}) => {
    let cx = classNames.bind(cls)
    let classnames = cx('orderItem', type)
    return (
        <Row className={classnames}>
            <Col>{price}</Col>
            <Col>{amount}</Col>
            <Col>{total}</Col>
        </Row>
    )
}

OrderItem.propTypes = {
    
}
OrderItem.defaultProps = {
    
}

export default OrderItem