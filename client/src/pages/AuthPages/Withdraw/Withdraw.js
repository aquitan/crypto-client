import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import Input from "../../../components/UI/Input/Input";
import CurrencyDropdown from "../../../components/UI/CurrencyDropdown/CurrencyDropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import Form from "../../../components/UI/Form/Form";
import Select from '../../../components/UI/Select/Select'
import Button from "../../../components/UI/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import error from "../../../styles/Error.module.scss";
import {useForm} from "react-hook-form";
import {store} from "../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {getData, postData, putData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import TableItemUser from "../../../components/UI/TableItemUser/TableItemUser";
import ErrorModal from "../../../components/ErrorModal/ErrorModal";
import {observer} from "mobx-react-lite";
import {findPercent} from "../../../utils/findPercent";
import Preloader from "../../../components/UI/Preloader/Preloader";
import cls from './Withdraw.module.scss'
import Image from "../../../components/UI/Image/Image";
import {imgMatch} from "../../../utils/imgMatch";

const Withdraw = () => {
    const [state, setState] = useState({
        value: '',
        text: ''
    })
    const [balanceCoin, setBalanceCoin] = useState('BTC')
    const navigate = useNavigate()
    const [balance, setBalance] = useState(0)
    const [coins, setCoins] = useState([])
    const [coinsFull, setCoinsFull] = useState([])
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const [history, setHistory] = useState()
    const [modal, setModal] = useState(false)
    const [error, setError] = useState()


    useEffect(() => {
        getHistoryDeposit()
        getBalance()
    }, [])

    const getHistoryDeposit = async () => {
        const res = await postData('/withdraw/get_withdrawal_history/', {userId: store.user.id})
        if (res.status === 500) {
            navigate('/error-500')
        }
        setHistory(res.data.withdrawHistory)
    }

    let btc = 38500

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
        data.value = state.value
        console.log('store error', store.user.userError)
        const obj = {
            userId: store.user.id,
            userEmail: store.user.email,
            domainName: window.location.host,
            coinName: data.coinName,
            amountInCrypto: state.value,
            amountInUsd: state.text,
            currentDate: dateToTimestamp(),
            withdrawalAddress: data.withdrawalAddress,
            withdrawalStatus: 'failed',
            logTime: getCurrentDate(dateToTimestamp()),
            errorId: store.user.userError
        }

        const res = await putData('/withdraw/make_withdraw/', obj)
        setError(res.data)
        if (res.status === 201) {
            setModal(true)
        }
        console.log(data)
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

    const getBalance = async () => {
        const res = await getData(`/get_user_balance/${store.user.id}`)
        let arr = []
            res.data.forEach(item => {
                let obj = {
                    value: item.coinName,
                    text: item.coinName
                }
                arr.push(obj)
            })
        setCoins(arr)
        setCoinsFull(res.data)
        setBalance(res.data[0].coinBalance)
        console.log('res balance', res.data)
    }





    return (
        <Container>

            <ErrorModal
                errorText={error?.errorText}
                btnType={error?.errorButton}
                errorType={error?.errorTitle}
                active={modal}
                title={'Withdrowal Error!'}
                setActive={setModal}
            />

            <Row>
                <Col className='col-12 col-md-6 mb-3'>
                    <ButtonCard>
                        <h2 className='mb-3'>Withdraw</h2>
                        <Form classnames='form_big'>
                            <Row className='mb-3 align-items-center'>
                                <Col className='col-12'>
                                    <p>Chose currency</p>
                                    <div className={cls.inputWrapper}>
                                        <span style={{display: 'flex', alignItems: 'center'}}>
                                            <Image src={`/img/${imgMatch(balanceCoin)}.svg`} height={30} width={30} />
                                            {
                                                coins.length ?
                                                    <Select
                                                        value={balanceCoin}
                                                        onChange={e => onValChange(e)}
                                                        classname={['transparent', 'borderLess']}
                                                        options={coins} />
                                                    : <Preloader/>
                                            }
                                        </span>
                                        <div>Coin balance: {balance}</div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Input placeholder='Amount in USD' type='number' onChange={onChangeUsd} value={state.text} />
                                    <span style={{fontSize: 10}}>Minimum withdraw amount is {store.domain.domainParams.minWithdrawalSum} USD</span>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Input placeholder='Amount in Crypto' type='number' onChange={onChangeCrypto} value={state.value} />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Input {...register('withdrawalAddress')} placeholder='enter the address' />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <input {...register('terms', {
                                        required: true
                                    })} type='checkbox' />
                                    <Link to={'/'}> I accept Terms and Conditions</Link>
                                    <ErrorMessage  name='terms' errors={errors} render={() => <p className={error.error}>you have to accept terms and conditions</p>} />
                                </Col>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col className='col-6'>
                                    <Button onClick={handleSubmit(onSubmit)} classname='user-red'>Withdraw</Button>
                                </Col>
                            </Row>
                        </Form>
                    </ButtonCard>
                </Col>
                <Col className='col-12 col-md-6 mb-3'>
                    <ButtonCard>
                        <h2 className='mb-3'>History</h2>
                        <Row style={{padding: '10px', borderBottom: '1px solid #fff' }}>
                            <Col className={'text-center'}>Date</Col>
                            <Col className={'text-center'}>Sum</Col>
                            <Col className={'text-center'}></Col>
                        </Row>
                        <div style={{maxHeight: 400, overflowY: 'auto', height: '100%'}}>
                            {
                                history ?
                                    history.map(item => {
                                        return (
                                            <TableItemUser
                                                date={getCurrentDate(item.date)}
                                                usdAmount={item.usdAmount}
                                                cryptoAmount={item.cryptoAmount}
                                                coinName={item.coinName}
                                                status={item.status}
                                            />
                                        )
                                    })
                                    : <h3>No data</h3>

                            }
                        </div>
                    </ButtonCard>
                </Col>
            </Row>
        </Container>
    )
}

Withdraw.propTypes = {

}
Withdraw.defaultProps = {

}

export default observer(Withdraw)