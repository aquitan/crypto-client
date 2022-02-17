import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {getData, postData} from "../../../services/StaffServices";
import {useForm} from "react-hook-form";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {store} from "../../../index";

const ProjectSupport = () => {
    const [state, setState] = useState('')
    const {register, handleSubmit} = useForm()

    useEffect( () => {
        getSupportData()
    }, [])

    const getSupportData = async () => {
        const res = await getData('/staff/project_support/get_wallet/')
        setState(res.data.wallet)
        console.log('data support', res.data.wallet)
    }

    const onSubmit = async (data) => {
        data.staffEmail = store.userEmail
        const res = await postData('/staff/project_support_form/', data)
    }

    return (
        <Container>
            <h1 className='mt-3'>Донат</h1>
            <AdminButtonCard>
                Wallet: <br/>
                {
                    state ? <p>{state}</p> : <h4>No data</h4>
                }
            </AdminButtonCard>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='mb-3'>Сообщить о проблеме</h2>
                    <Row className='mb-3'>
                        <AdminInput {...register('title')} placeholder='Заголовок'/>
                    </Row>
                    <Row className='mb-3'>
                        <TextArea {...register('message')} classnames='dark' placeholder='Текст'/>
                    </Row>
                    <AdminButton classname='green'>Отправить</AdminButton>
                </AdminForm>
            </AdminButtonCard>
        </Container>
    )
}

ProjectSupport.propTypes = {

}
ProjectSupport.defaultProps = {

}

export default ProjectSupport