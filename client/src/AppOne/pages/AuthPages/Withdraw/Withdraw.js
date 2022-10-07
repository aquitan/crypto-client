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
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {copyTextToClipboard} from '../../../utils/copyToClipboard';

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
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: 'onChange'
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
        address: '',
        status: ''
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

    const onChangeCrypto = (e) => {
        setValue('amount', (e.target.value * store.rates[coin.toLowerCase()]).toFixed(5) )
    }
    const onChangeUsd = (e) => {
        setValue('crypto', (e.target.value / store.rates[coin.toLowerCase()]).toFixed(5) )
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
            amountInCrypto: Number(data.crypto).toFixed(5),
            amountInUsd: Number(data.amount).toFixed(5),
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
        } else if (data.amount < store.domain.domainParams.minWithdrawalSum) {
            setMinimalSum(true)
        } else {
            const res = await putData('/withdraw/make_withdraw/', obj)
            setError(res.data)
            if (res.status === 201) {
                getHistoryDeposit()
                onSendWithdraw(res.data)
            }
        }



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

    const onShowHistoryItem = (date, usdAmount, cryptoAmount, coinName, address, status) => {
        console.log('history item', {
            date, usdAmount, cryptoAmount, coinName, address, status
        });
        setHistoryItem({date, usdAmount, cryptoAmount, coinName, address, status})
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

    const onCopy = () => {
        copyTextToClipboard(historyItem.address)
    }


    return (

        <>

            <CustomModal btnClose={'Close'} show={balanceError} handleClose={() => setBalanceError(false)} title={'Zero balance'} size={'md'}>
                Insufficient of funds, please, make a deposit first
            </CustomModal>
            <CustomModal btnClose={'Close'} show={minimalSum} handleClose={() => setMinimalSum(false)} title={'Minimal sum'} size={'md'}>
                You are under of a minimal sum of withdraw!
            </CustomModal>

            <CustomModal size='md' show={showHistoryItem} handleClose={() => setShowHistoryItem(false)} title={'Transaction'} btnClose='Close'>
                <Row className='mb-2'>
                    <div className='text-center'>
                        <b>Date:</b>
                    </div>
                    <div className='text-center' style={{fontSize: 14, color: 'grey'}}>
                        {historyItem.date}
                    </div>
                </Row>
                <Row className='mb-2'>
                    <div className='text-center'>
                        <b>Amount in USD:</b>
                    </div>
                    <div className='text-center' style={{fontSize: 14, color: 'grey'}}>
                        ${historyItem.usdAmount}
                    </div>
                </Row>
                <Row className='mb-2'>
                    <div className='text-center'>
                        <b>Amount in Crypto:</b>
                    </div>
                    <div className='text-center' style={{fontSize: 14, color: 'grey'}}>
                        {Number(historyItem.cryptoAmount).toFixed(5)} {historyItem.coinName}
                    </div>
                </Row>
                <Row className='mb-2'>
                    <div className='text-center'>
                        <b>Address:</b>
                    </div>
                    <div className='text-center' onClick={onCopy}  style={{fontSize: 14, color: 'grey'}}>
                        <FontAwesomeIcon
                          style={{marginRight: 10}}
                          icon={faCopy} />
                        {historyItem.address}
                    </div>
                </Row>
                <Row className='mb-2'>
                    <div className='text-center'>
                        <b>Status:</b>
                    </div>
                    <div className='text-center' style={{fontSize: 14, color: 'grey'}}>
                        {historyItem.status}
                    </div>
                </Row>
            </CustomModal>


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
                    <div style={{fontSize: 14, margin: '20px 10px'}}>{error?.errorText}</div>
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
                                            <Image src={`${window.location.origin}/img/${imgMatch(coin).toLowerCase()}.svg`} height={30} width={30} />
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
                                          <div>Balance: {balance.toFixed(5)}</div>
                                      </div>
                                  </Row>
                                  <Row className='mb-3 p-0'>
                                      <span style={{fontSize: 14, marginBottom: 10}}>Enter amount in Crypto</span>
                                      <Input classname={['inputTransparent', `${errors.crypto ? 'error' : ''}`]} placeholder='0.00' {...register('crypto', {
                                          required: true,
                                          pattern: /^[1-9]\d*(\.\d+)?$/,
                                          onChange: (val) => onChangeCrypto(val)
                                      })}/>
                                      <ErrorMessage  name='crypto' errors={errors} render={() => <p className={cls.error}>Check the field</p>} />
                                  </Row>
                                  <Row className='mb-3 mt-3 p-0'>
                                      <span style={{fontSize: 14, marginBottom: 10}}>Enter amount in USD</span>
                                      <Input classname={['inputTransparent', `${errors.amount ? 'error' : ''}`]} {...register('amount', {
                                          required: 'Check the field',
                                          pattern: /^[1-9]\d*(\.\d+)?$/,
                                          onChange: (val) => onChangeUsd(val)
                                      })} placeholder='0.00' />
                                      <ErrorMessage name='amount' errors={errors} render={() => <p className={cls.error}>Check the field</p>} />
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
                                  <Col className={'text-center'}>Amount</Col>
                                  <Col className={'text-center'}>Details</Col>
                              </Row>
                              <div style={{maxHeight: 400, overflowY: 'auto', height: '100%'}}>
                                  {
                                      typeof history != 'string' ?
                                        history.slice(0).reverse().map(item => {
                                            return (
                                              <TableItemUser
                                                key={item._id}
                                                date={getCurrentDate(item.date)}
                                                usdAmount={item.usdAmount}
                                                cryptoAmount={item.cryptoAmount}
                                                coinName={item.coinName}
                                                status={item.status}
                                                address={item.address}
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