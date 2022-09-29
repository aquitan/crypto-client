import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {store} from "../../../../index";
import {useThemeContext} from '../../../context/ThemeContext';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import LandingHeader from '../../../components/LandingHeader/LandingHeader';
import LandingContent from '../Landing/components/LandingContent/LandingContent';
import LandingBlock from '../Landing/components/LandingBlock/LandingBlock';
import Footer from '../../../components/Footer/Footer';
import Logo from '../../../components/UI/Logo/Logo';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {Link, NavLink} from 'react-router-dom';
import {getData} from '../../../services/StaffServices';

const PrivacyPolicy = () => {
    const {theme} = useThemeContext()
    let domain = store.domain.domainName.toUpperCase()
    let domainFull = store.domain.fullDomainName
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
                        <ButtonCard theme={theme}>
                            <div className="article footer_links_page">
                                <h1 className="article-title">Private Policy</h1>
                                <h4 className="article-subtitle">1. INTRODUCTION</h4>
                                <p className="article-text">Thank you for visiting {domain}, a digital asset trading website,
                                    which is provided
                                    by {domain}. By visiting, accessing, or using {domain} and associated application
                                    program
                                    interface (“Site”), you consent to the policies and practices of our privacy policy (the
                                    “Privacy Policy”), so
                                    please read them carefully. This Privacy Policy explains how {domain} uses your Personal
                                    Data (defined
                                    below) as we provide you with access and utility through our digital asset Trading Platform via
                                    software, API
                                    (application program interface), technologies, products and/or functionalities (“Service”). In
                                    the course of
                                    providing you our Service, to abide by the laws in the jurisdictions that we operate, and to
                                    improve our
                                    services, we need to collect and maintain personal information about you. As a rule, we never
                                    disclose any
                                    personal information about our customers to any non-affiliated third parties, except as
                                    described below. We may
                                    update this Privacy Policy at any time by posting the amended version on this site including the
                                    effective date
                                    of the amended version. We will communicate any material changes to this Privacy Policy via
                                    email.</p>
                                <h4 className="article-subtitle">2. DEFINITIONS:</h4>
                                <p className="article-text">Virtual Financial Asset</p>
                                <p className="article-text">As used herein, “Virtual Financial Asset” under Germany Virtual
                                    Financial Asset
                                    Act, 2018, also called “Convertible Virtual Currency,” “cryptocurrency,” or “digital goods”,
                                    such as bitcoin or
                                    ether, which is based on the cryptographic protocol of a computer network that may be (i)
                                    centralized or
                                    decentralized, (ii) closed or open-source, and (iii) used as a medium of exchange and/or store
                                    of value.</p>
                                <h4 className="article-subtitle">PERSONAL DATA</h4>
                                <p className="article-text">As used herein, “Personal Data” means any information relating to an
                                    identified or
                                    identifiable natural person, such as a name, an identification number, location data, an online
                                    identifier or to
                                    one or more factors specific to the physical, economic, cultural or social identity of you as a
                                    natural person.
                                </p>
                                <h4 className="article-subtitle">3. WHAT PERSONAL DATA WE COLLECT</h4>
                                <p className="article-text">{domain} collects, processes, and stores Personal Data collected from
                                    you via your
                                    use of the Service or where you have given your consent. This Personal Data may include contact
                                    details, copies
                                    of identification documentation provided by you or derived from publicly accessible databases,
                                    your government
                                    identification number as well as information relating to your device or internet service (such
                                    as an IP address
                                    and a MAC number).</p>
                                <p className="article-text">We collect information you provide during the {domain} onboarding
                                    process, which may
                                    be a completed, incomplete, or abandoned process. Operating within the European Economic Area
                                    (“EEA”), we
                                    collect, sstore, and process your personal information in accordance with the provisions of the
                                    General Data
                                    Protection Regulation (GDPR) and Data Protection Act. To understand more about how we protect
                                    the data collected
                                    from individuals and entities located within the EEA, please see the details below.</p>
                                <h4 className="article-subtitle">INDIVIDUAL CUSTOMERS:</h4>
                                <ul className="article-list">
                                    <li className="article-list__item">
                                        Email address
                                    </li>
                                    <li className="article-list__item">
                                        Mobile phone number
                                    </li>
                                    <li className="article-list__item">
                                        Full legal name (including former name, and names in local language)
                                    </li>
                                    <li className="article-list__item">
                                        Nationality
                                    </li>
                                    <li className="article-list__item">
                                        Passport number, or any government issued ID number
                                    </li>
                                    <li className="article-list__item">
                                        Date of birth (“DOB”)
                                    </li>
                                    <li className="article-list__item">
                                        Proof of identity (e.g. passport, driver’s license, or government-issued ID)
                                    </li>
                                    <li className="article-list__item">
                                        Residential address
                                    </li>
                                    <li className="article-list__item">
                                        Proof of residency
                                    </li>
                                    <li className="article-list__item">
                                        Additional Personal Data or documentation at the discretion of our Compliance Department.
                                    </li>
                                </ul>

                                <h4 className="article-subtitle">CORPORATE CUSTOMERS:</h4>
                                <ul className="article-list">
                                    <li className="article-list__item">
                                        Corporate legal name (including the legal name in local language)
                                    </li>
                                    <li className="article-list__item">
                                        Incorporation/registration Information
                                    </li>
                                    <li className="article-list__item">
                                        Full legal name of all beneficial owners, directors, and legal representatives
                                    </li>
                                    <li className="article-list__item">
                                        Address (principal place of business and/or other physical locations)
                                    </li>
                                    <li className="article-list__item">
                                        Proof of legal existence
                                    </li>
                                    <li className="article-list__item">
                                        Description of the business
                                    </li>
                                    <li className="article-list__item">
                                        Percentage of ownership for Individual/corporate owners
                                    </li>
                                    <li className="article-list__item">
                                        Contact information of owners, principals, and executive management (as applicable)
                                    </li>
                                    <li className="article-list__item">
                                        Proof of identity (e.g., passport, driver’s license, or government-issued ID) for
                                        significant individual
                                        beneficial owner of the institutional customer entity
                                    </li>
                                    <li className="article-list__item">
                                        Personal Data for each entity’s significant beneficial owner of the institutional customer
                                        entity (see the
                                        “Individual Customer” section above for details on what Personal Data we collect for
                                        individuals)
                                    </li>
                                    <li className="article-list__item">
                                        Source of wealth
                                    </li>
                                    <li className="article-list__item">
                                        Amount of bitcoin or other digital assets projected to be injected.
                                    </li>
                                </ul>

                                <h4 className="article-subtitle">4. COLLECTION AND TRANSFER OF DATA OUTSIDE OF THE EEA</h4>
                                <p className="article-text">As outlined above, we may collect Personal Data from customers located in
                                    the EEA. To
                                    facilitate the services we provide to customers located in the EEA, we request explicit consent
                                    for the transfer
                                    of Personal Data from the EEA to outside of the area. If you are an individual located in the
                                    EEA and you
                                    decline to consent to such transfer, you will no longer be able to use {domain} and our
                                    services. You
                                    will have the ability to withdraw your digital assets; however, all other functionalities will
                                    be disabled.</p>


                                <h4 className="article-subtitle">5. HOW WE USE YOUR PERSONAL DATA</h4>
                                <p className="article-text">{domain} uses Personal Data to communicate with you and to
                                    administer, deliver,
                                    improve, and personalize the Service. {domain} might also generate generic data out of
                                    any Personal Data
                                    we collect and use it for our own purposes. We may also use such data to communicate with you in
                                    relation to
                                    other products or services offered by {domain} and/or its partners. We do not share your
                                    Personal Data
                                    with third parties (other than partners in connection with their services to {domain})
                                    except where you
                                    have given your consent and further detailed below.</p>


                                <h4 className="article-subtitle">WE MAY SHARE YOUR PERSONAL DATA WITH THIRD PARTIES:</h4>
                                <p className="article-text">If we think that sharing is necessary to enforce the Terms of Service;</p>
                                <p className="article-text">To comply with government agencies, including regulators, law enforcement
                                    and/or justice
                                    departments;</p>
                                <p className="article-text">To third parties who provide services to {domain} (such as
                                    administration or
                                    technical services);</p>
                                <p className="article-text">In connection with the sale or transfer of our business or any part thereof.
                                </p>
                                <p className="article-text">Additionally, we have implemented international standards to prevent money
                                    laundering,
                                    terrorist financing, and circumventing trade, and economic sanctions, and will implement final
                                    Virtual Financial
                                    Asset rules and regulations when effective, which will likely require us to undertake due
                                    diligence on our
                                    customers. This may include the use of third-party data and service providers which we will
                                    cross-reference with
                                    your personal information.</p>


                                <h4 className="article-subtitle">6. HOW WE STORE YOUR PERSONAL DATA</h4>
                                <p className="article-text">The data that we collect from you may be transferred to, and stored at, a
                                    destination
                                    outside of Germany. It may also be processed by staff operating outside of
                                    Germany who
                                    work for us or for one of our suppliers. By submitting your personal data, you agree to this
                                    transfer, storing
                                    or processing, except customers located in the EEA, as detailed above. All information you
                                    provide to us is
                                    stored on our and/or third party cloud servers in Germany.</p>


                                <h4 className="article-subtitle">7. ACCESS, CORRECTION, AND DELETION OF YOUR PERSONAL DATA</h4>
                                <p className="article-text">You have the right to obtain a copy of your Personal Data upon request and
                                    ascertain whether
                                    the information we hold about you is accurate and up-to-date. If any of your Personal Data is
                                    inaccurate, you
                                    may request to update your information. You may also request to delete your Personal Data, with
                                    exception that
                                    we may refuse your deletion request in certain circumstances, such as compliance with law or
                                    legal purposes. For
                                    data access, correction, or deletion requests, please contact support@{domain}.club with the subject
                                    “DATA INQUIRY”.
                                </p>
                                <p className="article-text">In response to data access, correction, or deletion request, we will verify
                                    the requesting
                                    party’s identity to ensure that he or she is legally entitled to make such request. While we aim
                                    to respond to
                                    these requests free of charge, we reserve the right to charge you a reasonable fee should your
                                    request be
                                    repetitive or onerous.</p>

                                <h4 className="article-subtitle">8. MARKETING</h4>
                                <p className="article-text">We may communicate company news, promotions, and information relating to our
                                    products and
                                    services provided by {domain}. We may share Personal Data with third parties to help us
                                    with our
                                    marketing and promotional projects, or sending marketing communications. By using
                                    {domain}, you accept
                                    this Privacy Policy and you agree to receive such marketing communications.</p>
                                <p className="article-text">Customers can opt out of these marketing communications at any moment. If
                                    you do not want to
                                    receive these communications, please send an email to support@{domain}.club</p>
                                <p className="article-text">For product related communications, such as policy/terms updates and
                                    operational
                                    notifications, you will not be able to opt out of receiving such information.</p>

                                <h4 className="article-subtitle">9. INFORMATION SECURITY</h4>
                                <p className="article-text">We endeavor to protect {domain} and you from unauthorized access,
                                    alteration,
                                    disclosure, or destruction of Personal Data we collect and store. We take various measures to
                                    ensure information
                                    security, including encryption of the {domain} communications with SSL; required
                                    two-factor
                                    authentication for all sessions; periodic review of our Personal Data collection, storage, and
                                    processing
                                    practices; and restricted access to your Personal Data on a need-to-know bases for our employees
                                    and vendors who
                                    are subject to strict contractual confidentiality obligations.</p>

                                <h4 className="article-subtitle">10. CONTACTING {domain} ABOUT PRIVACY QUESTIONS OR CONCERNS</h4>
                                <p className="article-text">If you have any questions about this Privacy Policy or the use of your
                                    Personal Data, please
                                    contact us by sending an email to the following address support@{domainFull} with the subject
                                    “PRIVACY REQUEST”.
                                </p>

                                <h4 className="article-subtitle larger-subtitle">11. CHANGES TO OUR PRIVACY POLICY</h4>
                                <p className="article-text">If you want to know more about trading basics, you can easily find the rest
                                    of the
                                    information in open sources on the Internet.</p>
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


export default PrivacyPolicy