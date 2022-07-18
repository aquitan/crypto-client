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
import {store} from "../../../../index";
import moment from "moment";
import Select from "../../../components/UI/Select/Select";
import AllNews from "./components/AllNews/AllNews";
import error from "../../../styles/Error.module.scss";
import {ErrorMessage} from "@hookform/error-message";
import FileUpload from "../../../components/UI/FileUpload/FileUpload";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {v4 as uuid} from 'uuid'

const CreateNews = () => {
    const [state, setState] = useState([])
    const [curSelect, setCurSelect] = useState('')
    const [optionId, setOptionId] = useState('')
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onBlur'
    })
    const [allDomains, setAllDomains] = useState([])
    const [limit, setLimit] = useState(0)
    const [image, setImage] = useState('')

    useEffect(() => {
        getAllNews()
        getDomainList()
    }, [])

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
        data.newsImage = image
        data.rootAccess = store.fullAccess
        data.newsDomain = curSelect
        if (store.fullAccess) {
            data.staffEmail = store.fullAccess ? 'root' : store.user.email
            data.staffId = store.fullAccess ? '1' : store.user.id
        }
        const res = await putData('/staff/news/news_create/', data)
        if (res.status === 201) {
            getAllNews()
        }
    }

    const getAllNews = async () => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            staffEmail: store.fullAccess ? 'root' : store.user.email,
            rootAccess: store.fullAccess,
            skipValue: limit,
            limitValue: 10
        }
        if (store.fullAccess) {
            obj.staffId = store.fullAccess ? '1' : store.user.id
        }
        const res = await postData('/staff/news/get_news_list/', obj)
        setState(res.data)
    }

    const getDomainList = async () => {
        const obj = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess,
            staffId: store.fullAccess ? 'root' : store.user.id
        }
        const res = await postData('/staff/domains/get_active_domains/', obj)
        let arr = []
        if (typeof res.data !== "string") {
            for (let i = 0; i <= res.data?.length - 1; i++) {
                let obj = {
                    value: res.data[i].domainName,
                    text: res.data[i].domainName,
                    id: res.data[i].domainId
                }
                arr.push(obj)
                setAllDomains(arr)
                setCurSelect(arr[0].value)
                setOptionId(arr[0].id)
            }

        } else {
            let obj = {
                value: res.data,
                text: res.data,
                id: res.data.domainId
            }
            arr.push(obj)
            setAllDomains(arr)
            setCurSelect(arr[0].value)
            setOptionId(arr[0].id)
        }
    }

    useEffect(() => {
        getAllNews()
    }, [limit])

    const onMore = () => {
        setLimit(prevState => prevState+1)
    }
    const onLess = () => {
        setLimit(prevState => prevState-1)
    }

    const onUploadImg =(img) => {
        const formData = new FormData();
        formData.append("image", img);
        fetch(
            "https://api.imgbb.com/1/upload?key=68c3edcc904ee3e28d2e63ec81876e40",
            { method: "POST", body: formData }
        )
            .then((response) => response.json())
            .then((data) => setImage(data.data.display_url));
    }


    return (
        <Container>
            <AdminButtonCard>
                <h1 className={'text-center'}>Новости</h1>
            </AdminButtonCard>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
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
                            <Select classname={['admin-square']} value={curSelect} options={allDomains} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <TextArea {...register('newsBody')} classnames='dark textarea_square' rows='10' placeholder='Основной текст'/>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col className='col-12 col-md-6 mb-3'>
                            <FileUpload onUploadImg={onUploadImg} id='newsImg' />
                        </Col>
                        {/*<Col className='col-12 col-md-6 mb-3'>*/}
                        {/*    <AdminInput {...register('youtubeLink')} placeholder='Ссылка на Youtube' />*/}
                        {/*</Col>*/}
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
                    state !== 'empty list' ?
                        state.map(news => {
                            return <AllNews key={uuid()} data={news} />
                        })
                        : <h4>No data!</h4>
                }
                <Row className={'mb-3 mt-3'}>
                    {
                        state.length >= 10 ?
                            <AdminButton onClick={onMore} classname={['xs', 'green']}>Еще</AdminButton>
                            : null
                    }
                    {
                        limit > 0 ?
                            <AdminButton onClick={onLess} classname={['xs', 'green']}>Назад</AdminButton>
                            : null
                    }
                </Row>
            </AdminButtonCard>

        </Container>
    )
}

CreateNews.propTypes = {

}
CreateNews.defaultProps = {

}

export default CreateNews