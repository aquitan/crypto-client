import {useState} from 'react'
import Logo from '../UI/Logo/Logo'
import './LandingHeader.css'
import {observer} from "mobx-react-lite";
import {ThemeContext, useThemeContext} from "../../context/ThemeContext";
import {Col, Offcanvas, Row} from "react-bootstrap";
import Button from "../UI/Button/Button";
import {useNavigate} from "react-router-dom";
import Link from "../UI/Link/Link";
import ToggleCheckbox from "../UI/ToggleCheckbox/ToggleCheckbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import Preloader from "../UI/Preloader/Preloader";


const LandingHeader = ({state, openSidebar}) => {
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
                <Offcanvas.Header closeVariant={theme === 'light' ? null : 'white'} closeButton>
                    <Logo/>
                    <span style={{color: theme === 'dark' ? '#fff' : '#121318'}}>{state ? state.domainName : <Preloader />}</span>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row className='flex-column text-start mb-3'>
                        <Col>
                            <Link classnames={theme} href="#" value={'Market'}/>
                        </Col>
                        <Col>
                            <Link classnames={theme} href="#" value={'Watch list'}/>
                        </Col>
                        <Col>
                            <Link classnames={theme} href="#" value={'Portfolio'}/>
                        </Col>
                        <Col>
                            <Link classnames={theme} href="#" value={'Learn'}/>
                        </Col>
                    </Row>
                    <Row>
                        <div className='d-flex'>
                            <div className='d-flex'>
                                <Button classname={'btnGray'} onClick={() => navigate('/signin')}>
                                    Sign in
                                </Button>
                                <Button style={{marginLeft: 20}}  classname={'btnBlue'} onClick={() => navigate('/signup')}>
                                    Register
                                </Button>
                            </div>
                        </div>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
            <Row className='align-items-center justify-content-between'>
                <Col className='d-flex align-items-center'>
                    <Logo/>
                    <h4 className='domain_header'>
                        {state ? state.domainName : <Preloader />}
                    </h4>
                </Col>
                <Col className='d-flex d-xl-none justify-content-end'>
                    <ToggleCheckbox onChange={toggleTheme}/>
                    <div onClick={handleOpen} style={{cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </Col>

                <Col className='d-none d-xl-flex'>
                    <Link classnames={theme} href="#" value={'Market'}/>
                    <Link classnames={theme} href="#" value={'Watch list'}/>
                    <Link classnames={theme} href="#" value={'Portfolio'}/>
                    <Link classnames={theme} href="#" value={'Learn'}/>
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
                                Sign in
                            </Button>
                            <Button style={{marginLeft: 20}}  classname={'btnBlue'} onClick={() => navigate('/signup')}>
                                Register
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </header>
    )
}

export default observer(LandingHeader)