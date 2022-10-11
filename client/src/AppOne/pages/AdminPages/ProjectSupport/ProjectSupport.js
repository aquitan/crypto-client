import React, {useEffect, useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {getData, postData} from "../../../services/StaffServices";
import {useForm} from "react-hook-form";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {store} from "../../../../index";
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";

const ProjectSupport = () => {
    const [state, setState] = useState('')
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })

    useEffect( () => {
        getSupportData()
    }, [])

    const getSupportData = async () => {
        const res = await getData('/staff/project_support/get_wallet/')
        setState(res.data.wallet)
    }

    const onSubmit = async (data) => {
        data.staffEmail = store.userEmail
        const res = await postData('/staff/project_support_form/', data)
    }

    return (
        <Container>
            <AdminButtonCard>
                <h1 className='text-center'>Поддержать проект</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                Wallet: <br/>
                {
                    state ? <p>{state}</p> : <h4 className='text-center my-4' style={{color: '#cecece'}}>No data!</h4>
                }
            </AdminButtonCard>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='mb-3'>Сообщить о проблеме</h2>
                    <Row className='mb-3'>
                        <AdminInput {...register('title', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} placeholder='Заголовок'/>
                        <ErrorMessage  name='title' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Row>
                    <Row className='mb-3'>
                        <TextArea {...register('message', {
                            required: true,
                            pattern: /^[^а-яё]+$/iu
                        })} classname={'dark', 'textarea_square'} placeholder='Текст'/>
                        <ErrorMessage  name='message' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <AdminButton classname='green'>Отправить</AdminButton>
                        </Col>
                    </Row>
                </AdminForm>
            </AdminButtonCard>
        </Container>
    )
}

export default ProjectSupport