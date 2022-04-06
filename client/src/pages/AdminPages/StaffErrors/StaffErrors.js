import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {optionsButton} from "../../../utils/staffConstants";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {getData, postData, putData} from "../../../services/StaffServices";
import {store} from "../../../index";
import StaffErrorItem from "./components/StaffErrorItem/StaffErrorItem";
import {optionsCompiler} from "../../../utils/optionsCompiler";
import Preloader from "../../../components/UI/Preloader/Preloader";
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";

const StaffErrors = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const [state, setState] = useState({
        domainDetail: '',
        domain: '',
        domainOptions: ''
    })
    const options = [
        {value: 'Вывод', text: 'Вывод'},
        {value: 'Верификация', text: 'Верификация'},
        {value: 'Мульти-акк', text: 'Мульти-акк'},
    ]
    const optionsDomain = [
        {value: 'Вывод', text: 'Вывод'},
        {value: 'Верификация', text: 'Верификация'},
        {value: 'Мульти-акк', text: 'Мульти-акк'},
    ]

    useEffect(() => {
        getAllErrors()
        getAllUsers()
    }, [])

    const getAllErrors = async () => {
        const err = await getData('/staff/errors/get_all_errors/1/')
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            staffEmail: store.userEmail
        }
        const res = await postData('/staff/domains/get_active_domains/', obj)

        setState({...state,
            domainDetail: err.data.domain_detail,
            domainOptions: optionsCompiler(res.data.domainsList)
        })
        console.log('errors', err.data)
    }

    const getAllUsers = async () => {

    }

    const onSubmit = async (data) => {
        data.domainName = window.location.host
        data.domainId = 2
        data.staffEmail = store.userEmail
        data.staffId = store.userId
        const res = await putData('/staff/errors/create_new_error/', data)
    }

    const onChangeDomain = async () => {
        const res = await getData('/staff/errors/get_all_errors/1/')
        setState({...state, domain: res.data.domain_detail})
    }

    console.log('domain', state.domainDetail)

    return (
        <Container>
            <h1 className='mt-4'>Ошибки</h1>
           <AdminButtonCard>
              <AdminForm onSubmit={handleSubmit(onSubmit)}>
                  <h2 className='text-center'>Создание новой ошибки</h2>
                  <Row className='mb-3'>
                      Событие
                      <Select {...register('errorName')} options={options} classname='' />
                  </Row>
                  <Row className='mb-3'>
                      Заголовок
                      <AdminInput {...register('errorTitle', {
                          required: true,
                          pattern: /^[^а-яё]+$/iu
                      })}/>
                      <ErrorMessage  name='errorTitle' errors={errors} render={() => <p className={error.error}>Check the field</p>} />
                  </Row>
                  <Row className='mb-3'>
                      Основной текст
                      <TextArea classnames='dark' {...register('errorText', {
                          required: true,
                          pattern: /^[^а-яё]+$/iu
                      })} />
                      <ErrorMessage  name='errorText' errors={errors} render={() => <p className={error.error}>Check the field</p>} />
                  </Row>
                  <Row className='mb-3'>
                      Кнопка
                      <Select {...register('errorButton')} options={optionsButton} classname='' />
                  </Row>
                  <AdminButton classname='green'>Добавить ошибку</AdminButton>
              </AdminForm>
           </AdminButtonCard>

            <AdminButtonCard>
                <h2 className='text-center'>Ошибки</h2>
                <Row>
                    {
                        state.domainOptions ? <Select options={state.domainOptions} onChange={onChangeDomain} /> : <Preloader/>
                    }
                </Row>

                {
                    state.domain ? state.domain.map(error => {
                        return <StaffErrorItem data={error} />
                    })
                        : <h4>choose domain</h4>
                }
            </AdminButtonCard>
        </Container>
    )
}

StaffErrors.propTypes = {
    
}
StaffErrors.defaultProps = {
    
}

export default StaffErrors