import {Col, Row} from 'react-bootstrap';
import Button from '../../../../../../../components/UI/Button/Button';

const UserTradingHistory = ({email, domain, date, coinName, coinValue, valueInUsdt, coinRate, orderType, orderStatus, onCancelOrder, id}) => {
    return (
      <Row style={{fontSize: 12, alignItems: 'center', color: orderType ? 'green' : 'tomato', padding: '10px 0', borderBottom: '1px solid #fff'}}>
          <Col>{email}</Col>
          <Col>{domain}</Col>
          <Col>{date}</Col>
          <Col>{coinName}</Col>
          <Col>{coinValue.toFixed(5)}</Col>
          <Col>{valueInUsdt.toFixed(5)}</Col>
          <Col>$ {coinRate}</Col>
          <Col>{orderStatus === null ? 'pending' : 'complete'}</Col>
          <Col><Button onClick={() => onCancelOrder(id)} style={{height: 30, fontSize: 12}} classname='btnOrange'>Cancel</Button></Col>
      </Row>
    )
}
export default UserTradingHistory;