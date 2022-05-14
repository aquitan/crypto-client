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
import {
    faColumns,
    faCreditCard, faDonate, faExchangeAlt,
    faHeadset, faMoneyCheck,
    faPhoneVolume,
    faShieldAlt,
    faSync, faUserLock
} from "@fortawesome/free-solid-svg-icons";
import BurgerMenu from "../UI/BurgerMenu/BurgerMenu";
import UserSidebar from "../UserSidebar/UserSidebar";

const NavBar = () => {
    const [state, setState] = useState(false)
    const navigate = useNavigate()
    const {store} = useContext(AuthContext)
    console.log('store.isAdmin', store.isAdmin)
    const onLogOut = () => {
        store.logout()
        navigate('/')
    }

    const openMenu = () => {
        setState(true)
    }
    const onCloseMenu = () => {
        setState(false)
    }

    return (
        <Navbar className={cls.navbar} bg='dark'>
            <Container style={{minHeight: 50}}>

                <BurgerMenu onHandleClick={openMenu}/>
                <UserSidebar active={state ? 'activeSidebar' : ''} onClick={onCloseMenu} >
                    <div style={{color: '#fff', fontWeight: 'bold', fontSize: 22, marginBottom: 30}} className={cls.top}>
                        <NavLink to={'/'}>{store.domain.domainName}</NavLink>
                    </div>
                    <NavLink className={cls.link} to={'/'}>
                        <FontAwesomeIcon icon={faColumns} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink className={cls.link} to={'/deposit'}>
                        <FontAwesomeIcon icon={faDonate} />
                        <span>Deposit</span>
                    </NavLink>
                    <NavLink className={cls.link} to={'/withdraw'}>
                        <FontAwesomeIcon icon={faMoneyCheck} />
                        <span>Withdraw</span>
                    </NavLink>
                    <NavLink className={cls.link} to={'/internal-addresses'}>
                        <FontAwesomeIcon icon={faExchangeAlt} />
                        <span>Internal Transfers</span>
                    </NavLink>

                    <NavLink className={cls.link} to={'/profile'}>
                        <FontAwesomeIcon icon={faCreditCard} />
                        <span>Profile</span>
                    </NavLink>
                    <NavLink className={cls.link} to={'/internal-swap'}>
                        <FontAwesomeIcon icon={faSync} />
                        <span>Currency Swap</span>
                    </NavLink>
                    <NavLink className={cls.link} to={'/support'}>
                        <FontAwesomeIcon icon={faHeadset} />
                        <span>Support</span>
                    </NavLink>
                    <NavLink className={cls.link} to={'/secure-deal'}>
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <span>Secure Deal</span>
                    </NavLink>
                    <NavLink className={cls.link} to={'/news'}>
                        <FontAwesomeIcon icon={faShieldAlt} />
                        <span>News</span>
                    </NavLink>
                    {
                        store.isStaff || store.fullAccess || store.isAdmin ?
                            <NavLink className={cls.link} to='/admin'>
                                <FontAwesomeIcon icon={faUserLock} />
                                <span>Staff</span>
                            </NavLink>
                            : null
                    }
                    <CurrencyRates />
                </UserSidebar>

                <div className={cls.navWrap}>
                    <Navbar>
                        <div style={{color: '#fff', fontWeight: 'bold', fontSize: 22}} className={cls.top}>
                            <NavLink to={'/'}>{store.domain.domainName}</NavLink>
                        </div>
                    </Navbar>

                    <Navbar className={`${cls.right_nav} justify-content-end`}>
                        <Nav style={{width: '100%'}}>
                            <div className={cls.navbar_links} style={{width: '100%'}}>
                                <Dropdown />
                                <NavLink className={cls.link} to={'/'}>Dashboard</NavLink>
                                <NavLink className={cls.link} to={'/profile'}>Profile</NavLink>
                                <NavLink className={cls.link} to={'/internal-swap'}>Currency Swap</NavLink>
                                <NavLink className={cls.link} to={'/support'}>Support</NavLink>
                                <NavLink className={cls.link} to={'/secure-deal'}>Secure Deal</NavLink>
                                <NavLink className={cls.link} to={'/news'}>News</NavLink>
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
                    </Navbar>
                </div>

            </Container>
        </Navbar>
    )
}

export default observer(NavBar)