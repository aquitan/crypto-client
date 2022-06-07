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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {SwalSimple} from "../../../utils/SweetAlert";




const KYC = ({status}) => {


    const [startDate, setStartDate] = useState()
    const [modal, setModal] = useState(false)
    const [img, setImg] = useState('')
    // const [img2, setImg2] = useState('')
    const location = useLocation()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const onSubmit = async (data) => {
        // console.log('data-file', data.frontDocumentPhoto[0])
        // let fData = new FormData()
        //
        // fData.append('frontDocumentPhoto', data.frontDocumentPhoto[0])
        // console.log('files', fData)
        let docs = {}
        let formData = new FormData();

        // let blob = new Blob([data], {type: 'application/json'})
        // formData.append("data", blob);
        formData.append("file", data.selfieDocumentPhoto[0]);
        for (let value of formData.entries()) {
            console.log('values', value)
        }
        console.log('file------', data.doc)


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
        data.documents = formData

        delete data.doc
        delete data.doc
        delete data.terms
        delete data.privacy
        delete data.selfieDocumentPhoto

        const res = await putData('/personal_area/verification', data)

        // let res = await axios.put('/api/personal_area/verification', data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     }
        // })
        if (res.status === 201) {
            SwalSimple('Verification is sent')
        }

        console.log('kyc data', data)
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


    // const onChange = (e) => {
    //     console.log('files-----', e.target.files[0])
    //     setImg(e.target.files[0])
    // }

    return (
        <Container>
            <Modal active={modal} setActive={setModal}>
                <h2>Check Fields!</h2>
            </Modal>
            <h2 className='mt-3 mb-3'>Verify your ID</h2>
            <ButtonCard>

                <Form classnames={'form_big'} onSubmit={handleSubmit(onSubmit)}>
                    <Row className={'mb-3 text-center'}>
                        <h2 className={'mb-3'} style={{fontWeight: 'bold'}}>Begin your ID-Verification</h2>
                        <p style={{maxWidth: 520, margin: '0 auto'}}>To comply with regulation each participant will have to go through identity verification
                            (KYC/AML) to prevent fraud cases and illegal financial activity.</p>
                    </Row>
                    <Row className={'mb-5 mt-5'} style={{
                        borderBottom: '1px solid #cecece',
                        borderTop: '1px solid #cecece',
                        padding: '10px 0'}}>
                        <div style={{fontWeight: 'bold'}}>
                            Personal Details
                        </div>
                        <div>
                            Your personal information is required for identification.
                        </div>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col className={'mb-2'}>
                            <Input {...register('firstName', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='First name*' />
                            <ErrorMessage  name='firstName' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                        <Col className={'mb-2'}>
                            <Input {...register('lastName', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='Last name*'/>
                            <ErrorMessage  name='lastName' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col className={'mb-2 col-12 col-sm-6'}>
                            <Input {...register('userEmail', {
                                required: 'This field is required',
                                validate: emailValidate,
                            })} placeholder='Email address*' />
                            <ErrorMessage  name='userEmail' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                        <Col className={'mb-2 col-12 col-sm-6'}>
                            <DatePickert required
                                         customInput={<DatePickerCustom classname={'user-datepicker'}/>}
                                         placeholderText='Date of Birth*'
                                         selected={startDate}
                                         dateFormat='yyyy/MM/dd'
                                         onChange={(date) => setStartDate(date)} />
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col className={'mb-2'}>
                            <InputMask mask='9-(999)-999-99-99' {...register('phoneNumber')}>
                                {(inputProps) => <Input {...inputProps} name='phoneNumber' placeholder='Phone number*' type='tel'/>}
                            </InputMask>
                            <ErrorMessage  name='phoneNumber' errors={errors} render={() => <p className={cls.error}>Check the field</p>} />
                        </Col>
                        <Col className={'mb-2'}>
                            <Input {...register('documentNumber', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='ID/Document Nr.*'/>
                            <ErrorMessage  name='documentNumber' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                    </Row>
                    <Row className={'mb-5 mt-5'} style={{
                        borderBottom: '1px solid #cecece',
                        borderTop: '1px solid #cecece',
                        padding: '10px 0'}}>
                        <div style={{fontWeight: 'bold'}}>
                            Personal Details
                        </div>
                        <div>
                            Your personal information is required for identification.
                        </div>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col className={'mb-2'}>
                            <Input {...register('mainAddress', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='Address line 1*' />
                            <ErrorMessage  name='mainAddress' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                        <Col className={'mb-2'}>
                            <Input {...register('subAddress', {
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='Address line 2'/>
                            <ErrorMessage  name='subAddress' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col className={'mb-2'}>
                            <Input {...register('city', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='City*' />
                            <ErrorMessage  name='city' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                        <Col className={'mb-2'}>
                            <Input {...register('zipCode', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='Zip*'/>
                            <ErrorMessage  name='zipCode' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col className={'mb-2'}>
                            <Input {...register('state', {
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='State' />
                            <ErrorMessage  name='state' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                    </Row>

                    <Row className={'mb-5 mt-5'} style={{
                        borderBottom: '1px solid #cecece',
                        borderTop: '1px solid #cecece',
                        padding: '10px 0'}}>
                        <div style={{fontWeight: 'bold'}}>
                            Document Upload
                        </div>
                        <div>
                            To verify your identity, please upload at least one of the required documents.
                        </div>
                    </Row>

                    <Row className='' style={{maxWidth: 600, justifyContent: 'center', margin: '30px 0'}}>
                        <Col className={'mb-2'}>
                            <InputRadio {...register('documentType', {
                                required: true,
                            })} id={'passport'} name={'documentType'} classname={'radio_btn'} value='Passport' type='radio' label='Passport' />
                            <ErrorMessage  name='documentType' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                        <Col className={'mb-2'}>
                            <InputRadio {...register('documentType', {
                                required: true,
                            })} id={'id'} name={'documentType'} classname={'radio_btn'} value='National ID' type='radio' label='National ID' />
                            <ErrorMessage  name='documentType' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                        <Col className={'mb-2'}>
                            <InputRadio {...register('documentType', {
                                required: true,
                            })} id={'license'} name={'documentType'} classname={'radio_btn'} value='Driving License' type='radio' label='Driving License' />
                            <ErrorMessage  name='documentType' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                        </Col>
                    </Row>
                    <Row className='' style={{justifyContent: 'center', margin: '30px 0'}}>
                        <Col>
                            {/*<FileUpload {...register('doc')} name={'doc'} id={'doc'}/>*/}
                            {/*<FileUpload {...register('frontDocumentPhoto')} id={'frontDocumentPhoto'} name={'frontDocumentPhoto'} />*/}
                            <input {...register('selfieDocumentPhoto')} id={'selfieDocumentPhoto'} name={'selfieDocumentPhoto'} type="file" />
                        </Col>
                    </Row>
                    <Row className={'mb-5 mt-5'} style={{
                        padding: '10px 0'}}>
                        <div style={{fontWeight: 'bold', marginBottom: 10}}>
                            To avoid delays with identity verification, please make sure that:
                        </div>
                        <div>
                            <div><FontAwesomeIcon icon={faCheckCircle} /> Chosen credentials must not be expired.</div>
                            <div><FontAwesomeIcon icon={faCheckCircle} /> Documents should be at good condition and clearly visible.</div>
                            <div><FontAwesomeIcon icon={faCheckCircle} /> Make sure that there is no light glare visible on the documents.</div>
                        </div>
                    </Row>

                    <Row className={'justify-content-center'} style={{marginTop: 50}}>
                        <Button classname={'small'}>Submit</Button>
                    </Row>
                </Form>
            </ButtonCard>
        </Container>
    )
}

export default KYC