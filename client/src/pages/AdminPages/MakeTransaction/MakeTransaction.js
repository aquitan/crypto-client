import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import MakeTransactionOuter from "./componets/MakeTransactionOuter/MakeTransactionOuter";
import MakeTransactionInner from "./componets/MakeTransactionInner/MakeTransactionInner";
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../index";
import Preloader from "../../../components/UI/Preloader/Preloader";

const MakeTransaction = () => {
    const [history, setHistory] = useState()
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


    useEffect(() => {
        getTransactionHistory()
    }, [])

    const getTransactionHistory = async () => {
        // const res = await getData(`/staff/create_transaction/get_transaction_history/${store.user.id}`)
        // console.log('history', res.data)
        // setHistory(res.data.history)
    }

    return (
        <Container>
            <h1 className='mt-4'>Создать транзакцию</h1>

            <Tabs defaultActiveKey="outer" id="uncontrolled-tab-example" className="mb-3 mt-3">
                <Tab eventKey='outer' title='Regular transactions'>
                    <MakeTransactionOuter history={null} />
                </Tab>
                <Tab eventKey='inner' title='Internal transactions'>
                    <MakeTransactionInner history={null}  />
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