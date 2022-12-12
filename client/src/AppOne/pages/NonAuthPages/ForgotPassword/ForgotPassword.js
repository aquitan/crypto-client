import React, {useState} from 'react'
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import { Col, Container, Row} from "react-bootstrap";
import cls from "../SignIn/SignIn.module.scss";
import Input from "../../../components/UI/Input/Input";
import {emailValidate} from "../../../utils/checkEmail";
import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import Modal from "../../../components/UI/Modal/Modal";
import {Link, useNavigate} from "react-router-dom";
import {patchData} from "../../../services/StaffServices";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import {checkDeviece} from '../../../utils/checkDevice';
import {store} from '../../../../index';
import {getGeoData} from '../../../queries/getSendGeoData';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';
import './ImgContainer.scss'


const ForgotPassword = () => {
    const navigate = useNavigate()
    const {theme} = useThemeContext(ThemeContext)
    const [modal, setModal] = useState(false)
    const [forgotStatus, setForgotStatus] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const onSubmit = async (data) => {
        let date = new Date()
        const geodata = await getGeoData()
        data.domainName = window.location.host
        data.currentDate = date.getTime() / 1000
        data.companyYear = store.domain.companyYear
        data.ipAddress = geodata.ipAddress
        data.deviceName = checkDeviece()

        const res = await patchData(getSwitchQuery('/forgot_password/'), data)
        const datas = await res.data
        setForgotStatus(datas.status)
        setModal(true)
        if (datas.status === 'rejected') {
            setForgotStatus(datas.status)
        }
     }

    return (
        <Container style={{maxWidth: '100%', backgroundColor: theme === 'light' ? '#fff' : '#121318'}} className='h-100 m-0 p-0'>
            <Modal active={modal} setActive={setModal}>
                <Row className='mt-3 mb-3'>
                    {forgotStatus === 'complete' ? 'New password has been sent!' : 'Ooops! Wrong email address!'}
                </Row>
                <Row>
                    {forgotStatus === 'complete' ? <Button onClick={() => navigate('/signin')}>OK</Button> : <Button onClick={() => setModal(false)}>OK</Button>}
                </Row>
            </Modal>

            <Row className='h-100 p-0'>
                <Col style={{position: 'relative'}} className={`d-flex p-0 justify-content-center align-items-baseline align-items-lg-center ${cls.gradient}`}>
                    <div className='pt-5 pt-xl-0 img-container-form'>
                        <img width='100%' src={'/img/pngfind_1.png'} alt=""/>
                    </div>
                </Col>
                <Col className={`px-3 px-xl-0 ${cls.authFormItem}`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Form classnames='narrow' onSubmit={handleSubmit(onSubmit)}>
                        <Row className='mb-4'>
                            <h2 style={{color: theme === 'light' ? '#121318' : '#fff'}}>Reset password</h2>
                        </Row>
                        <Row className='mt-3'>
                            <Col className={cls.relative}>
                                <Input {...register('email', {
                                    required: 'You must specify email to SignIn',
                                    validate: emailValidate,
                                    message: 'Email is not valid'
                                })} classname={[`${errors.email ? 'error' : ''}`]} name='email' placeholder='Email' id='login' />
                                <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>Email is not valid</p>} />
                            </Col>
                            <Row className='mt-4 align-items-center'>
                                <Button classname='btnBlue' type='filled'>Reset your password</Button>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='text-start'>
                                    <Link className={cls.link} to='/signup/'>Create an account</Link>
                                </Col>
                                <Col className='text-end'>
                                    <Link className={cls.link} to='/signin/'>Sign In</Link>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ForgotPassword