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
import {ErrorMessage} from '@hookform/error-message';
import './ImgContainer.scss'


const RegisterConfirm = () => {
    const {theme} = useThemeContext(ThemeContext)
    const navigate = useNavigate()
    const {register, handleSubmit,formState: {errors}, watch, setError} = useForm()

    const toSignin = async (data) => {
        store.sendActivation(data.activationLink)
        store.setAuth(true)
        navigate('/')
    }

    return (
        <Container style={{maxWidth: '100%', backgroundColor: theme === 'light' ? '#fff' : '#121318'}}  className='h-100 p-0'>
            <Row id={theme} className='h-100 p-0'>
                <Col style={{position: 'relative'}} className={`d-flex p-0 justify-content-center align-items-baseline align-items-lg-center ${cls.gradient}`}>
                    <div style={{position: 'relative', height: '100%', width: '100%', overflow: 'hidden'}}>
                        <img style={{position: 'absolute', left: 0, top: 0}} src='/img/elipse.svg' />
                    </div>
                    <div className='pt-5 pt-xl-0 img-container-form'>
                        <img width='100%' src={'/img/pngfind_1.png'} alt=""/>
                    </div>
                </Col>
                <Col className={`px-3 px-xl-0 ${cls.authFormItem}`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <Form onSubmit={handleSubmit(toSignin)}>
                        <Row className='mb-4 text-center'>
                            <h2 style={{color: theme === 'light' ? '#121318' : '#fff'}}>Verify email</h2>
                            <p style={{color: theme === 'light' ? '#121318' : '#fff'}} className='mb-3 mt-3'>Check your Email to confirm registration</p>
                        </Row>
                        <Row className='justify-content-center position-relative'>
                            <Input {...register('activationLink',{
                                required: 'You have to validate email'
                            })} type='text' classname={['text-center',`${errors.email ? 'error' : ''}`]} name='activationLink' placeholder='Enter confirmation code here'/>
                            <ErrorMessage  name='activationLink' errors={errors} render={() => <p className={cls.error}>You have to validate email</p>} />
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