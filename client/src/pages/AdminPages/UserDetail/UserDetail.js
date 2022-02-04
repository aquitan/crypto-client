import React, {useEffect, useState} from 'react'
import UserDetailTab from "./components/UserDetailTab/UserDetailTab";
import {Container, Tab, Tabs} from "react-bootstrap";
import UserDetailTabInfo from "./components/UserDetailTabInfo/UserDetailTabInfo";
import cls from '../../../components/AppRouter/AppRouter.module.scss'
import UserDetailTabLogs from "./components/UserDetailTabLogs/UserDetailTabLogs";
import UserDetailTabAct from "./components/UserDetailTabAct/UserDetailTabAct";
import {store} from "../../../index";
import {useParams} from "react-router-dom";
import {getGeoData} from "../../../queries/getSendGeoData";
import {postData} from "../../../services/StaffServices";

const UserDetail = () => {

    const [userDetail, setUserDetails] = useState('')
    const [ipData, setIpData] = useState('')
    const [isPremium, setIsPremium] = useState(false)
    const params = useParams()

    const getAdminUsersDetail = async () => {
        const res = await fetch(`/api/staff/users/user_detail/${params.id}`)
        let geodata = await getGeoData()
        const data = await res.json()
        const {ipAddress} = geodata
        console.log('user data', data)

        if (data.status === 'complete') {
            const ipRes = await postData('/staff/ip_match_checker/', {ipAddress})
            console.log('ipRes', ipRes.data)
            setIpData(ipRes.data.matchList)
        }
        setUserDetails(data)
    }

    useEffect(() => {
        getAdminUsersDetail()
    }, [])



    return (
        <Container className={cls.app_continer}>
            <h2>user page</h2>
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
                <Tab eventKey="statistics" title="Статистика" >
                    <UserDetailTab num={4}/>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default UserDetail