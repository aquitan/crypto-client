import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import Button from "../Button/Button";
import cls from './TableItemUser.module.scss'
import classNames from "classnames/bind";

const TableitemUser = ({date, usdAmount, cryptoAmount, coin, status}) => {
    const cx = classNames.bind(cls)
    const classnames = cx('complete')



    return (
        <Row className={`mt-3 mb-3 align-items-center ${cls.item}`}>
            <Col className='text-center' style={{whiteSpace: 'pre-wrap'}}>{getCurrentDate(date)}</Col>
            <Col className='text-center'>${usdAmount}<br/> ({cryptoAmount.toFixed(5)} {coin})</Col>
            <Col className=''>
                <Button classname={['green', status, 'medium_btn']}>Show</Button>
            </Col>
        </Row>
    )
}

TableitemUser.propTypes = {

}
TableitemUser.defaultProps = {

}

export default TableitemUser