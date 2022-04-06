import React, {useEffect, useState} from 'react'
import Logo from '../UI/Logo/Logo'
import NavBtn from '../UI/NavBtn/NavBtn'
import cls from './LandingHeader.module.scss'
import Preloader from "../UI/Preloader/Preloader";
import {store} from "../../index";
import {observer} from "mobx-react-lite";


const LandingHeader = () => {
    const [state, setState] = useState()

    useEffect(() => {
        setState(store.domain.domain_name)
    }, [store.domain])

    return (
        <header className={cls.landing_header}>
            <div className={cls.row}>
                <div className={cls.col}>
                    <Logo/>
                    <h4 className={cls.domain_header}>{state}</h4>
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

export default observer(LandingHeader)