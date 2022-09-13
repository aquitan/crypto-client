import React from 'react'
import {Col, Form, Row} from 'react-bootstrap';
import Input from '../../../../../../components/UI/Input/Input';
import Button from '../../../../../../components/UI/Button/Button';
import {putData} from '../../../../../../services/StaffServices';
import {store} from '../../../../../../../index';
import {dateToTimestamp} from '../../../../../../utils/dateToTimestamp';

const OrderForm = ({type, onChangePrice, onChangeCrypto, onHandlerPercent, total, price, crypto, coinName}) => {
    const btns = [25, 50, 75, 100]

    const onSubmit = async (e) => {
        e.preventDefault()
        const obj = {
            userEmail: store.user.email,
            domainName: store.domain.fullDomainName,
            orderDate: dateToTimestamp(new Date()),
            coinName: coinName,
            coinValue: crypto,
            valueInUsdt: total,
            coinRate: price,
            orderStatus: null,
            orderType: type,
            userId: store.user.id
        }

        const res = await putData('/trading/make_order/', obj)
    }

    return (
      <Form onSubmit={onSubmit} style={{padding: 0}}>
          <Row className={'mb-3'}>
              <div style={{color: 'grey', marginBottom: 10}}>
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
              <div style={{color: 'grey', marginBottom: 10}}>
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
              <Col style={{padding: '0 15px'}} className={'d-flex justify-content-between flex-wrap'}>
                  {
                      btns.map(btn => {
                          return <Button
                            onClick={(e) => onHandlerPercent(e, btn)}
                            key={btn} style={{height: 30, marginBottom: 10}} classname={['btnBlue', 'btnSmall']} >{btn}%</Button>
                      })
                  }
              </Col>
          </Row>

          <Row className={'mb-3'}>
              <div style={{color: 'grey', marginBottom: 10}}>Total in USD</div>
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