import React, {useState} from 'react'
import PropTypes from 'prop-types'
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
import {postData} from "../../../../../services/StaffServices";

const MakeTransactionInner = () => {
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const {register, handleSubmit} = useForm()
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
        {value: 'Refil', text: 'Получение'},
        {value: 'Transfer', text: 'Отправка'},
    ]

    const onSubmit = async (data) => {
        data.date = moment(startDate).format('yyyy/MM/DD')
        data.time = moment(timeDate).format('hh:mm')
        const res = await postData('/123')
    }

    const onToday = () => {
        setStartDate(new Date())
    }
    const onNowTime = () => {
        let time = new Date()
        setTimeDate(time)
    }
    console.log('time', timeDate)
    return (
        <>
                <AdminButtonCard title='Internal transactions'>
                    <AdminForm onSubmit={handleSubmit(onSubmit)}>
                        <Row className='mb-3 flex-items'>
                            <Col className='col-12 col-lg-2 mb-3'>
                                <Select {...register('transaction')} classname={'admin-square'} options={actionType}/>
                            </Col>

                            <Col className='col-12 col-lg-2 mb-3'>
                                <Select {...register('currency')} classname={'admin-square'} options={optionsCurrency}/>
                            </Col>

                            <Col className='col-12 col-lg-2'>
                                <AdminInput {...register('sum')} placeholder='Сумма' />
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
                        <Row className='mb-3'>
                            <Col>
                                <AdminInput {...register('address')} placeholder='Адрес'/>
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