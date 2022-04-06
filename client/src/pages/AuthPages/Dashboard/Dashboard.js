import React, {useEffect} from 'react'
import {Container} from "react-bootstrap";
import {getData} from "../../../services/StaffServices";
import {store} from "../../../index";

const Dashboard = () => {
    const getDashboard = async () => {
        const res = await getData('/dashboard/')
        const data = await res.data
        console.log('data dashboard', data)
    }
    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <Container>
            <h2>Dashboard</h2>
            <span>Welcome!</span>
            <h5>{store.user.name ? store.user.name : store.userEmail}</h5>
        </Container>
    )
}

export default Dashboard