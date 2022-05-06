import React, {useState} from 'react'
import PropTypes from 'prop-types'
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";
import {Col, Row} from "react-bootstrap";
import Select from "../../../../../components/UI/Select/Select";
import {optionsCurrency, transTableHeader} from "../../../../../utils/staffConstants";
import DatePickert from "react-datepicker";
import DatePickerCustom from "../../../../../components/UI/DatePickerCustom/DatePickerCustom";
import AdminInput from "../../../../../components/UI/AdminInput/AdminInput";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import {useForm} from "react-hook-form";
import moment from "moment";
import Table from "../../../../../components/UI/Table/Table";
import TableHeader from "../../../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../../../components/UI/Table/components/TableBody/TableBody";
import TableItem from "../../../../../components/UI/Table/components/TableItem/TableItem";
import {postData, putData} from "../../../../../services/StaffServices";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";
import {store} from "../../../../../index";

const MakeTransactionOuter = ({history}) => {
    const [startDate, setStartDate] = useState()
    const [defaultDate, setDefaultDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const {register, handleSubmit} = useForm()
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
    const actionType = [
        {value: 'Пополнение', text: 'Пополнение'},
        {value: 'Внутренний перевод', text: 'Внутренний перевод'},
    ]

    const getCurCoinName = (coin, bucs) => {
        if (coin === 'usd' || coin === 'usdt') {
            return bucs
        }
        else {
            return store.rates[coin] * bucs
        }
    }

    const onSubmit = async (data) => {
        data.date = moment(startDate).format('yyyy/MM/DD')
        data.time = moment(timeDate).format('hh:mm:ss')
        let newDate = data.date + ' ' + data.time

        delete data.date
        delete data.time
        data.amountInCrypto = +data.amountInCrypto
        data.userId = store.userId
        data.userEmail = store.userEmail
        data.domainName = window.location.host
        data.amountInUsd = getCurCoinName(data.coinName.toLowerCase(), data.amountInCrypto)
        data.currentDate = dateToTimestamp(newDate)
        data.depositStatus = 'pending'

        console.log('log-data', data)

        if (data.transaction === 'Deposit') {
            const res = await putData('/staff/create_transaction/create_regular_deposit_transaction/', data)
        }
        if (data.transaction === 'Withdraw') {
            data.withdrawalAddress = null
            data.withdrawalStatus = 'complete'
            delete data.depositAddress
            delete data.depositStatus
            const res = await putData('/staff/create_transaction/create_regular_withdrawal_transaction/', data)
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
        <>
                <AdminButtonCard title='Regular transactions'>
                    <AdminForm onSubmit={handleSubmit(onSubmit)}>
                        <Row className='mb-3 flex-items'>
                            <Col className='col-12 col-lg-2 mb-3'>
                                <Select {...register('transaction')} options={trsType}/>
                            </Col>

                            <Col className='col-12 col-lg-2 mb-3'>
                                <Select {...register('coinName')} options={optionsCurrency}/>
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
                        <Row className='mb-3'>
                            <Col>
                                <AdminInput {...register('depositAddress')} placeholder='Адрес'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <AdminButton classname='green'>Создать</AdminButton>
                            </Col>
                        </Row>
                    </AdminForm>
                </AdminButtonCard>

                <AdminButtonCard classname='small_scroll'>
                    <Table>
                        <TableHeader elems={transTableHeader}/>
                        <TableBody>
                            {
                                history.map(item => {
                                    return(
                                        <Row>

                                        </Row>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </AdminButtonCard>
            </>
    )
}

MakeTransactionOuter.propTypes = {
    
}
MakeTransactionOuter.defaultProps = {
    
}

export default MakeTransactionOuter