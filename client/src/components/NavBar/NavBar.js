import React, {useContext} from 'react'
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {AuthContext} from "../../index";
import { NavLink } from "react-router-dom";
import cls from './NavBar.module.scss'
import {observer} from "mobx-react-lite";
import Dropdown from "../UI/Dropdown/Dropdown";

const NavBar = () => {
    const {store} = useContext(AuthContext)
    console.log('store.isAdmin', store.isAdmin)
    const onLogOut = () => {
        store.logout()
    }


    return (
        <Navbar className={cls.navbar} bg='dark'>
            <Container>
                <Navbar>
                    <Nav>
                        <Dropdown />
                    </Nav>
                    {
                        store.isStaff ? <NavLink className={cls.link} to='/admin'>Staff</NavLink> : null
                    }
                </Navbar>

                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <NavLink to={'/contact-us'}>Contact us</NavLink>
                        <Button onClick={onLogOut}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default observer(NavBar)