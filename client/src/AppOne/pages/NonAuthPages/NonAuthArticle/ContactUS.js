import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
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

const ContactUS = () => {
    const {theme} = useThemeContext()
    const [state, setState] = useState()
    useEffect(() => {
        getDomain()
    }, [])

    const getDomain = async () => {
        const res = await getData(`/get_domain_params/${window.location.host}`)
        setState(res.data.domainInfo)
    }

  return (
        <div className='landing_wrap' id={theme}>
            <LandingHeader state={state}/>
            <div className='content_wrap'>
                <LandingContent>
                    <LandingBlock classname='landingBlock'>
                        <ButtonCard style={{height: '100%', borderRadius: 0}} theme={theme}>

                            <div className="article footer_links_page">
                                <h4 className="article-title">Technical Support Department:</h4>
                                <p className="article-text">{store.domain.domainName}@support.com</p>
                                <h4 className="article-subtitle">Support Service during COVID-19: </h4>
                                <p className="article-text">As we work to ensure the security of our customers’ accounts and to keep
                                    our employees
                                    safe,
                                    we may experience degraded performance and availability for some of our services.</p>
                                <h4 className="article-subtitle">Send us a message: </h4>
                                <p className="article-text">We’re here to help and answer any question you might have. We look
                                    forward to hearing
                                    from
                                    you. Feel free to contact us via email.</p>
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
    )
}

export default ContactUS