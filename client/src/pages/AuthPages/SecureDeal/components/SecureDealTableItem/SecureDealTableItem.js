import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";
import classNames from "classnames/bind";
import cls from './SecureDealTableItem.module.scss'

const SecureDealTableItem = ({id, amount, status, classname, onClick}) => {
    let cx = classNames.bind(cls)
    let classes = cx(
        'table_item',
        classname
    )
    console.log('classes', classes)
    return (
        <Row className={classes}>
            <Col>
                {id}
            </Col>
            <Col>
                {amount}
            </Col>
            <Col>
                {status}
            </Col>
            <Col>
                <Button onClick={onClick} classname='small'>View details</Button>
            </Col>
        </Row>
    )
}

SecureDealTableItem.propTypes = {
    id: PropTypes.number,
    amount: PropTypes.any,
    status: PropTypes.string,
    onClick: PropTypes.func
}
SecureDealTableItem.defaultProps = {
    
}

export default SecureDealTableItem