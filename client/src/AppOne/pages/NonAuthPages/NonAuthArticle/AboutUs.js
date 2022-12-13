import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {store} from "../../../../index";
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import {useThemeContext} from '../../../context/ThemeContext';
import LandingHeader from '../../../components/LandingHeader/LandingHeader';
import LandingContent from '../Landing/components/LandingContent/LandingContent';
import LandingBlock from '../Landing/components/LandingBlock/LandingBlock';
import {MouseParallaxChild, MouseParallaxContainer} from 'react-parallax-mouse';
import Button from '../../../components/UI/Button/Button';
import Footer from '../../../components/Footer/Footer';
import Logo from '../../../components/UI/Logo/Logo';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {Link, NavLink} from 'react-router-dom';
import {getData} from '../../../services/StaffServices';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';
import { Skeleton } from '@mui/material';
import LandingSkeleton from '../LandingSkeleton/LandingSkeleton';

const AboutUS = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        getDomain()
    }, [])

    const getDomain = async () => {
        const res = await getData(`${getSwitchQuery('/get_domain_params/')}${window.location.host}`)
        setState(res.data.domainInfo)
    }

    const {theme} = useThemeContext()


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
                    </div>:

                    <div className='landing_wrap' id={theme}>
                        <LandingHeader hideLinks={true} state={state}/>
                        <div className='content_wrap'>
                            <LandingContent>
                                <LandingBlock classname='landingBlock'>
                                    <ButtonCard style={{height: '100%', borderRadius: 0}} theme={theme}>
                                        <div className="article footer_links_page">
                                            <h1 className="article-title">ABOUT US</h1>
                                            <h4 className="article-subtitle">ABOUT {state.domainName}</h4>
                                            <p className="article-text">
                                                Founded in {state.companyYear} by cybersecurity engineers, {state.domainName} is the premier exchange and trading
                                                platform, providing lightning-fast trade and exchange execution, dependable digital wallets and
                                                industry-leading
                                                security practices. Our mission is to help advance the exchange and trading industry by fostering
                                                innovation,
                                                incubating new and emerging technology, and driving transformative change.
                                            </p>

                                            <h4 className="article-subtitle">WHAT MAKES {state.domainName} DIFFERENT? </h4>
                                            <p className="article-text">
                                                Secure platform – {state.domainName} employs the most reliable, effective security technologies available. We
                                                leverage
                                                an elastic, multi-stage wallet strategy to ensure that the majority of funds are kept in cold
                                                storage for
                                                additional
                                                safety. Also, {state.domainName} enables two-factor authentication for all users and provides a host of
                                                additional
                                                security features to provide multiple layers of protection. At {state.domainName}, security will always be a
                                                top
                                                priority in every decision we make.
                                            </p>

                                            <p className="article-text">
                                                Custom-built trading engine – Our custom trading engine was designed to be scalable and to ensure
                                                that
                                                orders are
                                                executed in real-time.
                                            </p>

                                            <p className="article-text">
                                                Fast deposits and withdrawals – Our highly efficient and automated monitoring platform allows us to
                                                provide
                                                users
                                                the fastest transactions available today. This includes updates on balance, trade, and wallet
                                                information.
                                            </p>

                                            <p className="article-text">
                                                Driving Innovation – To help drive innovation in the exchange industry, {state.domainName} is committed to
                                                supporting
                                                both new and established engines. {state.domainName} seeks to provide its users with best of technologies.
                                            </p>

                                            <p className="article-text">
                                                Commitment to compliance – {state.domainName} is committed to complying with all current .
                                                regulations that
                                                help prevent, detect and remediate unlawful behavior by customers when using the {state.domainName} Trading
                                                Platform or
                                                any of the company’s other services.
                                            </p>

                                            <p className="article-text">
                                                {state.domainName} has been also established by trading professionals possessing solid practical experience of
                                                trading
                                                on financial markets. The service provides a mass user with the opportunity to start working on the
                                                market
                                                of Crypto
                                                Trading with the help of the {state.domainName} leading Trading Platform. Today, the {state.domainName} Platform
                                                is
                                                regarded as the most advanced platform and is optimized for simultaneous use by a large number of
                                                traders
                                                and
                                                investors.
                                            </p>

                                            <p className="article-text">
                                                The special feature of Crypto Trading is the possibility to know possible profit/loss amounts
                                                beforehand,
                                                which
                                                means that they can be used for hedging exchange risks on the spot market. You don’t need to apply
                                                leverage
                                                either,
                                                so you aren’t exposed to the risks associated with the margin trading. The Platform of the {state.domainName}
                                                is
                                                realized in a web-interface and doesn't require installing any special software onto a user's
                                                computer. It's
                                                quite
                                                simple, as compared with trading platforms used on the spot market, therefore it perfectly suits for
                                                studying
                                                peculiarities of financial markets. Crypto Trading is transparent and convenient way to invest any
                                                volume,
                                                especially when you are a beginner investor in the financial markets.
                                            </p>

                                            <p className="article-text">
                                                Thank you for having chosen our service!
                                            </p>

                                            <h4 className="article-subtitle">Our Founder: </h4>
                                            <p className="article-text">
                                                {store.domain.companyOwnerName} is Co-Founder and CEO of {state.domainName}.
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
                                    <div style={{width: '100%', justifyContent: 'space-between'}} className='d-flex flex-row'>
                                        <div className='d-flex flex-column'>
                                            <Link className='me-2' to='/privacy-policy'>Privacy Policy</Link>
                                            <Link className='me-2' to='/cookie-policy'>Cookie Policy</Link>
                                            <Link className='me-2' to='/before-start'>Before you start</Link>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <Link className='me-2' to='/security-policy'>Security policy</Link>
                                            <Link className='me-2' to='/terms-and-conditions'>Terms & Conditions</Link>
                                            <Link className='me-2' to='/general-basics'>General Basics</Link>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <Link className='me-2' to='/about-us'>About Us</Link>
                                            <Link className='me-2' to='/contact-us'>Contact Us</Link>
                                            <Link className='me-2' to='/cryptocurrencies'>Cryptocurrencies</Link>
                                        </div>
                                    </div>
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

export default AboutUS