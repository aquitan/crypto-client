import React, {useContext, useState} from 'react'
import Button from '../../../components/UI/Button/Button'
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import { Col, Container, Row} from "react-bootstrap";
import { emailValidate } from "../../../utils/checkEmail";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../../index";
import { observer } from "mobx-react-lite";
import { ErrorMessage } from "@hookform/error-message";
import cls from './SignIn.module.scss'
import '../../../styles/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import {getGeoData, sendDate} from "../../../queries/getSendGeoData";
import {BASE_URL} from "../../../API";
import Modal from "../../../components/UI/Modal/Modal";




const SignIn = () => {
    const [modal, setModal] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const {store} = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = (data, e) => {
        if (!store.isAuth && store.isActivated) {
            const domain_name = window.location.host
            store.login(data.email, data.password, domain_name)
            getGeoData()
        } else if (!store.isAuth && !store.isActivated) {
            const domain_name = window.location.host
            store.login(data.email, data.password, domain_name)
            getGeoData()
        } else {
            setModal(true)
        }
    }

    const showPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <Container>
            <Modal active={modal} setActive={setModal}>
                <h2>You need to activate your account!</h2>
                <Button onClick={() => navigate('/register-confirm')}>Verify</Button>
            </Modal>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className='mb-4'>
                    <h2>Sign In</h2>
                </Row>
                <Row className='mt-3'>
                    <Col className={cls.relative}>
                        <Input {...register('email', {
                            required: 'You must specify email to SignIn',
                            validate: emailValidate,
                            message: 'Email is not valid'
                        })} name='email' placeholder='Email' id='login' />
                        <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />

                       
                    </Col>
                </Row>
                <Row>
                    <Col className={cls.relative}>
                        <Input {...register('password', {
                                required: 'You must specify your password',
                                minLength: {
                                    value: 8,
                                    message: 'Your password must be at least 8 characters'
                                },
                                maxLength: {
                                    value: 32,
                                    message: 'Your password must be less than 32 characters'
                                }
                            }
                        )} type={isShowPassword ? 'text' : 'password'} name='password' placeholder='password' id='password' />
                        <ErrorMessage name='password' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                        <FontAwesomeIcon onClick={showPassword} className={cls.eye_icon} icon={isShowPassword ? faEye : faEyeSlash} />
                    </Col>
                </Row>
                <Row className='mt-3 align-items-center'>
                    <Col>
                        <Link className={cls.link} to='/signup/'>Create an account</Link>
                    </Col>
                    <Col>
                        <Button type='filled'>Sign In</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
        
    )
}

export default observer(SignIn)