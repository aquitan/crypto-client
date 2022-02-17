import React, {useEffect, useState} from 'react'
import {Container, Row, Tab, Tabs} from "react-bootstrap";
import MyAccount from "../MyAccount/MyAccount";
import AccountSecurity from "../AccountSecurity/AccountSecurity";
import KYC from "../KYC/KYC";
import {getGeoData} from "../../../queries/getSendGeoData";
import {useLocation} from "react-router-dom";
import {postData} from "../../../services/StaffServices";

const Profile = () => {
    const [profileData, setProfileData] = useState('')
    const location = useLocation()

    console.log('state profile', profileData)
    const getProfile = async () => {
        let geodata =  await getGeoData()
        let userLocation = location.pathname.split(/[\\\/]/)
        if (geodata) geodata.userAction = userLocation[userLocation.length - 1]

        const res = await postData('/personal_area/profile/', geodata)
        const data = await res.data

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
                        <MyAccount data={profileData?.user}/>
                    </Tab>
                    <Tab eventKey='security' title='Security'>
                        <AccountSecurity data={profileData?.user}/>
                    </Tab>
                    <Tab eventKey='kyc' title='Verification'>
                        <KYC status={profileData?.user}/>
                    </Tab>
                </Tabs>

            </Row>
        </Container>
    )
}

export default Profile