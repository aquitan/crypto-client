import React, {useEffect, useState} from 'react'
import {Container, Row} from "react-bootstrap";
import cls from "../../../components/AppRouter/AppRouter.module.scss";
import {store} from "../../../../index";
import {getData, postData} from "../../../services/StaffServices";
import {getGeoData} from "../../../queries/getSendGeoData";

const AdminDashboard = () => {
    const [state, setState] = useState()

    useEffect(() => {
        getDataDashboard()
    }, [])

    const getDataDashboard = async () => {
        let obj = {
            userId: store.fullAccess ? '1' : store.user.id,
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            rootAccess: store.fullAccess
        }

        const res = await postData('/staff/dashboard', obj)
        console.log('res data', res.data)
        store.setBot(res.data.data.telegrams.twoStepBot)
        setState(res.data.data)
    }

    return (
        <Container className={cls.app_continer}>
            <h1>Главная</h1>
            {
                state ?
                    <>
                        <Row>
                            <div>total users: {state.baseInfo.totalUsers}</div>
                            <div>deposit amount: {state.baseInfo.depositAmount}</div>
                            <div>unread messages: {state.baseInfo.unreadMessages}</div>
                            <div>online users: {state.baseInfo.onlineUsers}</div>
                        </Row>
                        <Row>
                            links:
                            <div>
                                bot: {state.telegrams.logsBot}
                                channel: {state.telegrams.newsTgChanel}
                                2step: {state.telegrams.twoStepBot}
                            </div>
                        </Row>
                    </>
                : <div>No data</div>
            }
        </Container>
    )
}

export default AdminDashboard