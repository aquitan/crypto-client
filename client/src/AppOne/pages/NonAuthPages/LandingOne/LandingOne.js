import LandingHeader from '../../../components/LandingHeader/LandingHeader';
import LandingContent from '../Landing/components/LandingContent/LandingContent';
import LandingBlock from '../Landing/components/LandingBlock/LandingBlock';
import {Col, Row} from 'react-bootstrap';
import {MouseParallaxChild, MouseParallaxContainer} from 'react-parallax-mouse';
import Button from '../../../components/UI/Button/Button';
import Footer from '../../../components/Footer/Footer';
import Logo from '../../../components/UI/Logo/Logo';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {Link, NavLink} from 'react-router-dom';
import React from 'react';
import '../Landing/landing.scss'
import {store} from '../../../../index';

const LandingOne = ({state, theme, navigate}) => {


    return (
      <div className='landing_wrap' id={theme}>
          <LandingHeader state={state}/>
          <div className='content_wrap'>
              <LandingContent>
                  <LandingBlock classname='landingBlock'>
                      <Row>
                          <Col className='position-relative landing-block-text-block'>
                              <MouseParallaxContainer
                                className="parallax"
                                containerStyles={{
                                    width: "100%",
                                    height: '100%'
                                }}
                                resetOnLeave
                              >
                                  <Col className='text-center text-lg-start justify-content-center justify-content-lg-start'>
                                      <h4 className='signup-today'>Sign Up tuday</h4>
                                      <h2 className='landing-header'>Buy & Sell</h2>
                                      <h2 className='landing-header'>Crypto Instant</h2>
                                      <p style={{color: '#9295A6', marginTop: 10}}>Join World biggest cryptocurrencies Exchange to Buy and sell many currencies.</p>
                                      <Col className='p-0 d-flex justify-content-center justify-content-lg-start'>
                                          <Button style={{marginTop: 20}} classname={'btnBlue'} onClick={() => navigate('/signUp')}>
                                              Get started
                                          </Button>
                                      </Col>
                                  </Col>

                                  <MouseParallaxChild
                                    factorX={0.02}
                                    factorY={-0.02}
                                    className='paralax-img'
                                    updateStyles={{
                                        position: 'absolute',
                                        zIndex: '99999',
                                        right: '10%',
                                        top: '20px'
                                    }}
                                  >
                                      <img className='star' src={'/img/star-1.svg'} alt=""/>
                                  </MouseParallaxChild>
                                  <MouseParallaxChild
                                    factorX={-0.02}
                                    factorY={-0.02}
                                    className='paralax-img'
                                    updateStyles={{
                                        position: 'absolute',
                                        zIndex: '99999',
                                        left: '30%',
                                        bottom: '20px'
                                    }}
                                  >
                                      <img className='elipseThree' src={'/img/elipse-2.svg'} alt=""/>
                                  </MouseParallaxChild>
                              </MouseParallaxContainer>
                          </Col>
                          <Col className='position-relative d-none d-xl-block'>
                              <MouseParallaxContainer
                                className="parallax"
                                containerStyles={{
                                    width: "100%",
                                    display: "flex",
                                }}
                                resetOnLeave
                              >
                                  <img style={{height: "auto", width: '100%'}} src={'/img/landing-first-img.svg'} alt=""/>
                                  <MouseParallaxChild
                                    factorX={-0.02}
                                    factorY={-0.02}
                                    updateStyles={{
                                        position: 'absolute',
                                        zIndex: '99999',
                                        left: '20%',
                                        bottom: '50px'
                                    }}
                                  >
                                      <img className='elipseThree' src={'/img/elipse-1.svg'} alt=""/>
                                  </MouseParallaxChild>
                                  <MouseParallaxChild
                                    factorX={0.02}
                                    factorY={0.02}
                                    updateStyles={{
                                        position: 'absolute',
                                        zIndex: '99999',
                                        right: '20%',
                                        top: '50px'
                                    }}
                                  >
                                      <img className='elipseOne' src={'/img/elipse-2.svg'} alt=""/>
                                  </MouseParallaxChild>
                              </MouseParallaxContainer>
                          </Col>
                      </Row>
                  </LandingBlock>
                  <LandingBlock style={{backgroundColor: theme === 'light' ? '#fff' : ''}} classname='landingAbsoluteBlock'>
                      <Row>
                          <Col className='position-relative d-none d-xl-block'>
                              <MouseParallaxContainer
                                className="parallax"
                                containerStyles={{
                                    width: "100%",
                                    display: "flex",
                                }}
                                resetOnLeave
                              >
                                  <MouseParallaxChild
                                    factorX={-0.02}
                                    factorY={0.03}
                                    className='buy-background-img'
                                    updateStyles={{
                                        position: 'absolute',
                                        zIndex: '0',
                                        right: '10%',
                                        top: '20%'
                                    }}
                                  >
                                      <img style={{zIndex: 9}} className='' src={'/img/buy-background.svg'} alt=""/>
                                  </MouseParallaxChild>
                                  <img style={{height: "auto", width: '100%'}} src={'/img/buy-img.svg'} alt=""/>
                                  <MouseParallaxChild
                                    factorX={-0.02}
                                    factorY={-0.02}
                                    updateStyles={{
                                        position: 'absolute',
                                        zIndex: '99999',
                                        right: '10%',
                                        bottom: '50px'
                                    }}
                                  >
                                      <img className='elipseThree' src={'/img/elipse-1.svg'} alt=""/>
                                  </MouseParallaxChild>
                                  <MouseParallaxChild
                                    factorX={0.02}
                                    factorY={0.02}
                                    updateStyles={{
                                        position: 'absolute',
                                        zIndex: '99999',
                                        left: '20%',
                                        top: '50px'
                                    }}
                                  >
                                      <img className='elipseOne' src={'/img/elipse-2.svg'} alt=""/>
                                  </MouseParallaxChild>
                                  <MouseParallaxChild
                                    factorX={-0.02}
                                    factorY={0.03}
                                    updateStyles={{
                                        position: 'absolute',
                                        zIndex: '99999',
                                        left: '10%',
                                        top: '250px'
                                    }}
                                  >
                                      <img className='elipseOne' src={'/img/elipse-3.svg'} alt=""/>
                                  </MouseParallaxChild>

                              </MouseParallaxContainer>
                          </Col>
                          <Col className='position-relative landing-block-text-block'>
                              <Col className='text-center text-lg-start justify-content-center justify-content-lg-start'>
                                  <h2 className='landing-header' id='features'>Buy & trade on the
                                      original crypto exchange.</h2>
                                  <p style={{color: '#9295A6', marginTop: 10}}>Buy now and get extra bonus Minimum pre-sale amount 25 Crypto Coin. We accept BTC crypto-currency</p>
                                  <Col className='p-0 d-flex justify-content-center justify-content-lg-start'>
                                      <Button style={{marginTop: 20}} classname={'btnBlue'} onClick={() => navigate('/signUp')}>
                                          Buy Now
                                      </Button>
                                  </Col>
                              </Col>
                          </Col>
                      </Row>
                  </LandingBlock>
                  <LandingBlock classname='landingTransparentBlock'>
                      <Row>
                          <Col className='position-relative text-center landing-block-text-block'>
                              <h4 className='trusted-title'>Trusted Partners Worldwide</h4>
                              <p className='trusted-text'>We're partners with countless major organisations around the globe</p>
                              <Row>
                                  <Col>
                                      <img src={'/img/trusted-img-1.svg'} alt=""/>
                                  </Col>
                                  <Col>
                                      <img src={'/img/trusted-img-2.svg'} alt=""/>
                                  </Col>
                                  <Col>
                                      <img src={'/img/trusted-img-3.svg'} alt=""/>
                                  </Col>
                                  <Col>
                                      <img src={'/img/trusted-img-4.svg'} alt=""/>
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                  </LandingBlock>
                  <LandingBlock classname='landingBlock'>
                      <Row>
                          <Col className='position-relative landing-block-text-block'>
                              <Col className='text-center text-lg-start justify-content-center justify-content-lg-start'>
                                  <h3 className='title-h3' id='trading'>Advanced Trading <span className='text-gradient'>Tools</span></h3>
                                  <div className="text-group">
                                      <div className="text-group-title">
                                          Professional Access, Non-stop Availability
                                      </div>
                                      <p className="text-group-paragraph">
                                          We provide premium access to crypto trading for both individuals and institutions through high liquidity,
                                          reliable order execution and constant uptime.
                                      </p>
                                  </div>
                                  <div className="text-group">
                                      <div className="text-group-title">
                                          A Range of Powerful Apis
                                      </div>
                                      <p className="text-group-paragraph">
                                          Set up your own trading interface or deploy your algorithmic strategy with our high-performance FIX and HTTP APIs.
                                      </p>
                                  </div>
                                  <div className="text-group">
                                      <div className="text-group-title">
                                          Customer Support
                                      </div>
                                      <p className="text-group-paragraph">
                                          Premium 24/7 support available to all customers worldwide by phone or email. Dedicated account managers for partners.
                                      </p>
                                  </div>

                                  <Col className='p-0 d-flex justify-content-center justify-content-lg-start'>
                                      <Button style={{marginTop: 20}} classname={'btnBordered'} onClick={() => navigate('/signUp')}>
                                          <span className='text-gradient'>Get started</span>
                                      </Button>
                                  </Col>
                              </Col>
                          </Col>
                          <Col className='position-relative d-none d-xl-block'>
                              <img style={{height: "auto", width: '100%'}} src={'/img/advanced-tools-img.svg'} alt=""/>
                          </Col>
                      </Row>
                  </LandingBlock>
                  <LandingBlock style={{backgroundColor: theme === 'light' ? '#fff' : ''}} classname='landingAbsoluteBlock'>
                      <Row>
                          <Col className='position-relative d-none d-xl-block'>
                              <img style={{height: "auto", width: '100%'}} src={'/img/security-img.svg'} alt=""/>
                          </Col>
                          <Col className='position-relative landing-block-text-block'>
                              <Col className='text-center text-lg-start justify-content-center justify-content-lg-start'>
                                  <h3 className='title-h3' id='services'>Industry-leading security from day one</h3>
                                  <div className="text-group">
                                      <div className="text-group-title">
                                          <img style={{marginRight: 10}} src={'/img/icon.svg'} alt=""/>Safety, security and compliance
                                      </div>
                                      <p className="text-group-paragraph">
                                          Our platform is a licensed New York trust company that undergoes regular bank exams and is subject
                                          to the cybersecurity audits conducted by the New York Department of Financial Services.
                                          Learn more about our commitment to security.
                                      </p>
                                  </div>
                                  <div className="text-group">
                                      <div className="text-group-title">
                                          <img style={{marginRight: 10}} src={'/img/icon.svg'} alt=""/>Hardware security keys
                                      </div>
                                      <p className="text-group-paragraph">
                                          With our platform you can secure your account with a hardware security key via WebAuthn.
                                      </p>
                                  </div>
                                  <div className="text-group">
                                      <div className="text-group-title">
                                          <img style={{marginRight: 10}} src={'/img/icon.svg'} alt=""/>SOC Certifications
                                      </div>
                                      <p className="text-group-paragraph">
                                          The platform is SOC 1 Type 2 and SOC 2 Type 2 compliant.
                                          We are the world’s first cryptocurrency exchange and custodian to complete these exams.
                                      </p>
                                  </div>
                              </Col>
                          </Col>
                      </Row>
                  </LandingBlock>
                  <LandingBlock classname='landingTransparentBlock'>
                      <Row>
                          <Col className='position-relative text-center landing-block-text-block'>
                              <h4 className='trusted-title'>Get started in just a few minutes</h4>
                              <Row>
                                  <Col>
                                      <img src={'/img/signup-icon.svg'} alt=""/>
                                      <div className="starter-block">
                                          <div className="started-title">
                                              Sign Up
                                          </div>
                                          <div className="started-text">
                                              Buy Bitcoin or Ethereum, then securely store it in your Wallet or send it on easily to friends
                                          </div>
                                      </div>
                                  </Col>
                                  <Col>
                                      <img src={'/img/fund-icon.svg'} alt=""/>
                                      <div className="starter-block">
                                          <div className="started-title">
                                              Fund
                                          </div>
                                          <div className="started-text">
                                              Choose your preferred payment method such as bank transfer or credit card to top up your Wallet
                                          </div>
                                      </div>
                                  </Col>
                                  <Col>
                                      <img src={'/img/buy-icon.svg'} alt=""/>
                                      <div className="starter-block">
                                          <div className="started-title">
                                              Buy Crypto
                                          </div>
                                          <div className="started-text">
                                              Sign Up for your free Wallet on web and follow our easy process to set up your profile
                                          </div>
                                      </div>
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                  </LandingBlock>
              </LandingContent>
              <Footer>
                  <div className='w-100'>
                      <div className='mb-5 d-flex align-items-center'>
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
                          <Col><Link to='/contact-us'>Contact us</Link></Col>
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
export default LandingOne;