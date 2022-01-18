import React from 'react'
import {Container, Nav} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";

const UserLayout = () => {
    return (
        <div className={'layout'}>
            <Container>
                <Nav>
                    <Link to='/dashboard/profile'>Profile</Link>
                </Nav>
                <Outlet/>
            </Container>
        </div>
    )
}

export default UserLayout