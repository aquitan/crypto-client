import React from 'react'
import {Container, Row} from "react-bootstrap";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";

const CreateUser = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = (data, e) => {
        e.preventDefault()
        console.log('create-user', data)
    }

    return (
        <Container>
            <AdminForm onSubmit={handleSubmit(onSubmit)}>
                <h2 className='mb-3'>Создать пользователя</h2>
                <Row className='mb-3'>
                    <AdminInput {...register('name')} placeholder='Имя'/>
                </Row>
                <Row className='mb-3'>
                    <AdminInput {...register('mail')} placeholder='Почта'/>
                </Row>
                <Row className='mb-3'>
                    <AdminInput {...register('password')} placeholder='Пароль'/>
                </Row>
                <Row className='mb-3'>
                    <AdminInput {...register('domain')} placeholder='Домен'/>
                </Row>
                <Row className='mb-3'>
                    <AdminButton color='green'>Создать пользователя</AdminButton>
                </Row>
            </AdminForm>
        </Container>
    )
}
export default CreateUser;
