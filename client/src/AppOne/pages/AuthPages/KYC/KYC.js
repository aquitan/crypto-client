import React, {useState} from 'react'
import {Col, Row} from "react-bootstrap";
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import DatePickert from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.scss'
import {useForm} from "react-hook-form";
import {emailValidate} from "../../../utils/checkEmail";
import {ErrorMessage} from "@hookform/error-message";
import Button from "../../../components/UI/Button/Button";
import InputMask from 'react-input-mask';
import FileUpload from "../../../components/UI/FileUpload/FileUpload";
import KycResults from "./KycResults/KysResults";
import {getGeoData} from "../../../queries/getSendGeoData";
import {useLocation} from "react-router-dom";
import InputRadio from "../../../components/UI/InputRadio/InputRadio";
import {store} from "../../../../index";
import {splitLocation} from "../../../utils/regExpSlash";
import Modal from "../../../components/UI/Modal/Modal";
import DatePickerCustom from "../../../components/UI/DatePickerCustom/DatePickerCustom";
import {putData} from "../../../services/StaffServices";
import cls from './KYC.modules.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import CustomModal from '../../../components/CustomModal/CustomModal';
import axios from 'axios';
import FileKyc from '../../../components/UI/fileKyc/FileKyc';
import {dateToTimestamp} from '../../../utils/dateToTimestamp';
import {getCurrentDate} from '../../../utils/getCurrentDate';
import { checkDeviece } from '../../../utils/checkDevice';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';




const KYC = ({user}) => {
    const [img, setImg] = useState({
        frontDocumentPhoto: '',
        backDocumentPhoto: '',
        selfieDocumentPhoto: ''
    })
    const [startDate, setStartDate] = useState()
    const [errorModal, setErrorModal] = useState(false)
    const [succesKyc, setSuccesKyc] = useState(false)
    const location = useLocation()
    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: 'onBlur'
    })

    const onSubmit = async (data) => {
        let formData = new FormData()

        const type1 = img.frontDocumentPhoto.type.split("/");
        const type2 = img.backDocumentPhoto.type.split("/");
        const type3 = img.selfieDocumentPhoto.type.split("/");

        formData.set("frontDocumentPhoto", img.frontDocumentPhoto, `${store.user.id}_1.${type1[1]}`);
        formData.set("backDocumentPhoto", img.backDocumentPhoto, `${store.user.id}_2.${type1[1]}`);
        formData.set("selfieDocumentPhoto", img.selfieDocumentPhoto, `${store.user.id}_3.${type1[1]}`);

        let frontDocumentPhoto = formData.get('frontDocumentPhoto')
        let backDocumentPhoto = formData.get('backDocumentPhoto')
        let selfieDocumentPhoto = formData.get('selfieDocumentPhoto')

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
        data.dateOfBirth = getCurrentDate(startDate.getTime() / 1000)
        data.browser = geodata.browser
        data.deviceName = checkDeviece()
        data.companyYear = store.domain.companyYear
        data.date = geodata.currentDate

        delete data.frontDocumentPhoto
        delete data.backDocumentPhoto
        delete data.selfieDocumentPhoto
        delete data.terms
        delete data.privacy
        delete data.startDate

        const res = await fetch(`https://fujitutti.art/api/hGldDeNBr9Pm5gZhwRK/${store.user.id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (res.status === 201) {
            try {
                await putData(getSwitchQuery('/personal_area/verification'), data)
                setSuccesKyc(true)
            } catch(e) {
                setErrorModal(true)
            }

        } else {
            setErrorModal(true)
        }
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

    const onImgChange = (e) => {
        setImg({...img, [e.target.name]: e.target.files[0] })
    }

    const onChangeDate = (date) => {
        setStartDate(date)
        setValue('startDate', date)
    }

    return (
        <>
            <CustomModal
              btnClose={'Close'}
              title={'Error'}
              show={errorModal}
              size='md'
              handleClose={() => setErrorModal(false)}>
                Something went wrong! Please check data in fields or try again later!
            </CustomModal>
            <CustomModal
              btnClose={'Close'}
              title={'Success'}
              show={succesKyc}
              size='md'
              handleClose={() => setSuccesKyc(false)}>
                Your data has been sent to moderation! It could take some time
            </CustomModal>


            {
                user.kycStatus !== 'empty' ? <KycResults status={user.kycStatus} /> :
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
                <Row className={''}>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname={['inputTransparent', `${errors.firstName ? 'error' : ''}`]} {...register('firstName', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu,
                        })} placeholder='First name*' />
                        <ErrorMessage  name='firstName' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname={['inputTransparent', `${errors.lastName ? 'error' : ''}`]} {...register('lastName', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='Last name*'/>
                        <ErrorMessage  name='lastName' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                </Row>
                <Row className={''}>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname={['inputTransparent', `${errors.userEmail ? 'error' : ''}`]} {...register('userEmail', {
                            required: 'This field is required',
                            validate: emailValidate,
                        })} placeholder='Email address*' />
                        <ErrorMessage  name='userEmail' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <DatePickert required
                                     customInput={<DatePickerCustom {...register('startDate', {
                                         required: 'Date is required',
                                     })} classname={['inputTransparent', `${errors.startDate ? 'error' : ''}`]}/>}
                                     placeholderText='Date of Birth*'
                                     selected={startDate}
                                     dateFormat='yyyy/MM/dd'
                                     onChange={(date) => {onChangeDate(date)}} />
                        <ErrorMessage name='startDate' errors={errors} render={({message}) => <p className={'error'}>{message}</p>} />
                    </Col>
                </Row>
                <Row className={''}>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <InputMask mask='9-(999)-999-99-99' {...register('phoneNumber', {
                            required: 'This field is required'
                        })}>
                            {(inputProps) => <Input classname={['inputTransparent', `${errors.phoneNumber ? 'error' : ''}`]} {...inputProps} name='phoneNumber' placeholder='Phone number*' type='tel'/>}
                        </InputMask>
                        <ErrorMessage name='phoneNumber' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname={['inputTransparent', `${errors.documentNumber ? 'error' : ''}`]} {...register('documentNumber', {
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
                <Row className={''}>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname={['inputTransparent', `${errors.mainAddress ? 'error' : ''}`]} {...register('mainAddress', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='Address line 1*' />
                        <ErrorMessage  name='mainAddress' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname='inputTransparent' {...register('subAddress', {
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='Address line 2'/>
                        <ErrorMessage  name='subAddress' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                </Row>
                <Row className={''}>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname={['inputTransparent', `${errors.city ? 'error' : ''}`]} {...register('city', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='City*' />
                        <ErrorMessage  name='city' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname={['inputTransparent', `${errors.zipCode ? 'error' : ''}`]} {...register('zipCode', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='Zip*'/>
                        <ErrorMessage  name='zipCode' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                </Row>
                <Row className={''}>
                    <Col className={'mb-3 col-12 col-md-6'}>
                        <Input classname='inputTransparent' {...register('state', {
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
                    <Col className={'mb-2 col-12 col-md-4'}>
                        <InputRadio {...register('documentType', {
                            required: true,
                        })} id={'passport'} name={'documentType'} classname={['radio_btn', `${errors.documentType ? 'error' : ''}`]} value='Passport' type='radio' label='Passport' />
                        <ErrorMessage  name='documentType' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                    <Col className={'mb-2 col-12 col-md-4'}>
                        <InputRadio {...register('documentType', {
                            required: true,
                        })} id={'id'} name={'documentType'} classname={['radio_btn', `${errors.documentType ? 'error' : ''}`]} value='National ID' type='radio' label='National ID' />
                        <ErrorMessage  name='documentType' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                    <Col className={'mb-2 col-12 col-md-4'}>
                        <InputRadio {...register('documentType', {
                            required: true,
                        })} id={'license'} name={'documentType'} classname={['radio_btn', `${errors.documentType ? 'error' : ''}`]} value='Driving License' type='radio' label='Driving License' />
                        <ErrorMessage  name='documentType' errors={errors} render={() => <p className={'error'}>Check the field</p>} />
                    </Col>
                </Row>
                <Row className='' style={{justifyContent: 'center', margin: '30px 0'}}>
                    <Col className='d-flex flex-column'>
                        {/*<FileUpload {...register('doc')} name={'doc'} id={'doc'}/>*/}
                        {/*<FileUpload {...register('frontDocumentPhoto')} id={'frontDocumentPhoto'} name={'frontDocumentPhoto'} />*/}
                        {/*<input onChange={onImgChange} id={'frontDocumentPhoto'} name={'frontDocumentPhoto'} type="file" />*/}
                        {/*<input onChange={onImgChange} id={'backDocumentPhoto'} name={'backDocumentPhoto'} type="file" />*/}
                        {/*<input onChange={onImgChange} id={'selfieDocumentPhoto'} name={'selfieDocumentPhoto'} type="file" />*/}
                        <div style={{color: 'grey', fontSize: '12px', marginBottom: '10px'}}>
                            Supported only *.png, *.jpg, *.jpeg, *.pdf file formats
                        </div>
                        <div className='mb-2'>
                            <FileKyc text={'Front'} onChange={onImgChange} id={'frontDocumentPhoto'} name={'frontDocumentPhoto'} label={img.frontDocumentPhoto} />
                        </div>
                        <div className='mb-2'>
                            <FileKyc text={'Back'} onChange={onImgChange} id={'backDocumentPhoto'} name={'backDocumentPhoto'} label={img.backDocumentPhoto}/>
                        </div>
                        <div className='mb-2'>
                            <FileKyc text={'Selfie'} onChange={onImgChange} id={'selfieDocumentPhoto'} name={'selfieDocumentPhoto'} label={img.selfieDocumentPhoto}/>
                        </div>
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
                    <Button classname='btnBlue'>Submit</Button>
                </Row>
            </Form>
            }
        </>
    )
}

export default KYC