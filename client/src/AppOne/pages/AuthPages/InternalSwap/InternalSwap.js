import React, {useEffect, useState} from 'react'
import {Col, Image, Row, Tab, Table, Tabs} from "react-bootstrap";
import {store} from "../../../../index";
import cls from './InternalSwap.module.scss'
import {v4 as uuid} from 'uuid'
import Input from "../../../components/UI/Input/Input";
import {Link} from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import InternalSwapTableItem from "./components/InternalSwapTableItem/InternalSwapTableItem";
import Form from "../../../components/UI/Form/Form";
import {ErrorMessage} from "@hookform/error-message";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData, putData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {getCurValUsd, getValue} from "../../../utils/countCryptos";
import {imgMatch} from "../../../utils/imgMatch";
import {getGeoData} from "../../../queries/getSendGeoData";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import './InternalSwapTabs.scss'
import CustomModal from '../../../components/CustomModal/CustomModal';
import LandingSkeleton from '../../NonAuthPages/LandingSkeleton/LandingSkeleton';
import classNames from 'classnames/bind';
import AdminButton from '../../../components/UI/AdminButton/AdminButton';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';

const InternalSwap = () => {
    const {theme} = useThemeContext(ThemeContext)
    const [limit, setLimit] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [insufficientModal, setInsufficientModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [history, setHistory] = useState([])
    const [valueFrom, setValueFrom] = useState(0)
    const [balance, setBalance] = useState([])
    const {register, handleSubmit, setError, formState: {errors, isValid, isDirty}} = useForm({
        mode: "onBlur",
        defaultValues: {
            amount: 0
        }
    })
    const [actions, setActions] = useState({
        percent: 0,
        error: ''
    })
    const [checked, setChecked] = useState(false)
    const cx = classNames.bind(cls)
    const classnames = cx('value_box', theme)

    const [state, setState] = useState({
        initial: {
            value: '00000',
            currency: 'Loading...',
        },
        target: {
            value: '00000',
            currency: 'Loading...',
        }
    })
    const [openList, setOpenList] = useState({
        initialList: false,
        targetList: false
    })

    const onOpenInitialList = () => {
        setOpenList({...openList, initialList: !openList.initialList})
    }
    const onOpenTargetList = () => {
        setOpenList({...openList, targetList: !openList.targetList})
    }
    const onChangeTargetValue = (value, currency) => {
        setState({
            ...state, target: {
                value,
                currency
            }
        })
        setOpenList({...openList, targetList: false})
    }
    const onChangeInitialValue = (value, currency) => {
        setState({
            ...state, initial: {
                value,
                currency
            }
        })
        setOpenList({...openList, initialList: false})
    }

    const checkValue = (value) => {
        if (Number(value) < 0) setError('amount', {
            type: 'custom',
            message: 'Negative value is not allowed!'
        })
        if (value > state.initial.value) setError('amount', {
            type: 'custom',
            message: 'Insufficient funds!'
        })
        if (state.initial.currency === state.target.currency) setError('amount', {
            type: 'custom',
            message: 'Warning! You cant swap between same wallets!'
        })
        if (value < 0.00002) setError('amount', {
            type: 'custom',
            message: 'You have reached minimal swap sum!'
        })
        setValueFrom(+value)
        let val1 = +value
        let val2 = +value / 100 * 0.02
        setActions({...actions, percent: val1 + val2})
    }

    const getCurCoinName = (coin, bucs) => {
        if (coin === 'usd' || coin === 'usdt') {
            return bucs
        }
        else {
            return store.rates[coin] * bucs
        }
    }

    useEffect(() => {
        getBalance()
    }, [])

    const compileBalance = (bal) => {
        

        setState({
            target: {
                value: bal[0].coinBalance?.toFixed(5),
                currency: bal[0].coinName
            },
            initial: {
                value: bal[0].coinBalance?.toFixed(5),
                currency: bal[0].coinName
            },
        })
    }

    const onSubmit = async (data) => {
        let geodata = await getGeoData()
        data.userId = store.user.id
        data.userEmail = store.userEmail
        data.domainName = window.location.host
        data.coinNameFrom = state.initial.currency
        data.coinNameTo = state.target.currency
        data.amountInCryptoFrom = +data.amount + (+data.amount / 100 * chekPercent())
        data.amountInCryptoTo = getValue(state.initial.currency.toLowerCase(), state.target.currency.toLowerCase(), +data.amount)
        data.amountInUsd = getCurValUsd(state.initial.currency.toLowerCase(), +data.amount)
        data.currentDate = dateToTimestamp()
        data.swapStatus = 'pending'
        data.ipAddress = geodata.ipAddress
        data.city = geodata.city
        data.browser = geodata.browser
        data.countryName = geodata.countryName
        data.coordinates = geodata.coordinates
        data.logTime = getCurrentDate(new Date())

        delete data.amount
        delete data.initialValue
        delete data.targetValue
        delete data.initialCurrency
        delete data.targetCurrency

        const filteredBalance = balance.filter(el => el.coinName === data.coinNameFrom)
        if (filteredBalance[0].coinBalance !== 0) {
            if (state.initial.value !== state.target.value) {
                const res = await putData(getSwitchQuery('/swap/make_swap/'), data)
                if (res.status === 201) {
                    getSwapHistory()
                    setShowModal(true)
                    getBalance()
                }
            } else {
                setErrorModal(true)
            }
        } else {
            setInsufficientModal(true)
        }




    }

    const getSwapHistory = async () => {
        const res = await getData(`${getSwitchQuery('/swap/get_swap_history/')}${store.user.id}/${limit}/10`)
        setHistory(res.data.swapHistory)
    }

    const chekPercent = () => {

        if (store.domain.domainParams.coinSwapFee === 1) {
            return 0.01
        } else if (store.domain.domainParams.coinSwapFee === 2) {
            return 0.02
        } else if (store.domain.domainParams.coinSwapFee === 3) {
            return 0.03
        } else if (store.domain.domainParams.coinSwapFee === 4) {
            return 0.04
        } else if (store.domain.domainParams.coinSwapFee === 5) {
            return 0.05
        }
    }

    const youExchangeMessage = () => {
        const filteredTo = store.rates[state.target.currency.toLowerCase()]
        const filteredFrom = store.rates[state.initial.currency.toLowerCase()]
        let countedFrom = filteredFrom * valueFrom
        let countedTo = countedFrom / filteredTo
        return `You exchange 
        ${valueFrom} 
        ${state.initial.currency} to 
        ${countedTo.toFixed(5)} ${state.target.currency}`
    }

    const getBalance = async () => {
        const res = await getData(`${getSwitchQuery('/get_user_balance/')}${store.user.id}`)
        setBalance(res.data)
        compileBalance(res.data)
    }

    useEffect(() => {
        getSwapHistory()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }



    return (
        <>

            <CustomModal
              title={'Success!'}
              btnClose={'Close'}
              show={showModal}
              size='md'
              handleClose={() => setShowModal(false)}>
                Swap was completed successfully!
            </CustomModal>
            <CustomModal
              title={'Error!'}
              btnClose={'Close'}
              show={errorModal}
              size='md'
              handleClose={() => setErrorModal(false)}>
                You cant exchange identical currencies!
            </CustomModal>
            <CustomModal
              title={'Insufficient funds!'}
              btnClose={'Close'}
              size='md'
              show={insufficientModal}
              handleClose={() => setInsufficientModal(false)}>
                You don't have proper amount of funds!
            </CustomModal>

            {
                balance ?
                  <ButtonCard style={{paddingTop: 0, paddingBottom: 0}} theme={theme} >

                      <Tabs
                        variant='pills'
                        defaultActiveKey='exchange'
                        id='exchange-tab'
                      >
                          <Tab tabClassName='content-tab' title='Exchange' eventKey='exchange'>
                              <Col className='col-12 p-0'>
                                  {
                                      balance ?
                                        <Form style={{padding: 0}} classnames='form_big' onSubmit={handleSubmit(onSubmit)}>
                                            <Row className='p-0'>
                                                <Col
                                                  style={{position: 'relative'}}
                                                  className='col-12 mb-3 p-0'>
                                                    <span className={cls.smal_label}>From:</span>
                                                    <div onClick={onOpenInitialList}
                                                         style={{display: 'flex', justifyContent: 'space-between'}}
                                                         className={classnames}>
                                                <span className={cls.amount_value} style={{display: 'inline-block', marginRight: 10}}>
                                                    {state?.initial.value} {state.initial.currency}
                                                </span>
                                                        <Image
                                                          src={`${window.location.origin}/img/${imgMatch(state?.initial.currency.toLowerCase())}.svg`}
                                                          height={30}
                                                          width={30}
                                                          alt={'crypto'} />
                                                    </div>
                                                    {
                                                        openList.initialList ?
                                                          <ul className={cls.value_list}>
                                                              {balance.map(option => <li
                                                                style={{display: 'flex', justifyContent: 'space-between'}}
                                                                onClick={() => onChangeInitialValue(option.coinBalance.toFixed(3), option.coinName)}
                                                                key={uuid()}>
                                                            <span>
                                                                {option.coinBalance.toFixed(3)} <span>{option.coinName}</span>
                                                            </span>
                                                                  <Image
                                                                    src={`/img/${imgMatch(option.coinName.toLowerCase())}.svg`}
                                                                    height={30}
                                                                    width={30}
                                                                    alt={'crypto'} />
                                                              </li>)}
                                                          </ul>
                                                          : null
                                                    }
                                                </Col>
                                                <Col className='col-12 mb-3 d-flex justify-content-center'>
                                                    <img src='/img/swap-icon.svg' />
                                                </Col>
                                                <Col
                                                  style={{position: 'relative'}}
                                                  className='col-12 mb-3 p-0'>
                                                    <span className={cls.smal_label}>To:</span>
                                                    <div onClick={onOpenTargetList}
                                                         style={{display: 'flex', justifyContent: 'space-between'}}
                                                         className={classnames}>
                                                        <span className={cls.amount_value}>{state.target.value} {state.target.currency}</span>
                                                        <Image
                                                          src={`/img/${imgMatch(state?.target.currency.toLowerCase())}.svg`}
                                                          height={30}
                                                          width={30}
                                                          alt={'crypto'} />
                                                    </div>
                                                    {
                                                        openList.targetList ?
                                                          <ul className={cls.value_list}>
                                                              {balance.map(option => <li
                                                                style={{display: 'flex', justifyContent: 'space-between'}}
                                                                onClick={() => onChangeTargetValue(option.coinBalance.toFixed(3), option.coinName)}
                                                                key={uuid()}>
                                                            <span>
                                                                {option.coinBalance.toFixed(3)} <span>{option.coinName}</span>
                                                            </span>
                                                                  <Image
                                                                    src={`/img/${imgMatch(option.coinName.toLowerCase())}.svg`}
                                                                    height={30}
                                                                    width={30}
                                                                    alt={'crypto'} />
                                                              </li>)}
                                                          </ul>
                                                          : null
                                                    }
                                                </Col>
                                            </Row>
                                            <Row className='mb-3 p-0'>
                                                <Col className='p-0'>
                                                    {/*<h5 className='mb-3' style={{fontSize: 12}}>Enter Amount (Fee {store.domain.domainParams.coinSwapFee}%)</h5>*/}
                                                    <Input style={{border: 'none', borderBottom: '1px solid #2b3144', borderRadius: 0}} {...register('amount', {
                                                        required: 'Check the value',
                                                        pattern: /(\d+(?:\.\d+)?)/,
                                                        message: 'Check the value',
                                                        valueAsNumber: true,
                                                        validate: {
                                                            positive: v => parseFloat(v) > 0,
                                                        },
                                                        onChange: (e) => checkValue(e.target.value),
                                                    })} placeholder='0' classname='inputTransparent' />
                                                    {/*{<p className={cls.error}>{errors.amount?.message}</p>}*/}
                                                    <ErrorMessage  name='amount' errors={errors} render={() => <p className={cls.error}>Check the value!</p>} />
                                                </Col>
                                                {
                                                    isValid ? <i style={{fontSize: 12, color: 'grey'}}>{youExchangeMessage()} </i> : null
                                                }
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <input onChange={() => setChecked(!checked)} type='checkbox' />
                                                    <Link style={{color: '#AEB1BF', marginLeft: 10}} to={'/terms-and-conditions'}>I accept Terms and conditions</Link>
                                                </Col>
                                            </Row>
                                            <Row className='mt-3 p-0'>
                                                <Col className='justify-content-center p-0'>
                                                    <Button style={{width: '100%'}} classname='btnBlue' disabled={!isValid && !checked ? true : false}>Confirm</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                        : <Preloader />
                                  }
                              </Col>
                          </Tab>
                          <Tab tabClassName='history-tab' title='History' eventKey='history'>
                              <Col className='col-12 mb-3 p-0'>
                                  <div>
                                      <TableHeader theme={theme} classname='table_header-dark' elems={['Date', 'Operation']} />
                                      <TableBody>


                                          {
                                              typeof history !== 'string' ?
                                                history.map(item => {
                                                    return <InternalSwapTableItem
                                                      key={item._id}
                                                      theme={theme}
                                                      date={getCurrentDate(item.date)}
                                                      amountFrom={item.cryptoAmountFrom.toFixed(5)}
                                                      amountTo={item.cryptoAmountTo.toFixed(5)}
                                                      coinFrom={item.coinNameFrom}
                                                      coinTo={item.coinNameTo}
                                                    />
                                                })
                                                : <h4 className='text-center my-4' style={{color: '#cecece'}}>No data!</h4>
                                          }
                                      </TableBody>
                                  </div>
                                    {
                                        typeof history !== 'string' ?
                                        <Row className={'mb-3 mt-3'}>
                                            {
                                                history.length >= 10 ?
                                                    <AdminButton onClick={onMore} classname={['xs', 'green']}>More</AdminButton>
                                                    : null
                                            }
                                            {
                                                limit > 0 ?
                                                    <AdminButton onClick={onLess} classname={['xs', 'green']}>Less</AdminButton>
                                                    : null
                                            }
                                        </Row>
                                        : null
                                    }
                              </Col>
                          </Tab>
                      </Tabs>
                  </ButtonCard>
                  : <ButtonCard>
                    <LandingSkeleton />
                  </ButtonCard>
            }
        </>
    )
}


export default InternalSwap