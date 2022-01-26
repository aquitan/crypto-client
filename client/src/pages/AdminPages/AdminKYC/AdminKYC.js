import React, {useEffect} from 'react'
import {Container} from "react-bootstrap";
import {getGeoData} from "../../../queries/getSendGeoData";
import {store} from "../../../index";

const AdminKYC = () => {

    const getStaffKyc = async () => {
        const userData = {
            isAdmin: store.isAdmin,
            isStaff: store.isStaff,
            domainName: window.location.host
        }

        const res = await fetch(`/api/staff/users/kyc/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(userData)
        })
        const data = await res.json()

        console.log('dataProfile', data)
    }

    useEffect(() => {
        getStaffKyc()
    }, [])

    return (
        <Container>
            <h1>Kyc</h1>
        </Container>
    )
}

export default AdminKYC