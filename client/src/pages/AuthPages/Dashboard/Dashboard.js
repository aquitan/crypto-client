import React, {useEffect} from 'react'
import {Container} from "react-bootstrap";

const Dashboard = () => {
    const getDashboard = async () => {
        const res = await fetch('/api/dashboard/')
        const data = await res.json()
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