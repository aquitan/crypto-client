import React, {useEffect, useState} from 'react'
import { useNavigate} from "react-router-dom";
import {getData, postData} from '../../../services/StaffServices';
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import './landing.scss'
import LandingSkeleton from '../LandingSkeleton/LandingSkeleton';
import LandingOne from '../LandingOne/LandingOne';
import LandingTwo from '../LandingTwo/LandingTwo';
import { Skeleton } from '@mui/material';


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
            <>
              <div className='d-flex' style={{backgroundColor: '#fff', padding: '20px 40px', boxShadow: '0 0 5px 1px rgba(0,0,0, .2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Skeleton sx={{mb: 2}} variant="rectangular" width={100} height={40} />
                <div style={{display: 'flex'}}>
                  <Skeleton sx={{mx: 1}} variant="rectangular" width={50} height={20} />
                  <Skeleton sx={{mx: 1}} variant="rectangular" width={50} height={20} />
                  <Skeleton sx={{mx: 1}} variant="rectangular" width={50} height={20} />
                  <Skeleton sx={{mx: 1}} variant="rectangular" width={50} height={20} />
                </div>
                <div style={{display: 'flex'}}>
                  <Skeleton sx={{mb: 2, mx: 2}} variant="rectangular" width={100} height={40} />
                  <Skeleton sx={{mb: 2}} variant="rectangular" width={100} height={40} />
                </div>
              </div>
              <LandingSkeleton/>
            </>
            
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