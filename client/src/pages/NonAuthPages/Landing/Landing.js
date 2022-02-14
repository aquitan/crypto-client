import React, {useEffect, useState} from 'react'
import LandingHeader from '../../../components/LandingHeader/LandingHeader'
import './landing.scss'
import {getData} from "../../../services/StaffServices";
import Preloader from "../../../components/UI/Preloader/Preloader";


const Landing = () => {
    const [state, setState] = useState()

    useEffect(async () => {
        const abortController = new AbortController();
        const res = await getData(`/staff/domains/domain_detail/1`)
        setState(res.data)
        console.log('set data landing');
        return function cleanup(){
            console.log('I am in cleanup function');
            abortController.abort();
        }
    }, [])

    return (
        <article >
            {
                state ? <LandingHeader data={state}/> : <Preloader />
            }
        </article>
    )
}

export default Landing