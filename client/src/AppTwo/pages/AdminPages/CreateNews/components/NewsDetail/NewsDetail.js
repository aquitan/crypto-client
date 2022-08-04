import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Form, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import TextArea from "../../../../../components/UI/TextArea/TextArea";
import {ErrorMessage} from "@hookform/error-message";
import error from "../../../../../styles/Error.module.scss";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../../../components/UI/DatePickerCustom/DatePickerCustom";
import Select from "../../../../../components/UI/Select/Select";
import {useForm} from "react-hook-form";
import moment from "moment";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";
import {store} from "../../../../../../index";
import {patchData, postData, putData} from "../../../../../services/StaffServices";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {useLocation} from "react-router-dom";

const NewsDetail = (props) => {
    const location = useLocation()
    const [state, setState] = useState(location.state)
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur',
        defaultValues: {
            newsTitle: state.newsTitle,
            newsBody: state.newsBody
        }
    })



    const styles = {
        todayBtn: {
            position: 'absolute',
            backgroundColor: '#444',
            paddingLeft: 10,
            top: 0,
            right: 20,
            height: '100%',
            borderLeft: '1px solid #fff',
            display: 'flex',
            alignItems: 'center'
        }
    }
    const onToday = () => {
        setStartDate(new Date())
    }
    const onNowTime = () => {
        let time = new Date()
        setTimeDate(time)
    }

    const onSubmit = async (data) => {
        data.date = moment(startDate).format('yyyy/MM/DD')
        data.time = moment(timeDate).format('hh:mm:ss')
        let newDate = data.date + ' ' + data.time
        delete data.date
        delete data.time
        data.newsDate = dateToTimestamp(newDate)
        data.staffId = store.user.id
        data.staffEmail = store.user.email
        data.newsImage = 'img'
        data.rootAccess = store.fullAccess
        data.newsId = state._id
        if (store.fullAccess) {
            data.staffEmail = store.fullAccess ? 'root' : store.user.email
            data.staffId = store.fullAccess ? '1' : store.user.id
        }
        const res = await patchData('/staff/news/news_edit/', data)
    }


    const domains = [
        {text: 'localhost:3000', value: 'localhost:3000'}
    ]


    return (
        <Container>
            <AdminButtonCard>
                <h2>Детальная новости</h2>
            </AdminButtonCard>
            <AdminButtonCard>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col className='col-12 col-md-3 mb-3'>
                            <AdminInput {...register('newsTitle', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='Заголовок' />
                            <ErrorMessage  name='newsTitle' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                        </Col>
                        <Col className='col-12 col-lg-3 mb-3' style={{position: 'relative'}}>
                            <DatePickert required
                                         customInput={<DatePickerCustom/>}
                                         placeholderText={'Дата'}
                                         selected={startDate}
                                         dateFormat='yyyy/MM/dd'
                                         todayButton="Today"
                                         onChange={(date) => setStartDate(date)} />
                            <span style={styles.todayBtn} onClick={onToday}>Today</span>
                        </Col>
                        <Col className='col-12 col-lg-3 mb-3' style={{position: 'relative'}}>
                            <DatePickert required
                                         customInput={<DatePickerCustom/>}
                                         placeholderText='Время'
                                         selected={timeDate}
                                         onChange={(date) => setTimeDate(date)}
                                         showTimeSelect
                                         showTimeSelectOnly
                                         timeIntervals={1}
                                         timeCaption="Time"
                                         dateFormat="HH:mm"/>
                            <span style={styles.todayBtn} onClick={onNowTime}>Now</span>
                        </Col>
                        <Col className='col-12 col-md-3 mb-3'>
                            <Select classname={['admin-square']} {...register('newsDomain', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} options={domains} />
                            <ErrorMessage  name='newsDomain' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextArea {...register('newsBody')} classnames='dark textarea_square' rows='10' placeholder='Основной текст'/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AdminButton classname='green'>Сохранить</AdminButton>
                        </Col>
                    </Row>
                </Form>

            </AdminButtonCard>
        </Container>
    )
}

NewsDetail.propTypes = {

}
NewsDetail.defaultProps = {

}

export default NewsDetail