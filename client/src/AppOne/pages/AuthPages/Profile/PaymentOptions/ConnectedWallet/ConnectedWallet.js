import cls from './ConnectedWallet.module.scss'
import {Col, Row} from 'react-bootstrap';
import React from 'react';
import Button from '../../../../../components/UI/Button/Button';

const ConnectedWallet = ({onDisconnect}) => {
    return (
      <div className={cls.connectedWallet}>
          <div style={{justifyContent: 'center', display: 'flex', marginBottom: 20}}>
              <img width={40} src="/img/fox.svg" alt=""/>
          </div>
          <Row className='mb-3 flex-column text-center'>
              <Col className='mb-2'>
                  <b style={{fontSize: 20}}>4124124 ETH</b>
              </Col>
              <Col>
                  <span style={{color: 'grey'}}>$ 12312312312</span>
              </Col>
          </Row>
          <Row style={{boxSizing: 'border-box'}}>
              <Button classname='btnRed' onClick={onDisconnect}>Disconnect</Button>
          </Row>
      </div>
    )
}
export default ConnectedWallet;