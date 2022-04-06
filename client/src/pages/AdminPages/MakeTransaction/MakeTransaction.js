import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import MakeTransactionOuter from "./componets/MakeTransactionOuter/MakeTransactionOuter";
import MakeTransactionInner from "./componets/MakeTransactionInner/MakeTransactionInner";

const MakeTransaction = () => {
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const {register, handleSubmit} = useForm()
    const trsType = [
        {value: 'Deposit', text: 'Депозит'},
        {value: 'Withdraw', text: 'Вывод'}
    ]
    const actionType = [
        {value: 'Пополнение', text: 'Пополнение'},
        {value: 'Внутренний перевод', text: 'Внутренний перевод'},
    ]

    const onSubmit = (data) => {
        data.date = moment(startDate).format('yyyy/MM/DD')
        data.time = moment(timeDate).format('hh:mm')
        console.log('data', data)
    }

    return (
        <Container>
            <h1 className='mt-4'>Создать транзакцию</h1>

            <Tabs defaultActiveKey="outer" id="uncontrolled-tab-example" className="mb-3 mt-3">
                <Tab eventKey='outer' title='Внешние транзацкии'>
                    <MakeTransactionOuter />
                </Tab>
                <Tab eventKey='inner' title='Внутренние транзацкии'>
                    <MakeTransactionInner />
                </Tab>
            </Tabs>

        </Container>
    )
}

MakeTransaction.propTypes = {

}
MakeTransaction.defaultProps = {

}

export default MakeTransaction