import React, {useEffect, useState} from 'react'
import {Col, Modal, Row, Tab, Tabs} from 'react-bootstrap';
import Input from "../../../components/UI/Input/Input";
import Form from "../../../components/UI/Form/Form";
import Button from "../../../components/UI/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {store} from "../../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {getData, putData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import TableItemUser from "../../../components/UI/TableItemUser/TableItemUser";
import ErrorModal from "../../../components/ErrorModal/ErrorModal";
import {observer} from "mobx-react-lite";
import {findPercent} from "../../../utils/findPercent";
import cls from './Withdraw.module.scss'
import Image from "../../../components/UI/Image/Image";
import {imgMatch} from "../../../utils/imgMatch";
import {getGeoData} from "../../../queries/getSendGeoData";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import '../InternalSwap/InternalSwapTabs.scss'
import CustomModal from '../../../components/CustomModal/CustomModal';
import SkeletonBlocks from '../../../components/SkeletonBlocks/SkeletonBlocks';
import AdminButton from '../../../components/UI/AdminButton/AdminButton';

const Withdraw = ({coin, coinsBalance, coinFullName}) => {
    console.log('coins balance', coinsBalance)
    const {theme} = useThemeContext(ThemeContext)
    const [state, setState] = useState({
        value: '',
        text: ''
    })
    const [counter, setCounter] = useState(0)
    const [limit, setLimit] = useState(0)
    const [balanceError, setBalanceError] = useState(false)
    const [minimalSum, setMinimalSum] = useState(false)
    const [balanceCoin, setBalanceCoin] = useState('BTC')
    const navigate = useNavigate()
    const [balance, setBalance] = useState(0)
    const [coinsFull, setCoinsFull] = useState([])
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const [history, setHistory] = useState([])
    const [modal, setModal] = useState(false)
    const [showError, setShowError] = useState(false)
    const [onWaitError, setOnWaitError] = useState(false)
    const [error, setError] = useState()
    const [showHistoryItem, setShowHistoryItem] = useState(false)
    const [historyItem, setHistoryItem] = useState({
        date: '',
        usdAmount: '',
        cryptoAmount: '',
        coinName: '',
        address: ''
    })
    const location = useLocation()

    useEffect(() => {
        // getBalance()
        setBalance(coinsBalance)
    }, [])

    const getHistoryDeposit = async () => {
        const res = await getData(`/withdraw/get_withdrawal_history/${store.user.id}/${limit}/10`)
        if (res.status === 500) {
            navigate('/error-500')
        }
        setHistory(res.data.withdrawHistory)
    }

    const onChangeUsd = (e) => {
        console.log('textVal', state.value)
        let calc = +e.target.value / findPercent(store.rates.btc, store.domain.domainParams.rateCorrectSum).toFixed(5)
        setState({text: +e.target.value, value: +calc})
    }
    const onChangeCrypto = (e) => {
        console.log(e.target.value)
        let calc = +e.target.value * findPercent(store.rates.btc, store.domain.domainParams.rateCorrectSum).toFixed(5)
        setState({text: +calc.toFixed(5), value: +e.target.value})
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const geodata = await getGeoData()
        data.value = state.value
        const obj = {
            userId: store.user.id,
            userEmail: store.user.email,
            domainName: window.location.host,
            coinName: balanceCoin,
            amountInCrypto: state.value.toFixed(5),
            amountInUsd: state.text,
            currentDate: dateToTimestamp(),
            withdrawalAddress: data.withdrawalAddress,
            withdrawalStatus: 'failed',
            coinFullName: coinFullName,
            staffId: store.isStaff ? store.user.id : '',
            ipAddress: geodata.ipAddress,
            city: geodata.city,
            browser: geodata.browser,
            countryName: geodata.countryName,
            coordinates: geodata.coordinates,
            logTime: dateToTimestamp(new Date()),
            errorId: store.user.userError,
        }

        console.log('coinsBalance', coinsBalance);

        if (coinsBalance <= 0) {
            setBalanceError(true)
        } else if (state.text < store.domain.domainParams.minWithdrawalSum) {
            setMinimalSum(true)
        } else {
            const res = await putData('/withdraw/make_withdraw/', obj)
            setError(res.data)
            if (res.status === 201) {
                onSendWithdraw(res.data)
            }
        }



    }

    const onValChange = (e) => {
        console.log('value', e.target.value)
        let target = e.target.value
        let balanceAmount = 0
        setBalanceCoin(e.target.value)
        coinsFull.filter(el => {
            console.log('coins', coinsFull)
            if (el.coinName === target) {
                balanceAmount = el.coinBalance.toFixed(5)
                return balanceAmount
            }
        })
        setBalance(balanceAmount)
    }


    const onNext = () => {
        setCounter((prevState => {
            return prevState + 10
        }))
        console.log('counter', counter)
    }


    const onSendWithdraw = (error) => {
        console.log('withdraw error', error)
        setOnWaitError(true)
        setTimeout(() => {
            setOnWaitError(false)
            setShowError(true)
        }, 1500)
    }

    const onShowHistoryItem = (date, usdAmount, cryptoAmount, coinName, address) => {
        setHistoryItem({date, usdAmount, cryptoAmount, coinName, address})
        setShowHistoryItem(true)
    }

    useEffect(() => {
        getHistoryDeposit()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }


    return (

        <>

            <CustomModal show={balanceError} handleClose={() => setBalanceError(false)} title={'Zero balance'} size={'md'}>
                Insufficient of funds, please, make a deposit first
            </CustomModal>
            <CustomModal show={minimalSum} handleClose={() => setMinimalSum(false)} title={'Minimal sum'} size={'md'}>
                You are under of a minimal sum of withdraw!
            </CustomModal>

            <Modal
              size='md'
              animation={false}
              style={{opacity: 1, zIndex: 9999}}
              show={showHistoryItem}
              onHide={() => setShowHistoryItem(false)}
              dialogClassName={`modal-window ${theme}`}
            >
                <Modal.Header closeButton>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                        <b>Transaction</b>
                        <b>{historyItem.date}</b>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <div style={{fontSize: 16, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div>${historyItem.usdAmount}</div>
                            <b>({historyItem.cryptoAmount} {historyItem.coinName})</b>
                            <div>Address: {historyItem.address}</div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
              size='md'
              animation={false}
              style={{opacity: 1, zIndex: 9999999, paddingTop: '10%'}}
              show={showError}
              onHide={() => setShowError(false)}
              dialogClassName={`modal-window ${theme}`}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {error?.errorTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{fontSize: 14, margin: '20px 10px'}}><b>{error?.errorText}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' classname='btnRed' style={{width: 150}} onClick={() => setShowError(false)}>{error?.errorButton}</Button>
                </Modal.Footer>
            </Modal>

            {
                onWaitError ?
                  <SkeletonBlocks/>
                  : <ButtonCard theme={theme} style={{padding: 0}}>
                      <Tabs
                        variant='pills'
                        defaultActiveKey='withdraw'>
                          <Tab
                            title='Withdraw'
                            tabClassName='content-tab'
                            eventKey='withdraw'
                          >
                              <Form classnames='form_big'>
                                  <Row className='mb-3 align-items-center'>
                                      <div style={{padding: '20px 20px'}} className={cls.inputWrapper}>
                                        <span style={{display: 'flex', alignItems: 'center'}}>
                                            <Image src={`/img/${imgMatch(coin)}.svg`} height={30} width={30} />
                                            {/*{*/}
                                            {/*        */}
                                            {/*        // <Select*/}
                                            {/*        //     value={balanceCoin}*/}
                                            {/*        //     onChange={e => onValChange(e)}*/}
                                            {/*        //     classname={['transparent', 'borderLess']}*/}
                                            {/*        //     options={coins} />*/}
                                            {/*        : <Preloader/>*/}
                                            {/*}*/}
                                            <span>
                                                {coin}
                                            </span>
                                        </span>
                                          <div>Coin balance: {balance.toFixed(5)}</div>
                                      </div>
                                  </Row>
                                  <Row className='mb-3'>
                                      <Input classname='inputTransparent' {...register('amount', {
                                          required: true
                                      })} placeholder='Amount in USD' type='number' onChange={onChangeUsd} value={state.text} />
                                      <ErrorMessage  name='terms' errors={errors} render={() => <p className={cls.error}>You have to fill the field with digits</p>} />
                                      <i style={{fontSize: 12, color: 'grey', marginTop: 10}}>Minimum withdraw amount is {store.domain.domainParams.minWithdrawalSum} USD</i>
                                  </Row>
                                  <Row className='mb-3'>
                                      <Input classname='inputTransparent' {...register('crypto', {
                                          required: true
                                      })} placeholder='Amount in Crypto' type='number' onChange={onChangeCrypto} value={Number(state.value).toFixed(5)} />
                                      <ErrorMessage  name='terms' errors={errors} render={() => <p className={cls.error}>You have to fill the field with digits</p>} />
                                  </Row>
                                  <Row className='mb-3'>
                                      <Input classname='inputTransparent' {...register('withdrawalAddress')} placeholder='Enter the address' />
                                  </Row>
                                  <Row className='mb-3'>
                                      <Col>
                                          <input classname='inputTransparent' {...register('terms', {
                                              required: true
                                          })} type='checkbox' />
                                          <Link style={{color: '#AEB1BF', marginLeft: 10}} to={'/'}> I accept Terms and Conditions</Link>
                                          <ErrorMessage  name='terms' errors={errors} render={() => <p className={cls.error}>You have to accept terms and conditions</p>} />
                                      </Col>
                                  </Row>
                                  <Row className='justify-content-center'>
                                      <Button style={{maxWidth: 200}} onClick={handleSubmit(onSubmit)} classname='btnBlue'>Withdraw</Button>
                                  </Row>
                              </Form>
                          </Tab>
                          <Tab
                            title='History'
                            tabClassName='history-tab'
                            eventKey='history'>
                              <Row style={{padding: '10px', borderBottom: '1px solid #fff' }}>
                                  <Col className={'text-center'}>Date</Col>
                                  <Col className={'text-center'}>Sum</Col>
                                  <Col className={'text-center'}></Col>
                              </Row>
                              <div style={{maxHeight: 400, overflowY: 'auto', height: '100%'}}>
                                  {
                                      typeof history !== 'string' ?
                                        history.map(item => {
                                            return (
                                              <TableItemUser
                                                date={getCurrentDate(item.date)}
                                                usdAmount={item.usdAmount}
                                                cryptoAmount={item.cryptoAmount}
                                                coinName={item.coinName}
                                                status={item.status}
                                                onShow={onShowHistoryItem}
                                              />
                                            )
                                        })
                                        : <h4 className='text-center my-4' style={{color: '#cecece'}}>Transactions not found!</h4>

                                  }
                              </div>
                              <Row className={'mb-3 mt-3'}>
                                  {
                                      history.length >= 10 ?
                                        <AdminButton onClick={onMore} classname={['xs', 'green']}>More</AdminButton>
                                        : null
                                  }
                                  {
                                      limit > 0 ?
                                        <AdminButton onClick={onLess} classname={['xs', 'green']}>Back</AdminButton>
                                        : null
                                  }
                              </Row>
                          </Tab>
                      </Tabs>
                  </ButtonCard>
            }
        </>

    )
}
export default observer(Withdraw)