import React, {useEffect, useState} from 'react'
import {Container, Row} from "react-bootstrap";
import cls from "../../../components/AppRouter/AppRouter.module.scss";
import {store} from "../../../../index";
import {postData} from "../../../services/StaffServices";
import AdminButtonCard from '../../../components/AdminButtonCard/AdminButtonCard';
import UsersInfoCard from '../Users/components/UsersInfoCard/UsersInfoCard';

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
            <AdminButtonCard>
                <h1 className={'text-center'}>Главная</h1>
            </AdminButtonCard>
            {
                state ?
                    <>
                        <AdminButtonCard>
                            <Row className={'flex-wrap'}>
                                <UsersInfoCard color={'blue'} type={'Total users:'} amount={state.baseInfo.totalUsers} />
                                <UsersInfoCard color={'green'} type={'Deposit amount:'} amount={state.baseInfo.depositAmount} />
                                <UsersInfoCard color={'red'} type={'Unread messages:'} amount={state.baseInfo.unreadMessages} />
                                <UsersInfoCard color={'orange'} type={'Online:'} amount={state.baseInfo.onlineUsers} />
                            </Row>
                        </AdminButtonCard>
                        <AdminButtonCard>
                            <Row className={'flex-wrap'}>
                                <UsersInfoCard color={'blue'} type={'Total users:'} amount={state.telegrams.logsBot} />
                                <UsersInfoCard color={'blue'} type={'Deposit amount:'} amount={state.telegrams.newsTgChanel} />
                                <UsersInfoCard color={'blue'} type={'Two step:'} amount={state.telegrams.twoStepBot} />
                            </Row>
                        </AdminButtonCard>
                    </>
                : <h4 className='text-center my-4' style={{color: '#cecece'}}>Data not found</h4>
            }
        </Container>
    )
}

export default AdminDashboard