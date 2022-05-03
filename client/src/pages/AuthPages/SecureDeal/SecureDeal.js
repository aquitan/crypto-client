import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import InputRadio from "../../../components/UI/InputRadio/InputRadio";
import './SecureDeal.scss'
import Input from "../../../components/UI/Input/Input";
import TextArea from "../../../components/UI/TextArea/TextArea";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../components/UI/DatePickerCustom/DatePickerCustom";
import Select from "../../../components/UI/Select/Select";
import {useForm} from "react-hook-form";
import Button from "../../../components/UI/Button/Button";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {ErrorMessage} from "@hookform/error-message";
import error from "../../../styles/Error.module.scss";
import Table from "../../../components/UI/Table/Table";
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import SecureDealTableItem from "./components/SecureDealTableItem/SecureDealTableItem";
import {useNavigate} from "react-router-dom";
import Form from "../../../components/UI/Form/Form";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";

const SecureDeal = () => {
    const [startDate, setStartDate] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const navigate = useNavigate()
    const options = [
        {value: 'BTC', text: 'BTC'},
        {value: 'ETH', text: 'ETH'},
        {value: 'BCH', text: 'BCH'},
        {value: 'USDT', text: 'USDT'},
    ]
    const tableHeader = ['ID', 'Amount', 'Status', 'Action']

    const onSubmit = (data) => {
        data.deadline = getCurrentDate(startDate)
        console.log(data)
    }

    return (
        <Container>
            <h1 className='mb-4 mt-4'>Create new secure deal</h1>
            <ButtonCard>
                <Form classnames='wide-form' onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3 pb-2 secure_deal_row'>
                        <h4 className='mb-3'>
                            <span className='step'>01</span>
                            Step 1: Choose your role</h4>
                        <p>You can buy or sell anything securely via our platform.</p>
                        <Row className='mb-3 pb-2'>
                            <Col className='secure_deal_col'>
                                <InputRadio {...register('role', {
                                    required: 'This field is required',
                                })} classname='radio_btn' id='seller' label='Seller' value='seller' name='role' />
                                <ErrorMessage
                                    name='role'
                                    errors={errors}
                                    render={({message}) => <p className={error.error}>{message}</p>} />
                            </Col>
                            <Col className='secure_deal_col'>
                                <InputRadio {...register('role', {
                                    required: 'This field is required',
                                })} classname='radio_btn' label='Buyer' id='buyer' value='buyer' name='role' />
                                <ErrorMessage
                                    name='role'
                                    errors={errors}
                                    render={({message}) => <p className={error.error}>{message}</p>} />
                            </Col>
                        </Row>
                    </Row>
                    <Row className='mb-3 pb-2'>
                        <h4 className='mb-3'>
                            <span className='step'>02</span>
                            Step 2: Participant</h4>
                        <p>Please enter username or email of another participant. User should have account at localhost</p>
                        <Col>
                            <Input {...register('secondPartyName', {
                                required: 'This field is required',
                            })} placeholder='Second party name' />
                            <ErrorMessage
                                name='secondPartyName'
                                errors={errors}
                                render={({message}) => <p className={error.error}>{message}</p>} />
                        </Col>
                    </Row>
                    <Row className='mb-3 pb-2'>
                        <h4 className='mb-3'>
                            <span className='step'>03</span>
                            Step 3: Deal conditions</h4>
                        <p>Please describe all aspects of the deal as accurately as possible.
                            Do not use special professional vocabulary,
                            they must be clear to the third party, a Guarantor.
                            The resolution of possible disputes will depend on this.</p>
                        <Col>
                            <TextArea {...register('dealConditions', {
                                required: 'This field is required',
                            })} classnames='textarea_bordered' placeholder='Deal conditions' />
                            <ErrorMessage
                                name='dealConditions'
                                errors={errors}
                                render={({message}) => <p className={error.error}>{message}</p>} />
                        </Col>
                    </Row>
                    <Row className='pb-2'>
                        <Col className='col-12 col-md-6 mb-3'>
                            <DatePickert
                                required
                                customInput={<DatePickerCustom classname='user-datepicker'/>}
                                placeholderText='Date'
                                selected={startDate}
                                dateFormat='yyyy/MM/dd'
                                onChange={(date) => setStartDate(date)} />
                        </Col>
                        <Col className='col-12 col-md-6 mb-3'>
                            <Select {...register('currency', {
                                required: 'This field is required',
                            })} options={options} classname='light select-bordered' />
                            <ErrorMessage
                                name='currency'
                                errors={errors}
                                render={({message}) => <p className={error.error}>{message}</p>} />
                        </Col>
                    </Row>
                    <Row className='mb-3 pb-2'>
                        <Col>
                            <Input {...register('amount', {
                                required: 'This field is required',
                                pattern: /(\d+(?:\.\d+)?)/
                            })} placeholder='amount'/>
                            <ErrorMessage
                                name='amount'
                                errors={errors}
                                render={({message}) => <p className={error.error}>{message ? message : 'Check value'}</p>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button classname='small'>Create secure deal</Button>
                        </Col>
                    </Row>
                </Form>
            </ButtonCard>

            <ButtonCard>
                <h2>Recent deals</h2>
                <Row>
                    <Table>
                        <TableHeader classname='table_header-light' elems={tableHeader} />
                        <TableBody>
                            <SecureDealTableItem classname={'table_item_small'} id={1} amount={1} status='pending' onClick={() => navigate('/secure-deal/1')}/>
                        </TableBody>
                    </Table>
                </Row>
            </ButtonCard>
        </Container>
    )
}

SecureDeal.propTypes = {
    
}
SecureDeal.defaultProps = {
    
}

export default SecureDeal