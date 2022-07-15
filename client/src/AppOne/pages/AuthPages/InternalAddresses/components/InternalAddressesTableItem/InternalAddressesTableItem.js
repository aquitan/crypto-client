import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";

const InternalAddressesTableItem = ({date, id, amount, currency, status, onClick, cryptoAmount}) => {
    const obj = {
        date,
        amount,
        currency,
        id
    }
        // ['green_btn', 'small_btn']
    return (
        <Row className='mt-3 mb-3'>
            <Col className={'d-none d-md-block text-center'}>
                {date}
            </Col>
            <Col className={'text-center align-items-center d-flex justify-content-center'}>
                <Button onClick={() => onClick(obj)} classname={[`${status === 'complete' ? 'green_btn' : 'red_btn'}`, 'small_btn'] }>Show address</Button>
            </Col>
            <Col className={'text-center'}>
                {amount.toFixed(3)} USD <br/> {cryptoAmount.toFixed(5)} {currency}
            </Col>
        </Row>
    )
}

InternalAddressesTableItem.propTypes = {
    
}
InternalAddressesTableItem.defaultProps = {
    
}

export default InternalAddressesTableItem