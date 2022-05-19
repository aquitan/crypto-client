import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Image, Row, Table} from "react-bootstrap";
import {store} from "../../../index";
import cls from './InternalSwap.module.scss'
import classNames from "classnames/bind";
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
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData, postData, putData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {emailValidate} from "../../../utils/checkEmail";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {countCryptoTarget, getCurCoinName, getCurCoinVal, getCurValUsd, getValue} from "../../../utils/countCryptos";
import {imgMatch} from "../../../utils/imgMatch";

const InternalSwap = () => {
    const cx = classNames.bind(cls)
    const [balance, setBalance] = useState([])
    const [history, setHistory] = useState([])
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
        if (parseInt(value) < 0 || parseFloat(value) < 0) setError('amount', {
            type: 'custom',
            message: 'negative value is not allowed'
        })
        if (value > state.initial.value) setError('amount', {
            type: 'custom',
            message: 'you are over your account funds'
        })
        if (state.initial.currency === state.target.currency) setError('amount', {
            type: 'custom',
            message: 'warning! You cant swap between same wallets'
        })
        if (value < 0.00002) setError('amount', {
            type: 'custom',
            message: 'you have reached minimal swap sum'
        })
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
        getSwapHistory()
    }, [])

    const getBalance = async () => {
        const res = await getData(`/get_user_balance/${store.user.id}`)
        setBalance(res.data)
        setState({
            target: {
                value: res.data[0].coinBalance,
                currency: res.data[0].coinName
            },
            initial: {
                value: res.data[0].coinBalance,
                currency: res.data[0].coinName
            },
        })
        console.log('state', state)
    }

    const onSubmit = async (data) => {

        data.userId = store.user.id
        data.userEmail = store.userEmail
        data.domainName = window.location.host
        data.coinNameFrom = state.initial.currency
        data.coinNameTo = state.target.currency
        data.amountInCryptoFrom = +data.amount + (+data.amount / 100 * chekPercent())
        data.amountInCryptoTo = getValue(state.initial.currency.toLowerCase(), state.target.currency.toLowerCase(), +data.amount)
        data.amountInUsdFrom = getCurValUsd(state.initial.currency.toLowerCase(), +data.amount)
        data.amountInUsdTo = getCurValUsd(state.target.currency.toLowerCase(), getValue(state.initial.currency.toLowerCase(), state.target.currency.toLowerCase(), +data.amount, ))
        data.currentDate = dateToTimestamp()
        data.swapStatus = 'pending'

        delete data.amount
        delete data.initialValue
        delete data.targetValue
        delete data.initialCurrency
        delete data.targetCurrency

        console.log('sent', data)
        const res = await putData('/swap/make_swap/', data)

        if (res.status) {
            getSwapHistory()
        }

    }

    const getSwapHistory = async () => {
        const res = await postData('/swap/get_swap_history/', {userId: store.user.id})
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

    console.log('chekPercent', chekPercent())

    return (
        <Container>
            <Row>
                <Col className='col-12 col-lg-6 mb-3'>
                    <ButtonCard>
                        <h2>Internal swap</h2>
                        {
                            balance ?
                                <Form classnames='form_big' onSubmit={handleSubmit(onSubmit)}>
                                    <Row className=''>
                                        <Col
                                            style={{position: 'relative'}}
                                            className='col-12 col-md-6 mb-3'>
                                            <h5 className='mb-3'>Choose address from</h5>
                                            <div onClick={onOpenInitialList}
                                                 style={{display: 'flex', justifyContent: 'space-between'}}
                                                 className={cls.value_box}>
                                                <span style={{display: 'inline-block', marginRight: 10}}>
                                                    {state?.initial.value} {state.initial.currency}
                                                </span>
                                                <Image
                                                    src={`/img/${imgMatch(state?.initial.currency.toLowerCase())}.svg`}
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
                                        <Col
                                            style={{position: 'relative'}}
                                            className='col-12 col-md-6 mb-3'>
                                            <h5 className='mb-3'>Choose address to</h5>
                                            <div onClick={onOpenTargetList}
                                                 style={{display: 'flex', justifyContent: 'space-between'}}
                                                 className={cls.value_box}>
                                                <span>{state.target.value} {state.target.currency}</span>
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
                                    {/*<Row className='mb-3'>*/}
                                    {/*    <Col>*/}
                                    {/*        <Input {...register('secondPartyEmail', {*/}
                                    {/*            required: 'You must specify email to SignIn',*/}
                                    {/*            validate: emailValidate,*/}
                                    {/*            message: 'Email is not valid',*/}
                                    {/*        })} placeholder='Specify your second party Email' />*/}
                                    {/*        <ErrorMessage  name='secondPartyEmail' errors={errors} render={() => <p className={cls.error}>Email is not valid</p>} />*/}
                                    {/*    </Col>*/}
                                    {/*</Row>*/}
                                    <Row className='mb-3'>
                                        <Col>
                                            <h5 className='mb-3' style={{fontSize: 12}}>Enter Amount (Fee {store.domain.domainParams.coinSwapFee}%)</h5>
                                            <Input {...register('amount', {
                                                required: 'Check the value',
                                                pattern: /(\d+(?:\.\d+)?)/,
                                                message: 'Check the value',
                                                valueAsNumber: true,
                                                validate: {
                                                    positive: v => parseFloat(v) > 0,
                                                },
                                                onChange: (e) => checkValue(e.target.value),
                                            })} placeholder='0' />
                                            {<p className={cls.error}>{errors.amount?.message}</p>}
                                            <ErrorMessage  name='amount' errors={errors} render={() => <p className={cls.error}>Check values</p>} />
                                        </Col>
                                        {
                                            isValid ? <span>you will pay {actions.percent.toFixed(7)}</span> : null
                                        }
                                    </Row>
                                    <Row>
                                        <Col>
                                            <input onChange={() => setChecked(!checked)} type='checkbox' />
                                            <Link to={'/terms-and-conditions'}>I accept Terms and conditions</Link>
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col className='justify-content-center'>
                                            <Button classname='small' disabled={!isValid && !checked ? true : false}>Confirm & proceed</Button>
                                        </Col>
                                    </Row>
                                </Form>
                                : <Preloader />
                        }
                    </ButtonCard>
                </Col>
                <Col className='col-12 col-lg-6 mb-3'>
                    <ButtonCard>
                        <h2>Transaction details</h2>
                        <Table>
                            <TableHeader classname='table_header-dark' elems={['date', 'operation']} />
                            <TableBody>


                                {
                                    history ?
                                        history.map(item => {
                                            return <InternalSwapTableItem
                                                date={getCurrentDate(item.date)}
                                                amountFrom={item.cryptoAmountFrom.toFixed(5)}
                                                amountTo={item.cryptoAmountTo.toFixed(5)}
                                                coinFrom={item.coinNameFrom}
                                                coinTo={item.coinNameTo}
                                            />
                                        })
                                        : <h3>No data</h3>
                                }
                            </TableBody>
                        </Table>
                    </ButtonCard>
                </Col>
            </Row>


        </Container>
    )
}

InternalSwap.propTypes = {

}
InternalSwap.defaultProps = {

}

export default InternalSwap