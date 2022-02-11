import React, {useEffect} from 'react'
import {Container} from "react-bootstrap";
import {getData} from "../../../services/StaffServices";

const Dashboard = () => {
    const getDashboard = async () => {
        const res = await getData('/dashboard/')
        const data = await res.data
        console.log('data', data)
    }
    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <Container>
            <h2>Dashboard</h2>
        </Container>
    )
}

export default Dashboard