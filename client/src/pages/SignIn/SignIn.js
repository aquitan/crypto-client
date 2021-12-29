import React, {useContext} from 'react'
import Button from '../../components/UI/Button/Button'
import Form from '../../components/UI/Form/Form'
import Input from '../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import cls from './SignIn.module.scss'
import '../../styles/index.css'
import {Card, Col, FormCheck, FormText, Row} from "react-bootstrap";
import {isValidEmail} from "../../utils/checkEmail";
import {Link} from "react-router-dom";
import {AuthContext} from "../../index";


const SignIn = () => {
    const {register, handleSubmit} = useForm()
    const {store} = useContext(AuthContext)

    const onSubmit = (data, e) => {
        store.login(data.email, data.password)
        console.log(data)
        e.preventDefault()
    }

    const onClick = (e) => {
        e.preventDefault()

    }

    return (
        <Card className={cls.sign_in}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className='mb-4'>
                    <h2>Sign In</h2>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        <Input {...register('email', {

                        })} name='email' placeholder='login' id='login' />
                        <Input {...register('password')} name='password' placeholder='password' id='password' />
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
        </Card>
        
    )
}

export default SignIn