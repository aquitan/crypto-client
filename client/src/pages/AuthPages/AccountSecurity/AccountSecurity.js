import React, {useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import Select from '../../../components/UI/Select/Select';
import {useForm} from 'react-hook-form'
import {getGeoData} from "../../../queries/getSendGeoData";
import {store} from "../../../index";
import MyAccountLogsItem from "../MyAccount/components/MyAccountLogsItem/MyAccountLogsItem";

const AccountSecurity = (props) => {
    
    const {register, handleSubmit} = useForm()
    const [type2FA, setType2FA] = useState()
    const [modalChangePass, setModalChangePass] = useState(false)
    const [modal2FA, setModal2FA] = useState(false)

    console.log('my account ip address', props)

    const showChangePass = () => {
        setModalChangePass(true)
    }

    const show2FA = () => {
        setModal2FA(true)
    }

    const onChangePassword = async (data) => {
        data.id = store.userId
        let geodata =  await getGeoData()
        delete geodata.id
        delete geodata.email
        geodata.userId = store.userId
        geodata.userEmail = store.userEmail
        geodata.newPassword = data.newPassword
        const res = await fetch(`/api/personal_area/security/change_password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(geodata)
        })
        const datares = await res.json()
        console.log(datares)
    }

    const on2FAChange = (e) => {
        console.log(e.target.value)
        setType2FA(type2FA)
    }

    const disable2FA = async () => {
        let geodata =  await getGeoData()
        delete geodata.id
        delete geodata.email
        geodata.userId = store.userId
        geodata.userEmail = store.userEmail
        geodata.userAction = '2FA Turned Off'
        const res = await fetch(`/api/personal_area/security/disable_two_step_status/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(geodata)
        })
        const datares = await res.json()
        console.log(datares)

    }

    return (
        <Container>
            <Modal active={modalChangePass} setActive={setModalChangePass}>
                <Form onSubmit={handleSubmit(onChangePassword)}>
                    <h3>Change Password</h3>
                    <Row>
                        <Input name='oldPassword' placeholder='old password'/>
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
            <Row className='mb-4'>
                <Col>
                    <h5>Change password</h5>
                    <Button onClick={showChangePass} type='filled' disabled='false'>change password</Button>
                </Col>
                <Col>
                    <h5>2FA</h5>
                    {!store.twoFactor ? <Button onClick={show2FA}>enable</Button> : <Button onClick={disable2FA}>Disable</Button>}
                </Col>
            </Row>

            <Card>
                <Row style={{borderBottom: '1px solid #cecece'}}>
                    <Col>
                        IP
                    </Col>
                    <Col>
                        Time
                    </Col>
                </Row>
                <MyAccountLogsItem ip={props.data.ip_address} time={props.data.login_date} />
            </Card>
        </Container>
    )
}

export default AccountSecurity