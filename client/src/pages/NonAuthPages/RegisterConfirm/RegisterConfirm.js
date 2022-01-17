import React from 'react'
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {Card, Container, Row} from "react-bootstrap";
import cls from './RegisterConfirm.module.scss'

const RegisterConfirm = () => {
    const navigate = useNavigate()

    const toSignin = () => {
        navigate('/signin')
    }

    return (
        <Container>
            <div className={`${cls.register_confirm_wrap} m-auto mt-5`}>
                <h3>Congrats! You have been registered on our platform</h3>
                <p>Check your Email to confirm registration</p>
                <Row className='m-auto'>
                    <button onClick={toSignin}>Sign In</button>
                </Row>
            </div>
        </Container>
    )
}

export default RegisterConfirm