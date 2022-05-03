import React from 'react'
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {Card, Col, Container, Row} from "react-bootstrap";
import cls from './RegisterConfirm.module.scss'
import {useForm} from "react-hook-form";
import Input from "../../../components/UI/Input/Input";
import {store} from "../../../index";
import {getGeoData} from "../../../queries/getSendGeoData";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";

const RegisterConfirm = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()

    const toSignin = async (data) => {
        const geoData = await getGeoData()
        store.sendActivation(data.activationLink)
        navigate('/')
    }

    return (
        <Container>
            <ButtonCard>
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
            </ButtonCard>
        </Container>
    )
}

export default RegisterConfirm