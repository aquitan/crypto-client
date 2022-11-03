import React, {useEffect, useState} from 'react'
import {Container, Tab, Tabs} from "react-bootstrap";
import UserDetailTabInfo from "./components/UserDetailTabInfo/UserDetailTabInfo";
import cls from '../../../components/AppRouter/AppRouter.module.scss'
import UserDetailTabLogs from "./components/UserDetailTabLogs/UserDetailTabLogs";
import UserDetailTabAct from "./components/UserDetailTabAct/UserDetailTabAct";
import {useParams} from "react-router-dom";
import {getGeoData} from "../../../queries/getSendGeoData";
import {getData, postData} from "../../../services/StaffServices";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";

const UserDetail = () => {

    const [userDetail, setUserDetails] = useState('')
    const [ipData, setIpData] = useState('')
    const [isPremium, setIsPremium] = useState(false)
    const params = useParams()

    const getAdminUsersDetail = async () => {
        const res = await getData(`/staff/users/user_detail/${params.id}`)
        let geodata = await getGeoData()
        const data = await res.data
        const {ipAddress} = geodata

        if (data.message === 'ok') {
            const ipRes = await postData('/staff/ip_match_checker/', {ipAddress})
            setIpData(ipRes.data.matchList)
        }
        setUserDetails(data)
    }

    const getLogs = async () => {
        
        
        
    }

    useEffect(() => {
        getAdminUsersDetail()
        getLogs()
    }, [])

    return (
        <Container className={cls.app_continer}>
            <AdminButtonCard>
                <h1 className={'text-center'}>Детальная страница пользователя</h1>
            </AdminButtonCard>
            <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3 mt-3">
                <Tab eventKey="info" title="Инфо">
                    <UserDetailTabInfo data={userDetail} />
                </Tab>
                <Tab eventKey="logs" title="Логи">
                    <UserDetailTabLogs data={userDetail.user} />
                </Tab>
                <Tab eventKey="actions" title="Действия" >
                    {
                        userDetail ? <UserDetailTabAct isPremium={isPremium} data={userDetail.user} ipData={ipData} /> : null
                    }
                </Tab>
            </Tabs>
        </Container>
    )
}

export default UserDetail