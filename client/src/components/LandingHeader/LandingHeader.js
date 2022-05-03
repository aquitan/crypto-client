import React, {useEffect, useState} from 'react'
import Logo from '../UI/Logo/Logo'
import NavBtn from '../UI/NavBtn/NavBtn'
import cls from './LandingHeader.module.scss'
import Preloader from "../UI/Preloader/Preloader";
import {store} from "../../index";
import {observer} from "mobx-react-lite";
import {postData} from "../../services/StaffServices";


const LandingHeader = () => {
    const [state, setState] = useState('')

    useEffect(() => {
        getDomain()
    }, [])

    const getDomain = async () => {
        const res = await postData('/get_domain_params/', {domainName: window.location.host})
        setState(res.data.domainInfo)
    }

    return (
        <header className={cls.landing_header}>
            <div className={cls.row}>
                <div className={cls.col}>
                    <Logo/>
                    <h4 className={cls.domain_header}>
                        {state ? state.domainName : 'Loading...'}
                    </h4>
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