import React, {useContext, useEffect, useState} from 'react'
import Button from '../../../components/UI/Button/Button'
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import {Card, Col, Container, Row} from "react-bootstrap";
import { emailValidate } from "../../../utils/checkEmail";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../../index";
import { observer } from "mobx-react-lite";
import { ErrorMessage } from "@hookform/error-message";
import cls from './SignIn.module.scss'
import '../../../styles/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import {getGeoData} from "../../../queries/getSendGeoData";
import Modal from "../../../components/UI/Modal/Modal";
import {postData} from "../../../services/StaffServices";
import Preloader from "../../../components/UI/Preloader/Preloader";




const SignIn = () => {
    const {store} = useContext(AuthContext)
    const [modal, setModal] = useState(false)
    const [modalBan, setModalBan] = useState(false)
    const [modalError, setModalError] = useState(store.isError)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    })
    const [stateTwoFa, setStateTwoFa] = useState({
        twoFaCode: '',
    })

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        if (!stateTwoFa.twoFaCode && data.email !== 'root@email.biz') {
            checkFaStatus(data)
        }

        if (data.twoFaCode) {
            const res = await postData('/get_verified_two_step_code/', {code: data.twoFaCode})
            if (res.data.verivication) {
                sendLoginData(data)
            }
        }
        if (store.asUser.email) sendLoginData(data)

        if (data.email === 'root@email.biz') enterAsRoot(data)
    }

    const checkFaStatus = async (data) => {
        let date = new Date()
        const res = await postData('/check_two_step/', {
            email: data.email,
            time: date.getTime()
        })
        if (res.data.twoStepStatus) {
            console.log('OK status')
            setStateTwoFa({twoFaCode: true})
        } else {
            sendLoginData(data)
        }

    }

    const sendLoginData = async (data) => {
        const geoData = await getGeoData()
        geoData.email = data.email
        geoData.password = data.password
        geoData.name = data.name
        delete geoData.id
        delete geoData.userAction
        geoData.domainName = window.location.host
        geoData.doubleDeposit = store.domain.domainParams.doubleDeposit
        geoData.depositFee = store.domain.domainParams.depositFee
        geoData.rateCorrectSum = store.domain.domainParams.rateCorrectSum
        geoData.minDepositSum = store.domain.domainParams.minDepositSum
        geoData.minWithdrawalSum = store.domain.domainParams.minWithdrawalSum
        geoData.currencySwapFee = store.domain.domainParams.currencySwapFee

        if (!store.isAuth && store.isActivated && !store.isBanned) await store.login(geoData)
        if (!store.isAuth && !store.isActivated && !store.isBanned) await store.login(geoData)
        // if (!store.isAuth && !store.isActivated) setModal(true)
        if (store.isBanned) setModalBan(true)
        if (store.isError) setModalError(store.isError)
    }

    const enterAsRoot = async (data) => {
        await store.login(data)
    }

    const showPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
    const hideModalBan = () => {
        if (!store.isBanned) setModalBan(false)
    }

    return (
        <Container>
            <Modal active={modalError} setActive={setModalError}>
                <h2 className='mb-2'>Oops! Check your email</h2>
                <Button onClick={() => setModalError(false)}>Ok</Button>
            </Modal>

            <Modal active={modal} setActive={setModal}>
                <h2 className='mb-2'>You need to activate your account!</h2>
                <Button onClick={() => navigate('/register-confirm')}>Verify</Button>
            </Modal>

            <Modal active={modalBan} setActive={setModalBan}>
                <h2 className='mb-2'>Your account is blocked!</h2>
                <Button onClick={hideModalBan}>Ok</Button>
            </Modal>

            <Card className='bg-dark' style={{maxWidth: 800, margin: '0px auto', marginTop: '5%'}}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-4'>
                        <h2>Sign In</h2>
                    </Row>
                    <Row className='mt-3 mb-3'>
                        <Col className={cls.relative}>
                            <Input defaultValue={store.asUser?.email} {...register('email', {
                                required: 'You must specify email to SignIn',
                                validate: emailValidate,
                                message: 'Email is not valid',
                            })} classname='transparent' name='email' placeholder='Email' id='login' />
                            <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={cls.relative}>
                            <Input defaultValue={store.asUser?.password} {...register('password', {
                                    required: 'You must specify your password',
                                    defaultValue: store.asUser?.password,
                                    minLength: {
                                        value: 8,
                                        message: 'Your password must be at least 8 characters'
                                    },
                                    maxLength: {
                                        value: 32,
                                        message: 'Your password must be less than 32 characters'
                                    },
                                }
                            )} classname='transparent' type={isShowPassword ? 'text' : 'password'} name='password' placeholder='password' id='password' />
                            {/* <ErrorMessage name='password' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} /> */}
                            <FontAwesomeIcon onClick={showPassword} className={cls.eye_icon} icon={isShowPassword ? faEye : faEyeSlash} />
                        </Col>
                    </Row>
                    {
                        stateTwoFa.twoFaLoading ? <Preloader /> : null
                    }
                    {
                        stateTwoFa.twoFaCode ?
                            <Row>
                                <Col className={cls.relative}>
                                    <Input classname='transparent' {...register('twoFaCode', {
                                        required: true,
                                        message: 'Field is required',
                                        maxLength: {
                                            value: 8,
                                            message: 'Maximum length is 8 symbols'
                                        }
                                    })} />
                                    <ErrorMessage  name='twoFaCode' errors={errors} render={() => <p className={cls.error}>Field is required</p>} />
                                </Col>
                            </Row>
                            : null
                    }
                    <Row className='mt-3 justify-content-center'>
                        <Col>
                            <Link className={cls.link} to='/signup/'>Create an account</Link>
                        </Col>
                        <Col className='text-end'>
                            <Link className={cls.link} to='/forgot-password'>Forgot password</Link>
                        </Col>
                        <Row className='mt-4'>
                            <Button classname={['small']} type='submit'>Sign In</Button>
                        </Row>
                    </Row>
                </Form>
            </Card>
        </Container>
        
    )
}

export default observer(SignIn)