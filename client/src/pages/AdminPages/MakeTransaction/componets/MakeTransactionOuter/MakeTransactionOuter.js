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
import {postData} from "../../../../../services/StaffServices";

const MakeTransactionOuter = () => {
    const [startDate, setStartDate] = useState()
    const [defaultDate, setDefaultDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const {register, handleSubmit} = useForm()
    const styles = {
        todayBtn: {
            position: 'absolute',
            backgroundColor: '#444',
            paddingLeft: 10,
            top: 3,
            right: 20,
            borderLeft: '1px solid #fff',
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

    return (
        <>
                <AdminButtonCard title='Внешние транзакции'>
                    <AdminForm onSubmit={handleSubmit(onSubmit)}>
                        <Row className='mb-3 flex-items'>
                            <Col className='col-12 col-lg-2'>
                                <Select {...register('transaction')} options={trsType} classname='small'/>
                            </Col>

                            <Col className='col-12 col-lg-2'>
                                <Select {...register('currency')} options={optionsCurrency} classname='small'/>
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
                            <Col className='col-12 col-lg-2'>
                                <AdminInput {...register('sum')} classname='small_input' placeholder='Сумма' />
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <AdminInput {...register('address')} classname='small_input' placeholder='Адрес'/>
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
                    <Table>
                        <TableHeader elems={transTableHeader} />
                        <TableBody>
                            <TableItem  />
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