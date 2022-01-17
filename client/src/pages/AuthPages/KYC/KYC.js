import React, {useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import DatePickert from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import cls from './KYC.modules.scss'
import './DatePicker.scss'
import {useForm} from "react-hook-form";
import {emailValidate} from "../../../utils/checkEmail";
import {ErrorMessage} from "@hookform/error-message";
import error from '../../../styles/Error.module.scss'
import Button from "../../../components/UI/Button/Button";

const KYC = () => {
    const [startDate, setStartDate] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const onSubmit = (data) => {
        console.log(data)
    }
    const onClick = (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <h1>Verify your ID</h1>
            <Form type='big' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Input {...register('firstName', {
                            required: true,
                        })} name='firstName' placeholder='first name'/>
                        <ErrorMessage  name='firstName' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                    </Col>
                    <Col>
                        <Input {...register('lastName', {
                            required: true,
                        })} name='lastName' placeholder='last name'/>
                        <ErrorMessage  name='lastName' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DatePickert required className='date_picker_custom' placeholderText='date of birth' selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Col>
                    <Col>
                        <Input {...register('email', {
                            required: 'This field is required',
                            validate: emailValidate
                        })} name='email' placeholder='email'/>
                        <ErrorMessage  name='email' errors={errors} render={() => <p className={error.error}>email is invalid</p>} />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Input {...register('phoneNumber', {
                            required: true,
                        })} name='phoneNumber' placeholder='phone number' type='number'/>
                        <ErrorMessage  name='phoneNumber' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                    </Col>
                    <Col>
                        <Input {...register('id', {
                            required: true,
                        })} name='id' placeholder='ID Number'/>
                        <ErrorMessage  name='id' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input {...register('mainAddress', {
                            required: true,
                        })} name='mainAddress' placeholder='main address'/>
                        <ErrorMessage  name='mainAddress' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                    </Col>
                    <Col>
                        <Input {...register('subAddress', {
                            required: true,
                        })} name='subAddress' placeholder='additional address'/>
                        <ErrorMessage  name='subAddress' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input {...register('zipCode', {
                            required: true,
                        })} name='zipCode' placeholder='zip code'/>
                        <ErrorMessage  name='zipCode' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                    </Col>
                    <Col>
                        <Input {...register('state')} name='state' placeholder='state'/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col className='col-sm-12 col-lg-3 m-auto'>
                        <Button onClick={onClick} >Verify</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default KYC