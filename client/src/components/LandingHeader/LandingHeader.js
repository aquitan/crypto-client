import React from 'react'
import Button from '../UI/Button/Button'
import HeaderLink from '../UI/HeaderLink/HeaderLink'
import Logo from '../UI/Logo/Logo'
import NavBtn from '../UI/NavBtn/NavBtn'
import cls from './LandingHeader.module.scss'


const LandingHeader = () => {
    return (
        <header className={cls.landing_header}>
            <div className={cls.row}>
                <div className={cls.col}>
                    <Logo/>
                    <HeaderLink to='/features'>Features</HeaderLink>
                    <HeaderLink to='/prices'>Prices</HeaderLink>
                    <HeaderLink to='/learn'>Learn</HeaderLink>

                </div>
                
                <div className={cls.col}>
                    <NavBtn to='/signin'>
                        Sign In
                    </NavBtn>
                    <NavBtn to='signup'>
                        Sign up
                    </NavBtn>
                </div>
            </div>
        </header>
    )
}

export default LandingHeader