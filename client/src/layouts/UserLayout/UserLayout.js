import React, {useEffect, useState} from 'react'
import {Container, Nav, Row} from "react-bootstrap";
import {Link, Outlet, useLocation} from "react-router-dom";
import {getGeoData} from "../../queries/getSendGeoData";
import UserService from "../../services/UserService";

const UserLayout = () => {
    const [dashboardInfo, setDashboardInfo] = useState('')
    const appLocation = useLocation()

    const getDashboard = async () => {
        let geodata =  await getGeoData()
        geodata.userAction = appLocation.pathname

        const res = await UserService.sendLogs('/dashboard/', geodata)

        const data = await res
        setDashboardInfo(data.data)
        console.log('data dashboard', data)
    }
    useEffect(() => {
        getDashboard()
    }, [])
    return (
        <div className={'layout'}>
            <Container>
                <Nav>
                    <Row>
                        <h3>
                            Hello
                        </h3>
                        {
                            dashboardInfo.name ? ' ' + dashboardInfo.name : ' ' + dashboardInfo.email
                        }
                    </Row>
                    <br/>
                    <Row>
                        <Link to='/profile'>Profile</Link>
                    </Row>
                </Nav>
                <Outlet/>
            </Container>
        </div>
    )
}

export default UserLayout