import React, {useContext} from 'react'
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../../index";
import {Link} from "react-router-dom";

const NavBar = () => {
    const {store} = useContext(AuthContext)
    const onLogOut = () => {
        store.logout()
    }

    return (
        <Navbar bg='dark'>
            <Container>
                <Navbar>
                    <Nav>
                        <Link to='/profile'>Profile</Link>
                    </Nav>
                    <Nav>
                        <Link to='/dashboard'>Dashboard</Link>
                    </Nav>
                    {
                        store.isAdmin ? <Link to='/staff'>Staff</Link> : null
                    }
                </Navbar>

                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <Button onClick={onLogOut}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default NavBar