import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import AdminInput from "../../../components/UI/AdminInput/AdminInput";
import Select from "../../../components/UI/Select/Select";
import {optionsCurrency, transTableHeader} from "../../../utils/staffConstants";
import DatePickert from "react-datepicker";
import AdminButton from "../../../components/UI/AdminButton/AdminButton";
import {useForm} from "react-hook-form";
import AdminForm from "../../../components/UI/AdminForm/AdminForm";
import moment from "moment";
import Table from "../../../components/UI/Table/Table";
import TableHeader from "../../../components/UI/Table/components/TableHeader/TableHeader";
import TableBody from "../../../components/UI/Table/components/TableBody/TableBody";
import TableItem from "../../../components/UI/Table/components/TableItem/TableItem";
import DatePickerCustom from "../../../components/UI/DatePickerCustom/DatePickerCustom";

const MakeTransaction = () => {
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const {register, handleSubmit} = useForm()
    const trsType = [
        {value: 'Deposit', text: 'Депозит'},
        {value: 'Withdraw', text: 'Вывод'}
    ]

    const onSubmit = (data) => {
        data.date = moment(startDate).format('yyyy/MM/DD')
        data.time = moment(timeDate).format('hh:mm')
        console.log('data', data)
    }

    return (
        <Container>
            <h1 className='mt-4'>Создать транзакцию</h1>
            <AdminButtonCard>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <Row className='mb-3'>
                        <Col>
                            <Select {...register('currency')} options={optionsCurrency} classname='small'/>
                        </Col>
                        <Col>
                            <Select {...register('type')} options={trsType} classname='small'/>
                        </Col>
                        <Col>
                            <Select {...register('transaction')} options={trsType} classname='small'/>
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
                            <DatePickert required
                                         customInput={<DatePickerCustom/>}
                                         placeholderText='Время'
                                         selected={timeDate}
                                         showTimeSelect
                                         showTimeSelectOnly
                                         timeIntervals={1}
                                         timeCaption="Время"
                                         timeFormat="HH:mm "
                                         onChange={(time) => setTimeDate(time)} />
                        </Col>
                        <Col>
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
        </Container>
    )
}

MakeTransaction.propTypes = {

}
MakeTransaction.defaultProps = {

}

export default MakeTransaction