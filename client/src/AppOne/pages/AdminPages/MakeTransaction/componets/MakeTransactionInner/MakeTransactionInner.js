import React, {useState} from 'react'
import AdminForm from "../../../../../components/UI/AdminForm/AdminForm";
import {Col, Row} from "react-bootstrap";
import Select from "../../../../../components/UI/Select/Select";
import {optionsCurrency, transInnerTableHeader, transTableHeader} from "../../../../../utils/staffConstants";
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
import {getData, postData, putData} from "../../../../../services/StaffServices";
import {store} from "../../../../../../index";
import {dateToTimestamp} from "../../../../../utils/dateToTimestamp";

const MakeTransactionInner = () => {
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const {register, handleSubmit} = useForm({
        mode: 'onBlur'
    })
    const styles = {
        todayBtn: {
            position: 'absolute',
            backgroundColor: '#444',
            paddingLeft: 10,
            top: 0,
            right: 20,
            borderLeft: '1px solid #fff',
            display: 'flex',
            alignItems: 'center',
            height: '100%'
        }
    }
    const actionType = [
        {value: true, text: 'Получение'},
        {value: false, text: 'Отправка'},
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
        data.userId = ''
        data.staffId = store.user.id
        data.domainName = window.location.host
        data.amountInUsd = getCurCoinName(data.coinName.toLowerCase(), data.amountInCrypto)
        data.currentDate = dateToTimestamp(newDate)
        data.transferStatus = 'complete'
        data.toAddress = ''
        data.fromAddress = ''
        if (data.transferType === 'true') {
            data.transferType = true
        } else {
            data.transferType = false
        }


        if (data.transferType) {
            const res = await putData('/staff/create_transaction/create_internal_transfer_as_staff/', data)
        }
        if (!data.transferType) {
            const res = await putData('/staff/create_transaction/create_internal_transfer_as_staff/', data)
        }
    }

    const onToday = () => {
        setStartDate(new Date())
    }
    const onNowTime = () => {
        let time = new Date()
        setTimeDate(time)
    }

    const onBlur = async (e) => {
        const res = await getData(`/second_party_user_checker/${e.target.value}/${window.location.host}/${store.user.id}/`)
    }
    return (
        <>
                <AdminButtonCard title='Internal transactions'>
                    <AdminForm onSubmit={handleSubmit(onSubmit)}>
                        <Row className='flex-items'>
                            <Col className='col-12 col-lg-2 mb-3'>
                                <Select {...register('transferType')} classname={'admin-square'} options={actionType}/>
                            </Col>

                            <Col className='col-12 col-lg-2 mb-3'>
                                <Select {...register('coinName')} classname={'admin-square'} options={optionsCurrency}/>
                            </Col>

                            <Col className='col-12 col-lg-2 mb-3'>
                                <AdminInput {...register('amountInCrypto')} placeholder='Сумма' />
                            </Col>
                            <Col className='col-12 col-lg-3 mb-3' style={{position: 'relative'}}>
                                <DatePickert required
                                             customInput={<DatePickerCustom/>}
                                             placeholderText='Дата'
                                             selected={startDate}
                                             dateFormat='yyyy/MM/dd'
                                             onChange={(date) => setStartDate(date)} />
                                <span style={styles.todayBtn} onClick={onToday}>Today</span>
                            </Col>
                            <Col className='col-12 col-lg-3 mb-3' style={{position:'relative'}}>
                                <DatePickert required
                                             customInput={<DatePickerCustom/>}
                                             placeholderText='Время'
                                             selected={timeDate}
                                             onChange={(date) => setTimeDate(date)}
                                             showTimeSelect
                                             showTimeSelectOnly
                                             timeIntervals={1}
                                             timeCaption="Time"
                                             dateFormat="HH:mm"
                                />
                                <span style={styles.todayBtn} onClick={onNowTime}>Now</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-12 col-md-6 mb-3'>
                                <AdminInput {...register('userEmail', {
                                    onBlur: (e) => onBlur(e)
                                })} placeholder='Почта'/>
                            </Col>
                        </Row>

                        <Row>
                            <Col className='text-center'>
                                <AdminButton classname='green'>Создать</AdminButton>
                            </Col>
                        </Row>
                    </AdminForm>
                </AdminButtonCard>

                <AdminButtonCard classname='small_scroll'>
                    <Table>
                        <TableHeader elems={transInnerTableHeader} />
                        <TableBody>
                            <TableItem  />
                        </TableBody>
                    </Table>
                </AdminButtonCard>
        </>
    )
}

MakeTransactionInner.propTypes = {
    
}
MakeTransactionInner.defaultProps = {
    
}

export default MakeTransactionInner