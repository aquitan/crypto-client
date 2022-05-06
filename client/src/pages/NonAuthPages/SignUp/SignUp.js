import React, {useContext, useEffect, useRef, useState} from 'react'
import Button from '../../../components/UI/Button/Button'
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import cls from './SignUp.module.scss'
import '../../../styles/index.css'
import {Card, Col, Container, FormCheck, FormGroup, FormText, Row} from 'react-bootstrap'
import {AuthContext} from "../../../index";
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


const SignUp = () => {
    const navigate = useNavigate()
    const [promoStatus, setPromoStatus] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [currentPromo, setCurrentPromo] = useState('')
    const [visiblePass, setVisiblePass] = useState({
        password: false,
        repeatPassword: false
    })
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
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

    // const compareStr = (promo, inpVal) => {
    //     if (promoStatus.query_status) {
    //         console.log('promoStatus.query_status', promoStatus.query_status)
    //         for (let i = 0; i < promo.length; i++) {
    //             if (promo[i].code === inpVal) {
    //                 console.log('promo[i].code', promo[i].code)
    //                 return inpVal
    //             } else if (inpVal === '') {
    //                 return 'empty'
    //             } else {
    //                 return false
    //             }
    //         }
    //     } return 'empty'
    // }

    const onSubmit = async (data) => {
        console.log('current', currentPromo)
        if (currentPromo.length) {
            if (promoStatus) {
                const res = await postData('/promocode_validate', {code: currentPromo})
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
        console.log('data', data)
        // const promocode = compareStr(promoStatus.promocodeList, data.promocode)
        const geoData = await getGeoData()
        geoData.email = data.email
        geoData.password = data.password
        geoData.name = data.name
        delete geoData.id
        delete geoData.userAction
        geoData.promocode = data.promocode
        geoData.domainName = store.domain.fullDomainName
        geoData.doubleDeposit = store.domain.domainParams.doubleDeposit
        geoData.depositFee = store.domain.domainParams.depositFee
        geoData.rateCorrectSum = store.domain.domainParams.rateCorrectSum
        geoData.minDepositSum = store.domain.domainParams.minDepositSum
        geoData.minWithdrawalSum = store.domain.domainParams.minWithdrawalSum
        geoData.currencySwapFee = store.domain.domainParams.currencySwapFee

        console.log('asdasd', geoData)
        store.registration(geoData)
        navigate('/register-confirm')

        if (store.isError) {
            setModalError(true)
        }
    }

    const checkPromocodes = async () => {
        const obj = {
            domainName: window.location.host
        }
        const res = await postData('/get_promocodes_before_signup/', obj)
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
        console.log(e.target.value)
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

    return (
        <Container>
            <Modal active={modalError} setActive={setModalError}>
                <h2 className='mb-2'>Oops! Check your email</h2>
                <Button onClick={() => setModalError(false)}>Ok</Button>
            </Modal>
            <Card className='bg-dark' style={{maxWidth: 800, margin: '0px auto', marginTop: '5%'}}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <h2 className='mb-4'>Sign Up</h2>
                    </Row>
                    <FormGroup>
                        <Row className=''>
                            <Col className={'mb-3 col-12 col-md-6'}>
                                <Input {...register('email', {
                                    required: 'Email is required',
                                    validate: emailValidate,
                                    message: 'Email is not valid'

                                })} name='email' placeholder='email' id='email' type='email'/>
                                <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />
                            </Col>
                            <Col className={'mb-3 col-12 col-md-6'}>
                                <Input {...register('name', {
                                    required: false,
                                    minLength: {
                                        value: 5,
                                        message: 'Minimal length must be over 5 characters'
                                    }
                                })}  name='name' placeholder='display name' id='displayName' />
                                <ErrorMessage name='displayName' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row className=''>
                            <Col className={`${cls.relative} mb-3 col-12 col-md-6`}>
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
                                })} name='password' type={visiblePass.password ? 'text' : 'password'} placeholder='password' id='password' />
                                <ErrorMessage name='password' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                                <FontAwesomeIcon onClick={showPassword} className={cls.eye_icon} icon={visiblePass.password ? faEye : faEyeSlash} />
                                <PasswordStrength active={match.active} characters={match.characters} numbers={match.numbers} uppercase={match.uppercase} />
                            </Col>
                            <Col className={`${cls.relative} mb-3 col-12 col-md-6`}>
                                <Input {...register('repeatPassword', {
                                    required: 'You have to repeat your password',
                                    validate: value => value === password.current || 'Password is not the same',
                                    message: 'The password does not match'
                                })} name='repeatPassword' type={visiblePass.repeatPassword ? 'text' : 'password'} placeholder='repeat password' id='repeatPassword' />
                                <ErrorMessage name='repeatPassword' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                                <FontAwesomeIcon onClick={showRepeatPassword} className={cls.eye_icon} icon={visiblePass.repeatPassword ? faEye : faEyeSlash} />
                            </Col>
                        </Row>
                    </FormGroup>
                    {
                        promoStatus ?
                            <FormGroup>
                                <Row className=''>
                                    <Col className={cls.relative}>
                                        <Input onChange={(e) => setCurrentPromo(e.target.value)} placeholder='enter promocode'/>
                                        <ErrorMessage name='promocode' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            : null
                    }
                    <FormGroup>
                        <Row className='mt-2'>
                            <Col>
                                <FormText className='d-flex'>
                                    <FormCheck {...register('agreement', {
                                        required: true
                                    })} className={cls.checkbox} type='checkbox' /> I agree with <Link className={cls.link} to='#'>Terms and conditions.</Link>
                                    <ErrorMessage name='agreement' errors={errors} render={({message}) => <p className={cls.error}>You have to agree with Terms</p>} />
                                </FormText>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row className='mt-3 align-items-center'>
                            <Col>
                                <Link className={cls.link} to='/signin/'>Have an account?</Link>
                            </Col>
                            <Col className='justify-content-end'>
                                <Button type='submit' >Sign Up</Button>
                            </Col>
                        </Row>
                    </FormGroup>

                </Form>
            </Card>
        </Container>
    )
}

export default observer(SignUp)