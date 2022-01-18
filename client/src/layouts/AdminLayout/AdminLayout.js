import React from 'react'
import {Container, Nav} from "react-bootstrap";
import {NavLink, Outlet } from "react-router-dom";
import cls from './AdminLayout.module.scss'

const AuthLayout = () => {
    return (
        <div className={`${cls.layout} bg-dark`}>
            <Container>
                    <Nav>
                        <NavLink to='/admin/users'>Users</NavLink>
                        <NavLink to='/admin/admin-kyc'>Kyc</NavLink>
                        <NavLink to='/admin/main'>Dashboard</NavLink>
                    </Nav>
                    <Outlet/>

            </Container>
        </div>
    )
}

export default AuthLayout