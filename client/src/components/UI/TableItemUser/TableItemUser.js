import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import Button from "../Button/Button";
import cls from './TableItemUser.module.scss'
import classNames from "classnames/bind";

const TableitemUser = ({date, usdAmount, cryptoAmount, coinName, status}) => {
    const cx = classNames.bind(cls)
    const classnames = cx('complete')

    return (
        <Row className={`mt-3 mb-3 align-items-center ${cls.item}`}>
            <Col className='col-3'>{getCurrentDate(date)}</Col>
            <Col className='col-3'>${usdAmount}/ ({cryptoAmount}/ {coinName})</Col>
            <Col className='col-3'>
                <span className={status === 'complete' ? classnames : cls.failed}>
                    {status}
                </span>
            </Col>
            <Col className='col-3'>
                <Button classname='green'>Show</Button>
            </Col>
        </Row>
    )
}

TableitemUser.propTypes = {

}
TableitemUser.defaultProps = {

}

export default TableitemUser