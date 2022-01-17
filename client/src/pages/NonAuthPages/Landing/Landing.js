import React, {useRef, useState} from 'react'
import LandingHeader from '../../../components/LandingHeader/LandingHeader'
import Section from '../../../layouts/Section/Section'
import cls from './Landing.modules.scss'
import '../../../styles/landing.scss'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {Container} from "react-bootstrap";


const Landing = () => {

    const [active, setActive] = useState('')
    const [goingUp, setGoingUp] = useState(false);

    const handleClick = event => {
        console.log(!event.target.classList.contains('active'))
        if (!event.target.classList.contains('active')) {
            setActive('active')
        } else {
            setActive('active')
        }
    }


    return (
        <article >
            <LandingHeader/>
            <nav className="nav__wrapper" id="navbar-example">
                <ul className="nav">

                    <li onClick={handleClick} role="presentation" className="">
                    <AnchorLink href="#section1">
                        <span className="nav__counter">01</span>
                        <h3 className='nav__title'>Intro</h3>
                        <p className="nav__body"><strong>Timeline-style navigation</strong>. Scroll down to see what happens, or click on a number in the nav.</p>
                    </AnchorLink>
                    </li>

                    <li onClick={handleClick} role="presentation">
                    <AnchorLink href="#section2">
                        <span className="nav__counter">02</span>
                        <h3 className="nav__title">Section 2 Title</h3>
                        <p className="nav__body">Sed sit amet justo sed odio tempus tempus. Vestibulum sed varius mi, sit amet condimentum lacus.</p>
                    </AnchorLink>
                    </li>

                    <li id='anchorLink3' onClick={handleClick} role="presentation" >
                    <AnchorLink href="#section3">
                        <span className="nav__counter">03</span>
                        <h3 className="nav__title">Section 3 Title</h3>
                        <p className="nav__body">Sed sit amet justo sed odio tempus tempus. Vestibulum sed varius mi, sit amet condimentum lacus.</p>
                    </AnchorLink>
                    </li>
                    
                    <li onClick={handleClick} role="presentation">
                    <AnchorLink href="#section4">
                        <span className="nav__counter">04</span>
                        <h3 className="nav__title">Section 4 Title</h3>
                        <p className="nav__body">Sed sit amet justo sed odio tempus tempus. Vestibulum sed varius mi, sit amet condimentum lacus.</p>
                    </AnchorLink>
                    </li>
                    
                    <li onClick={handleClick} role="presentation">
                    <AnchorLink href="#section5">
                        <span className="nav__counter">05</span>
                        <h3 className="nav__title">Section 5 Title</h3>
                        <p className="nav__body">Sed sit amet justo sed odio tempus tempus. Vestibulum sed varius mi, sit amet condimentum lacus.</p>
                    </AnchorLink>
                    </li>
                    
                    <li onClick={handleClick} role="presentation">
                    <AnchorLink href="#section6">
                        <span className="nav__counter">06</span>
                        <h3 className="nav__title">Section 6 Title</h3>
                        <p className="nav__body">Sed sit amet justo sed odio tempus tempus. Vestibulum sed varius mi, sit amet condimentum lacus.</p>
                    </AnchorLink>
                    </li>

                </ul>
            </nav>
            <div className="content">
                <Section id='section1' color='tomato'>
                    <Container>
                        <h2 className={cls.title}>Section</h2>
                    </Container>
                </Section>
                <Section id='section2' color='blue'>
                    <Container>
                        <h2 className={cls.title}>Section</h2>
                    </Container>
                </Section>
                <Section id='section3' color='orange'>
                    <Container>
                        <h2 className={cls.title}>Section</h2>
                    </Container>
                </Section>
                <Section id='section4' color='purple'>
                    <Container>
                        <h2 className={cls.title}>Section</h2>
                    </Container>
                </Section>
                <Section id='section5' color='green'>
                    <Container>
                        <h2 className={cls.title}>Section</h2>
                    </Container>
                </Section>
                <Section id='section6' color='yellow'>
                    <Container>
                        <h2 className={cls.title}>Section</h2>
                    </Container>
                </Section>
            </div>
        </article>
    )
}

export default Landing