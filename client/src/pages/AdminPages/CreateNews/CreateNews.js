import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../components/UI/TextArea/TextArea";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../components/UI/DatePickerCustom/DatePickerCustom";

const CreateNews = () => {
    const {register, handleSubmit} = useForm()
    const [startDate, setStartDate] = useState()

    const onSubmit = (data) => {
        data.date = startDate
        console.log(data)
    }

    return (
        <Container>
            <h1>Новости</h1>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3'>
                        <Col>
                            <AdminInput classname='narrow_input' {...register('title')} placeholder='Заголовок' />
                        </Col>
                        <Col>
                            <DatePickert required
                                         customInput={<DatePickerCustom/>}
                                         placeholderText='Дата'
                                         selected={startDate}
                                         dateFormat='yyyy/MM/dd'
                                         onChange={(date) => setStartDate(date)} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <TextArea {...register('text')} classnames='dark' rows='10' placeholder='Основной текст'/>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <AdminInput {...register('image')} type='file' placeholder='Добавить фото'/>
                        </Col>
                        <Col>
                            <AdminInput {...register('link')} placeholder='Ссылка на Youtube' />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AdminButton classname='green'>Создать</AdminButton>
                        </Col>
                    </Row>
                </AdminForm>
            </AdminButtonCard>
        </Container>
    )
}

CreateNews.propTypes = {

}
CreateNews.defaultProps = {

}

export default CreateNews