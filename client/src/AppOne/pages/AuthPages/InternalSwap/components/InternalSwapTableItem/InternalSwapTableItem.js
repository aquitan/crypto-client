import React from 'react'
import {Col, Row} from "react-bootstrap";

const InternalSwapTableItem = ({date, operation, coinFrom, coinTo, amountFrom, amountTo, theme}) => {
    return (
        <Row className='text-center py-2' style={{color: theme === 'light' ? '#000' : '#fff',fontSize: 14}}>
            <Col>{date}</Col>
            <Col>
                {amountFrom} {coinFrom} &#8594; {amountTo} {coinTo}
            </Col>
        </Row>
    )
}

export default InternalSwapTableItem