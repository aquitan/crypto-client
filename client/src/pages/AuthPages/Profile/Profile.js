import React, {useEffect, useState} from 'react'
import {Container, Row, Tab, Tabs} from "react-bootstrap";
import MyAccount from "../MyAccount/MyAccount";
import AccountSecurity from "../AccountSecurity/AccountSecurity";
import KYC from "../KYC/KYC";
import {getGeoData} from "../../../queries/getSendGeoData";
import {useLocation} from "react-router-dom";
import {postData} from "../../../services/StaffServices";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {store} from "../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";

const Profile = () => {
    const [profileData, setProfileData] = useState()
    const [state, setState] = useState(false)
    const location = useLocation()

    const getProfile = async () => {
        let geodata =  await getGeoData()
        geodata.currentDate = getCurrentDate(dateToTimestamp())
        geodata.domainName = window.location.host
        delete geodata.id
        delete geodata.email
        geodata.userId = store.user.id
        geodata.userEmail = store.userEmail
        let userLocation = location.pathname.split(/[\\\/]/)
        if (geodata) geodata.userAction = userLocation[userLocation.length - 1]

        console.log('dataProfile', geodata)
        const res = await postData('/personal_area/profile/', geodata)
        setProfileData(res.data)
        const data = await res.data
        setProfileData(data)

    }

    const checkPromocodeProfile = async () => {
        const obj = {
            domainName: window.location.host
        }
        const res = await postData('/get_promocodes_before_signup/', obj)
        setState(res.data.promocode)
    }

    useEffect(() => {
        getProfile()
        checkPromocodeProfile()
    }, [])

    if (!profileData) {
        return <h1>Loading</h1>
    }

    console.log('profile-user', profileData)

    return (
        <Container>
            <h1>Profile</h1>
            <Tabs>
                <Tab eventKey='profile' title='My Account'>
                    <MyAccount promocode={state} data={profileData?.user}/>
                </Tab>
                <Tab eventKey='security' title='Security'>
                    <AccountSecurity data={profileData?.user}/>
                </Tab>
                <Tab eventKey='kyc' title='Verification'>
                    <KYC status={profileData?.user}/>
                </Tab>
            </Tabs>
            <ButtonCard>

            </ButtonCard>
        </Container>
    )
}

export default Profile