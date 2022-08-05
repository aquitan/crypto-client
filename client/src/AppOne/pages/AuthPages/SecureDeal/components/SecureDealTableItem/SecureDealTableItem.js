import React from 'react'
import PropTypes from 'prop-types'
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

SecureDealTableItem.propTypes = {
    id: PropTypes.number,
    amount: PropTypes.any,
    status: PropTypes.string,
    onClick: PropTypes.func
}
SecureDealTableItem.defaultProps = {
    
}

export default SecureDealTableItem