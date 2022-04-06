import React, {useContext, useState} from 'react'
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {AuthContext} from "../../index";
import {NavLink, useNavigate} from "react-router-dom";
import cls from './NavBar.module.scss'
import {observer} from "mobx-react-lite";
import Dropdown from "../UI/Dropdown/Dropdown";
import Notification from "../UI/Notification/Notification";
import Button from "../UI/Button/Button";
import CurrencyRates from "../CurrencyRates/CurrencyRates";

const NavBar = () => {
    const navigate = useNavigate()
    const {store} = useContext(AuthContext)
    console.log('store.isAdmin', store.isAdmin)
    const onLogOut = () => {
        store.logout()
        navigate('/')
    }

    console.log('store nav', store)

    return (
        <Navbar className={cls.navbar} bg='dark'>
            <Container>
                <Navbar>
                    <div style={{color: 'green', fontWeight: 'bold', fontSize: 22}} className={cls.top}>
                        {store.domain.domain_name}
                    </div>
                </Navbar>

                <Navbar.Collapse className={`${cls.right_nav} justify-content-end`}>
                    <Nav style={{width: '100%'}}>
                        <Row style={{width: '100%'}}>
                            <Col>
                                <Dropdown />
                            </Col>
                            <Col>
                                {
                                    store.isStaff || store.fullAccess || store.isAdmin ? <NavLink className={cls.link} to='/admin'>Staff</NavLink> : null
                                }
                            </Col>
                            <Col>
                                <Notification />
                            </Col>
                            <Col>
                                <NavLink to={'/contact-us'}>Contact us</NavLink>
                            </Col>
                            <Col>
                                <Button classname='small' onClick={onLogOut}>Logout</Button>
                            </Col>
                        </Row>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default observer(NavBar)