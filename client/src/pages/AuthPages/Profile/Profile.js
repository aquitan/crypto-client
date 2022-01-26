import React, {useEffect, useState} from 'react'
import {Container, Row, Tab, Tabs} from "react-bootstrap";
import MyAccount from "../MyAccount/MyAccount";
import AccountSecurity from "../AccountSecurity/AccountSecurity";
import KYC from "../KYC/KYC";
import {store} from "../../../index";
import {getGeoData} from "../../../queries/getSendGeoData";
import {useLocation} from "react-router-dom";

const Profile = () => {
    const [profileData, setProfileData] = useState('')
    const location = useLocation()

    const getProfile = async () => {
        let geodata =  await getGeoData()
        let userLocation = location.pathname.split(/[\\\/]/)
        geodata.userAction = userLocation[userLocation.length - 1]
        const res = await fetch(`/api/personal_area/profile/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(geodata)
        })
        const data = await res.json()

        setProfileData(data)
        console.log('dataProfile', data)
    }
    useEffect(() => {
        getProfile()
    }, [])

    if (!profileData) {
        return <h1>Loading</h1>
    }


    return (
        <Container>
            <h1>Profile</h1>
            <Row>
                <Tabs>
                    <Tab eventKey='profile' title='My Account'>
                        <MyAccount data={profileData.user}/>
                    </Tab>
                    <Tab eventKey='security' title='Security'>
                        <AccountSecurity/>
                    </Tab>
                    <Tab eventKey='kyc' title='Verification'>
                        <KYC status={''}/>
                    </Tab>
                </Tabs>

            </Row>
        </Container>
    )
}

export default Profile