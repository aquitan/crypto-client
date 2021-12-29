import React, { useContext, useRef } from 'react'
import Button from '../../components/UI/Button/Button'
import Form from '../../components/UI/Form/Form'
import Input from '../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import cls from './SignUp.module.scss'
import '../../styles/index.css'
import { Card, Col, FormCheck, FormGroup, FormText, Row } from 'react-bootstrap'
import {AuthContext} from "../../index";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { isValidEmail } from "../../utils/checkEmail";



const SignUp = () => {
    const {register, handleSubmit, formState: {errors}, watch} = useForm({
        mode: "onBlur",
    })


    const password = useRef({})
    password.current = watch('password', '')

    const {store} = useContext(AuthContext)

    const onSubmit = (data, e) => {
        e.preventDefault()
        store.registration(data.email, data.password, data.name = 'user')
    }

    const onClick = (e) => {
        e.preventDefault()
    }

    const emailValidate = (email) => {
        isValidEmail(email)
        return isValidEmail(email);
    }

    return (
        <Card className={cls.sign_up}>
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
                        <Col>
                            <Input {...register('password', {
                                required: 'You must specify your password',
                                minLength: {
                                    value: 8,
                                    message: 'Your password must be at least 8 characters'
                                }
                            })} name='password' type='password' placeholder='password' id='password' />
                            <ErrorMessage name='password' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                        </Col>
                        <Col>
                            <Input {...register('repeatPassword', {
                                required: 'You have to repeat your password',
                                validate: value => value === password.current || 'Password is not the same',
                                message: 'The password does not match'
                            })} name='repeatPassword' type='password' placeholder='repeat password' id='repeatPassword' />
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
                            <Button onClick={onClick} type='filled'>Sign Up</Button>
                        </Col>
                    </Row>
                </FormGroup>

            </Form>
        </Card>
        
    )
}

export default SignUp