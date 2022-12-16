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

const CryptocurrenciesNonAuth = () => {
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
                                        <h1 className="article-title">Education</h1>
                                        <p className="article-text">
                                            Bitcoin, Ethereum, and other crypto are revolutionizing how we invest, bank, and use money. Read
                                            this
                                            beginner’s
                                            guide to learn more.
                                        </p>

                                        <h4 className="article-subtitle">Education</h4>
                                        <p className="article-text">
                                            At its core, cryptocurrency is typically decentralized digital money designed to be used over the
                                            Internet.
                                            Bitcoin, which launched in 2009, was the first cryptocurrency, and it remains by far the biggest,
                                            most
                                            influential
                                            and best-known. In the decade since Bitcoin and other cryptocurrencies like Ethereum have grown as
                                            digital
                                            alternatives to money issued by governments.
                                        </p>

                                        <p className="article-text">
                                            <b>Over 7$ trillion worth of Bitcoin has been transferred since 2009</b>
                                        </p>
                                        <p className="article-text">
                                            The most popular cryptocurrencies, by market capitalization, are Bitcoin, Ethereum, Bitcoin Cash and
                                            Litecoin.
                                            Other well-known cryptocurrencies include Tezos, EOS and ZCash. Some are similar to Bitcoin. Others
                                            are
                                            based on
                                            different technologies, or have new features that allow them to do more than transfer value.
                                        </p>

                                        <p className="article-text">
                                            Crypto makes it possible to transfer value online without the need for a middleman like a bank or
                                            payment
                                            processor, allowing value to transfer globally, near instantly, 24/7, for low fees.
                                        </p>
                                        <p className="article-text">
                                            Cryptocurrencies are usually not issued or controlled by any government or other central authority.
                                            They’re
                                            managed by peer-to-peer networks of computers running free, open-source software. Generally, anyone
                                            who
                                            wants to
                                            participate is able to.
                                        </p>

                                        <p className="article-text">
                                            If a bank or government isn’t involved, how is crypto secure? It’s secure because all transactions
                                            are
                                            vetted by a
                                            technology called a blockchain. A cryptocurrency blockchain is similar to a bank’s balance sheet or
                                            ledger.
                                            Each
                                            currency has its own blockchain, which is an ongoing, constantly re-verified record of every single
                                            transaction
                                            ever made using that currency.
                                        </p>
                                        <p className="article-text">
                                            Unlike a bank’s ledger, a crypto blockchain is distributed across participants of the digital
                                            currency’s
                                            entire
                                            network. No company, country, or third party is in control of it; and anyone can participate. A
                                            blockchain
                                            is a
                                            breakthrough technology only recently made possible through decades of computer science and
                                            mathematical
                                            innovations.
                                        </p>

                                        <p className="article-text">
                                            <b>Most importantly, cryptocurrencies allow individuals to take complete control over their
                                                assets.</b>
                                        </p>

                                        <h4 className="article-subtitle">Privacy</h4>
                                        <p className="article-text">
                                            When paying with cryptocurrency, you don’t need to provide unnecessary personal information to the
                                            merchant.
                                            Which
                                            means your financial information is protected from being shared with third parties like banks,
                                            payment
                                            services,
                                            advertisers, and credit-rating agencies. And because no sensitive information needs to be sent over
                                            the
                                            Internet,
                                            there is very little risk of your financial information being compromised, or your identity being
                                            stolen.
                                        </p>

                                        <h4 className="article-subtitle">Security</h4>
                                        <p className="article-text">
                                            Almost all cryptocurrencies, including Bitcoin, Ethereum, Tezos, and Bitcoin Cash, are secured using
                                            technology
                                            called a blockchain, which is constantly checked and verified by a huge amount of computing power.
                                        </p>
                                        <p className="article-text"><b>Why invest in cryptocurrency?</b></p>

                                        <p className="article-text">
                                            Online exchanges like {state.domainName} have made trading, receiving and sending cryptocurrencies easy,
                                            secure, and
                                            rewarding. It only takes a few minutes to create a secure account. You can handle as little (or as
                                            much)
                                            cryptocurrency as you want. Many digital currencies, including BTC or ETH, offer holders rewards
                                            just for
                                            having
                                            them. Unlike stocks or bonds, you can easily transfer your cryptocurrency to anyone else or use it
                                            to pay
                                            for
                                            goods and services. Millions of people hold bitcoin and other digital currencies as part of their
                                            investment
                                            portfolios. Cryptocurrencies can be used to buy goods or services or held as part of an investment
                                            strategy,
                                            but
                                            they can’t be manipulated by any central authority, simply because there isn’t one. No matter what
                                            happens
                                            to a
                                            government, your cryptocurrency will remain secure.
                                        </p>
                                        <p className="article-text">
                                            Based on everything, we can confidently say that cryptocurrency is the future of finance.
                                        </p>
                                        <p className="article-text">
                                            If you want to know more about how cryptocurrency works, you can easily find the rest of the
                                            information in
                                            open
                                            sources on the Internet.
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

export default CryptocurrenciesNonAuth;