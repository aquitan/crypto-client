import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Form, Row} from "react-bootstrap";
import AdminButtonCard from "../../../../components/AdminButtonCard/AdminButtonCard";
import TextArea from "../../../../components/UI/TextArea/TextArea";
import {useForm} from "react-hook-form";
import Select from "../../../../components/UI/Select/Select";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../../components/UI/DatePickerCustom/DatePickerCustom";
import AdminButton from "../../../../components/UI/AdminButton/AdminButton";
import AdminChat from "../../../../components/AdminChat/AdminChat";

const AdminSecureDealDetail = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const status = [
        {value: 'Pending', text: 'Pending'},
        {value: 'In progress', text: 'In progress'},
        {value: 'Denied', text: 'Denied'},
        {value: 'Canceled', text: 'Canceled'},
        {value: 'Completed', text: 'Completed'},
    ]
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
    const messageFrom = [
        {value: 'seller', text: 'seller'},
        {value: 'buyer', text: 'buyer'},
        {value: 'support', text: 'support'},
    ]
    const onToday = () => {
        setStartDate(new Date())
    }
    const onNowTime = () => {
        let time = new Date()
        setTimeDate(time)
    }


    return (
        <Container>
            <h1>Защищенная сделка</h1>
            <AdminButtonCard>
                <h3 className={'mb-3'}>Инфо</h3>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>ID</Col>
                    <Col>829</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Seller</Col>
                    <Col>densipon</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Buyer</Col>
                    <Col>Stephenkeith</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Домен</Col>
                    <Col>aerowallet.net</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Награда</Col>
                    <Col>0.001 BTC</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Пароль</Col>
                    <Col>GuUNrnf6007053</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Выплачен ли</Col>
                    <Col>False</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Выведена ли оплата</Col>
                    <Col>False</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Дедлайн</Col>
                    <Col>May 10, 2022, midnight</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Статус</Col>
                    <Col>Pending</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Создатель</Col>
                    <Col>Seller</Col>
                </Row>
                <Row className={'mb-3'} style={{borderBottom: '1px solid #cecece', paddingBottom: '10px'}}>
                    <Col>Дата создания</Col>
                    <Col>May 9, 2022, 2:09 p.m.</Col>
                </Row>

                <Row className={'mb-3'}>
                    <h4 className={'mb-3 mt-3'}>Conditions</h4>
                    <TextArea {...register('Conditions')} classnames='dark textarea_square' rows='10' placeholder='Conditions'/>
                </Row>
                <Row className={'mb-3'}>
                    <h4 className={'mb-3 mt-3'}>Status</h4>
                    <Select {...register('status')} classname={'admin-square'} options={status}/>
                </Row>
            </AdminButtonCard>

            <AdminButtonCard>
                <h3 className={'mb-3'}>Обновить даты</h3>
                <Form>
                    <Row className={'mb-3'}>
                        <Col className='col-12 col-lg-6 mb-3' style={{position: 'relative'}}>
                            <DatePickert required
                                         customInput={<DatePickerCustom/>}
                                         placeholderText={'Дата'}
                                         selected={startDate}
                                         dateFormat='yyyy/MM/dd'
                                         todayButton="Today"
                                         onChange={(date) => setStartDate(date)} />
                            <span style={styles.todayBtn} onClick={onToday}>Today</span>
                        </Col>
                        <Col className='col-12 col-lg-6 mb-3' style={{position: 'relative'}}>
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
                    </Row>
                    <Row className={'justify-content-center'}>
                        <AdminButton classname={'green'}>Подтвердить</AdminButton>
                    </Row>
                </Form>
            </AdminButtonCard>

            <AdminButtonCard>
                <h3 className={'mb-3'}>Чат</h3>
                <Row className={'col-12 col-lg-3 mb-3'}>
                    <Select {...register('msgFrom')} classname={'admin-square'} options={messageFrom}/>
                </Row>
                <Row>
                    <AdminChat />
                </Row>
            </AdminButtonCard>
            
        </Container>
    )
}

AdminSecureDealDetail.propTypes = {
    
}
AdminSecureDealDetail.defaultProps = {
    
}

export default AdminSecureDealDetail