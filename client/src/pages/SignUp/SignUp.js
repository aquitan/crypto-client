import React, {useContext} from 'react'
import Button from '../../components/UI/Button/Button'
import Form from '../../components/UI/Form/Form'
import Input from '../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import cls from './SignUp.module.css'
import '../../styles/index.css'
import { Card, Row } from 'react-bootstrap'
import {Context} from "../../index";

const SignIn = () => {
    const {register, handleSubmit} = useForm()

    const {store} = useContext(Context)

    const onSubmit = (data, e) => {
        e.preventDefault()
        store.register(data.email, data.password).then(response => console.log(response))
    }

    const onClick = (e) => {
        e.preventDefault()
    }

    return (
        <Card className={cls.sign_in}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className=''>
                    <Input {...register('email')} name='email' label='email' id='email' />
                    <Input {...register('displayName')} name='displayName' label='display name' id='displayName' />
                    
                </Row>
                <Row className='mt-3'>
                    <Input {...register('password')} name='password' type='password' label='password' id='password' />
                    <Input {...register('repeatPassword')} name='repeatPassword' type='password' label='repeat password' id='repeatPassword' />
                </Row>
                <Row className='mt-3'>
                    <Button onClick={onClick} type='filled'>Sign Up</Button>
                </Row>

            </Form>
        </Card>
        
    )
}

export default SignIn