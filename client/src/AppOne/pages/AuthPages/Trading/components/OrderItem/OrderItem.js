import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import cls from './OrderItem.module.scss'
import classNames from "classnames/bind";

const OrderItem = ({price, amount, total, type}) => {
    let cx = classNames.bind(cls)
    let classnames = cx('orderItem', type)

    return (
        <Row className={classnames}>
            <Col>{parseInt(price).toFixed(5)}</Col>
            <Col>{amount.toFixed(5)}</Col>
            <Col>{parseInt(total).toFixed(5)}</Col>
        </Row>
    )
}

OrderItem.propTypes = {
    
}
OrderItem.defaultProps = {
    
}

export default OrderItem