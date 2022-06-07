import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import MakeTransactionOuter from "./componets/MakeTransactionOuter/MakeTransactionOuter";
import MakeTransactionInner from "./componets/MakeTransactionInner/MakeTransactionInner";
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import Preloader from "../../../components/UI/Preloader/Preloader";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";

const MakeTransaction = () => {
    const [history, setHistory] = useState()
    const [startDate, setStartDate] = useState()
    const [timeDate, setTimeDate] = useState()
    const [totalCount, setTotalCount] = useState(0)
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
        let obj = {
            staffId: store.fullAccess? '1' : store.user.id,
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            skipValue: 3,
            limitValue: 10
        }
        const res = await postData(`/staff/create_transaction/get_transaction_history/`, obj)
        console.log('history', res.data.history.length)
        setHistory(res.data.history)
    }

    return (
        <Container>
            <AdminButtonCard>
                <h1 className='text-center'>Создать транзакцию</h1>
            </AdminButtonCard>

            <Tabs defaultActiveKey="outer" id="uncontrolled-tab-example" className="mb-3 mt-3">
                <Tab eventKey='outer' title='Regular transactions'>
                    <MakeTransactionOuter history={history} />
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