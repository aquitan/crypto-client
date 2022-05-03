import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row, Table} from "react-bootstrap";
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

const InternalSwap = () => {
    const cx = classNames.bind(cls)
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
    const options = [
        {value: 0.2748991, currency: 'BTC'},
        {value: 0.1123124, currency: 'ETH'},
        {value: 0.000123, currency: 'BCH'},
        {value: 0.432321, currency: 'USDT'},
    ]
    const [state, setState] = useState({
        initial: {
            value: options[0].value,
            currency: options[0].currency,
        },
        target: {
            value: options[0].value,
            currency: options[0].currency,
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

    const onSubmit = (data) => {
        data.initialValue = state.initial.value
        data.targetValue = state.target.value
        data.initialCurrency = state.initial.currency
        data.targetCurrency = state.target.currency
        console.log(data)
    }
    console.log('isValid', !isValid)
    console.log('isDirty', isDirty)
    console.log('checked', !checked)
    return (
        <Container>
            <Row>
                <Col className='col-12 col-lg-6 mb-3'>
                    <ButtonCard>
                        <h2>Internal swap</h2>
                        <Form classnames='form_big' onSubmit={handleSubmit(onSubmit)}>
                            <Row className=''>
                                <Col className='col-12 col-md-6 mb-3'>
                                    <h5 className='mb-3'>Choose address from</h5>
                                    <div onClick={onOpenInitialList}
                                         className={cls.value_box}>{state.initial.value} {state.initial.currency}</div>
                                    {
                                        openList.initialList ?
                                            <ul className={cls.value_list}>
                                                {options.map(option => <li
                                                    onClick={() => onChangeInitialValue(option.value, option.currency)}
                                                    key={uuid()}>{option.value} <span>{option.currency}</span></li>)}
                                            </ul>
                                            : null
                                    }
                                </Col>
                                <Col className='col-12 col-md-6 mb-3'>
                                    <h5 className='mb-3'>Choose address to</h5>
                                    <div onClick={onOpenTargetList} className={cls.value_box}>{state.target.value} {state.target.currency}</div>
                                    {
                                        openList.targetList ?
                                            <ul className={cls.value_list}>
                                                {options.map(option => <li
                                                    onClick={() => onChangeTargetValue(option.value, option.currency)}
                                                    key={uuid()}>{option.value} <span>{option.currency}</span></li>)}
                                            </ul>
                                            : null
                                    }
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <h5 className='mb-3'>Enter Amount (Fee {store.domain.internal_swap_fee}%)</h5>
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
                                    isValid ? <span>you will pay {actions.percent}</span> : null
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
                    </ButtonCard>
                </Col>
                <Col className='col-12 col-lg-6 mb-3'>
                    <ButtonCard>
                        <h2>Transaction details</h2>
                        <Table>
                            <TableHeader classname='table_header-dark' elems={['date', 'operation']} />
                            <TableBody>
                                <InternalSwapTableItem date={getCurrentDate()} operation={'12312 BTC / 23123 ETH'} />
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