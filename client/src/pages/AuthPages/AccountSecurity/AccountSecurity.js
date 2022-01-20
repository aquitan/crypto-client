import React, {useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import Select from '../../../components/UI/Select/Select';
import {useForm} from 'react-hook-form'

const AccountSecurity = () => {
    
    const {register, handleSubmit} = useForm()
    const [type2FA, setType2FA] = useState()
    const [modalChangePass, setModalChangePass] = useState(false)
    const [modal2FA, setModal2FA] = useState(false)



    const showChangePass = () => {
        setModalChangePass(true)
    }

    const show2FA = () => {
        setModal2FA(true)
    }

    const onChangePassword = (data) => {
        console.log(data)
    }

    const on2FAChange = (e) => {
        console.log(e.target.value)
        setType2FA(type2FA)
    }

    return (
        <Container>
            <Modal active={modalChangePass} setActive={setModalChangePass}>
                <Form onSubmit={handleSubmit(onChangePassword)}>
                    <h3>Change Password</h3>
                    <Row>
                        <Input {...register('oldPassword')} name='oldPassword' placeholder='old password'/>
                        <Input {...register('newPassword')} name='newPassword' placeholder='new password'/>
                    </Row>
                    <Row className='mt-3'>
                        <Button>Confirm</Button>
                    </Row>
                </Form>
            </Modal>
            <Modal active={modal2FA} setActive={setModal2FA}>
                <Form>
                    <h3>Enable 2FA</h3>
                    <Row>
                        <Col>
                            <Select name='select2FA' onChange={on2FAChange} value={type2FA} />
                        </Col>
                        <Col>
                            <Button>Select</Button>
                        </Col>
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
                    <Button onClick={show2FA}>enable</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AccountSecurity