import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {store} from "../../../../index";
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../../context/ThemeContext';
import LandingHeader from '../../../components/LandingHeader/LandingHeader';
import LandingContent from '../Landing/components/LandingContent/LandingContent';
import LandingBlock from '../Landing/components/LandingBlock/LandingBlock';
import Footer from '../../../components/Footer/Footer';
import Logo from '../../../components/UI/Logo/Logo';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {Link, NavLink} from 'react-router-dom';
import {getData} from '../../../services/StaffServices';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';
import { Skeleton } from '@mui/material';
import LandingSkeleton from '../LandingSkeleton/LandingSkeleton';

const SecurityPolicy = () => {
    const {theme} = useThemeContext()
    const [state, setState] = useState()
    useEffect(() => {
        getDomain()
    }, [])

    const getDomain = async () => {
        const res = await getData(`${getSwitchQuery('/get_domain_params/')}${window.location.host}`)
        setState(res.data.domainInfo)
    }

    return (

        <>
            {
                !state ?
                    <div className='landing_wrap' id={theme}>
                        <div className='d-flex' style={{backgroundColor: theme === 'dark' ? '#000' : '#fff', padding: '20px 40px', boxShadow: '0 0 5px 1px rgba(0,0,0, .2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Skeleton sx={{mb: 2, bgcolor: theme === 'dark' ? 'grey.900' : '',}} variant="rectangular" width={100} height={40} />
                            <div style={{ bgcolor: theme === 'dark' ? 'grey.900' : '', display: 'flex', backgroundColor: theme === 'dark' ? '#000' : '#fff'}}>
                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '', mx: 1 }} variant="rectangular" width={50} height={20} />
                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '', mx: 1 }} variant="rectangular" width={50} height={20} />
                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '', mx: 1 }}  variant="rectangular" width={50} height={20} />
                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '', mx: 1 }} variant="rectangular" width={50} height={20} />
                            </div>
                            <div style={{display: 'flex', backgroundColor: theme === 'dark' ? '#000' : '#fff'}}>
                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '', mb: 2, mx: 2}} variant="rectangular" width={100} height={40} />
                            <Skeleton sx={{ bgcolor: theme === 'dark' ? 'grey.900' : '', mb: 2}} variant="rectangular" width={100} height={40} />
                            </div>
                        </div>
                        <LandingSkeleton/>
                    </div> :
                    <div className='landing_wrap' id={theme}>
                    <LandingHeader hideLinks={true} state={state}/>
                    <div className='content_wrap'>
                        <LandingContent>
                            <LandingBlock classname='landingBlock'>
                                <ButtonCard style={{height: '100%', borderRadius: 0}}  theme={theme}>
                                    <div className="article footer_links_page">
                                        <h1 className="article-title">Security Policy</h1>
                                        <h4 className="article-subtitle">User account protection</h4>
                                        <p className="article-text">
                                            Some of the security measures highlighted below are in place by default, and others can be activated
                                            based
                                            on
                                            the security level you need. Please let {state.domainName} check the security status of your account.
                                        </p>
                                        <h4 className="article-subtitle">
                                            Two-factor authentication (2FA):
                                        </h4>
                                        <p className="article-text">
                                            Add an extra layer of security to your account and protect sensitive operations such as logging in,
                                            generating
                                            API keys, and withdrawing. Configure two-factor authentication using Google Authenticator, or a U2F
                                            Security
                                            Key.
                                        </p>
                                        <h4 className="article-subtitle">
                                            Advanced verification tools:
                                        </h4>
                                        <ul className="article-list">
                                            <li className="article-list__item">Login data is saved and analyzed for unusual activity.</li>
                                            <li className="article-list__item">Intelligent system detects IP Address changes to prevent session
                                                hijacking.
                                            </li>
                                            <li className="article-list__item">Email notifications report logins and include a link to instantly
                                                freeze your
                                                account if you suspect malicious activity.
                                            </li>
                                            <li className="article-list__item">Limit access to your account based on IP address.</li>
                                            <li className="article-list__item">Withdrawals protection.</li>
                                            <li className="article-list__item">Security system monitors withdrawals by IP address and other user
                                                behavior
                                                patterns, triggering manual admin inspection on withdrawals that appear unusual.
                                            </li>
                                            <li className="article-list__item">Withdrawal confirmation step that is immune to malicious browser
                                                malware.
                                            </li>
                                            <li className="article-list__item">Email encryption with OpenPGP.</li>
                                            <li className="article-list__item">Special wallet verifications.</li>
                                        </ul>
                                        <h4 className="article-subtitle">
                                            We always care about your safety!
                                        </h4>
                                        <p className="article-text">
                                            If you want to know more about trading basics, you can easily find the rest of the information in
                                            open
                                            sources
                                            on the Internet.
                                        </p>
                                    </div>
                                </ButtonCard>
                            </LandingBlock>
                        </LandingContent>
                        <Footer>
                            <div className='w-100'>
                                <div className='mb-5 d-flex align-items-center' style={{color: '#fff'}}>
                                    <NavLink to={'/'}>
                                        <Logo/>
                                    </NavLink>
                                    <NavLink to={'/'}>
                                        <div>
                                            {state ? state.domainName : <Preloader />}
                                        </div>
                                    </NavLink>
                                </div>
                                <Row className='mb-5'>
                                    <Col><Link to='/privacy-policy'>Privacy Policy</Link></Col>
                                    <Col><Link to='/cookie-policy'>Cookie Policy</Link></Col>
                                    <Col><Link to='/security-policy'>Security Policy</Link></Col>
                                    <Col><Link to='/terms-conditions'>Terms & Conditions</Link></Col>
                                    <Col><Link to='/about-us'>About us</Link></Col>
                                    <Col><Link to='/contactus'>Contact us</Link></Col>
                                </Row>
                                <div className='w-100 mt-4' style={{borderTop: '2px solid #E9EAF0'}}>
                                    <p className='mt-3' style={{color: '#fff'}}>&#169;{store.domain.companyYear}-{new Date().getFullYear()} All rights reserved</p>
                                </div>
                            </div>
                        </Footer>
                    </div>
                </div>
            }
        </>
    )
}

export default SecurityPolicy