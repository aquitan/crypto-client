import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Form, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import error from "../../../styles/Error.module.scss";
import TextArea from "../../../components/UI/TextArea/TextArea";
import Select from "../../../components/UI/Select/Select";
import {optionsCurrency} from "../../../utils/staffConstants";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../components/UI/DatePickerCustom/DatePickerCustom";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import moment from "moment";
import {store} from "../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {putData} from "../../../services/StaffServices";
import {getCurCoinName} from "../../../utils/getCurCoinName";
import {useNavigate} from "react-router-dom";

const AdminSecureDeal = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
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
    const trsType = [
        {value: 'Deposit', text: 'Депозит'},
        {value: 'Withdraw', text: 'Вывод'}
    ]

    const onSubmit = async (data) => {
        console.log('data secure', data)

        data.date = moment(startDate).format('yyyy/MM/DD')
        data.time = moment(timeDate).format('hh:mm:ss')
        let newDate = data.date + ' ' + data.time

        delete data.date
        delete data.time
        data.amountInCrypto = +data.amountInCrypto
        data.userId = store.user.id
        data.userEmail = store.userEmail
        data.domainName = window.location.host
        data.amountInUsd = getCurCoinName(data.coinName.toLowerCase(), data.amountInCrypto)
        data.currentDate = dateToTimestamp(newDate)
        data.depositStatus = 'pending'
        data.coinFullName = 'bitcoin'
        data.staffId = store.user.id

        if (data.transaction === 'Deposit') {
            delete data.transaction
            // const res = await putData('/staff/create_transaction/create_regular_deposit_transaction/', data)
        }
        if (data.transaction === 'Withdraw') {
            delete data.transaction
            data.withdrawalAddress = null
            data.withdrawalStatus = 'complete'
            delete data.depositAddress
            delete data.depositStatus
            // const res = await putData('/staff/create_transaction/create_regular_withdrawal_transaction/', data)
        }
    }
    const onToday = () => {
        setStartDate(new Date())
    }
    const onNowTime = () => {
        let time = new Date()
        setTimeDate(time)
    }

    return (
        <Container>
            <h1>Защищенные сделки</h1>
            <AdminButtonCard>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className={'mb-3'}>
                        <Col>
                            <AdminInput {...register('buyer', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='Buyer'/>
                            <ErrorMessage  name='buyer' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                        </Col>
                        <Col>
                            <AdminInput {...register('seller', {
                                required: true,
                                pattern: /^[^а-яё]+$/iu
                            })} placeholder='Seller'/>
                            <ErrorMessage  name='seller' errors={errors} render={() => <p className={error.error}>Только английские буквы</p>} />
                        </Col>
                    </Row>

                    <Row className={'mb-3'}>
                        <TextArea {...register('Conditions')} classnames='dark textarea_square' rows='10' placeholder='Conditions'/>
                    </Row>

                    <Row className='mb-3 flex-items'>
                        <Col className='col-12 col-lg-2 mb-3'>
                            <Select {...register('transaction')} classname={'admin-square'} options={trsType}/>
                        </Col>

                        <Col className='col-12 col-lg-2 mb-3'>
                            <Select {...register('coinName')} classname={'admin-square'} options={optionsCurrency}/>
                        </Col>

                        <Col className='col-12 col-lg-2'>
                            <AdminInput {...register('amountInCrypto')} placeholder='Сумма' />
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
                    </Row>
                    <Row>
                        <AdminButton classname={'green'}>Создать</AdminButton>
                    </Row>
                </Form>
            </AdminButtonCard>

            <AdminButtonCard>
                <h2>История сделок</h2>
                <Row>
                    <Row style={{borderBottom: '1px solid #fff', padding: '10px 0'}}>
                        <Col>Time</Col>
                        <Col>User</Col>
                        <Col>Info</Col>
                        <Col>Action</Col>
                    </Row>
                    <Row style={{borderBottom: '1px solid #fff', padding: '10px 0'}}>
                        <Col>
                            Дата создания: May 9, 2022, 2:09 p.m. <br/>
                            Дедлайн: May 10, 2022, midnight
                        </Col>
                        <Col>
                            seller: densipon (создатель) <br/>
                            buyer: Stephenkeith
                        </Col>
                        <Col>
                            Amount: 0.001 BTC <br/>
                            Password: GuUNrnf6007053<br/>
                            Status: Pending<br/>
                            Выплачена ли награда: Нет<br/>
                        </Col>
                        <Col>
                            <AdminButton
                                classname={'green'}
                                onClick={() => navigate(`/staff/secure-deal/${1}`)}
                            >Посмотреть</AdminButton>
                        </Col>
                    </Row>
                </Row>
            </AdminButtonCard>

        </Container>
    )
}

AdminSecureDeal.propTypes = {

}
AdminSecureDeal.defaultProps = {

}

export default AdminSecureDeal