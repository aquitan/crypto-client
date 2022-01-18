import React, {useContext} from 'react'
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../../index";
import { NavLink } from "react-router-dom";
import cls from './NavBar.module.scss'

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
                        <NavLink className={cls.link} to='/dashboard'>Dashboard</NavLink>
                    </Nav>
                    {
                        store.isAdmin ? <NavLink className={cls.link} to='/admin'>Staff</NavLink> : null
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