import React, {useContext, useState} from 'react'
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {AuthContext} from "../../index";
import { NavLink } from "react-router-dom";
import cls from './NavBar.module.scss'
import {observer} from "mobx-react-lite";
import Dropdown from "../UI/Dropdown/Dropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import Notification from "../UI/Notification/Notification";

const NavBar = () => {
    const {store} = useContext(AuthContext)
    const [showNotif, setShowNotif] = useState(false)
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
                    <div style={{color: '#fff'}} className={cls.top}>
                        {window.location.host}
                    </div>
                </Navbar>

                <Navbar.Collapse className={`${cls.right_nav} justify-content-end`}>

                    <Nav style={{width: '100%'}}>
                        <Row style={{width: '100%'}}>
                            <Col>
                                <Notification bell={showNotif} />
                            </Col>
                            <Col>
                                <NavLink to={'/contact-us'}>Contact us</NavLink>
                            </Col>
                            <Col>
                                <Button onClick={onLogOut}>Logout</Button>
                            </Col>
                        </Row>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default observer(NavBar)