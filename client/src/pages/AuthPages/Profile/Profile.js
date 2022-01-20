import React, {useState} from 'react'
import {Container, Row, Tab, Tabs} from "react-bootstrap";
import MyAccount from "../MyAccount/MyAccount";
import AccountSecurity from "../AccountSecurity/AccountSecurity";
import KYC from "../KYC/KYC";

const Profile = () => {
    const [kycStatus, setKycStatus] = useState('')

    return (
        <Container>
            <h1>Profile</h1>
            <Row>
                <Tabs>
                    <Tab eventKey='profile' title='My Account'>
                        <MyAccount/>
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