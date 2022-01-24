import React, {useEffect} from 'react'
import UserDetailTab from "./components/UserDetailTab/UserDetailTab";
import {Container, Tab, Tabs} from "react-bootstrap";
import UserDetailTabInfo from "./components/UserDetailTabInfo/UserDetailTabInfo";
import cls from '../../../components/AppRouter/AppRouter.module.scss'
import UserDetailTabLogs from "./components/UserDetailTabLogs/UserDetailTabLogs";
import UserDetailTabAct from "./components/UserDetailTabAct/UserDetailTabAct";
import {store} from "../../../index";

const UserDetail = (props) => {

    const getAdminUsersDetail = async () => {
        const res = await fetch('/api/staff/users/user_detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({id: store.userId})
        })
        const data = await res.json()
        console.log('data user', data)
    }

    useEffect(() => {
        getAdminUsersDetail()
    }, [])

    return (
        <Container className={cls.app_continer}>
            <h2>user 1 page</h2>
            <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="info" title="Инфо">
                    <UserDetailTabInfo />
                </Tab>
                <Tab eventKey="logs" title="Логи">
                    <UserDetailTabLogs />
                </Tab>
                <Tab eventKey="actions" title="Действия" >
                    <UserDetailTabAct />
                </Tab>
                <Tab eventKey="statistics" title="Статистика" >
                    <UserDetailTab num={4}/>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default UserDetail