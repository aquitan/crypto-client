import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import cls from './MyAccount.module.scss'

const MyAccount = () => {


    return (
        <Container>
            <h1>My Account</h1>
            <Row className={cls.account_row}>
                <Col>
                    <div>Name</div>
                </Col>
                <Col>
                    <div>aquitan</div>
                </Col>
            </Row>
            <Row className={cls.account_row}>
                <Col>
                    <div>Email</div>
                </Col>
                <Col>
                    <div>aquitanfw@gmail.com</div>
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