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
import InputMask from 'react-input-mask';
import FileUpload from "../../../components/UI/FileUpload/FileUpload";
import {sendKycData} from "../../../queries/sendKycData";
import KycResults from "./KycResults/KysResults";


const KYC = ({status}) => {
    const [startDate, setStartDate] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const [phoneNumber, setPhoneNumber] = useState('')

    const onSubmit = (data) => {
        console.log('data....', data)
        sendKycData(data)
        // let phone = phoneNumber.split(/[.,()\/ -]/)
        // let phoneCleared = phone.join('')
        // console.log('phone', parseInt(phoneCleared))
    }

   // const onNumberChange = (e) => {
   //      setPhoneNumber(e.target.value)
   // }

    const checkKycStatus = (status) => {
        if (status) {
            return <KycResults status={status} />
        }
    }


    return (
        <Container>
            {
                status
                    ?
                    checkKycStatus(status)
                    :
                    <>
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
                                    <DatePickert required className='date_picker_custom' placeholderText='date of birth' selected={startDate} dateFormat='yyyy/MM/dd' onChange={(date) => setStartDate(date)} />
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
                                    <InputMask mask='9-(999)-999-99-99' {...register('phoneNumber')}>
                                        {(inputProps) => <Input {...inputProps} name='phoneNumber' placeholder='phone number' type='tel'/>}
                                    </InputMask>

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
                            <Row className='mt-4'>
                                <Col>
                                    <FileUpload {...register('file1', {
                                        required: 'This field is required'
                                    })} name='file1'/>
                                </Col>
                                <Col>
                                    <FileUpload {...register('file2', {
                                        required: 'This field is required'
                                    })} name='file2'/>
                                </Col>
                                <Col>
                                    <FileUpload {...register('file3', {
                                        required: 'This field is required'
                                    })} name='file3'/>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col className='col-sm-12 col-lg-3 m-auto'>
                                    <Button>Verify</Button>
                                </Col>
                            </Row>

                        </Form>
                    </>
            }
        </Container>
    )
}

export default KYC