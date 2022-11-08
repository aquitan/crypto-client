import React from 'react'
import {Col, Row} from 'react-bootstrap';
import Button from '../../../../../../../components/UI/Button/Button';

const UserTradingHistory = ({email, domain, date, coinName, coinValue, valueInUsdt, coinRate, orderType, orderStatus, onCancelOrder, id}) => {

  const setOrderDate = () => {
    let d = new Date(date * 1000).toLocaleString('EN-en')
    return d
  } 

    return (
      <Row style={{fontSize: 12, alignItems: 'center', color: orderType ? 'green' : 'tomato', padding: '10px 0', borderBottom: '1px solid #eee'}}>
          <Col className='d-none d-lg-block'>{email}</Col>
          <Col className='d-none d-lg-block'>{domain}</Col>
          <Col className='d-none d-lg-block'>{setOrderDate()}</Col>
          <Col>
            <div>
              <b>{coinName}</b> {coinValue.toFixed(5)}
            </div>
            <div>
              <b>Rate:</b> ${valueInUsdt.toFixed(5)}
            </div>
            <div>
              <b>Price: ${coinRate}</b>
            </div>
          </Col>
          <Col>{orderStatus ? 'Active' : 'Completed'}</Col>
          <Col><Button onClick={() => onCancelOrder(id)} style={{height: 30, fontSize: 12}} classname='btnOrange'>Cancel</Button></Col>
      </Row>
    )
}
export default UserTradingHistory;