import React from 'react'
import Button from '../../components/UI/Button/Button'
import Form from '../../components/UI/Form/Form'
import Input from '../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import cls from './SignIn.module.css'
import '../../styles/index.css'


const SignIn = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = (data, e) => {
        console.log(data)
        console.log(e)
        e.preventDefault()
    }

    const onClick = (e) => {
        e.preventDefault()
    }

    return (
        <div className={cls.sign_in}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <Input {...register('email')} name='email' label='login' id='login' />
                    <Input {...register('password')} name='password' label='password' id='password' />
                </div>
                <div className='row'>
                    <Button onClick={onClick} type='filled'>Sign In</Button>
                </div>

            </Form>
        </div>
        
    )
}

export default SignIn