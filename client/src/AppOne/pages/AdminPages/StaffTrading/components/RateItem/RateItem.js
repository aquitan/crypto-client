import React from 'react'
import {Col} from 'react-bootstrap';
import {imgMatch} from '../../../../../utils/imgMatch';
import cls from './RateItem.module.scss'

const RateItem = ({coinName, valueInPercent, timeRangeInMs, growthParams}) => {
    return(
      <div style={{color: growthParams ? 'green' : growthParams === false ? 'tomato' : '#fff'}} className={`${cls.rateItem} d-flex`}>
          <Col className='d-flex align-items-center'>
              <img width={20} src={`/img/${imgMatch(coinName === 'TRC 20' ? 'USDT' : coinName)}.svg`} alt=""/>
              <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8', marginLeft: 10}} className="badge d-none d-xl-flex">
                  {coinName}
              </div>
          </Col>
          <Col className='d-none d-xl-flex align-items-center'>
              {valueInPercent}%
          </Col>
          <Col className='d-flex align-items-center'>
              <b>{timeRangeInMs} ms</b>
          </Col>
      </div>
    )
}
export default RateItem;