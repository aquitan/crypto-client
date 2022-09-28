import React, {useEffect, useState} from 'react'
import { useNavigate} from "react-router-dom";
import {getData, postData} from '../../../services/StaffServices';
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import './landing.scss'
import LandingSkeleton from '../LandingSkeleton/LandingSkeleton';
import LandingOne from '../LandingOne/LandingOne';
import LandingTwo from '../LandingTwo/LandingTwo';


const Landing = () => {
    const [state, setState] = useState('')
    const {theme} = useThemeContext(ThemeContext)
    const navigate = useNavigate()
    useEffect(() => {
        getDomain()
    }, [])

    const getDomain = async () => {
        const res = await getData(`/get_domain_params/${window.location.host}`)
        setState(res.data.domainInfo)
    }



    return (
      <>
          {!state ? (
            <LandingSkeleton/>
          )
          : (
              state.landingName === 'one' || !state.landingName ? <LandingOne state={state} theme={theme} navigate={navigate}/> :
                <LandingTwo state={state} theme={theme} navigate={navigate} />
            )
          }
      </>

    )
}

export default Landing