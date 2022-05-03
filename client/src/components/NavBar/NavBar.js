import React, {useContext, useState} from 'react'
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {AuthContext} from "../../index";
import {NavLink, useNavigate} from "react-router-dom";
import cls from './NavBar.module.scss'
import {observer} from "mobx-react-lite";
import Dropdown from "../UI/Dropdown/Dropdown";
import Notification from "../UI/Notification/Notification";
import Button from "../UI/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CurrencyRates from "../CurrencyRates/CurrencyRates";
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const navigate = useNavigate()
    const {store} = useContext(AuthContext)
    console.log('store.isAdmin', store.isAdmin)
    const onLogOut = () => {
        store.logout()
        navigate('/')
    }

    return (
        <Navbar className={cls.navbar} bg='dark'>
            <Container>
                <Navbar>
                    <div style={{color: '#fff', fontWeight: 'bold', fontSize: 22}} className={cls.top}>
                        {store.domain.domain_name}
                        domain-name
                    </div>
                </Navbar>

                <Navbar.Collapse className={`${cls.right_nav} justify-content-end`}>
                    <Nav style={{width: '100%'}}>
                        <div className={cls.navbar_links} style={{width: '100%'}}>
                            <Dropdown />
                            {
                                store.isStaff || store.fullAccess || store.isAdmin ? <NavLink className={cls.link} to='/admin'>Staff</NavLink> : null
                            }
                            <div className='me-2'>
                                <Notification />
                            </div>
                            <div className='d-none d-md-block m-2'>
                                <NavLink to={'/contact-us'}>
                                    <FontAwesomeIcon className={cls.navbar_icon} icon={faPhoneVolume} />
                                </NavLink>
                            </div>
                            <Button classname='logout' onClick={onLogOut}>Logout</Button>
                        </div>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default observer(NavBar)