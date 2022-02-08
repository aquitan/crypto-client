import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {defaultErrors, optionsAction, optionsButton, optionsUsers} from "../../../utils/staffConstants";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import {useForm} from "react-hook-form";
import {putData} from "../../../services/StaffServices";
import {store} from "../../../index";

const StaffErrors = () => {
    const {register, handleSubmit} = useForm()
    const options = [
        {value: 'Вывод', text: 'Вывод'},
        {value: 'Верификация', text: 'Верификация'},
        {value: 'Мульти-акк', text: 'Мульти-акк'},

    ]

    const onSubmit = async (data) => {
        data.domainName = window.location.host
        data.domainId = 2
        data.staffEmail = store.userEmail
        data.staffId = store.userId
        const res = await putData('/staff/errors/create_new_error/', data)
    }
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
                      <AdminInput {...register('errorTitle')}/>
                  </Row>
                  <Row className='mb-3'>
                      Основной текст
                      <TextArea classnames='dark' {...register('errorText')} />
                  </Row>
                  <Row className='mb-3'>
                      Кнопка
                      <Select {...register('errorButton')} options={optionsButton} classname='' />
                  </Row>
                  <AdminButton classname='green'>Добавить ошибку</AdminButton>
              </AdminForm>
           </AdminButtonCard>

            <AdminButtonCard>
                <h2 className='text-center'>Дефолтные тексты ошибок</h2>
                {
                    defaultErrors.map(error => {
                        return(
                            <Row className='mb-3'>
                                {error.name}
                                <TextArea classnames='dark' value={error.text} />
                            </Row>
                        )
                    })
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