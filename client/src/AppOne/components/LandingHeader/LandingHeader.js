import React, {useState} from 'react'
import Logo from '../UI/Logo/Logo'
import './LandingHeader.css'
import {observer} from "mobx-react-lite";
import {ThemeContext, useThemeContext} from "../../context/ThemeContext";
import {Col, Offcanvas, Row} from "react-bootstrap";
import Button from "../UI/Button/Button";
import {NavLink, useNavigate} from 'react-router-dom';
import Link from "../UI/Link/Link";
import ToggleCheckbox from "../UI/ToggleCheckbox/ToggleCheckbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import Preloader from "../UI/Preloader/Preloader";


const LandingHeader = ({state, openSidebar, hideLinks}) => {
    const {theme, toggleTheme} = useThemeContext(ThemeContext)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const handleOpen = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    return (
        <header className='landing_header'>
            <Offcanvas placement='end' style={{backgroundColor: theme === 'light' ? '#fff' : '#121318'}} show={show} onHide={handleClose}>
                <Offcanvas.Header style={{justifyContent: 'flex-start', marginTop: 20}} closeVariant={theme === 'light' ? null : 'white'} closeButton>
                    <NavLink style={{marginRight: 20}} to={'/'}><Logo/></NavLink>
                    <NavLink to={'/'}><span style={{color: theme === 'dark' ? '#fff' : 'grey'}}>{state ? state.domainName : <Preloader />}</span></NavLink>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className='flex-column text-start mb-3'>
                        <Col>
                            <Link classnames={theme} onClick={() => setShow(false)} href="/#features" value={'Features'}/>
                        </Col>
                        <Col>
                            <Link classnames={theme} onClick={handleClose}  href="/#services" value={'Services'}/>
                        </Col>
                        <Col>
                            <Link classnames={theme} onClick={handleClose}  href="/#trading" value={'Crypto Trading'}/>
                        </Col>
                        <Col>
                            <Link classnames={theme} onClick={handleClose}  nav={true} href="/contact-us" value={'Contact Us'}/>
                        </Col>
                    </Row>
                    <Row>
                        <div className='d-flex'>
                            <div className='d-flex'>
                                <Button classname={'btnGray'} onClick={() => navigate('/signin')}>
                                    Sign In
                                </Button>
                                <Button style={{marginLeft: 20}}  classname={'btnBlue'} onClick={() => navigate('/signup')}>
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <Row className='align-items-center justify-content-between'>
                <Col className='d-flex align-items-center'>
                    <NavLink to={'/'}><Logo/></NavLink>
                    <NavLink to={'/'}>
                        <h4 className='domain_header'>
                            {state ? state.domainName : <Preloader />}
                        </h4>
                    </NavLink>
                </Col>
                <Col className='d-flex d-xl-none justify-content-end'>
                    <div onClick={toggleTheme} style={{cursor: 'pointer', marginRight: 10}}>
                        {
                            theme === 'light' ? <FontAwesomeIcon icon={faMoon} size='lg' /> : <FontAwesomeIcon icon={faSun} size='lg' color={'orange'}/>
                        }
                    </div>
                    <div onClick={handleOpen} style={{cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </Col>

                <Col className='d-none d-xl-flex'>
                    <Link classnames={theme} href="/#features" value={'Features'}/>
                    <Link classnames={theme} href="/#services" value={'Services'}/>
                    <Link classnames={theme} href="/#trading" value={'Crypto Trading'}/>
                    <Link classnames={theme} nav={true} href="/contact-us" value={'Contact Us'}/>
                </Col>
                
                <Col className='d-none d-xl-flex justify-content-end'>
                    <div className='d-flex justify-content-end align-items-center'>
                        <div>
                            <div onClick={toggleTheme} style={{cursor: 'pointer'}}>
                                {
                                    theme === 'light' ? <FontAwesomeIcon icon={faMoon} size='lg' /> : <FontAwesomeIcon icon={faSun} size='lg' color={'orange'}/>
                                }
                            </div>
                        </div>
                        <div className='d-flex justify-content-end align-items-center'>
                            <Button style={{marginLeft: 20}} classname={'btnGray'} onClick={() => navigate('/signin')}>
                                Sign In
                            </Button>
                            <Button style={{marginLeft: 20}}  classname={'btnBlue'} onClick={() => navigate('/signup')}>
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </header>
    )
}

export default observer(LandingHeader)