import LandingHeader from '../../../components/LandingHeader/LandingHeader';
import React from 'react';
import Logo from '../../../components/UI/Logo/Logo';
import Preloader from '../../../components/UI/Preloader/Preloader';
import {Col, Row} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';

const LandingTwo = ({state, theme, navigate}) => {
    return(
      <>
          <LandingHeader state={state}/>
          <div>
            <h1>Landing 2</h1>
          </div>
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
                      <p className='mt-3' style={{color: '#fff'}}>&#169; All right reserved</p>
                  </div>
              </div>
          </Footer>
      </>
    )
}
export default LandingTwo;