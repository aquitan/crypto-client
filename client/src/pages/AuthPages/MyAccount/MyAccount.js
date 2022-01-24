import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import cls from './MyAccount.module.scss'

const MyAccount = (props) => {
console.log('my acc', props)

    return (
        <Container>
            <h1>My Account</h1>
            <Row className={cls.account_row}>
                <Col>
                    <div>Name</div>
                </Col>
                <Col>
                    <div>{props.data.name === '' ? '-' : props.data.name}</div>
                </Col>
            </Row>
            <Row className={cls.account_row}>
                <Col>
                    <div>Email</div>
                </Col>
                <Col>
                    <div>{props.data.email === '' ? '-' : props.data.email}</div>
                </Col>
            </Row>
            <Row className={cls.account_row}>
                <Col>
                    <div>Phone</div>
                </Col>
                <Col>
                    <div>-</div>
                </Col>
            </Row>
            <Row className={cls.account_row}>
                <Col>
                    <div>Registration date</div>
                </Col>
                <Col>
                    <div>01.01.2020</div>
                </Col>
            </Row>
        </Container>
    )
}

export default MyAccount