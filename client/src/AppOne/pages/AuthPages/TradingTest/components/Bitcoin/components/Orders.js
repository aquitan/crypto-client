import React from 'react'
import {Col, Row} from 'react-bootstrap';

const Orders = ({orders, type}) => {
    return (
        <Row style={{}} className='px-0'>
            <Row style={{color: 'grey', fontSize: 14}} className='p-0'>
                <Col>Price USD</Col>
                <Col>Crypto</Col>
                <Col>Total USD</Col>
            </Row>
            {
                orders.map((item, index) => {
                    return (
                      <Row className='p-0' key={index + Math.random()} style={{
                          color: type === 'buy' ? 'green' : 'tomato',
                          backgroundColor: item.max && type === 'sell' ? 'rgba(255, 99, 71, .3)' : item.max && type === 'buy' ? 'rgba(0, 128, 0, .3)' : '',
                      }}>
                          <Col className='col-4 text-start'>{item.price}</Col>
                          <Col className='col-4 text-start'>{item.crypto}</Col>
                          <Col className='col-4 text-start'>{item.total}</Col>
                      </Row>
                    )
                })
            }
        </Row>
    )
}

export default Orders