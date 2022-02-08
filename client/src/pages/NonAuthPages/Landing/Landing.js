import React, {useState} from 'react'
import LandingHeader from '../../../components/LandingHeader/LandingHeader'
import Section from '../../../layouts/Section/Section'
import cls from './Landing.modules.scss'
import './landing.scss'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {Container} from "react-bootstrap";


const Landing = () => {

    const [active, setActive] = useState('')

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
        </article>
    )
}

export default Landing