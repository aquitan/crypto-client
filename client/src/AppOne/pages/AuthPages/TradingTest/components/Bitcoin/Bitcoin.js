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
import {getData, patchData, postData, putData} from '../../../../../services/StaffServices';
import {store} from '../../../../../../index';
import Preloader from '../../../../../components/UI/Preloader/Preloader';
import HistoryItem from '../../../../AdminPages/StaffTrading/components/HistoryItem/HistoryItem';
import UserTradingHistory from './components/UserTradingHistory/UserTradingHistory';
import {dateToTimestamp} from '../../../../../utils/dateToTimestamp';
import {useValueContext} from '../../../../../context/ValueContext';
import {checkOrderBuyToComplete} from '../../utils/checkOrderToComplete/checkOrderToComplete';

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
  const [tradingHistory, setTradingHistory] = useState([])
  const [initialChartData, setInitialChartData] = useState([])
  const [tradingData, setTradingData] = useState([])
  const {chartValue} = useValueContext()

  useEffect(() => {
    getRate()
    getTradingData()
    getHistory()
    getInitialChartData()
    getTradingHistory()
    // setInterval(() => {
    //   setOrders(generateOrders(rate))
    // }, 1500)
  }, [])
  useEffect(async () => {
    setInterval(async () => {
      await setOrders(generateOrders(Number(rate)))
    }, 1500)
  }, [])

  useEffect(async () => {
      window.addEventListener("beforeunload", await alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const getTradingHistory = async () => {
    const res = await getData(`/trading/order_history/${store.user.id}/0/20/`)
    setTradingHistory(res.data)
  }


  const alertUser = async (e) => {
    const obj = {
      domainName: store.domain.fullDomainName,
      coinName: 'bitcoin',
      growthParams: true,
      value: 19900,
      timeToEnd: 150000,
      userId: store.user.id
    }
    await putData('/trading/add_user_data/', obj)
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
    let validRate = res.data.ratesData.filter(el => el.coinName === 'BTC')
    setTradingData(validRate[0])
  }

  const getRate = async () => {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT`)
    const datas = await res.json()
    setRate(datas.lastPrice)
  }
  const getInitialChartData = async () => {
    const res = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100')
    const data = await res.json()
    setInitialChartData(data.slice(0).reverse())
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

  const onCancelOrder = async (id) => {
    await patchData(`/trading/cancel_order/${id}`)
  }

  useEffect(() => {
    checkOrderBuyToComplete(chartValue, tradingHistory)
  }, [chartValue])



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
              rate && initialChartData.length && tradingData ? <Chart initialData={initialChartData} tradingData={tradingData} rate={Number(rate)} data={data} /> : <Preloader />
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
                    coinName={'BTC'}
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
                    coinName={'BTC'}
                  />
                </Col>
              </Row>
            </ButtonCard>
          </Row>
          <Row>
            <ButtonCard theme={theme} style={{minHeight: 300, overflowY: 'auto'}}>
                <h2>History</h2>
              {
                tradingHistory.length ?
                  tradingHistory.map((item, index) => {
                    return(
                      <UserTradingHistory
                        key={index}
                        id={item._id}
                        email={item.userEmail}
                        domain={item.domainName}
                        coinName={item.coinName}
                        coinValue={item.coinValue}
                        valueInUsdt={item.valueInUsdt}
                        coinRate={item.coinRate}
                        orderType={item.orderType}
                        orderStatus={item.orderStatus}
                        onCancelOrder={onCancelOrder}
                      />
                    )
                  }) : <h2>No trading data</h2>
              }
            </ButtonCard>
          </Row>
        </Col>
        <Col className='col-12 col-xl-3'>
          <Row>
            <ButtonCard theme={theme}>
              {
                rate > 0 ?
                  <>
                    <Orders type={'buy'} orders={generateOrders(rate)} />
                    <Orders type={'sell'} orders={generateOrders(rate)} />
                  </> : <Preloader/>
              }
            </ButtonCard>
          </Row>

        </Col>
      </Row>

    </>
  )
}

export default TradingBitcoin