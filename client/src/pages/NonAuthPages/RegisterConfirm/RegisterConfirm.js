import React from 'react'
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import cls from './RegisterConfirm.module.scss'
import {useForm} from "react-hook-form";
import Input from "../../../components/UI/Input/Input";
import {store} from "../../../index";

const RegisterConfirm = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const toSignin = (data) => {
        console.log(data)
        store.sendActivation(data.activationLink, store.userId)
        navigate('/')
    }

    return (
        <Container>
            <div className={`${cls.register_confirm_wrap} m-auto mt-5`}>
                <h3>Congrats! You have been registered on our platform</h3>
                <p>Check your Email to confirm registration</p>
                <form onSubmit={handleSubmit(toSignin)}>
                    <Row className='justify-content-center'>
                        <Col className='col-lg-8'>
                            <Input {...register('activationLink')} type='text' classname='text-center' name='activationLink' placeholder='Enter confirmation code here'/>
                        </Col>
                    </Row>
                    <Row className='m-auto mt-4'>
                        <Button>Confirm Email</Button>
                    </Row>
                </form>
            </div>
        </Container>
    )
}

export default RegisterConfirm