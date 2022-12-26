import React from 'react'
import {Col, Form, Row} from 'react-bootstrap';
import Input from '../../../../../../components/UI/Input/Input';
import Button from '../../../../../../components/UI/Button/Button';
import {putData} from '../../../../../../services/StaffServices';
import {store} from '../../../../../../../index';
import {dateToTimestamp} from '../../../../../../utils/dateToTimestamp';
import cls from './OrderForm.module.scss'

const OrderForm = ({type, onChangePrice, onChangeCrypto, onHandlerPercent, total, price, crypto, coinName, onSubmit}) => {
    const btns = [25, 50, 75, 100]

    return (
      <Form onSubmit={(e) => onSubmit(e, coinName, crypto, total, price, type)} style={{padding: 0}}>
          <Row className={'my-3'}>
              <div  className={cls.smal_label} style={{marginBottom: 10}}>
                  Enter your price
              </div>
              <Input
                onChange={(e) => onChangePrice(e)}
                label='Amount in USD'
                type="text"
                value={price}
                placeholder='Enter your price'
                classname='inputTransparent'
              />
          </Row>
          <Row className={'mb-3'}>
              <div className={cls.smal_label} style={{marginBottom: 10}}>
                  Enter your amount in crypto
              </div>
              <Input
                onChange={(e) => onChangeCrypto(e)}
                label="Amount in Crypto"
                type="text"
                value={crypto.toFixed(5)}
                placeholder={'Enter your amount in crypto'}
                classname='inputTransparent'
              />
          </Row>

          <Row className='mb-3'>
              <Col style={{padding: '0'}} className={'d-flex justify-content-between'}>
              <Button onClick={(e) => onHandlerPercent(e, 25)} style={{height: 30, marginBottom: 10, minWidth: '50px'}} classname={['btnBlue', 'btnSmall', 'orderBtnPercent']} >25%</Button>
              <Button onClick={(e) => onHandlerPercent(e, 50)} style={{height: 30, marginBottom: 10, minWidth: '50px'}} classname={['btnBlue', 'btnSmall', 'orderBtnPercent']} >50%</Button>
              <Button onClick={(e) => onHandlerPercent(e, 75)} style={{height: 30, marginBottom: 10, minWidth: '50px'}} classname={['btnBlue', 'btnSmall', 'orderBtnPercent']} >75%</Button>
              <Button onClick={(e) => onHandlerPercent(e, 100)} style={{height: 30, marginBottom: 10, minWidth: '50px'}} classname={['btnBlue', 'btnSmall', 'orderBtnPercent']} >100%</Button>
              </Col>
          </Row>

          <Row className={'mb-3'}>
              <div  className={cls.smal_label} style={{marginBottom: 10}}>Total in USD</div>
              <Input readOnly disabled value={total.toFixed(5)}  placeholder={'Total in USD'} classname='inputTransparent' />
          </Row>
          <Row>
              <Col>
                  <p style={{fontSize: 12}}>Transaction fee is 1%</p>
              </Col>
              <Col>
                  {/*<p style={{fontSize: 12}}>Balance is:&nbsp;*/}
                  {/*  {stateBalance.length*/}
                  {/*    ? stateBalance.filter(el => el.coinName === 'ETH')[0].coinBalance.toFixed(5)*/}
                  {/*    : <Preloader />}*/}
                  {/*</p>*/}
              </Col>
          </Row>

          <Row className={'mb-3'}>
              <Button classname={type === 'Buy' ? 'btnBlue' : 'btnRed'} >{type}</Button>
          </Row>
      </Form>
    )
}

export default OrderForm