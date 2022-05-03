import React, {useState} from 'react'
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import {Card, Col, Container, Row} from "react-bootstrap";
import cls from "../SignIn/SignIn.module.scss";
import Input from "../../../components/UI/Input/Input";
import {emailValidate} from "../../../utils/checkEmail";
import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import API, {BASE_URL} from "../../../API";
import Modal from "../../../components/UI/Modal/Modal";
import {useNavigate} from "react-router-dom";
import {patchData} from "../../../services/StaffServices";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [forgotStatus, setForgotStatus] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })

    const onSubmit = async (data) => {

        const res = await patchData('/forgot_password/', data)
        const datas = await res.data
        console.log('forgot', datas.status)
        setForgotStatus(datas.status)
        setModal(true)
        if (datas.status === 'rejected') {
            setForgotStatus(datas.status)
        }
     }

    return (
        <Container>
            <Modal active={modal} setActive={setModal}>
                <Row className='mt-3 mb-3'>
                    {forgotStatus === 'complete' ? 'New password has been sent!' : 'Ooops! Wrong email address!'}
                </Row>
                <Row>
                    {forgotStatus === 'complete' ? <Button onClick={() => navigate('/signin')}>OK</Button> : <Button onClick={() => setModal(false)}>OK</Button>}
                </Row>
            </Modal>
            <Card className='bg-dark' style={{maxWidth: 800, margin: '0px auto', marginTop: '5%'}}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-4'>
                        <h2>Forgot password</h2>
                    </Row>
                    <Row className='mt-3'>
                        <Col className={cls.relative}>
                            <Input {...register('email', {
                                required: 'You must specify email to SignIn',
                                validate: emailValidate,
                                message: 'Email is not valid'
                            })} name='email' placeholder='Email' id='login' />
                            <ErrorMessage  name='email' errors={errors} render={() => <p className={cls.error}>email is invalid</p>} />
                        </Col>
                    </Row>

                    <Row className='mt-3 align-items-center'>
                        <Col>
                            <Button classname={['small']} type='filled'>Get new password</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}

export default ForgotPassword