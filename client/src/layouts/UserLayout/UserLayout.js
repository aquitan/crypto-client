import React, {useEffect, useState} from 'react'
import {Container, Nav, Row} from "react-bootstrap";
import {Link, Outlet, useLocation} from "react-router-dom";
import {store} from "../../index";
import {getGeoData} from "../../queries/getSendGeoData";

const UserLayout = () => {
    const [dashboardInfo, setDashboardInfo] = useState('')
    const appLocation = useLocation()

    const getDashboard = async () => {
        let geodata =  await getGeoData()
        geodata.userAction = appLocation.pathname
        const res = await fetch('/api/dashboard/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({id: store.userId})
        })
        const data = await res.json()
        setDashboardInfo(data)
        console.log('data', data)
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
                            {
                                dashboardInfo.name ? ' ' + dashboardInfo.name : ' ' + dashboardInfo.email
                            }

                        </h3>
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