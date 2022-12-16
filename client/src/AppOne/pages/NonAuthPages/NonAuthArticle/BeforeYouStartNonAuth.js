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

const BeforeYouStartNonAuth = () => {
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
                                <ButtonCard theme={theme}>
                                    <div>
                                        <h1 className="article-title">Before You Start</h1>
                                        <p className="article-text">Crypto Trading are all about making the right choice. That includes
                                            predicting
                                            correctly in
                                            which direction the market will move. There is a number of strategies for Crypto Trading which can
                                            significantly
                                            increase your profit. A strategy you choose depends on your experience and knowledge, but let's look
                                            at some
                                            basics that every trader should know:</p>
                                        <h4 className="article-subtitle">Money Management Strategy!</h4>
                                        <p className="article-text">This is not the strategy which will help you predict assets movements, yet
                                            it is the
                                            most
                                            important strategy you should follow when trading Crypto Trading. {state.domainName} cares about your financial
                                            well
                                            being and although we are here to help you profit and make your life better, we acknowledge, that
                                            any
                                            trading
                                            carries financial risks. We recommend you develop your financial strategy and follow it at all times
                                            when
                                            trading.
                                            Do not put all the money you have at stake - trading is an emotionless procedure and your every
                                            choice
                                            should be
                                            well thought out. Remember that you are here to do business and make money.</p>

                                        <h4 className="article-subtitle">Analyzing markets!</h4>
                                        <p className="article-text">Financial news is a great aid to use when building your trading strategy. If
                                            you
                                            follow and
                                            analyze news on the assets you trade, you are more likely to make consistent profit. Markets are
                                            very
                                            sensitive to
                                            any global event and you don't have to major in economics to notice the connection.</p>

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

export default BeforeYouStartNonAuth;