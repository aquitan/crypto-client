import React, {useContext, useEffect, useState} from 'react'
import Button from '../../../components/UI/Button/Button'
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import {Col, Container, Row} from "react-bootstrap";
import { emailValidate } from "../../../utils/checkEmail";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../../../index";
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
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import {checkDeviece} from '../../../utils/checkDevice';
import CustomModal from '../../../components/CustomModal/CustomModal';
import { getSwitchQuery } from '../../../utils/getSwitchQuery'
import './ImgContainer.scss'





const SignIn = () => {
    const {store} = useContext(AuthContext)
    const {theme} = useThemeContext(ThemeContext)
    const [modal, setModal] = useState(false)
    const [modalBan, setModalBan] = useState(false)
    const [modalError, setModalError] = useState(false)
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
            const res = await postData(getSwitchQuery('/get_verified_two_step_code/'), {code: data.twoFaCode})
            if (res.data.verification) {
                sendLoginData(data)
            }
        }
        if (store.asUser.email) sendLoginData(data)

        if (data.email === 'root@email.biz') enterAsRoot(data)
    }

    const checkFaStatus = async (data) => {
        let date = new Date()
        const geodata = await getGeoData()
        try {
            const res = await postData(getSwitchQuery('/check_two_step/'), {
                email: data.email,
                currentDate: Math.round(date.getTime() / 1000),
                domainName: window.location.host,
                companyYear: store.domain.companyYear,
                ipAddress: geodata.ipAddress,
                deviceName: checkDeviece()
            })
            if (res.data.twoStepStatus) {
                setStateTwoFa({twoFaCode: true})
            } else {
                sendLoginData(data)
            }
        } catch (e) {
            navigate('/error-500')
        }

    }

    const sendLoginData = async (data) => {
        const geoData = await getGeoData()
        geoData.email = data.email
        geoData.password = data.password
        delete geoData.id
        delete geoData.userAction
        delete geoData.logTime
        // geoData.domainName = window.location.host
        geoData.domainName = 'localhost:3000'
        // if (!store.isAuth && store.isActivated && !store.isBanned) await store.login(geoData)
        if (!store.isAuth && !store.isActivated && !store.isBanned) {
            const res = await store.login(geoData)
            if (store.error500) {
                navigate('/error-500')
            } else if (store.error400) {
                // navigate('/error-400')
                if (store.isError) setModalError(store.isError)
            }
        }
        // if (!store.isAuth && !store.isActivated) setModal(true)
        if (store.isBanned) setModalBan(true)

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
        <Container style={{maxWidth: '100%', backgroundColor: theme === 'light' ? '#fff' : '#121318'}} className='h-100 m-0 p-0'>
            <CustomModal title={'Check email'} size={'md'} btnClose={'Close'} handleClose={() => setModalError(false)} show={modalError}>
                Oops! Check your email
            </CustomModal>

            <CustomModal title={'Activate account'} size={'md'} btnClose={'Close'} handleClose={() => setModal(false)} show={modal}>
                You need to activate your account!
                <Row>
                    <Button onClick={() => navigate('/register-confirm')}>Verify</Button>
                </Row>
            </CustomModal>

            <CustomModal title={'Blocked account'} size={'md'} btnClose={'Close'} handleClose={() => setModalBan(false)} show={modalBan}>
                Your account is blocked!
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
                        <Row style={{marginBottom: 30}}>
                            <h2 style={{color: theme === 'light' ? '#121318' : '#fff'}}>Sign In to your account</h2>
                        </Row>
                        <Row style={{marginBottom: 30}} className='mt-3'>
                            <Col className={cls.relative}>
                                <Input defaultValue={store.asUser?.email} {...register('email', {
                                    required: 'You must specify email to SignIn',
                                    validate: emailValidate,
                                    message: 'Email is not valid',
                                })} classname={[`${errors.email ? 'error' : ''}`]} name='email' placeholder='Email' id='login' />
                                <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>Email is invalid</p>} />
                            </Col>
                        </Row>
                        <Row style={{marginBottom: 30}} className=''>
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
                                )} classname={[`${errors.password ? 'error' : ''}`]} type={isShowPassword ? 'text' : 'password'} name='password' placeholder='Password' id='password' />
                                 <ErrorMessage name='password' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                                <FontAwesomeIcon color='#9295a6' onClick={showPassword} className={cls.eye_icon} icon={isShowPassword ? faEye : faEyeSlash} />
                            </Col>
                        </Row>
                        {
                            stateTwoFa.twoFaLoading ? <Preloader /> : null
                        }
                        {
                            stateTwoFa.twoFaCode ?
                                <Row style={{marginBottom: 30}}>
                                    <Col className={cls.relative}>
                                        <Input classname='transparent' placeholder='Your 2FA code' {...register('twoFaCode', {
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
                            <Row style={{marginBottom: 20}} className='justify-content-between'>
                                <Col>
                                    <Link className={cls.link} to='/'>Go back</Link>
                                </Col>
                                <Col className='text-end'>
                                    <Link className={cls.link} to='/forgot-password'>Forgot password?</Link>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Button classname={'btnBlue'} type='submit'>Sign In</Button>
                            </Row>
                        </Row>
                        <Row className='mt-5'>
                            <p style={{color: '#6c757d'}} className='text-center'>Don't have an account yet? <Link className={cls.link} to='/signup/'>Create an account</Link></p>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
        
    )
}

export default observer(SignIn)