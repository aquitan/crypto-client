import React from 'react'
import {Container, Row} from "react-bootstrap";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import {store} from "../../../index";

const CreateUser = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const domain_name = window.location.host
        const timeDate = new Date()
        const currentDate = timeDate.getFullYear() + '-' + timeDate.getMonth()+1 + '-' + timeDate.getDate() + ' ' + timeDate.getHours() + ':' + timeDate.getMinutes() + ':' + timeDate.getSeconds()

        data.domainName = domain_name
        data.staffId = store.userId
        data.datetime = currentDate
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
                    <AdminInput {...register('name')} placeholder='Имя'/>
                </Row>
                <Row className='mb-3'>
                    <AdminInput {...register('email')} placeholder='Почта'/>
                </Row>
                <Row className='mb-3'>
                    <AdminInput {...register('password')} placeholder='Пароль'/>
                </Row>
                {/*<Row className='mb-3'>*/}
                {/*    <AdminInput {...register('domain')} placeholder='Домен'/>*/}
                {/*</Row>*/}
                <Row className='mb-3'>
                    <AdminButton color='green'>Создать пользователя</AdminButton>
                </Row>
            </AdminForm>
        </Container>
    )
}
export default CreateUser;
