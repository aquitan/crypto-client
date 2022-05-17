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
import TableItemUser from "../../../components/UI/TableItemUser/TableItemUser";

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

    useEffect(() => {
        getHistoryDeposit()
    }, [])

    const getHistoryDeposit = async () => {
        const res = await postData('/deposit/get_deposit_history/', {userId: store.user.id})
        const reversedLogs = res.data.depositHistory.slice(0).reverse()
        setHistory(reversedLogs)
    }


    const setValue = (val) => {
        console.log(val)
        console.log(state)
        let calc = +val / btc
        setState({text: val, value: calc})
    }
    const onSubmit = async (data, e) => {
        e.preventDefault()
        data.value = state.value

        const obj = {
            userId: store.user.id,
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
        const res = await putData('/deposit/make_deposit/', obj)
        if (res.status) {
            getHistoryDeposit()
        }
        console.log('res.data', res.status)
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
                        <span style={{fontSize: 12}}>Note: Minimum deposit amount is {store.domain.domainParams.minDepositSum} USD</span>
                        <span style={{fontSize: 12}}>Note: Deposit fee is: {store.domain.domainParams.depositFee}%</span>
                        <Row className='mb-3 mt-3 justify-content-center'>
                            <Col className='col-6'>
                                <Button classname='user-green' onClick={handleSubmit(onSubmit)}>Submit</Button>
                            </Col>
                        </Row>
                    </ButtonCard>
                </Col>
                <Col className='col-12 col-md-6 mb-3'>
                    <ButtonCard>
                        <h2 className='mb-3'>History</h2>
                        <Row style={{padding: '10px', borderBottom: '1px solid #fff' }}>
                            <Col className={'text-center'}>Date</Col>
                            <Col className={'text-center'}>Amount</Col>
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

Deposit.propTypes = {
    
}
Deposit.defaultProps = {
    
}

export default Deposit