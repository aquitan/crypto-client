import React, {useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";

const AccountSecurity = () => {
    const [modalChangePass, setModalChangePass] = useState(false)
    const showChangePass = () => {
        setModalActive(true)
    }

    return (
        <Container>
            <Modal active={modalChangePass} setActive={setModalChangePass}>
                <Form>
                    <h3>Change Password</h3>
                    <Row>
                        <Input placeholder='old password'/>
                        <Input placeholder='new password'/>
                    </Row>
                    <Row className='mt-3'>
                        <Button>Confirm</Button>
                    </Row>
                </Form>
            </Modal>
            <Modal active={modalActive} setActive={setModalActive}>
                <Form>
                    <h3>Enable 2FA</h3>
                    <Row>
                        <Col>
                            <select name="" id=""></select>
                        </Col>
                        <Input placeholder='new password'/>
                    </Row>
                    <Row className='mt-3'>
                        <Button>Confirm</Button>
                    </Row>
                </Form>
            </Modal>
            <h1>Account security</h1>
            <Row>
                <Col>
                    <h5>Change password</h5>
                    <Button onClick={showChangePass} type='filled' disabled='false'>change password</Button>
                </Col>
                <Col>
                    <h5>2FA</h5>
                    <Button>enable</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AccountSecurity