import React from 'react'
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import cls from './RegisterConfirm.module.scss'
import {useForm} from "react-hook-form";
import Input from "../../../components/UI/Input/Input";
import {store} from "../../../../index";
import {getGeoData} from "../../../queries/getSendGeoData";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import Form from "../../../components/UI/Form/Form";

const RegisterConfirm = () => {
    const {theme} = useThemeContext(ThemeContext)
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const toSignin = async (data) => {
        store.sendActivation(data.activationLink)
        store.setAuth(true)
        navigate('/')
    }

    return (
        <Container style={{maxWidth: '100%', backgroundColor: theme === 'light' ? '#fff' : '#121318'}}  className='h-100 p-0'>
            <Row className='h-100 p-0'>
                <Col className={`d-flex p-0 justify-content-center align-items-baseline align-items-lg-center ${cls.gradient}`}>
                    <div className='pt-5 pt-xl-0'>
                        <img width='100%' src={'/img/pngfind_1.png'} alt=""/>
                    </div>
                </Col>
                <Col className={`px-3 px-xl-0 ${cls.authFormItem}`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <Form onSubmit={handleSubmit(toSignin)}>
                        <Row className='mb-4 text-center'>
                            <h2 style={{color: theme === 'light' ? '#121318' : '#fff'}}>You have been registered on our platform</h2>
                            <p style={{color: theme === 'light' ? '#121318' : '#fff'}} className='mb-3 mt-3'>Check your Email to confirm registration</p>
                        </Row>
                        <Row className='justify-content-center'>
                            <Input {...register('activationLink')} type='text' classname='text-center' name='activationLink' placeholder='Enter confirmation code here'/>
                        </Row>
                        <Row className='m-auto mt-4'>
                            <Button classname={'btnBlue'}>Confirm Email</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterConfirm