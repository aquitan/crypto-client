import ButtonCard from '../../../../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../../../../context/ThemeContext';
import {Col, Form, Row, Tab, Tabs} from 'react-bootstrap';
import CurrencyPrice from './components/CurrencyPrice';
import Input from '../../../../../components/UI/Input/Input';
import Button from '../../../../../components/UI/Button/Button';
import React, {useEffect, useState} from 'react';
import {generateOrders} from './utils/generateOrders';
import Orders from './components/Orders';
import Chart from '../Chart/Chart';
import {setTotalInUsd, setValueBuySell} from './utils/setValueBuySell';
import OrderForm from '../components/OrderForm/OrderForm';
import {getData, postData} from '../../../../../services/StaffServices';
import {store} from '../../../../../../index';
import Preloader from '../../../../../components/UI/Preloader/Preloader';

const TradingBitcoin = ({balance}) => {
  const {theme} = useThemeContext()
  const [rate, setRate] = useState(0)
  const [orders, setOrders] = useState([])
  const [buyTotal, setBuyTotal] = useState(0)
  const [buyCrypto, setBuyCrypto] = useState(0)
  const [buyPrice, setBuyPrice] = useState(0)
  const [sellTotal, setSellTotal] = useState(0)
  const [sellCrypto, setSellCrypto] = useState(0)
  const [sellPrice, setSellPrice] = useState(0)

  useEffect(() => {
    getRate()
    getTradingData()
    getHistory()
    setInterval(() => {
      setOrders(generateOrders(21351))
    }, 1500)
  }, [])

  useEffect(async () => {
      window.addEventListener("beforeunload", await alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = async (e) => {
    const obj = {
      domainName: store.domain.fullDomainName,
      coin: 'bitcoin',
      percent: 3,
      direction: 'up',
      timer: 600000,
      currentTimer: 300000
    }
    const res = postData('/123', obj)
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    setTotal()
  }, [buyCrypto, buyPrice])

  useEffect(() => {
    setTotalSell()
  }, [sellPrice, sellCrypto])

  const getTradingData = async () => {
    const res = await getData(`/staff/trading/get_valid_trading_data/${store.domain.fullDomainName}/`)
  }

  const getRate = async () => {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT`)
    const datas = await res.json()
    setRate(datas.lastPrice)
  }

  const getHistory = async () => {
    const res = await getData(`/trading/order_history/${store.user.id}/0/50/`)
  }

  let data = [
    {
      category: "Research",
      value1: 1000,
      value2: 588
    },
    {
      category: "Marketing",
      value1: 1200,
      value2: 1800
    },
    {
      category: "Sales",
      value1: 850,
      value2: 1230
    }
  ];


 // Buy form
  const onChangeBuyPrice = (e) => {
    setBuyPrice(+e.target.value)
  }

  const onChangeBuyCrypto = (e) => {
    setBuyCrypto(+e.target.value)
  }

  const setTotal = () => {
    setBuyTotal(buyPrice * buyCrypto)
  }

  const onHandlerPercentBuy = (e, btn) => {
    e.preventDefault()
    setBuyCrypto(setValueBuySell(btn, balance.coinBalance))
  }

  // Sell form
  const onChangeSellPrice = (e) => {
    setSellPrice(+e.target.value)
  }

  const onChangeSellCrypto = (e) => {
    setSellCrypto(+e.target.value)
  }

  const setTotalSell = () => {
    setSellTotal(sellPrice * sellCrypto)
  }

  const onHandlerPercentSell = (e, btn) => {
    e.preventDefault()
    setSellCrypto(setValueBuySell(btn, balance.coinBalance))
  }


  return (
    <>
      <Row>
        <Col className='col-12 col-xl-9'>
          <ButtonCard theme={theme}>
            <h2 className='mb-4'>Market stats</h2>
            <Row>
              <Col className=''>
                <div className='d-flex align-items-center'>
                  <img style={{marginRight: 20}} width={40} src={`/img/btc.svg`} alt=""/>
                  <div className='d-flex align-items-center'>
                    <span style={{fontSize: 28, marginRight: 20}}>Bitcoin</span>
                    <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8', width: 'fit-content', height: 'fit-content'}} className="badge d-none d-xl-flex">
                      BTC
                    </div>
                  </div>
                </div>
                <div style={{color: 'grey', fontSize: 16, marginTop: 20}}>Balance: {balance.coinBalance.toFixed(5)} BTC</div>
              </Col>
              <Col>
                <CurrencyPrice />
              </Col>
            </Row>
          </ButtonCard>
          <ButtonCard theme={theme}>
            <h3>Bitcoin Chart</h3>
            {
              rate ? <Chart rate={Number(rate)} data={data} /> : <Preloader />
            }
          </ButtonCard>
          <Row>
            <ButtonCard theme={theme}>
              <Row>
                <Col>
                  <OrderForm
                    type={'Buy'}
                    onChangePrice={onChangeBuyPrice}
                    onChangeCrypto={onChangeBuyCrypto}
                    onHandlerPercent={onHandlerPercentBuy}
                    total={buyTotal}
                    price={buyPrice}
                    crypto={buyCrypto}
                    coinName={'bitcoin'}
                  />
                </Col>
                <Col>
                  <OrderForm
                    type={'Sell'}
                    onChangePrice={onChangeSellPrice}
                    onChangeCrypto={onChangeSellCrypto}
                    onHandlerPercent={onHandlerPercentSell}
                    total={sellTotal}
                    price={sellPrice}
                    crypto={sellCrypto}
                  />
                </Col>
              </Row>
            </ButtonCard>
          </Row>
          <Row>
            <ButtonCard theme={theme}>
                <h2>History</h2>
            </ButtonCard>
          </Row>
        </Col>
        <Col className='col-12 col-xl-3'>
          <Row>
            <ButtonCard theme={theme}>
              <Orders type={'buy'} orders={orders} />
              <Orders type={'sell'} orders={orders} />
            </ButtonCard>
          </Row>

        </Col>
      </Row>

    </>
  )
}

export default TradingBitcoin