import React, { useContext, useRef, useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import cls from './SignUp.module.scss'
import '../../../styles/index.css'
import { Col, Container, FormCheck, FormGroup, FormText, Row} from 'react-bootstrap'
import {AuthContext} from "../../../index";
import {Link} from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import {emailValidate} from "../../../utils/checkEmail";
import {observer} from "mobx-react-lite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import {sendDate} from "../../../queries/getSendGeoData";




const SignUp = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur",
    })

    const password = useRef({})
    password.current = watch('password', '')

    const {store} = useContext(AuthContext)

    const onSubmit = (data, e) => {
        const location = window.location.host
        console.log(data)
        e.preventDefault()
        sendDate()
        store.registration(data.email, data.password, data.name, location)
    }

    const showPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <h2 className='mb-4'>Sign Up</h2>
                </Row>
                <FormGroup>
                    <Row className=''>
                        <Col>
                            <Input {...register('email', {
                                required: 'Email is required',
                                validate: emailValidate,
                                message: 'Email is not valid'

                            })} name='email' placeholder='email' id='email' type='email'/>
                            <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />
                        </Col>
                        <Col>
                            <Input {...register('displayName', {
                                required: false,
                                minLength: {
                                    value: 5,
                                    message: 'Minimal length must be over 5 characters'
                                }
                            })}  name='displayName' placeholder='display name' id='displayName' />
                            <ErrorMessage name='displayName' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className='mt-3'>
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
                            })} name='password' type={isShowPassword ? 'text' : 'password'} placeholder='password' id='password' />
                            <ErrorMessage name='password' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                            <FontAwesomeIcon onClick={showPassword} className={cls.eye_icon} icon={isShowPassword ? faEye : faEyeSlash} />
                        </Col>
                        <Col className={cls.relative}>
                            <Input {...register('repeatPassword', {
                                required: 'You have to repeat your password',
                                validate: value => value === password.current || 'Password is not the same',
                                message: 'The password does not match'
                            })} name='repeatPassword' type={isShowPassword ? 'text' : 'password'} placeholder='repeat password' id='repeatPassword' />
                            <ErrorMessage name='repeatPassword' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className='mt-3'>
                        <Col>
                            <FormText className='d-flex'>
                                <FormCheck {...register('checkbox', {
                                    required: true
                                })} className={cls.checkbox} type='checkbox' /> I agree with <Link className={cls.link} to='#'>Terms and conditions.</Link>
                            </FormText>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row className='mt-3 align-items-center'>
                        <Col>
                            <Link className={cls.link} to='/signin/'>Have an account?</Link>
                        </Col>
                        <Col>
                            <Button type='filled'>Sign Up</Button>
                        </Col>
                    </Row>
                </FormGroup>

            </Form>
        </Container>
        
    )
}

export default observer(SignUp)