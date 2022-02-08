import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row} from "react-bootstrap";
import Select from "../../../components/UI/Select/Select";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import {defaultErrors, optionsAction, optionsButton, optionsUsers} from "../../../utils/staffConstants";

const StaffErrors = () => {
    return (
        <Container>
            <h1 className='mt-4'>Ошибки</h1>
           <AdminButtonCard>
               <h2 className='text-center'>Создание новой ошибки</h2>
               <Row className='mb-3'>
                   Событие
                   <Select options={optionsAction} classname='' />
               </Row>
               <Row className='mb-3'>
                   Заголовок
                   <AdminInput />
               </Row>
               <Row className='mb-3'>
                   Основной текст
                   <TextArea classnames='dark' />
               </Row>
               <Row className='mb-3'>
                   Кнопка
                   <Select options={optionsButton} classname='' />
               </Row>
               <Row className='mb-3'>
                   User
                   <Select options={optionsUsers} classname='' />
               </Row>
               <AdminButton classname='green'>Добавить ошибку</AdminButton>
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