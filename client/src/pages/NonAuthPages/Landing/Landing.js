import React, {useEffect, useState} from 'react'
import LandingHeader from '../../../components/LandingHeader/LandingHeader'
import './landing.scss'
import {postData} from "../../../services/StaffServices";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {store} from "../../../index";


const Landing = () => {
    const [state, setState] = useState()

    useEffect( () => {
        sendDomainName()
    }, [])

    const sendDomainName = async () => {
        const res = await postData('/get_domain_params/', {domainName: window.location.host})
        setState(res.data)
        store.setDomain(res.data.domainInfo.domain_info)
        store.setTerms(res.data.domainInfo.domain_terms)
    }


    console.log('header state', state)

    return (
        <article >
            <LandingHeader data={state?.domainInfo} />
        </article>
    )
}

export default Landing