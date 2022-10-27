import React, {useEffect, useState} from 'react'
import {Container, Tab, Tabs} from "react-bootstrap";
import {useForm} from "react-hook-form";
import moment from "moment";
import MakeTransactionOuter from "./componets/MakeTransactionOuter/MakeTransactionOuter";
import MakeTransactionInner from "./componets/MakeTransactionInner/MakeTransactionInner";
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import Preloader from "../../../components/UI/Preloader/Preloader";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";

const MakeTransaction = () => {
    const [limit, setLimit] = useState(0)
    const [history, setHistory] = useState()


    const getTransactionHistory = async () => {
        let obj = {
            staffId: store.fullAccess? '1' : store.user.id,
            isAdmin: store.isAdmin,
            rootAccess: store.fullAccess,
            skipValue: limit,
            limitValue: 10
        }
        const res = await postData(`/staff/create_transaction/get_transaction_history/`, obj)
        setHistory(res.data.history)
    }

    useEffect(() => {
        getTransactionHistory()
    }, [limit])

    const callMore = () => {
        setLimit(prevState => prevState+1)
    }
    const callLess = () => {
        setLimit(prevState => prevState-1)
    }
    

    return (
        <Container>
            <AdminButtonCard>
                <h1 className='text-center'>Создать транзакцию</h1>
            </AdminButtonCard>

            <Tabs defaultActiveKey="outer" id="uncontrolled-tab-example" className="mb-3 mt-3">
                <Tab eventKey='outer' title='Regular transactions'>
                    <MakeTransactionOuter history={history} limit={limit} callLess={callLess} callMore={callMore} />
                </Tab>
                <Tab eventKey='inner' title='Internal transactions'>
                    <MakeTransactionInner history={history} limit={limit} callLess={callLess} callMore={callMore} />
                </Tab>
            </Tabs>

        </Container>
    )
}

export default MakeTransaction