import React from 'react'
import Logo from '../UI/Logo/Logo'
import NavBtn from '../UI/NavBtn/NavBtn'
import cls from './LandingHeader.module.scss'
import Preloader from "../UI/Preloader/Preloader";


const LandingHeader = ({data}) => {

    console.log('domain')
    return (
        <header className={cls.landing_header}>
            <div className={cls.row}>
                <div className={cls.col}>
                    <Logo/>
                    {
                        data ?
                        <h4 className={cls.domain_header}>{data.domain_info.domain_name}</h4> : <Preloader />
                    }

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