import React from 'react'
import {Col, Row} from 'react-bootstrap';

const Orders = ({orders, type}) => {
    return (
        <Row style={{}} className='mt-4 px-0'>
            <Row style={{color: 'grey', fontSize: 14}} className='p-0'>
                <Col>Price USD</Col>
                <Col>Qty BTC</Col>
                <Col>Total USD</Col>
            </Row>
            {
                orders.map((item, index) => {
                    return (
                      <Row key={index + Math.random()} style={{
                          color: type === 'buy' ? 'green' : 'tomato',
                          backgroundColor: item.max && type === 'sell' ? 'rgba(255, 99, 71, .3)' : item.max && type === 'buy' ? 'rgba(0, 128, 0, .3)' : '',
                      }}>
                          <Col>{item.price}</Col>
                          <Col>{item.crypto}</Col>
                          <Col>{item.total}</Col>
                      </Row>
                    )
                })
            }
        </Row>
    )
}

export default Orders