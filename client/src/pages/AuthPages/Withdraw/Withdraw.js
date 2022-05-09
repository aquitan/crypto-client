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
import {Link} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import error from "../../../styles/Error.module.scss";
import {useForm} from "react-hook-form";
import {store} from "../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {postData, putData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import TableItemUser from "../../../components/UI/TableItemUser/TableItemUser";
const Withdraw = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const [history, setHistory] = useState()

    useEffect(() => {
        getHistoryDeposit()
    }, [])

    const getHistoryDeposit = async () => {
        const res = await postData('/withdraw/get_withdrawal_history/', {userId: store.user.id})
        setHistory(res.data.withdrawHistory)
    }
    const [state, setState] = useState({
        value: '',
        text: ''
    })
    const statusOptions = [
        { value: "BTC", text: "BTC", icon: <FontAwesomeIcon icon={faCoffee}/>, amount: '123123' },
        { value: "ETH", text: "ETH", icon: <FontAwesomeIcon icon={faCoffee}/>, amount: '123123' },
        { value: "BCH", text: "BCH", icon: <FontAwesomeIcon icon={faCoffee}/>, amount: '123123' },
        { value: "USDT", text: "USDT", icon: <FontAwesomeIcon icon={faCoffee}/>, amount: '123123' },
    ];
    let btc = 38500
    const options = [
        {value: 'BTC', text: 'BTC'},
        {value: 'USD', text: 'USD'},
    ]
    const onChangeUsd = (e) => {
        console.log('textVal', state.value)
        let calc = +e.target.value / btc
        setState({text: +e.target.value, value: +calc})
    }
    const onChangeCrypto = (e) => {
        console.log(e.target.value)
        let calc = +e.target.value * btc
        setState({text: +calc.toFixed(5), value: +e.target.value})
    }

    const onSubmit = (data, e) => {
        e.preventDefault()
        data.value = state.value

        const obj = {
            userId: store.userId,
            userEmail: store.userEmail,
            domainName: window.location.host,
            coinName: data.coinName,
            amountInCrypto: state.value,
            amountInUsd: state.text,
            currentDate: dateToTimestamp(),
            withdrawalAddress: data.withdrawalAddress,
            withdrawalStatus: 'failed',
            logTime: getCurrentDate(dateToTimestamp())
        }

        const res = putData('/withdraw/make_withdraw/', obj)
        console.log(data)
    }


    return (
        <Container>
            <Row>
                <Col className='col-12 col-md-6 mb-3'>
                    <ButtonCard>
                        <h2 className='mb-3'>Withdraw</h2>
                        <Form classnames='form_big'>
                            <Row className='mb-3'>
                                <Col className='col-12 col-lg-4'>
                                    <p>Chose currency</p>
                                    <Select {...register('coinName')} classname='transparent' options={statusOptions} />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Input placeholder='Amount in USD' type='number' onChange={onChangeUsd} value={state.text} />
                                    <span style={{fontSize: 10}}>Minimum withdraw amount is {store.domain.minWithdrawalSum} USD</span>
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
                        <h2 className='mb-3'>Table</h2>
                        <Row style={{padding: '10px', borderBottom: '1px solid #fff' }}>
                            <Col>Date</Col>
                            <Col>Sum</Col>
                            <Col>Status</Col>
                            <Col></Col>
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

export default Withdraw