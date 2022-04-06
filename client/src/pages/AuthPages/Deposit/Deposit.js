import React, {useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import Select from "../../../components/UI/Select/Select";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import {useForm} from "react-hook-form";
import {store} from "../../../index";

const Deposit = () => {
    const {register, handleSubmit} = useForm()
    const [state, setState] = useState({
        value: 0,
        text: ''
    })
    let btc = 38500
    const statusOptions = [
        { value: "BTC", text: "BTC" },
        { value: "ETH", text: "ETH" },
        { value: "BCH", text: "BCH"},
        { value: "USDT", text: "USDT"},
    ];
    const btnsVal = [500, 1000, 1500, 5000, 10000]

    const setValue = (val) => {
        console.log(val)
        console.log(state)
        let calc = +val / btc
        setState({text: val, value: calc})
    }
    const onSubmit = (data, e) => {
        e.preventDefault()
        data.value = state.value
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
                <Col>
                    <Card className='p-4 bg-dark'>
                        <h2 className='mb-3'>Deposit</h2>
                        <Row className='mb-3'>
                            <p>Choose address</p>
                            <Select {...register('currency')} classname='transparent' options={statusOptions} />
                        </Row>
                        <Row className='mb-3'>
                            <p>Choose Quick Amount to Deposit</p>
                            <div className='d-flex flex-column'>
                                <Row className='mb-3'>
                                    <Col>
                                        <Button onClick={() => setValue(500)}>500</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => setValue(1000)}>1000</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => setValue(1500)}>1500</Button>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col>
                                        <Button onClick={() => setValue(5000)}>5000</Button>
                                    </Col>
                                    <Col>
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
                        <span>Note: Minimum deposit amount is {store.domain.min_deposit_sum} USD</span>
                        <span>Note: Deposit fee is: {store.domain.deposit_fee}%</span>
                        <Row className='mb-3 mt-3 justify-content-center'>
                            <Col className='col-6'>
                                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col>
                    <Card className='p-4 bg-dark'>
                        <h2 className='mb-3'>Table</h2>

                    </Card>
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