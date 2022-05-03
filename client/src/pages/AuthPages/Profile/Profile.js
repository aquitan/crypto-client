import React, {useEffect, useState} from 'react'
import {Container, Row, Tab, Tabs} from "react-bootstrap";
import MyAccount from "../MyAccount/MyAccount";
import AccountSecurity from "../AccountSecurity/AccountSecurity";
import KYC from "../KYC/KYC";
import {getGeoData} from "../../../queries/getSendGeoData";
import {useLocation} from "react-router-dom";
import {postData} from "../../../services/StaffServices";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";

const Profile = () => {

    const testUser = {
        name: 'user',
        data: {
            email: 'user@email.com',
            ip_address: '123123123'
        }
    }


    // const [profileData, setProfileData] = useState('')
    const [profileData, setProfileData] = useState(testUser)
    const [state, setState] = useState(false)
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