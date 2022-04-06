import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";

const InternalAddressesTableItem = ({date, id, amount, currency, status, onClick}) => {
    const obj = {
        date,
        amount,
        currency,
        id
    }
    return (
        <Row className='mt-3 mb-3'>
            <Col>
                {date}
            </Col>
            <Col>
                <Button onClick={() => onClick(obj)} classname={['green_btn', 'small_btn']}>Show address</Button>
            </Col>
            <Col>
                {amount} {currency}
            </Col>
            <Col>
                {status}
            </Col>
        </Row>
    )
}

InternalAddressesTableItem.propTypes = {
    
}
InternalAddressesTableItem.defaultProps = {
    
}

export default InternalAddressesTableItem