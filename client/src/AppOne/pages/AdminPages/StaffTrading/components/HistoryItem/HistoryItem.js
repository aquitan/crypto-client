import React from 'react'
import {Col, Row} from 'react-bootstrap';
import {getCurrentDate} from '../../../../../utils/getCurrentDate';

const HistoryItem = ({email, domain, date, coinName, coinValue, valueInUsdt, coinRate, orderType, orderStatus}) => {
    return (
      <Row style={{fontSize: 12, color: orderType ? 'green' : 'tomato', padding: '10px 0', borderBottom: '1px solid #fff'}}>
          <Col style={{wordBreak: 'break-all'}} className='text-center wor'>{email}</Col>
          <Col className='text-center'>{domain}</Col>
          <Col className='text-center'>{getCurrentDate(date)}</Col>
          <Col className='text-center'>{coinName}</Col>
          <Col className='text-center'>{coinValue.toFixed(5)}</Col>
          <Col className='text-center'>{valueInUsdt.toFixed(5)}</Col>
          <Col className='text-center'>$ {coinRate}</Col>
          <Col className='text-center'>{orderStatus === null ? 'pending' : 'complete'}</Col>
      </Row>
    )
}
export default HistoryItem;