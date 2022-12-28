import ButtonCard from '../../../../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../../../../context/ThemeContext';
import {Col, Form, Modal, Overlay, Popover, Row, Tab, Tabs} from 'react-bootstrap';
import CurrencyPrice from './components/CurrencyPrice';
import Input from '../../../../../components/UI/Input/Input';
import Button from '../../../../../components/UI/Button/Button';
import React, {useEffect, useRef, useState} from 'react';
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
import CustomModal from '../../../../../components/CustomModal/CustomModal';
import {useLocation, useNavigate} from 'react-router-dom';
import { Select, Skeleton } from '@mui/material';
import UserPageSkeleton from '../../../../../components/UserPageSkeleton/UserPageSkeleton';
import { getSwitchQuery } from '../../../../../utils/getSwitchQuery';
import { generateOrdersTron } from './utils/generateOrdersTron';

const TradingBitcoin = ({balance, coinPair, initialBtc, initialEth, initialBch, initialTrx, initialSol, setCoinPair}) => {
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
  const [orderModal, setOrderModal] = useState(false)
  const [orderModalError, setOrderModalError] = useState(false)
  const {chartValue} = useValueContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [openBids, setOpenBids] = useState(false)
  const [coinsVariant, setCoinsVariant] = useState(false)
  const target = useRef()


  useEffect(() => {
    getRate()
    getTradingData()
    getHistory()
    getInitialChartData()
    getTradingHistory()
    // setInterval(() => {
    //   setOrders(generateOrders(rate))
    // }, 1500)
    return () => {
      getRate()
    }
  }, [coinPair])

  useEffect( () => {
      let genOrders = setInterval(async () => {
      setOrders(generateOrders(Number(rate)))
    }, 1500)

    return () => {
      // clean up
      clearInterval(genOrders)
    };

  }, [coinPair])



  const getTradingHistory = async () => {
    const res = await getData(`${getSwitchQuery('/trading/order_history/')}${store.user.id}/0/20/`)
    setTradingHistory(res.data)
  }

  useEffect(() => {
    setTotal()
  }, [buyCrypto, buyPrice])

  useEffect(() => {
    setTotalSell()
  }, [sellPrice, sellCrypto])

  const getTradingData = async () => {
    const res = await getData(`${getSwitchQuery('/trading/get_valid_trading_data/')}${store.domain.fullDomainName}/${store.user.id}`)
    let validRate = res.data.filter(el => el.coinName === coinPair)
    console.log('validRate', res.data);
    setTradingData(validRate[0])
  }

  const getRate = async () => {
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${coinPair}USDT`)
    const datas = await res.json()
    setRate(datas.lastPrice)
  }
  const getInitialChartData = async () => {
    const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${coinPair}USDT&interval=1m&limit=100`)
    const data = await res.json()
    setInitialChartData(data.slice(0).reverse())
  }

  const getHistory = async () => {
    const res = await getData(`${getSwitchQuery('/trading/order_history/')}${store.user.id}/0/50/`)
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
    await patchData(`${getSwitchQuery('/trading/cancel_order/')}${id}`)
  }

  const onSubmit = async (e, coinName, crypto, total, price, type) => {
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
      orderType: type === 'Buy' ? true : false,
      userId: store.user.id
    }
    if (price) {
      try {
        const res = await putData(getSwitchQuery('/trading/make_order/'), obj)
        await getTradingHistory()
        setOrderModal(true)
      } catch(e) {
        setOrderModalError(true)
      }
    }
  }

  useEffect(() => {
    checkOrderBuyToComplete(chartValue, tradingHistory)
  }, [chartValue])

  const filteredBuy = () => {
    return tradingHistory.filter(el => el.orderType && !el.orderStatus)
  }
  const filteredSell = () => {
    return tradingHistory.filter(el => !el.orderType && !el.orderStatus)
  }
  const filteredCompleted = () => {
    return tradingHistory.filter(el => el.orderStatus)
  }

  const getName = () => {
    if (coinPair === 'BTC') return 'Bitcoin'
    if (coinPair === 'ETH') return 'Ethereum'
    if (coinPair === 'BCH') return 'Bitcoin Cash'
    if (coinPair === 'TRX') return 'Tron'
    if (coinPair === 'USDT') return 'Tether'
    if (coinPair === 'SOL') return 'Solana'
  }


  return (
    <>

      <CustomModal show={openBids} handleClose={() => setOpenBids(false)} size='md' title='Make Your Bet' btnClose={false} >
        <Tabs 
        variant='pills'
        defaultActiveKey='buy'
        id="exchange-tab"
        >
          <Tab tabClassName='content-tab' eventKey='buy' title='Buy'>
            <OrderForm
              type={'Buy'}
              onChangePrice={onChangeBuyPrice}
              onChangeCrypto={onChangeBuyCrypto}
              onHandlerPercent={onHandlerPercentBuy}
              total={buyTotal}
              price={buyPrice}
              crypto={buyCrypto}
              coinName={coinPair}
              onSubmit={onSubmit}
            />
          </Tab>
          <Tab tabClassName='content-tab' eventKey='sell' title='Sell'>
            <OrderForm
              type={'Sell'}
              onChangePrice={onChangeSellPrice}
              onChangeCrypto={onChangeSellCrypto}
              onHandlerPercent={onHandlerPercentSell}
              total={sellTotal}
              price={sellPrice}
              crypto={sellCrypto}
              coinName={coinPair}
              onSubmit={onSubmit}
            />
          </Tab>
        </Tabs>
      </CustomModal>

      <CustomModal show={orderModal} handleClose={() => setOrderModal(false)} size='md' title='Order' btnClose={'Ok'} >
        Order has been added!
      </CustomModal>

      <CustomModal show={orderModalError} handleClose={() => setOrderModalError(false)} size='md' title='Error' btnClose={'Ok'} >
        Oops! Something went wrong! Try again later!
      </CustomModal>

      <Row>
        <Col className='col-12 col-xl-9'>
          <ButtonCard theme={theme}>
            {
              balance ? 
              <>
                <h2 className='mb-4'>
                  Market stats
                </h2>
                <Row>
                  <Col className=''>
                    <div ref={target} onClick={() => setCoinsVariant(true)} className='d-flex align-items-center' style={{position: 'relative'}}>
                      <img style={{marginRight: 20}} width={40} src={`/img/${coinPair.toLowerCase()}.svg`} alt=""/>
                      <div style={{cursor: 'pointer'}} className='d-flex align-items-center'>
                        <span style={{fontSize: 28, marginRight: 20}}>{getName()}</span>
                        <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8', width: 'fit-content', height: 'fit-content'}} className="badge d-none d-xl-flex">
                          {coinPair}
                        </div>
                      </div>
                    </div>
                    <div style={{color: 'grey', fontSize: 16, marginTop: 20}}>Balance: {balance.coinBalance.toFixed(5)} {coinPair}</div>
                      <Overlay
                            show={coinsVariant}
                            rootClose
                            onHide={() => setCoinsVariant(false)}
                            target={target.current}
                            placement="bottom"
                            containerPadding={20}
                        >
                        <Popover style={{backgroundColor: theme === 'light' ? '#fff' : '#000'}}>
                          <div style={{padding: '10px'}}>
                            <div style={{padding: '0 5px', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 10, borderRadius: '5px'}} onClick={() => setCoinPair('BTC')}>
                                <img width={30} src='/img/btc.svg' alt='coin' />
                                <span style={{fontSize: '14px', color: 'grey', margin: '0 10px'}}>Bitcoin</span>
                                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                                    BTC
                                </div>
                            </div>
                            <div style={{padding: '0 5px', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 10, borderRadius: '5px'}} onClick={() => setCoinPair('ETH')}>
                                <img width={30} src='/img/eth.svg' alt='coin' />
                                <span style={{fontSize: '14px', color: 'grey', margin: '0 10px'}}>Ethereum</span>
                                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                                    ETH
                                </div>
                            </div>
                            <div style={{padding: '0 5px', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 10, borderRadius: '5px'}} onClick={() => setCoinPair('BCH')}>
                                <img width={30} src='/img/bch.svg' alt='coin' />
                                <span style={{fontSize: '14px', color: 'grey', margin: '0 10px'}}>Bitcoin Cash</span>
                                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                                    BCH
                                </div>
                            </div>
                            <div style={{padding: '0 5px', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 10, borderRadius: '5px'}} onClick={() => setCoinPair('TRX')}>
                                <img width={30} src='/img/trx.svg' alt='coin' />
                                <span style={{fontSize: '14px', color: 'grey', margin: '0 10px'}}>Tether</span>
                                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                                    TRX
                                </div>
                            </div>
                            <div style={{padding: '0 5px', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 10, borderRadius: '5px'}} onClick={() => setCoinPair('SOL')}>
                                <img width={30} src='/img/sol.svg' alt='coin' />
                                <span style={{fontSize: '14px', color: 'grey', margin: '0 10px'}}>Solana</span>
                                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className="badge d-none d-xl-flex">
                                    SOL
                                </div>
                            </div>
                          </div>
                        </Popover>
                    </Overlay>
                  </Col>
                  <Col>
                    <CurrencyPrice />
                  </Col>
                </Row>
              </> : <UserPageSkeleton />
            }
          </ButtonCard>
          <ButtonCard theme={theme}>
            <h3 className='mb-3' style={{color: theme === 'light' ? '#2b3144cc' : '#fff'}}>{getName()} Chart</h3>
            {
              rate && initialChartData.length ? <Chart initialSol={initialSol} initialTrx={initialTrx} initialBch={initialBch} initialBtc={initialBtc} initialEth={initialEth} initialData={initialChartData} tradingData={tradingData} coinName={coinPair} rate={Number(rate)} data={data} /> : <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '',mb: 2}} variant="rectangular" width={'100%'} height={40} /> 
            }
          </ButtonCard>
          <ButtonCard theme={theme}>
            <h2 className='mb-3'>History</h2>
              <Tabs
                variant='pills'
                defaultActiveKey="buy"
                id="exchange-tab"
              >
                <Tab tabClassName='content-tab' eventKey='buy' title='Buy'>
                  <div style={{minHeight: 300, maxHeight: '400px', overflowY: 'auto', paddingTop: '30px'}}>
                    {
                      tradingHistory.length ?
                        filteredBuy().map((item, index) => {
                          return(
                            <UserTradingHistory
                              key={index}
                              id={item._id}
                              email={item.userEmail}
                              date={item.orderDate}
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
                        }) : <h4 className='text-center my-4' style={{color: '#cecece'}}>No deals!</h4>
                    }
                  </div>
                </Tab>
                <Tab tabClassName='content-tab' eventKey='sell' title='Sell'>
                  <div style={{minHeight: 300, maxHeight: '400px', overflowY: 'auto', paddingTop: '30px'}}>
                    {
                      tradingHistory.length ?
                        filteredSell().map((item, index) => {
                          return(
                            <UserTradingHistory
                              key={index}
                              id={item._id}
                              date={item.orderDate}
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
                        }) : <h4 className='text-center my-4' style={{color: '#cecece'}}>No deals!</h4>
                    }
                  </div>
                </Tab>
                <Tab tabClassName='content-tab' eventKey='completed' title='Completed'>
                  <div style={{minHeight: 300, maxHeight: '400px', overflowY: 'auto', paddingTop: '30px'}}>
                    {
                      tradingHistory.length ?
                        filteredCompleted().map((item, index) => {
                          return(
                            <UserTradingHistory
                              key={index}
                              id={item._id}
                              email={item.userEmail}
                              domain={item.domainName}
                              date={item.orderDate}
                              coinName={item.coinName}
                              coinValue={item.coinValue}
                              valueInUsdt={item.valueInUsdt}
                              coinRate={item.coinRate}
                              orderType={item.orderType}
                              orderStatus={item.orderStatus}
                              onCancelOrder={onCancelOrder}
                            />
                          )
                        }) : <h4 className='text-center my-4' style={{color: '#cecece'}}>No deals!</h4>
                    }
                  </div>
                </Tab>
              </Tabs>
          </ButtonCard>
          
        </Col>
        <Col className='col-12 col-xl-3'>
          <Row>
            <>
              {
                rate > 0 ?
                  <>
                    {
                      coinPair !== 'TRX' ?
                        <>
                          <ButtonCard theme={theme} style={{marginBottom: 0}}>
                            <Orders type={'buy'} orders={generateOrders(rate)} />
                          </ButtonCard>
                          <Col>
                            <Button style={{width: '100%'}} onClick={() => setOpenBids(true)} classname={['btnGreen']}>Make a Bet</Button>
                          </Col>
                          <ButtonCard theme={theme}>
                            <Orders type={'sell'} orders={generateOrders(rate)} />
                          </ButtonCard>
                          
                        </>
                      : 
                      <>
                        <ButtonCard theme={theme} style={{marginBottom: 0}}>
                          <Orders type={'buy'} orders={generateOrdersTron(rate)} />
                        </ButtonCard>
                        <Col>
                          <Button style={{width: '100%'}} onClick={() => setOpenBids(true)} classname={['btnGreen']}>Make a Bet</Button>
                        </Col>
                        <ButtonCard theme={theme}>
                          <Orders type={'sell'} orders={generateOrdersTron(rate)} />
                        </ButtonCard>
                      </>
                    }
                  </> : <Preloader/>
              }
            </>
          </Row>

        </Col>
      </Row>
    </>
  )
}

export default TradingBitcoin