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
import KycResults from "./KycResults/KysResults";
import {getGeoData} from "../../../queries/getSendGeoData";
import moment from 'moment'
import {Link, useLocation} from "react-router-dom";
import InputRadio from "../../../components/UI/InputRadio/InputRadio";
import {store} from "../../../index";
import {splitLocation} from "../../../utils/regExpSlash";
import Modal from "../../../components/UI/Modal/Modal";
import DatePickerCustom from "../../../components/UI/DatePickerCustom/DatePickerCustom";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {putData} from "../../../services/StaffServices";
import cls from './KYC.modules.scss'
import {dateToTimestamp} from "../../../utils/dateToTimestamp";


const KYC = ({status}) => {
    const [startDate, setStartDate] = useState()
    const [modal, setModal] = useState(false)
    const location = useLocation()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const onSubmit = async (data) => {
        console.log('status---', data)
        let geodata =  await getGeoData()
        data.phoneNumber = parseInt(data.phoneNumber.split(/[.,()\/ -]/).join('')).toString()
        data.ipAddress = geodata.ipAddress
        data.countryName = geodata.countryName
        data.coordinates = geodata.coordinates
        data.userAction = splitLocation(location)
        data.currentDate = geodata.currentDate
        data.userId = store.user.id
        data.zipCode = +data.zipCode
        data.domainName = window.location.host
        data.documentType = 'Passport'
        data.documents = {}
        delete data.terms
        delete data.privacy
       const res = await putData('/personal_area/verification/', data)
    }

    const checkKycStatus = (status) => {
        if (status) {
            return <KycResults status={status} />
        }
    }

    // const onClickCheck = () => {
    //     if (!isValid) {
    //         setModal(true)
    //     }
    // }
    //
    // console.log('kyc', status)

    return (
        <Container>
            <Modal active={modal} setActive={setModal}>
                <h2>Check Fields!</h2>
            </Modal>
            <h2 className='mt-3 mb-3'>Verify your ID</h2>
            <ButtonCard>

                <Form classnames={'form_big'} onSubmit={handleSubmit(onSubmit)}>
                    <Row className={'mb-3'}>
                        <Col>
                            <Input {...register('firstName')} placeholder='first name' />
                        </Col>
                        <Col>
                            <Input {...register('lastName')} placeholder='last name'/>
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col>
                            <Input {...register('userEmail')} placeholder='email' />
                        </Col>
                        <Col>
                            <Input {...register('dateOfBirth')} placeholder='date of birth'/>
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col>
                            <Input {...register('phoneNumber')} placeholder='phoneNumber' />
                        </Col>
                        <Col>
                            <Input {...register('documentNumber')} placeholder='document number'/>
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col>
                            <Input {...register('mainAddress')} placeholder='main address' />
                        </Col>
                        <Col>
                            <Input {...register('subAddress')} placeholder='sub address'/>
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col>
                            <Input {...register('city')} placeholder='city' />
                        </Col>
                        <Col>
                            <Input {...register('zipCode')} placeholder='zip code'/>
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col>
                            <Input {...register('state')} placeholder='state' />
                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col>
                            <InputRadio {...register('documentType')} value='Passport' type='radio' label='Passport' />
                        </Col>
                        <Col>
                            <InputRadio {...register('documentType')} value='National ID' type='radio' label='National ID' />
                        </Col>
                        <Col>
                            <InputRadio {...register('documentType')} value='Driving License' type='radio' label='Driving License' />
                        </Col>
                    </Row>

                    <Row>
                        <Button>Submit</Button>
                    </Row>
                </Form>
            </ButtonCard>
            {/*{*/}
            {/*    status.kycStatus !== 'empty'*/}
            {/*        ?*/}
            {/*        checkKycStatus(status.kycStatus)*/}
            {/*        :*/}
            {/*        <ButtonCard>*/}

            {/*            <Form classnames='form_big' onSubmit={handleSubmit(onSubmit)}>*/}
            {/*                <Row className={'mb-3'}>*/}
            {/*                    <Col>*/}
            {/*                        <Input {...register('firstName', {*/}
            {/*                            required: true,*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} name='firstName' placeholder='first name'/>*/}
            {/*                        <ErrorMessage  name='firstName' errors={errors} render={() => <p className={cls.error}>this field is required</p>} />*/}
            {/*                    </Col>*/}
            {/*                    <Col>*/}
            {/*                        <Input {...register('lastName', {*/}
            {/*                            required: true,*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} name='lastName' placeholder='last name'/>*/}
            {/*                        <ErrorMessage  name='lastName' errors={errors} render={() => <p className={cls.error}>this field is required</p>} />*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <Row className={'mb-3'}>*/}
            {/*                    <Col>*/}
            {/*                        <DatePickert required*/}
            {/*                                     customInput={<DatePickerCustom classname={'user-datepicker'}/>}*/}
            {/*                                     placeholderText='date'*/}
            {/*                                     selected={startDate}*/}
            {/*                                     dateFormat='yyyy/MM/dd'*/}
            {/*                                     onChange={(date) => setStartDate(date)} />*/}
            {/*                    </Col>*/}
            {/*                    <Col>*/}
            {/*                        <Input {...register('userEmail', {*/}
            {/*                            required: 'This field is required',*/}
            {/*                            validate: emailValidate,*/}
            {/*                        })} name='email' placeholder='email'/>*/}
            {/*                        <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <br/>*/}
            {/*                <Row className={'mb-3'}>*/}
            {/*                    <Col>*/}
            {/*                        /!*<InputMask mask='9-(999)-999-99-99' {...register('phoneNumber')}>*!/*/}
            {/*                        /!*    {(inputProps) => <Input {...inputProps} name='phoneNumber' placeholder='phone number' type='tel'/>}*!/*/}
            {/*                        /!*</InputMask>*!/*/}
            {/*                        /!*<ErrorMessage  name='phoneNumber' errors={errors} render={() => <p className={cls.error}>this field is required</p>} />*!/*/}
            {/*                    </Col>*/}
            {/*                    <Col>*/}
            {/*                        <Input {...register('documentNumber', {*/}
            {/*                            required: true,*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} name='documentNumber' placeholder='ID Number'/>*/}
            {/*                        <ErrorMessage  name='documentNumber' errors={errors} render={() => <p className={cls.error}>this field is required</p>} />*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <Row className={'mb-3'}>*/}
            {/*                    <Col>*/}
            {/*                        <Input {...register('mainAddress', {*/}
            {/*                            required: true,*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} name='mainAddress' placeholder='main address'/>*/}
            {/*                        <ErrorMessage  name='mainAddress' errors={errors} render={() => <p className={cls.error}>this field is required</p>} />*/}
            {/*                    </Col>*/}
            {/*                    <Col>*/}
            {/*                        <Input {...register('subAddress', {*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} name='subAddress' placeholder='additional address'/>*/}
            {/*                        <ErrorMessage  name='subAddress' errors={errors} render={() => <p className={cls.error}>this field is required</p>} />*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <Row className={'mb-3'}>*/}
            {/*                    <Col>*/}
            {/*                        <Input {...register('city', {*/}
            {/*                            required: true,*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} name='city' placeholder='city'/>*/}
            {/*                        <ErrorMessage  name='mainAddress' errors={errors} render={() => <p className={cls.error}>this field is required</p>} />*/}
            {/*                    </Col>*/}
            {/*                    <Col>*/}
            {/*                        <Input {...register('zipCode', {*/}
            {/*                            required: true,*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} name='zipCode' placeholder='zip code'/>*/}
            {/*                        <ErrorMessage  name='zipCode' errors={errors} render={() => <p className={cls.error}>this field is required</p>} />*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <Row className={'mb-3'}>*/}
            {/*                    <Col className='col-6'>*/}
            {/*                        <Input {...register('state')} name='state' placeholder='state'/>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <Row className='mt-4'>*/}
            {/*                    <Col>*/}
            {/*                        <InputRadio {...register('documentType', {*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} value='Passport' type='radio' label='Passport' />*/}
            {/*                    </Col>*/}
            {/*                    <Col>*/}
            {/*                        <InputRadio {...register('documentType', {*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} value='National ID' type='radio' label='National ID' />*/}
            {/*                    </Col>*/}
            {/*                    <Col>*/}
            {/*                        <InputRadio {...register('documentType', {*/}
            {/*                            pattern: /^[^а-яё]+$/iu*/}
            {/*                        })} value='Driving License' type='radio' label='Driving License' />*/}
            {/*                    </Col>*/}
            {/*                    <ErrorMessage  name='zipCode' errors={errors} render={() => <p className={cls.error}>you have to accept terms and conditions</p>} />*/}
            {/*                </Row>*/}
            {/*                <Row className='mt-4'>*/}
            {/*                    <Col className={'col-12 col-md-3'}>*/}
            {/*                        <input {...register('terms', {*/}
            {/*                            required: true*/}
            {/*                        })} type='checkbox' />*/}
            {/*                        <Link to={'/terms-and-conditions'}>Terms and conditions</Link>*/}
            {/*                        <ErrorMessage  name='terms' errors={errors} render={() => <p className={cls.error}>you have to accept terms and conditions</p>} />*/}
            {/*                    </Col>*/}
            {/*                    <Col className={'col-12 col-md-3'}>*/}
            {/*                        <input {...register('privacy', {*/}
            {/*                            required: true*/}
            {/*                        })} type='checkbox' />*/}
            {/*                        <Link to={'/privacy-policy'}>Privacy policy</Link>*/}
            {/*                        <ErrorMessage  name='privacy' errors={errors} render={() => <p className={cls.error}>you have to accept terms and conditions</p>} />*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*                <Row className='mt-4'>*/}
            {/*                    <Col className='col-sm-12 col-lg-3 m-auto'>*/}
            {/*                        <Button type='submit'>Verify</Button>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}

            {/*            </Form>*/}
            {/*        </ButtonCard>*/}
            {/*}*/}
        </Container>
    )
}

export default KYC