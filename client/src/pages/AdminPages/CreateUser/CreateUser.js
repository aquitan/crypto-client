import React from 'react'
import {Container, Row} from "react-bootstrap";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import {store} from "../../../index";
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import {emailValidate} from "../../../utils/checkEmail";

const CreateUser = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const domain_name = window.location.host
        const timeDate = new Date()
        const currentDate = timeDate.getFullYear() + '-' + timeDate.getMonth()+1 + '-' + timeDate.getDate() + ' ' + timeDate.getHours() + ':' + timeDate.getMinutes() + ':' + timeDate.getSeconds()

        data.domainName = domain_name
        data.staffId = store.userId
        data.datetime = currentDate
        data.staffEmail = store.userEmail
        const res = await fetch('/api/staff/create_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
        const dates = await res
        console.log('create-user', dates)
    }

    return (
        <Container>
            <AdminForm onSubmit={handleSubmit(onSubmit)}>
                <h2 className='mb-3'>Создать пользователя</h2>
                <Row className='mb-3'>
                    <AdminInput {...register('name', {
                        required: true,
                        pattern: /^[A-Za-z]+$/i
                    })} placeholder='Имя'/>
                    <ErrorMessage  name='name' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                </Row>
                <Row className='mb-3'>
                    <AdminInput {...register('email', {
                        required: true,
                        validate: emailValidate,
                    })} placeholder='Почта'/>
                    <ErrorMessage  name='email' errors={errors} render={() => <p className={error.error}>Почта не верна</p>} />
                </Row>
                <Row className='mb-3'>
                    <AdminInput {...register('password', {
                        required: true,
                    })} placeholder='Пароль'/>
                    <ErrorMessage  name='password' errors={errors} render={() => <p className={error.error}>Необходимо ввести пароль</p>} />
                </Row>
                {/*<Row className='mb-3'>*/}
                {/*    <AdminInput {...register('domain')} placeholder='Домен'/>*/}
                {/*</Row>*/}
                <Row className='mb-3'>
                    <AdminButton classname='green'>Создать пользователя</AdminButton>
                </Row>
            </AdminForm>
        </Container>
    )
}
export default CreateUser;
