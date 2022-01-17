import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const Profile = () => {
    return (
        <Container>
            <h1>Profile</h1>
            <Row>
                <Col>
                    <Link to='/my-account'>My Account</Link>
                </Col>
                <Col>
                    <Link to='/account-security'>Account Security</Link>
                </Col>
                <Col>
                    <Link to='/kyc'>KYC</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile