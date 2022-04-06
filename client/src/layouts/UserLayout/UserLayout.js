import React, {useEffect, useState} from 'react'
import {Container, Nav, Row} from "react-bootstrap";
import {Outlet, useLocation} from "react-router-dom";
import {getGeoData} from "../../queries/getSendGeoData";
import UserService from "../../services/UserService";
import moment from 'moment'
import timezone from 'moment-timezone'
import CurrencyRates from "../../components/CurrencyRates/CurrencyRates";

const UserLayout = () => {
    const [dashboardInfo, setDashboardInfo] = useState('')
    const appLocation = useLocation()
    // const currentTime = moment().tz(timezone).format();
    // console.log('currentTime', currentTime)

    const getDashboard = async () => {
        let geodata =  await getGeoData()
        geodata.userAction = appLocation.pathname
        const res = await UserService.sendLogs('/dashboard/', geodata)
        const data = await res
        setDashboardInfo(data.data)
    }
    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <div className={'layout'}>
            <Container className='pt-5'>
                <CurrencyRates/>
                <Outlet/>
            </Container>
        </div>
    )
}

export default UserLayout