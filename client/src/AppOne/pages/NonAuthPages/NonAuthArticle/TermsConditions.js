import React, {useEffect, useState} from 'react';
import {store} from "../../../../index";
import {Col, Container, Row} from 'react-bootstrap';
import Preloader from "../../../components/UI/Preloader/Preloader";
import TERMS from "../../../terms";
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../../context/ThemeContext';
import LandingHeader from '../../../components/LandingHeader/LandingHeader';
import LandingContent from '../Landing/components/LandingContent/LandingContent';
import LandingBlock from '../Landing/components/LandingBlock/LandingBlock';
import Footer from '../../../components/Footer/Footer';
import Logo from '../../../components/UI/Logo/Logo';
import {Link, NavLink} from 'react-router-dom';
import {getData} from '../../../services/StaffServices';

const TermsConditions = () => {
    const {theme} = useThemeContext()
    let domain = store.domain.domainName
    let domainBig = store.domain.fullDomainName
    let domainSupport = store.domain.companyEmail
    let generalBasics = '<a href="/general-basics">General Basics</a>'
    let percent = store.domain.domainParams.depositFee
    const str = TERMS(domain, domainBig, domainSupport, percent, generalBasics)
    const [state, setState] = useState()
    useEffect(() => {
        getDomain()
    }, [])

    const getDomain = async () => {
        const res = await getData(`/get_domain_params/${window.location.host}`)
        setState(res.data.domainInfo)
    }

    function createMarkup() {
        return {__html: `${str}`};
    }

    return (

        <div className='landing_wrap' id={theme}>
            <LandingHeader state={state}/>
            <div className='content_wrap'>
                <LandingContent>
                    <LandingBlock classname='landingBlock'>
                        <ButtonCard style={{height: '100%', borderRadius: 0}} theme={theme}>
                            {
                                store.terms ?
                                  <div className={'terms-style'} dangerouslySetInnerHTML={createMarkup()}/>
                                  : <Preloader />
                            }
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
export default TermsConditions