import React from 'react'
import {Col, Row} from 'react-bootstrap';

const HistoryItem = ({email, domain, date, coinName, coinValue, valueInUsdt, coinRate, orderType, orderStatus}) => {
    return (
      <Row style={{fontSize: 12, color: orderType ? 'green' : 'tomato', padding: '10px 0', borderBottom: '1px solid #fff'}}>
          <Col>{email}</Col>
          <Col>{domain}</Col>
          {/*<Col>{new Date(date)}</Col>*/}
          <Col>{coinName}</Col>
          <Col>{coinValue.toFixed(5)}</Col>
          <Col>{valueInUsdt.toFixed(5)}</Col>
          <Col>$ {coinRate}</Col>
          <Col>{orderStatus === null ? 'pending' : 'complete'}</Col>
      </Row>
    )
}
export default HistoryItem;