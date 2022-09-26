import React, {useEffect, useState} from 'react'
import LandingHeader from '../../../components/LandingHeader/LandingHeader'
import {Link, useNavigate} from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import LandingContent from "./components/LandingContent/LandingContent";
import LandingBlock from "./components/LandingBlock/LandingBlock";
import {Col, Row} from "react-bootstrap";
import Logo from "../../../components/UI/Logo/Logo";
import {postData} from "../../../services/StaffServices";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import './landing.scss'
import {MouseParallaxChild, MouseParallaxContainer} from "react-parallax-mouse";
import Button from "../../../components/UI/Button/Button";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {Skeleton} from '@mui/material';
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
        const res = await postData('/get_domain_params/', {domainName: window.location.host})
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