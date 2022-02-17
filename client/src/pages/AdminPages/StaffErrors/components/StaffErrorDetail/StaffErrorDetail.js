import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {getData} from "../../../../../services/StaffServices";
import {Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import {useParams} from "react-router-dom";
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import Select from "../../../../../components/UI/Select/Select";
import {optionsButton} from "../../../../../utils/staffConstants";
import {useForm} from "react-hook-form";
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";

const StaffErrorDetail = () => {
    const params = useParams()
    const [state, setState] = useState({
        error: ''
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
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
    }

    return (
        <Container>
            <h1 className='mt-4 mb-4'>Детальная ошибки</h1>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <AdminInput {...register('name')} placeholder='Название ошибки' />
                        <div>
                            <p>Текущее название</p>
                            <p>{state.error?.error_name}</p>
                        </div>
                    </Row>
                    <Row>
                        <AdminInput {...register('title')} placeholder='Заголовок ошибки' />
                        <div>
                            <p>Текущее Тайтл</p>
                            <p>{state.error?.error_title}</p>
                        </div>
                    </Row>
                    <Row>
                        <TextArea {...register('text')} classnames='dark' placeholder='Текст ошибки' />
                        <div>
                            <p>Текущий Текст</p>
                            <p>{state.error?.error_text}</p>
                        </div>
                    </Row>
                    <Row>
                        <Select {...register('button')} options={optionsButton} classnames='dark'/>
                        <div>
                            <p>Текущий Текст кнопки</p>
                            <p>{state.error?.error_btn}</p>
                        </div>
                    </Row>
                    <AdminButton classname='green'>Применить</AdminButton>
                </AdminForm>
            </AdminButtonCard>
        </Container>
    )
}

StaffErrorDetail.propTypes = {
    
}
StaffErrorDetail.defaultProps = {
    
}

export default StaffErrorDetail