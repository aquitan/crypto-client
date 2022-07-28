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
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import error from "../../../styles/Error.module.scss";
import {useForm} from "react-hook-form";
import {store} from "../../../../index";
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
import {getGeoData} from "../../../queries/getSendGeoData";
import swal from '@sweetalert/with-react';
import {NotifContext, useNotifContext} from "../../../context/notifContext";

const Withdraw = () => {
    const {updateNotif} = useNotifContext(NotifContext)
    const [state, setState] = useState({
        value: '',
        text: ''
    })
    const [counter, setCounter] = useState(0)
    const [address, setAddress] = useState('')
    const [balanceCoin, setBalanceCoin] = useState('BTC')
    const navigate = useNavigate()
    const [balance, setBalance] = useState(0)
    const [coins, setCoins] = useState([])
    const [coinsFull, setCoinsFull] = useState([])
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const [history, setHistory] = useState([])
    const [modal, setModal] = useState(false)
    const [error, setError] = useState()
    const location = useLocation()

    useEffect(() => {
        getHistoryDeposit()
        // getBalance()
        setBalance(location.state.coinsBalance)
        console.log('location', location)
    }, [])

    const getHistoryDeposit = async () => {
        const res = await getData(`/withdraw/get_withdrawal_history/${store.user.id}/${counter}/10`)
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
        const geodata = await getGeoData()
        data.value = state.value
        console.log('store error', store.user.userError)
        const obj = {
            userId: store.user.id,
            userEmail: store.user.email,
            domainName: window.location.host,
            coinName: balanceCoin,
            amountInCrypto: state.value,
            amountInUsd: state.text,
            currentDate: dateToTimestamp(),
            withdrawalAddress: data.withdrawalAddress,
            withdrawalStatus: 'failed',
            coinFullName: location.state.coinFullName,
            staffId: store.isStaff ? store.user.id : '',
            ipAddress: geodata.ipAddress,
            city: geodata.city,
            browser: geodata.browser,
            countryName: geodata.countryName,
            coordinates: geodata.coordinates,
            logTime: dateToTimestamp(new Date()),
            errorId: store.user.userError,
        }

        const res = await putData('/withdraw/make_withdraw/', obj)
        updateNotif()
        setError(res.data)
        if (res.status === 201) {
            // setModal(true)
            onSendWithdraw()
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

    // const getBalance = async () => {
    //     const res = await getData(`/get_user_balance/${store.user.id}`)
    //     let arr = []
    //         res.data.forEach(item => {
    //             let obj = {
    //                 value: item.coinName,
    //                 text: item.coinName
    //             }
    //             arr.push(obj)
    //         })
    //     setCoins(arr)
    //     setCoinsFull(res.data)
    //     setBalance(res.data[0].coinBalance)
    //     console.log('res balance', res.data)
    // }


    const onNext = () => {
        setCounter((prevState => {
            return prevState + 10
        }))
        console.log('counter', counter)
    }

    const getWithdrawAddress = async () => {

    }

    const onSendWithdraw = () => {
        swal({
            content:
                <div>
                    <h2>Withdrawal Error!</h2>
                    <h4>{error?.errorType}</h4>
                    <div>
                        <b>{error?.errorText}</b>
                    </div>
            </div>,
            confirmButtonText: 'Close'
            })
    }



    return (

        <Container>

            <ErrorModal
                errorText={error?.errorText}
                btnType={error?.errorButton}
                errorType={error?.errorTitle}
                active={modal}
                title={'Withdrawal Error!'}
                setActive={setModal}
            />

            <Row>
                <Col className='col-12 col-lg-6 mb-3'>
                    <ButtonCard>
                        <h2 className='mb-3'>Withdraw</h2>
                        <Form classnames='form_big'>
                            <Row className='mb-3 align-items-center'>
                                <Col className='col-12'>
                                    <div style={{padding: '20px 20px', borderRadius: '20px'}} className={cls.inputWrapper}>
                                        <span style={{display: 'flex', alignItems: 'center'}}>
                                            <Image src={`/img/${imgMatch(location.state.coin)}.svg`} height={30} width={30} />
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
                                                {location.state.coin}
                                            </span>
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
                                    <Input {...register('withdrawalAddress')} placeholder='Enter the address' />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <input {...register('terms', {
                                        required: true
                                    })} type='checkbox' />
                                    <Link to={'/'}> I accept Terms and Conditions</Link>
                                    <ErrorMessage  name='terms' errors={errors} render={() => <p className={error.error}>You have to accept terms and conditions</p>} />
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
                <Col className='col-12 col-lg-6 mb-3'>
                    <ButtonCard>
                        <h2 className='mb-3'>History</h2>
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
                                            />
                                        )
                                    })
                                    : <h3>No data</h3>

                            }
                        </div>
                        <Row>
                            {
                                history.length > 10 ?
                                    <span onClick={onNext}>Next...</span>
                                    : null
                            }
                        </Row>
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