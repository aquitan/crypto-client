import React, {useEffect} from 'react'
import {Container, Nav} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";
import {store} from "../../index";

const UserLayout = () => {
    const getDashboard = async () => {
        const res = await fetch('/api/dashboard/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({id: store.userId})
        })
        const data = await res.json()
        console.log('data', data)
    }
    useEffect(() => {
        getDashboard()
    }, [])
    return (
        <div className={'layout'}>
            <Container>
                <Nav>
                    <Link to='/profile'>Profile</Link>
                </Nav>
                <Outlet/>
            </Container>
        </div>
    )
}

export default UserLayout