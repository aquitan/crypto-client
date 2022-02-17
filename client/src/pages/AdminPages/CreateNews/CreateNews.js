import React, {useEffect, useState} from 'react'
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
import {postData, putData} from "../../../services/StaffServices";
import {store} from "../../../index";
import moment from "moment";
import Select from "../../../components/UI/Select/Select";
import AllNews from "./components/AllNews/AllNews";

const CreateNews = () => {
    const [state, setState] = useState()
    const {register, handleSubmit} = useForm()
    const [startDate, setStartDate] = useState()

    useEffect(() => {
        getAllNews()
    }, [])

    const onSubmit = async (data) => {
        data.newsDate = moment(startDate).format('yyyy/MM/DD')
        data.staffId = store.userId
        data.staffEmail = store.userEmail
        createNews(data)
    }

    const createNews = async (obj) => {
        const res = await putData('/staff/news/news_create/', obj)
    }
    const getAllNews = async () => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            staffId: store.userId
        }
        const res = await postData('/staff/news/get_news_list/', obj)
        setState(res.data.content)
        console.log('content', res.data.content)
    }

    const domains = [
        {text: 'localhost:3000', value: 'localhost:3000'}
    ]

    return (
        <Container>
            <h1>Новости</h1>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3'>
                        <Col>
                            <AdminInput classname='narrow_input' {...register('newsTitle')} placeholder='Заголовок' />
                        </Col>
                        <Col>
                            <DatePickert required
                                         customInput={<DatePickerCustom/>}
                                         placeholderText='Дата'
                                         selected={startDate}
                                         dateFormat='yyyy/MM/dd'
                                         onChange={(date) => setStartDate(date)} />
                        </Col>
                        <Col>
                            <Select classname='small narrow_select' {...register('domainNews')} options={domains} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <TextArea {...register('newsBody')} classnames='dark' rows='10' placeholder='Основной текст'/>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            {/*<AdminInput {...register('newsImage')} type='file' placeholder='Добавить фото'/>*/}
                        </Col>
                        <Col>
                            <AdminInput {...register('youtubeLink')} placeholder='Ссылка на Youtube' />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AdminButton classname='green'>Создать</AdminButton>
                        </Col>
                    </Row>
                </AdminForm>
            </AdminButtonCard>
            <AdminButtonCard>
                <h4>Все новости</h4>
                {
                    state ? <AllNews data={state} /> : <h4>No data!</h4>
                }
            </AdminButtonCard>
        </Container>
    )
}

CreateNews.propTypes = {

}
CreateNews.defaultProps = {

}

export default CreateNews