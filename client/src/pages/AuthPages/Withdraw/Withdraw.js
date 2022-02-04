import React, {useState} from 'react'
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
const Withdraw = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const [state, setState] = useState({
        value: 0,
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
        setState({text: e.target.value, value: calc})
    }
    const onChangeCrypto = (e) => {
        console.log(e.target.value)
        let calc = +e.target.value * btc
        setState({text: calc.toFixed(2), value: e.target.value})
    }


    return (
        <Container>
            <Card className='p-4'>
                <Form classnames='form_big'>
                    <h2 className='mb-3'>Withdraw</h2>
                    <Row className='mb-3'>
                        <Col>
                            <p>Chose currency</p>
                            <Select {...register('currency')} classname='light' options={statusOptions} />
                        </Col>
                        <Col>
                            <p>Amount in USD</p>
                            <Input placeholder={0} type='number' onChange={onChangeUsd} value={state.text} />
                            <span>Note: Minimum withdraw amount is 500 USD</span>
                        </Col>
                        <Col>
                            <p>Amount in Crypto</p>
                            <Input placeholder={0} type='number' onChange={onChangeCrypto} value={state.value} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Input placeholder='enter the address' />
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <input {...register('terms', {
                                required: true
                            })} type='checkbox' />
                            <Link to={'/'}>Terms and conditions</Link>
                            <ErrorMessage  name='terms' errors={errors} render={() => <p className={error.error}>you have to accept terms and conditions</p>} />
                        </Col>
                    </Row>
                    <Button>Withdraw</Button>
                </Form>
            </Card>
        </Container>
    )
}

Withdraw.propTypes = {

}
Withdraw.defaultProps = {

}

export default Withdraw