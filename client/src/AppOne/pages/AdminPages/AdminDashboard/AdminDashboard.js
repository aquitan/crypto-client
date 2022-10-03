import React, {useEffect, useState} from 'react'
import {Container, Row} from "react-bootstrap";
import cls from "../../../components/AppRouter/AppRouter.module.scss";
import {store} from "../../../../index";
import {postData} from "../../../services/StaffServices";

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
        store.setBot(res.data.data.telegrams.twoStepBot)
        setState(res.data.data)
    }

    return (
        <Container style={{color: '#fff'}} className={cls.app_continer}>
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
                : <h4 className='text-center my-4' style={{color: '#cecece'}}>Data not found</h4>
            }
        </Container>
    )
}

export default AdminDashboard