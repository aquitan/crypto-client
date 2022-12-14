import React, {useContext, useEffect, useRef, useState} from 'react'
import Button from '../../../components/UI/Button/Button'
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import cls from './SignUp.module.scss'
import '../../../styles/index.css'
import {Col, Container, FormCheck, FormGroup, FormText, Row} from 'react-bootstrap'
import {AuthContext} from "../../../../index";
import {Link, useNavigate} from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import {emailValidate} from "../../../utils/checkEmail";
import {observer} from "mobx-react-lite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import {getGeoData} from "../../../queries/getSendGeoData";
import Modal from "../../../components/UI/Modal/Modal";
import {postData} from "../../../services/StaffServices";
import PasswordStrength from "../../../components/UI/PasswordStrength/PasswordStrength";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import {checkDeviece} from '../../../utils/checkDevice';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { getSwitchQuery } from '../../../utils/getSwitchQuery'
import './ImgContainer.scss'


const SignUp = () => {
    const {theme} = useThemeContext(ThemeContext)
    const navigate = useNavigate()
    const [promoStatus, setPromoStatus] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [currentPromo, setCurrentPromo] = useState('')
    const [visiblePass, setVisiblePass] = useState({
        password: false,
        repeatPassword: false
    })
    const {register, handleSubmit, formState: {errors}, watch, setError} = useForm({
        mode: "onBlur",
    })
    const [match, setMatch] = useState({
        active: false,
        numbers: false,
        characters: false,
        uppercase: false
    })
    const {store} = useContext(AuthContext)
    const password = useRef({})
    password.current = watch('password', '')


    useEffect(() => {
        checkPromocodes()
    }, [])

    const onSubmit = async (data) => {
        if (currentPromo.length) {
            if (promoStatus) {
                const res = await postData(getSwitchQuery('/promocode_validate'), {code: currentPromo})
                if (res.data.verification) {
                    data.promocode = currentPromo
                    query(data)
                }
            }
        } else {
            data.promocode = 'empty'
            query(data)
        }

    }

    const query = async (data) => {
        const geoData = await getGeoData()
        // const promocode = compareStr(promoStatus.promocodeList, data.promocode)
        geoData.password = data.password
        geoData.name = data.name
        delete geoData.id
        delete geoData.userAction
        geoData.promocode = data.promocode
        geoData.domainName = window.location.host
        geoData.doubleDeposit = store.domain.domainParams.doubleDeposit
        geoData.depositFee = store.domain.domainParams.depositFee
        geoData.minDepositSum = store.domain.domainParams.minDepositSum
        geoData.minWithdrawalSum = store.domain.domainParams.minWithdrawalSum
        geoData.currencySwapFee = store.domain.domainParams.coinSwapFee
        geoData.email = data.email
        geoData.deviceName = checkDeviece()
        geoData.companyYear = store.domain.companyYear
        delete geoData.logTime
        await store.registration(geoData)

        if (!store.showConfirmation) {
            setModalError(true)
        }
        else if (store.showConfirmation) {
            navigate('/register-confirm')
        } else {
            navigate('/error-500')
        }
    }

    const checkPromocodes = async () => {
        const obj = {
            domainName: window.location.host
        }
        const res = await postData(getSwitchQuery('/get_promocodes_before_signup/'), obj)
        const status = await res.data.promocode
        setPromoStatus(status)
    }

    const showPassword = () => {
        setVisiblePass({
            ...visiblePass, password: !visiblePass.password
        })
    }
    const showRepeatPassword = () => {
        setVisiblePass({
            ...visiblePass, repeatPassword: !visiblePass.repeatPassword
        })
    }

    const checkForNums = (str) => {
        let matches = str.match(/\d+/g)
        return matches
    }
    const checkUppercase = (str) => {
        let matches = str.match(/[A-Z]/)
        return matches
    }

    const onCheckPassword = (e) => {
        setMatch({
            characters: e.target.value.length > 7,
            numbers: checkForNums(e.target.value),
            uppercase: checkUppercase(e.target.value),
            active: true
        })
    }
    const showPasswordTip = () => {
        setMatch({...match, active: false})
    }

    const onCheckError = (e) => {
        if (e.target.value.length < 2) setError('name', {type: 'name', message: 'Minimum 2 symbols'})
    }

    return (
        <Container style={{maxWidth: '100%', backgroundColor: theme === 'light' ? '#fff' : '#121318'}}  className='h-100 m-0 p-0'>

            <CustomModal btnClose={'Close'} title={'Email error'} size={'md'} show={modalError} handleClose={() => setModalError(false)}>
                It seems that this email is already in use!
            </CustomModal>

            <Row id={theme} className='h-100 p-0'>
                <Col style={{position: 'relative'}} className={`d-flex p-0 justify-content-center align-items-baseline align-items-lg-center ${cls.gradient}`}>
                    <div style={{position: 'relative', height: '100%', width: '100%', overflow: 'hidden'}}>
                        <img style={{position: 'absolute', left: 0, top: 0}} src='/img/elipse.svg' />
                    </div>
                    <div className='pt-5 pt-xl-0 img-container-form'>
                        <img width='100%' src={'/img/pngfind_1.png'} alt=""/>
                    </div>
                </Col>
                <Col className={`px-3 px-xl-0 ${cls.authFormItem}`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    
                    <Form classnames='narrow' onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <h2 style={{color: theme === 'light' ? '#121318' : '#fff'}} className='mb-4'>Create your account</h2>
                        </Row>
                        <Row style={{marginBottom: 30}}>
                           <Col>
                                <Input {...register('email', {
                                    required: 'You must specify email to SignIn',
                                    validate: emailValidate,
                                    message: 'Email is not valid',
                                })} classname={[`${errors.email ? 'error' : ''}`]} name='email' placeholder='Email' id='login' />
                                <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>Email is invalid</p>} />
                           </Col>
                        </Row>
                        <Row style={{marginBottom: 30}}>
                            <Col>
                                <Input {...register('name', {
                                    required: false,
                                    minLength: {
                                        value: 2,
                                        message: 'Minimum 2 symbols'
                                    },
                                    onBlur: (e) => onCheckError(e)
                                })} classname={[`${errors.name ? 'error' : ''}`]}  name='name' placeholder='Username' id='displayName' />
                                {errors.name && <p className={cls.error}>{errors.name.message}</p>}
                            </Col>
                        </Row>
                        <Row style={{marginBottom: 30}}>
                            <Col style={{width: '100%'}} className={`${cls.relative} col-12 col-md-6`}>
                                <Input onChange={onCheckPassword} {...register('password', {
                                    required: 'You must specify your password',
                                    minLength: {
                                        value: 8,
                                        message: 'Your password must be at least 8 characters'
                                    },
                                    maxLength: {
                                        value: 32,
                                        message: 'Your password must be less than 32 characters'
                                    },
                                    onChange: (e) => onCheckPassword(e),
                                    onBlur: () => showPasswordTip()
                                })} classname={[`${errors.password ? 'error' : ''}`]} name='password' type={visiblePass.password ? 'text' : 'password'} placeholder='Password' id='password' />
                                <ErrorMessage name='password' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                                <FontAwesomeIcon color='#9295a6' onClick={showPassword} className={cls.eye_icon} icon={visiblePass.password ? faEye : faEyeSlash} />
                                <PasswordStrength active={match.active} characters={match.characters} numbers={match.numbers} uppercase={match.uppercase} />
                            </Col>
                        </Row>
                        <Row style={{marginBottom: 30}}>
                            <Col style={{width: '100%'}} className={`${cls.relative} col-12 col-md-6`}>
                                <Input {...register('repeatPassword', {
                                    required: 'You have to repeat your password',
                                    validate: value => value === password.current || 'Password is not the same',
                                    message: 'The password does not match'
                                })} classname={[`${errors.repeatPassword ? 'error' : ''}`]} name='repeatPassword' type={visiblePass.repeatPassword ? 'text' : 'password'} placeholder='Repeat password' id='repeatPassword' />
                                <ErrorMessage name='repeatPassword' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                                <FontAwesomeIcon color='#9295a6' onClick={showRepeatPassword} className={cls.eye_icon} icon={visiblePass.repeatPassword ? faEye : faEyeSlash} />
                            </Col>
                        </Row>
                        {
                            promoStatus ?
                                <Row style={{marginBottom: 30}}>
                                    <Col className={cls.relative}>
                                        <Input onChange={(e) => setCurrentPromo(e.target.value)} placeholder='Enter promocode'/>
                                        <ErrorMessage name='promocode' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                                    </Col>
                                </Row>
                                : null
                        }
                        <Row style={{marginBottom: 30}}>
                            <FormText className='d-flex position-relative'>
                                <FormCheck {...register('agreement', {
                                    required: true
                                })} className={cls.checkbox} type='checkbox' />
                                <span>
                                    By continuing I agree to the <Link className={cls.link} to='/terms-conditions'>Terms of Service and Privacy Policy.</Link>
                                </span>
                                <ErrorMessage name='agreement' errors={errors} render={({message}) => <p className={cls.error}>You have to provide your consent</p>} />
                            </FormText>
                            <Row style={{marginTop: 35}} className='w-100'>
                                <Button type='submit' classname='btnBlue'>Sign Up</Button>
                            </Row>
                        </Row>
                        <Row className='mt-3 align-items-center'>
                            <p className='text-center' style={{color: '#6c757d'}}>Already have an account? <Link className={cls.link} to='/signin'>Sign In</Link></p>
                        </Row>
                        <Row className='mt-2 align-items-center'>
                            <p className='text-center' style={{color: '#6c757d'}}><Link className={cls.link} to='/'>Back to Home</Link></p>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default observer(SignUp)