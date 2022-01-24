import React, {useEffect, useState} from 'react'
import {Container, Row, Tab, Tabs} from "react-bootstrap";
import MyAccount from "../MyAccount/MyAccount";
import AccountSecurity from "../AccountSecurity/AccountSecurity";
import KYC from "../KYC/KYC";
import {store} from "../../../index";

const Profile = () => {
    const [kycStatus, setKycStatus] = useState('')
    const [profileData, setProfileData] = useState('')
    const getProfile = async () => {
        const res = await fetch('/api/personal_area/profile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({id: parseInt(store.userId)})
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
                        <MyAccount data={profileData}/>
                    </Tab>
                    <Tab eventKey='security' title='Security'>
                        <AccountSecurity/>
                    </Tab>
                    <Tab eventKey='kyc' title='Verification'>
                        <KYC status={kycStatus}/>
                    </Tab>
                </Tabs>

            </Row>
        </Container>
    )
}

export default Profile