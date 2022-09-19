import {useContext, useState} from 'react'
import {Col, Container, Nav, Navbar, Offcanvas, Row} from "react-bootstrap";
import {AuthContext} from "../../../index";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Button from "../UI/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faChartBar, faMoon, faSun, faUserLock, faWallet
} from '@fortawesome/free-solid-svg-icons';
import Logo from "../UI/Logo/Logo";import {ThemeContext, useThemeContext} from "../../context/ThemeContext";
import Preloader from "../UI/Preloader/Preloader";
import Notification from '../UI/Notification/Notification';

const NavBar = () => {
    const {theme, toggleTheme} = useThemeContext(ThemeContext)
    const [state, setState] = useState(false)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const {store} = useContext(AuthContext)

    const handleOpen = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }


    return (

        <>
            <Navbar style={{height: 123, backgroundColor: theme === 'light' ? '#fff' : 'rgb(8, 8, 8)'}}>
                <Offcanvas placement='end' style={{backgroundColor: theme === 'light' ? '#fff' : '#121318'}} show={show} onHide={handleClose}>
                    <Offcanvas.Header closeVariant={theme === 'light' ? null : 'white'} closeButton>
                        <Logo/>
                        <span style={{color: theme === 'dark' ? '#fff' : '#121318'}}>{state ? state.domainName : <Preloader/>}</span>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Row className='flex-column text-start mb-3'>

                            <Col>
                                <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} to={'/internal-addresses'} as={NavLink}>Internal Transactions</Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} to={'/profile'} as={NavLink}>Profile</Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} to={'/secure-deal'} as={NavLink}>Secure Deal</Nav.Link>
                            </Col>
                            <Col>
                                <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} to={'/news'} as={NavLink}>News</Nav.Link>
                            </Col>

                        </Row>
                        <Row>
                            <div className='d-flex' style={{width: '100%'}}>
                                <div className='d-flex flex-column' style={{width: '100%'}}>
                                    <div style={{marginBottom: 15, width: '100%'}}>
                                        <Button style={{width: '100%'}} classname={['btnGray', 'headerBtn', theme]} onClick={() => navigate('/trading')}>
                                            <FontAwesomeIcon icon={faChartBar}/> Trading
                                        </Button>
                                    </div>
                                    <div style={{marginBottom: 15, width: '100%'}}>
                                        <Button style={{width: '100%'}} classname={['btnGray', 'headerBtn', theme]} onClick={() => navigate('/wallet')}>
                                            <FontAwesomeIcon icon={faWallet}/> Wallet
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Offcanvas.Body>
                </Offcanvas>


                <Container>
                    <Navbar.Brand>
                        <div className='d-flex align-items-center'>
                            <Logo/>
                            <NavLink className='domain_header' style={{color: theme === 'light' ? '#121318' : '#fff', marginRight: 35}} to={'/'}>{store.domain.domainName}</NavLink>
                        </div>
                    </Navbar.Brand>
                    <Nav className="d-none d-xl-flex me-auto align-content-center">
                        <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} to={'/internal-addresses'} as={NavLink}>Internal Transactions</Nav.Link>
                        <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} to={'/profile'} as={NavLink}>Profile</Nav.Link>
                        <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} to={'/secure-deal'} as={NavLink}>Secure Deal</Nav.Link>
                        <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} to={'/news'} as={NavLink}>News</Nav.Link>
                        {
                            store.isStaff || store.fullAccess || store.isAdmin ?
                                <Nav.Link style={{color: theme === 'light' ? 'rgba(0, 0, 0, .55)' : '#fff'}} as={NavLink} to='/admin'>
                                    <span>Staff</span>
                                </Nav.Link>
                                : null
                        }
                    </Nav>
                    <div className='d-none d-xl-flex align-items-center'>
                        {/*<ToggleCheckbox onChange={toggleTheme}/>*/}
                        <div onClick={toggleTheme} style={{cursor: 'pointer'}}>
                            {
                                theme === 'light' ? <FontAwesomeIcon icon={faMoon} size='lg' /> : <FontAwesomeIcon icon={faSun} size='lg' color={'orange'}/>
                            }
                        </div>
                        <div style={{margin: '0 10px'}}>
                            <Notification />
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Button classname={['btnGray', 'headerBtn', theme]} onClick={() => navigate('/trading')}>
                                <FontAwesomeIcon icon={faChartBar}/> Trading
                            </Button>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Button classname={['btnGray', 'headerBtn', theme]} onClick={() => navigate('/wallet')}>
                                <FontAwesomeIcon icon={faWallet}/> Wallet
                            </Button>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Nav.Link to={'/profile'} as={NavLink}>
                                <img src={'/img/avatar.png'} alt=""/>
                            </Nav.Link>
                        </div>
                    </div>
                    <div className='d-flex d-xl-none mx-3 align-items-center'>
                        <div onClick={toggleTheme} style={{cursor: 'pointer', marginRight: 10}}>
                            {
                                theme === 'light' ? <FontAwesomeIcon icon={faMoon} size='lg' /> : <FontAwesomeIcon icon={faSun} size='lg' color={'orange'}/>
                            }
                        </div>
                        <div className='d-block d-xl-none' onClick={handleOpen} style={{cursor: 'pointer'}}>
                            <FontAwesomeIcon size='2x' icon={faBars} color={theme === 'light' ? 'rgb(8, 8, 8)' : 'white'} />
                        </div>
                    </div>
                </Container>
            </Navbar>



            {/*<Navbar className={cls.navbar} bg='dark'>*/}
            {/*    <div className='d-flex d-lg-none'>*/}
            {/*        <BurgerMenu onHandleClick={openMenu}/>*/}
            {/*    </div>*/}
            {/*    <UserSidebar active={state ? 'activeSidebar' : ''} onClick={onCloseMenu} >*/}
            {/*        <div style={{color: '#fff', fontWeight: 'bold', fontSize: 22, marginBottom: 30}} className={cls.top}>*/}
            {/*            <NavLink to={'/'}>{store.domain.domainName}</NavLink>*/}
            {/*        </div>*/}
            {/*        <NavLink className={cls.link} to={'/'}>*/}
            {/*            <FontAwesomeIcon icon={faColumns} />*/}
            {/*            <span>Dashboard</span>*/}
            {/*        </NavLink>*/}

            {/*        <NavLink className={cls.link} to={'/deposit'}>*/}
            {/*            <FontAwesomeIcon icon={faDonate} />*/}
            {/*            <span>Deposit</span>*/}
            {/*        </NavLink>*/}
            {/*        <NavLink className={cls.link} to={'/withdraw'}>*/}
            {/*            <FontAwesomeIcon icon={faMoneyCheck} />*/}
            {/*            <span>Withdraw</span>*/}
            {/*        </NavLink>*/}
            {/*        <NavLink className={cls.link} to={'/internal-addresses'}>*/}
            {/*            <FontAwesomeIcon icon={faExchangeAlt} />*/}
            {/*            <span>Internal Transfers</span>*/}
            {/*        </NavLink>*/}

            {/*        <NavLink className={cls.link} to={'/profile'}>*/}
            {/*            <FontAwesomeIcon icon={faCreditCard} />*/}
            {/*            <span>Profile</span>*/}
            {/*        </NavLink>*/}
            {/*        <NavLink className={cls.link} to={'/internal-swap'}>*/}
            {/*            <FontAwesomeIcon icon={faSync} />*/}
            {/*            <span>Exchange</span>*/}
            {/*        </NavLink>*/}
            {/*        <NavLink className={cls.link} to={'/support'}>*/}
            {/*            <FontAwesomeIcon icon={faHeadset} />*/}
            {/*            <span>Support</span>*/}
            {/*        </NavLink>*/}
            {/*        <NavLink className={cls.link} to={'/secure-deal'}>*/}
            {/*            <FontAwesomeIcon icon={faShieldAlt} />*/}
            {/*            <span>Secure Deal</span>*/}
            {/*        </NavLink>*/}
            {/*        <NavLink className={cls.link} to={'/news'}>*/}
            {/*            <FontAwesomeIcon icon={faShieldAlt} />*/}
            {/*            <span>News</span>*/}
            {/*        </NavLink>*/}
            {/*        <NavLink className={cls.link} to={'/trading'}>*/}
            {/*            <FontAwesomeIcon icon={faShieldAlt} />*/}
            {/*            <span>Trading</span>*/}
            {/*        </NavLink>*/}
            {/*        <NavLink className={cls.link} to={'/internal-addresses'}>*/}
            {/*            <FontAwesomeIcon icon={faShieldAlt} />*/}
            {/*            <span>Internal Addresses</span>*/}
            {/*        </NavLink>*/}
            {/*        {*/}
            {/*            store.isStaff || store.fullAccess || store.isAdmin ?*/}
            {/*                <NavLink className={cls.link} to='/admin'>*/}
            {/*                    <FontAwesomeIcon icon={faUserLock} />*/}
            {/*                    <span>Staff</span>*/}
            {/*                </NavLink>*/}
            {/*                : null*/}
            {/*        }*/}
            {/*        <CurrencyRates />*/}
            {/*    </UserSidebar>*/}

            {/*    <div className={cls.navWrap}>*/}
            {/*        <Navbar>*/}
            {/*            <div style={{color: '#fff', fontWeight: 'bold', fontSize: 22}} className={cls.top}>*/}
            {/*                <NavLink to={'/'}>{store.domain.domainName}</NavLink>*/}
            {/*            </div>*/}
            {/*        </Navbar>*/}

            {/*        <Navbar className={`${cls.right_nav} justify-content-end`}>*/}
            {/*            <Nav style={{width: '100%'}}>*/}
            {/*                <div className={cls.navbar_links} style={{width: '100%'}}>*/}
            {/*                    /!*<Dropdown />*!/*/}
            {/*                    /!*<NavLink className={cls.link} to={'/'}>Dashboard</NavLink>*!/*/}
            {/*                    <NavLink className={cls.link} to={'/wallet'}>Wallet</NavLink>*/}
            {/*                    /!*<NavLink className={cls.link} to={'/deposit'}>Deposit</NavLink>*!/*/}
            {/*                    <NavLink className={cls.link} to={'/trading'}>Trading</NavLink>*/}
            {/*                    /!*<NavLink className={cls.link} to={'/profile'}>Profile</NavLink>*!/*/}
            {/*                    <NavLink className={cls.link} to={'/internal-swap'}>Exchange</NavLink>*/}
            {/*                    <NavLink className={cls.link} to={'/support'}>Support</NavLink>*/}
            {/*                    <NavLink className={cls.link} to={'/secure-deal'}>Secure Deal</NavLink>*/}
            {/*                    <NavLink className={cls.link} to={'/news'}>News</NavLink>*/}
            {/*                    <NavLink className={cls.link} to={'/internal-addresses'}>Internal Addresses</NavLink>*/}

            {/*                    {*/}
            {/*                        store.isStaff || store.fullAccess || store.isAdmin ? <NavLink className={cls.link} to='/admin'>Staff</NavLink> : null*/}
            {/*                    }*/}
            {/*                    <div className='me-2'>*/}
            {/*                        <Notification />*/}
            {/*                    </div>*/}
            {/*                    <div className='d-none d-md-block m-2'>*/}
            {/*                        <NavLink to={'/contact-us'}>*/}
            {/*                            <FontAwesomeIcon className={cls.navbar_icon} icon={faPhoneVolume} />*/}
            {/*                        </NavLink>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        <Row className={'flex-column align-items-center'} style={{color: '#fff', fontSize: 12}}>*/}
            {/*                            <NavLink to={'/profile'}>*/}
            {/*                                <Col>*/}
            {/*                                    <div className={'text-center'}>*/}
            {/*                                        <FontAwesomeIcon style={{fontSize: 24}} icon={faUserCircle} color={'#444'} />*/}
            {/*                                    </div>*/}
            {/*                                </Col>*/}
            {/*                                <Col>*/}
            {/*                                    <div>*/}
            {/*                                        {store.fullAccess ? null : store.user.email}*/}
            {/*                                    </div>*/}
            {/*                                </Col>*/}
            {/*                            </NavLink>*/}
            {/*                        </Row>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Nav>*/}
            {/*        </Navbar>*/}
            {/*    </div>*/}
            {/*</Navbar>*/}
        </>



    )
}

export default observer(NavBar)