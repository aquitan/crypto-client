import React from 'react'
import Logo from '../UI/Logo/Logo'
import NavBtn from '../UI/NavBtn/NavBtn'
import cls from './LandingHeader.module.scss'


const LandingHeader = ({data}) => {

    const {domain_detail} = data
    console.log('data land', domain_detail)
    return (
        <header className={cls.landing_header}>
            <div className={cls.row}>
                <div className={cls.col}>
                    <Logo/>
                    <h4 className={cls.domain_header}>{domain_detail[0].domain_name}</h4>

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