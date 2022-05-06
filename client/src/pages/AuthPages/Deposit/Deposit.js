import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";
import {store} from "../../../index";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getData, postData, putData} from "../../../services/StaffServices";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {getCurrentDate} from "../../../utils/getCurrentDate";

const Deposit = () => {
    const {register, handleSubmit} = useForm()
    const [state, setState] = useState({
        value: 0,
        text: ''
    })
    const [history, setHistory] = useState()
    let btc = 38500
    const statusOptions = [
        { value: "BTC", text: "BTC" },
        { value: "ETH", text: "ETH" },
        { value: "BCH", text: "BCH"},
        { value: "USDT", text: "USDT"},
    ];
    const btnsVal = [500, 1000, 1500, 5000, 10000]


    useEffect(() => {
        getHistoryDeposit()
    }, [])

    const getHistoryDeposit = async () => {
        const res = await postData('/deposit/get_deposit_history/', {userId: store.userId})
        setHistory(res.data.depositHistory)
    }


    const setValue = (val) => {
        console.log(val)
        console.log(state)
        let calc = +val / btc
        setState({text: val, value: calc})
    }
    const onSubmit = (data, e) => {
        e.preventDefault()
        data.value = state.value

        const obj = {
            userId: store.userId,
            userEmail: store.userEmail,
            domainName: window.location.host,
            coinName: data.coinName,
            amountInCrypto: +state.value.toFixed(5),
            amountInUsd: +state.text.toFixed(5),
            currentDate: dateToTimestamp(),
            depositAddress: 'address',
            depositStatus: 'pending',
            logTime: getCurrentDate(dateToTimestamp())
        }
        const res = putData('/deposit/make_deposit/', obj)
        console.log(data)
    }
    const onChange = (e) => {
        console.log(e.target.value)
        let calc = +e.target.value / btc
        setState({text: e.target.value, value: calc})
    }

    return (
        <Container>
            <Row>
                <Col className='col-12 col-md-6 mb-3'>
                    <ButtonCard>
                        <h2 className='mb-3'>Deposit</h2>
                        <Row className='mb-3'>
                            <p>Choose address</p>
                            <Select {...register('coinName')} classname='transparent' options={statusOptions} />
                        </Row>
                        <Row className='mb-3'>
                            <p>Choose Quick Amount to Deposit</p>
                            <div className='d-flex flex-column'>
                                <Row className=''>
                                    <Col className='col-12 col-md-4 mb-3'>
                                        <Button onClick={() => setValue(500)}>500</Button>
                                    </Col>
                                    <Col className='col-12 col-md-4 mb-3'>
                                        <Button onClick={() => setValue(1000)}>1000</Button>
                                    </Col>
                                    <Col className='col-12 col-md-4 mb-3'>
                                        <Button onClick={() => setValue(1500)}>1500</Button>
                                    </Col>
                                </Row>
                                <Row className=''>
                                    <Col className='col-12 col-md-6 mb-3'>
                                        <Button onClick={() => setValue(5000)}>5000</Button>
                                    </Col>
                                    <Col className='col-12 col-md-6 mb-3'>
                                        <Button onClick={() => setValue(10000)}>10000</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                        <Row className='mb-3'>
                            <span>Or Enter Your Amount</span>
                            <Input placeholder='' onChange={onChange} value={state.text} />
                        </Row>
                        <Row className='mb-3'>
                            <span>Amount in Crypto</span>
                            <Input placeholder='' onChange={onChange} disabled value={state.value} />
                        </Row>
                        <span>Note: Minimum deposit amount is {store.domain.minDepositSum} USD</span>
                        <span>Note: Deposit fee is: {store.domain.depositFee}%</span>
                        <Row className='mb-3 mt-3 justify-content-center'>
                            <Col className='col-6'>
                                <Button classname='user-green' onClick={handleSubmit(onSubmit)}>Submit</Button>
                            </Col>
                        </Row>
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

                        {
                            history ?
                                history.map(item => {
                                    return (
                                        <Row className={'mt-3 mb-3'}>
                                            <Col className='col-3'>{getCurrentDate(item.data)}</Col>
                                            <Col className='col-3'>${item.usdAmount}/ ({item.cryptoAmount}/ {item.coinName})</Col>
                                            <Col className='col-3'>{item.status}</Col>
                                            <Col className='col-3'>
                                                <Button classname='green'>Show</Button>
                                            </Col>
                                        </Row>
                                    )
                                })
                                : <h3>No data</h3>

                        }
                    </ButtonCard>
                </Col>
            </Row>
        </Container>
    )
}

Deposit.propTypes = {
    
}
Deposit.defaultProps = {
    
}

export default Deposit