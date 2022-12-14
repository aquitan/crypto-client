import React, {useEffect, useState} from 'react';
import {store} from "../../../../index";
import {useThemeContext} from '../../../context/ThemeContext';
import ButtonCard from '../../../components/ButtonCard/ButtonCard';
import LandingHeader from '../../../components/LandingHeader/LandingHeader';
import LandingContent from '../Landing/components/LandingContent/LandingContent';
import LandingBlock from '../Landing/components/LandingBlock/LandingBlock';
import Footer from '../../../components/Footer/Footer';
import Logo from '../../../components/UI/Logo/Logo';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {Col, Row} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {getData} from '../../../services/StaffServices';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';
import { Skeleton } from '@mui/material';
import LandingSkeleton from '../LandingSkeleton/LandingSkeleton';

const CookiePolicy = () => {
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
                </div>

                :<div className='landing_wrap' id={theme}>
                    <LandingHeader hideLinks={true} state={state}/>
                    <div className='content_wrap'>
                        <LandingContent>
                            <LandingBlock classname='landingBlock'>
                                <ButtonCard style={{height: '100%', borderRadius: 0}} theme={theme}>
                                    <div className="article footer_links_page">
                                        <h1 className="article-title">Cookie Policy</h1>
                                        <h4 className="article-subtitle">WHAT ARE COOKIES?</h4>
                                        <p className="article-text">
                                            As is common practice with almost all professional websites this site uses cookies, which are tiny
                                            files that
                                            are downloaded to your computer to improve your experience. This page describes what information
                                            they
                                            gather,
                                            how we use it and why we sometimes need to store these cookies. We will also share how you can
                                            prevent
                                            these
                                            cookies from being stored, however, this may downgrade or 'break' certain elements of the sites
                                            functionality.
                                            For more general information on "cookies" check the Wikipedia or open sources on the Internet.
                                        </p>

                                        <h4 className="article-subtitle">HOW WE USE COOKIES? </h4>
                                        <p className="article-text">
                                            We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no
                                            industry
                                            standard options for disabling cookies without completely disabling the functionality and features
                                            they add to
                                            this site. It is recommended that you leave on all cookies if you are not sure whether you need them
                                            or not in
                                            case they are used to provide a service that you use.
                                        </p>

                                        <h4 className="article-subtitle">DISABLING COOKIES? </h4>
                                        <p className="article-text">
                                            You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that
                                            disabling
                                            cookies will affect the functionality of this and many other websites that you visit. Disabling
                                            cookies will
                                            usually result in also disabling certain functionality and features of this site. Therefore it is
                                            recommended
                                            that you do not disable cookies. If you create an account with us then we will use cookies for the
                                            management
                                            of the signup process and general administration. These cookies will usually be deleted when you log
                                            out,
                                            however, in some cases they may remain afterwards to remember your site preferences when logged out.
                                            We use
                                            cookies when you are logged in so that we can remember this fact. This prevents you from having to
                                            log
                                            in
                                            every single time you visit a new page. These cookies are typically removed or cleared when you log
                                            out to
                                            ensure that you can only access restricted features and areas when logged in. This site offers
                                            e-commerce or
                                            payment facilities and some cookies are essential to ensure that your order is remembered between
                                            pages so
                                            that we can process it properly. When you submit data to a form such as those found on contact pages
                                            or
                                            comment forms cookies may be set to remember your user details for future correspondence. In order
                                            to
                                            provide
                                            you with a great experience on this site we provide the functionality to set your preferences for
                                            how
                                            this
                                            site runs when you use it. In order to remember your preferences we need to set cookies so that this
                                            information can be called whenever you interact with a page is affected by your preferences.
                                        </p>

                                        <h4 className="article-subtitle">THIRD PARTY COOKIES </h4>
                                        <p className="article-text">
                                            In some special cases we also use cookies provided by trusted third parties.
                                        </p>

                                        <h4 className="article-subtitle">MORE INFORMATION </h4>
                                        <p className="article-text">
                                            Hopefully that has clarified things for you, and, as was previously mentioned, if there is something
                                            that you
                                            aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it does
                                            interact with
                                            one of the features you use on our site. However, if you are still looking for more information,
                                            then
                                            you can
                                            contact us at {state.domainName} support.
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

export default CookiePolicy