import React, {useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import Select from '../../../components/UI/Select/Select';
import {useForm} from 'react-hook-form'
import {getGeoData} from "../../../queries/getSendGeoData";
import {store} from "../../../../index";
import MyAccountLogsItem from "../MyAccount/components/MyAccountLogsItem/MyAccountLogsItem";
import {patchData, postData} from "../../../services/StaffServices";
import {twoFaElems} from "../../../utils/staffConstants";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {observer} from "mobx-react-lite";
import cls from './AccountSecurity.module.scss'
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {useNavigate} from "react-router-dom";

const AccountSecurity = (props) => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const {register: twoFaReg, handleSubmit: twoFaHandle} = useForm()
    const [state, setState] = useState({
        isModal: false,
        isStatus: false,
        type2FA: '',
        twoFaCode: '',
        fieldShow: false,
        modal2FA: false
    })
    const [status, setStatus] = useState(props.data.twoStepStatus)

    console.log('two fa props', props.data)

    const showChangePass = () => {
        setState({...state, isModal: true})
    }
    const show2FA = () => {
        setState({...state, modal2FA: true})
    }

    const onChangePassword = async (data) => {
        data.id = store.user.id
        let geodata =  await getGeoData()
        geodata.id = store.user.id
        delete geodata.email
        geodata.userEmail = store.userEmail
        geodata.newPassword = data.newPassword
        geodata.domainName = window.location.host
        const res = await patchData('/personal_area/security/change_password', geodata)
        if (res.status === 200) {
            setState({...state, isStatus: 'complete'})
        }
    }

    const disable2FA = async () => {
        let geodata =  await getGeoData()
        delete geodata.id
        delete geodata.email
        geodata.userId = store.user.id
        geodata.userEmail = store.userEmail
        geodata.userAction = '2FA Turned Off'
        const res = await patchData('/personal_area/security/disable_two_step_status/', geodata)
        if (res.status === 200) {
            setStatus(false)
        }
    }

    const onClickSelect = async (e) => {
        const obj = {
            domainName: window.location.host,
            userEmail: store.userEmail,
            userId: store.user.id,
            twoFaType: 'telegram',
            twoFaStatus: true,
            currentTime: dateToTimestamp()
        }
        e.preventDefault()
        const res = await patchData('/personal_area/security/', obj)
        const data = await res.data
        setState({
            ...state,
            twoFaCode: data.userCode,
            fieldShow: true
        })
    }

    const onSubmit = async (data) => {
        if (data.code === state.twoFaCode) {
            const geodata = await getGeoData()
            geodata.userId = store.user.id
            geodata.userEmail = store.userEmail
            geodata.domainName = window.location.host
            geodata.twoFaStatus = true
            geodata.twoFaType = 'telegram'
            geodata.enableDate = dateToTimestamp()

            console.log('2fa----', data)
            console.log('2fa geo----', geodata)
            const res = await postData('/personal_area/security/two_step_enable/', geodata)
            if (res.status === 200) {
                setStatus(true)
                store.setTwoFactor(true)
            }
            handleModalClose()
        } else {
            console.log('lol')
        }
    }

    const handleModalClose = () => {
        setState({
            isModal: false,
            isStatus: '',
            type2FA: '',
            twoFaCode: '',
            fieldShow: false,
            modal2FA: false
        })
    }

    const onConfirmChange = () => {
        navigate('/')
        store.logout()
    }

    return (
        <Container>
            <Modal active={state.isModal} title='Change password' setActive={handleModalClose}>
                <Form onSubmit={handleSubmit(onChangePassword)}>
                    <Row>
                        <Row className='mb-3'>
                            <Input name='oldPassword' placeholder='old password'/>
                        </Row>
                        <Row className='mb-3'>
                            <Input {...register('newPassword')} name='newPassword' placeholder='new password'/>
                        </Row>
                    </Row>
                    <Row>
                        <Button>Confirm</Button>
                    </Row>
                </Form>
            </Modal>
            <Modal active={state.modal2FA} setActive={handleModalClose} title={'Enable 2FA'}>
                <Form>
                    <Row className={'mb-3'}>
                        <Col>
                            <Select {...twoFaReg('twoFaType')} name='select2FA' options={twoFaElems} classname='' />
                        </Col>

                        <Col>
                            <Button onClick={onClickSelect}>Select</Button>
                        </Col>
                    </Row>
                    <Row>
                        {
                            state.fieldShow ?  <Input {...twoFaReg('code')} placeholder='code'/> : null
                        }
                    </Row>
                    <Row className='mt-3'>
                        <Button onClick={twoFaHandle(onSubmit)}>Confirm</Button>
                    </Row>
                </Form>
            </Modal>


            <h2 className='mt-3 mb-3'>Account security</h2>
            <ButtonCard>
                <Modal active={state.isStatus} title={'Password successfully changed!'} setActive={handleModalClose}>
                    <Row>
                        <Col>
                            <Button onClick={onConfirmChange}>Ok</Button>
                        </Col>
                    </Row>
                </Modal>
                <Row className='mb-4'>
                    <Col className='text-center p-1'>
                        <h5>Change password</h5>
                        <Row className='justify-content-center'>
                            <Col className='col-12 col-md-6'>
                                <Button onClick={showChangePass} type='filled'>change password</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='text-center p-1'>
                        <h5>2FA</h5>
                        <Row className='justify-content-center'>
                            <Col className='col-12 col-md-6'>
                                {!status ? <Button onClick={show2FA}>enable</Button> : <Button onClick={disable2FA}>Disable</Button>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ButtonCard>

            <ButtonCard className='bg-dark p-3'>
                <Row className={cls.security_table_row}>
                    <Col>
                        IP
                    </Col>
                    <Col>
                        Time
                    </Col>
                </Row>
                {/*<MyAccountLogsItem ip={props.data.ipAddress} time={props.data.loginDate} />*/}
                <MyAccountLogsItem ip='ip' time='time' />
            </ButtonCard>
        </Container>
    )
}

export default observer(AccountSecurity)