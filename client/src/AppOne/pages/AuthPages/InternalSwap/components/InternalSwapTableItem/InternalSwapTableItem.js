import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";

const InternalSwapTableItem = ({date, operation, coinFrom, coinTo, amountFrom, amountTo, theme}) => {
    return (
        <Row style={{color: theme === 'light' ? '#121318' : '#fff'}}>
            <Col>{date}</Col>
            <Col>
                {amountFrom} {coinFrom} &#8594; {amountTo} {coinTo}
            </Col>
        </Row>
    )
}

InternalSwapTableItem.propTypes = {
    data: PropTypes.string,
    operation: PropTypes.string
    
}
InternalSwapTableItem.defaultProps = {
    
}

export default InternalSwapTableItem