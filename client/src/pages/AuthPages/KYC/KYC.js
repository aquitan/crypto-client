import React, {useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import DatePickert from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
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
import {getGeoData} from "../../../queries/getSendGeoData";
import moment from 'moment'
import {Link, useLocation} from "react-router-dom";
import InputRadio from "../../../components/UI/InputRadio/InputRadio";
import {store} from "../../../index";
import {splitLocation} from "../../../utils/regExpSlash";
import Modal from "../../../components/UI/Modal/Modal";


const KYC = ({status}) => {
    const [startDate, setStartDate] = useState()
    const [modal, setModal] = useState(false)
    const location = useLocation()
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: 'onBlur'
    })

    const onSubmit = async (data) => {
        let geodata =  await getGeoData()
        data.phoneNumber = parseInt(data.phoneNumber.split(/[.,()\/ -]/).join(''))
        data.city = geodata.city
        data.ipAddress = geodata.ipAddress
        data.countryName = geodata.countryName
        data.coordinates = geodata.coordinates
        data.userAction = splitLocation(location)
        data.dateOfBirth = moment(startDate).format('yyyy/MM/DD')
        data.currentDate = geodata.currentDate
        data.id = geodata.id

        sendKycData(data)
    }

    const checkKycStatus = (status) => {
        if (status) {
            return <KycResults status={status} />
        }
    }

    const onClickCheck = () => {
        if (!isValid) {
            setModal(true)
        }
    }


    return (
        <>
            <Modal active={modal} setActive={setModal}>
                <h2>Check Fields!</h2>
            </Modal>

            {
                status.kyc_status
                    ?
                    checkKycStatus(status.kyc_status)
                    :
                    <>
                        <h2 className='mt-3 mb-3'>Verify your ID</h2>
                        <Form classnames='form_big' onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col>
                                    <Input {...register('firstName', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} name='firstName' placeholder='first name'/>
                                    <ErrorMessage  name='firstName' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                                </Col>
                                <Col>
                                    <Input {...register('lastName', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
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
                                        validate: value => {
                                            if (emailValidate(value) && value === store.userEmail) {
                                                return console.log('OK')
                                            }
                                            return console.log('Wrong Email')
                                        }
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
                                    <ErrorMessage  name='phoneNumber' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                                </Col>
                                <Col>
                                    <Input {...register('documentNumber', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} name='documentNumber' placeholder='ID Number'/>
                                    <ErrorMessage  name='documentNumber' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input {...register('mainAddress', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} name='mainAddress' placeholder='main address'/>
                                    <ErrorMessage  name='mainAddress' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                                </Col>
                                <Col>
                                    <Input {...register('subAddress', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} name='subAddress' placeholder='additional address'/>
                                    <ErrorMessage  name='subAddress' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input {...register('city', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} name='city' placeholder='city'/>
                                    <ErrorMessage  name='mainAddress' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                                </Col>
                                <Col>
                                    <Input {...register('zipCode', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} name='zipCode' placeholder='zip code'/>
                                    <ErrorMessage  name='zipCode' errors={errors} render={() => <p className={error.error}>this field is required</p>} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='col-6'>
                                    <Input {...register('state')} name='state' placeholder='state'/>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col>
                                    <InputRadio {...register('documentType', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} value='Passport' type='radio' label='Passport' />
                                </Col>
                                <Col>
                                    <InputRadio {...register('documentType', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} value='National ID' type='radio' label='National ID' />
                                </Col>
                                <Col>
                                    <InputRadio {...register('documentType', {
                                        required: true,
                                        pattern: /^[^а-яё]+$/iu
                                    })} value='Driving License' type='radio' label='Driving License' />
                                </Col>
                                <ErrorMessage  name='zipCode' errors={errors} render={() => <p className={error.error}>you have to accept terms and conditions</p>} />
                            </Row>
                            <Row className='mt-4'>
                                <span className='mb-3'>Only pdf/png/jpeg files are accepted!</span>
                                <Col>
                                    <FileUpload {...register('file1', {
                                        required: 'This field is required'
                                    })} accept="image/png, image/jpeg, application/pdf" name='file1'/>
                                </Col>
                                <Col>
                                    <FileUpload {...register('file2', {
                                        required: 'This field is required'
                                    })} accept="image/png, image/jpeg, application/pdf" name='file2'/>
                                </Col>
                                <Col>
                                    <FileUpload {...register('file3', {
                                        required: 'This field is required'
                                    })} accept="image/png, image/jpeg, application/pdf" name='file3'/>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col >
                                    <input {...register('terms', {
                                        required: true
                                    })} type='checkbox' />
                                    <Link style={{color: '#000'}} to={'/terms-and-conditions'}>Terms and conditions</Link>
                                    <ErrorMessage  name='terms' errors={errors} render={() => <p className={error.error}>you have to accept terms and conditions</p>} />
                                </Col>
                                <Col >
                                    <input {...register('privacy', {
                                        required: true
                                    })} type='checkbox' />
                                    <Link style={{color: '#000'}} to={'/privacy-policy'}>Privacy policy</Link>
                                    <ErrorMessage  name='privacy' errors={errors} render={() => <p className={error.error}>you have to accept terms and conditions</p>} />
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col className='col-sm-12 col-lg-3 m-auto'>
                                    <Button onClick={onClickCheck} type='submit'>Verify</Button>
                                </Col>
                            </Row>

                        </Form>
                    </>
            }
        </>
    )
}

export default KYC