import React, {useContext} from 'react'
import Button from '../../../components/UI/Button/Button'
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import { Col, Container, FormCheck, FormText, Row} from "react-bootstrap";
import { emailValidate } from "../../../utils/checkEmail";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../index";
import { observer } from "mobx-react-lite";
import { ErrorMessage } from "@hookform/error-message";
import cls from './SignIn.module.scss'
import '../../../styles/index.css'



const SignIn = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const {store} = useContext(AuthContext)

    const onSubmit = (data, e) => {
        store.login(data.email, data.password)
        store.checkAuth()
        e.preventDefault()
    }

    const onClick = (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className='mb-4'>
                    <h2>Sign In</h2>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <Input {...register('email', {
                            required: 'You must specify email to SignIn',
                            validate: emailValidate,
                            message: 'Email is not valid'
                        })} name='email' placeholder='Email' id='login' />
                        <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />

                        <Input {...register('password', {
                                required: 'You must specify your password',
                                minLength: {
                                    value: 5,
                                    message: 'Your password must be at least 8 characters'
                                }
                            }
                        )} type='password' name='password' placeholder='password' id='password' />
                        <ErrorMessage name='password' errors={errors} render={({message}) => <p className={cls.error}>{message}</p>} />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <FormText className='d-flex'>
                            <FormCheck {...register('checkbox', {
                                required: true
                            })} className={cls.checkbox} type='checkbox' /> I agree with <Link className={cls.link} to='#'>Terms and conditions.</Link>
                        </FormText>
                    </Col>
                </Row>
                <Row className='mt-3 align-items-center'>
                    <Col>
                        <Link className={cls.link} to='/signup/'>Create an account</Link>
                    </Col>
                    <Col>
                        <Button onClick={onClick} type='filled'>Sign In</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
        
    )
}

export default observer(SignIn)