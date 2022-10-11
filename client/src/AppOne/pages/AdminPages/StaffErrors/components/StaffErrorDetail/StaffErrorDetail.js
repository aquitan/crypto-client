import React, {useEffect, useState} from 'react'
import {getData} from "../../../../../services/StaffServices";
import {Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {useNavigate, useParams} from "react-router-dom";
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import Select from "../../../../../components/UI/Select/Select";
import {optionsButton} from "../../../../../utils/staffConstants";
import {useForm} from "react-hook-form";
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import ModalDark from "../../../../../components/UI/ModalDark/ModalDark";

const StaffErrorDetail = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [state, setState] = useState({
        error: '',
        modal: false
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur',
        defaultValues: {
            button: state.error?.error_button,
        }
    })

    useEffect(() => {
        getErrorData()
    }, [])

    const getErrorData = async () => {
        const res = await getData(`/staff/errors/get_all_errors/${params.id}`)
        setState({...state, error: res.data.domain_detail[params.id-1]})
    }
    const onSubmit = (data) => {
        console.log(data)
        setState({...state, modal: true})
    }

    const onHandleCloseModal = () => {
        setState({error: '', modal: false})
        navigate('/staff/staff-errors')
    }

    return (
        <Container>

            <ModalDark singleBtn={true} active={state.modal} setActive={onHandleCloseModal}>
                <h2>Ошибка изменена!</h2>
            </ModalDark>

            <AdminButtonCard>
                <h1 className='mt-4 mb-4'>Детальная ошибки</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3'>
                        <p>Текущее название</p>
                        <AdminInput defaultValue={state.error?.error_name} {...register('name')} placeholder='Название ошибки' classname='admin-square' />
                    </Row>
                    <Row className='mb-3'>
                        <p>Текущее Тайтл</p>
                        <AdminInput defaultValue={state.error?.error_title} {...register('title')} placeholder='Заголовок ошибки' classname='admin-square'/>
                    </Row>
                    <Row className='mb-3'>
                        <p>Текущий Текст</p>
                        <TextArea defaultValue={state.error?.error_text} {...register('text')} placeholder='Текст ошибки' classname='textarea_square'/>
                    </Row>
                    <Row className='mb-3'>
                        <p>Текущий Текст кнопки</p>
                        <Select defaultValue={state.error?.error_button} {...register('button')} options={optionsButton}  classname='admin-square'/>
                    </Row>
                    <AdminButton classname='green'>Применить</AdminButton>
                </AdminForm>
            </AdminButtonCard>
        </Container>
    )
}


export default StaffErrorDetail