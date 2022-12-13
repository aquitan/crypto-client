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
import { getSwitchQuery } from '../../../utils/getSwitchQuery';
import { Skeleton } from '@mui/material';
import LandingSkeleton from '../LandingSkeleton/LandingSkeleton';

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
        const res = await getData(`${getSwitchQuery('/get_domain_params/')}${window.location.host}`)
        setState(res.data.domainInfo)
    }

    function createMarkup() {
        return {__html: `${str}`};
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
export default TermsConditions