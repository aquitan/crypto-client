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
import {patchData} from "../../../services/StaffServices";
import {twoFaElems} from "../../../utils/staffConstants";

const AccountSecurity = (props) => {
    
    const {register, handleSubmit} = useForm()
    const [type2FA, setType2FA] = useState()
    const [modalChangePass, setModalChangePass] = useState({
        isModal: false,
        isStatus: ''
    })
    const [modal2FA, setModal2FA] = useState(false)

    const showChangePass = () => {
        setModalChangePass({...modalChangePass, isModal: true})
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
        const res = await patchData('/personal_area/security/change_password', geodata)

        const datares = await res
        if (datares.data.status === 'complete') {
            setModalChangePass({...modalChangePass, isStatus: 'complete'})
        }
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
        const res = await patchData('/personal_area/security/disable_two_step_status/', geodata)
        const datares = await res
        console.log('2fa', datares.data)
    }

    return (
        <Container>
            <Modal active={modalChangePass.isModal} title='Change password' setActive={setModalChangePass}>
                {
                    !modalChangePass.isStatus ?
                        <Form onSubmit={handleSubmit(onChangePassword)}>
                            <Row>
                                <Input name='oldPassword' placeholder='old password'/>
                                <Input {...register('newPassword')} name='newPassword' placeholder='new password'/>
                            </Row>
                            <Row className='mt-3'>
                                <Button>Confirm</Button>
                            </Row>
                        </Form>
                        : modalChangePass.isStatus === 'complete' ?
                            <Row>
                                <p>Password is changed</p>
                                <Button onClick={() => setModalChangePass({
                                    isModal: false,
                                    isStatus: ''
                                })}>Ok</Button>
                            </Row>
                            :
                            <Row>
                                <p>Ooops! Something went wrong</p>
                                <Button onClick={() => setModalChangePass({
                                    isModal: false,
                                    isStatus: ''
                                })}>Ok</Button>
                            </Row>
                }
            </Modal>
            <Modal active={modal2FA} setActive={setModal2FA}>
                <Form>
                    <h3>Enable 2FA</h3>
                    <Row>
                        <Col>
                            <Select name='select2FA' options={twoFaElems} classname='light'  onChange={on2FAChange} value={type2FA} />
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
                    <Button onClick={showChangePass} type='filled'>change password</Button>
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