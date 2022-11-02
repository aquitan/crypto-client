import React, {useEffect, useState} from 'react'
import {Col, Row} from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import Input from "../../../components/UI/Input/Input";
import {useForm} from 'react-hook-form'
import {getGeoData} from "../../../queries/getSendGeoData";
import {store} from "../../../../index";
import {getData, patchData, postData} from "../../../services/StaffServices";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {observer} from "mobx-react-lite";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {useLocation, useNavigate} from "react-router-dom";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import CustomModal from '../../../components/CustomModal/CustomModal';
import {checkDeviece} from '../../../utils/checkDevice';
import { getSwitchQuery } from '../../../utils/getSwitchQuery';

const AccountSecurity = (props) => {
    const {theme} = useThemeContext(ThemeContext)
    const location = useLocation()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const {register: twoFaReg, handleSubmit: twoFaHandle} = useForm({
        mode: "onChange"
    })
    const [passwordModal, setPasswordModal] = useState(false)
    const [faType, setFaType] = useState('')
    const [showBot, setShowBot] = useState(false)
    const [tgCode, setTgCode] = useState('')
    const [googleCode, setGoogleCode] = useState('')
    const [state, setState] = useState({
        isModal: false,
        isStatus: false,
        type2FA: '',
        twoFaCode: '',
        fieldShow: false,
        modal2FA: false,
    })
    const [codeFromTg, setCodeFromTg] = useState('')
    const [botCode, setBotCode] = useState('')
    const [status, setStatus] = useState(props.data.twoStepStatus)

    const showChangePass = () => {
        setState({...state, isModal: true})
    }
    const show2FA = () => {
        setState({...state, modal2FA: true})
    }

    const onChangePassword = async (data) => {
        data.id = store.user.id
        let geodata =  await getGeoData()
        geodata.id = store.user.id
        delete geodata.email
        geodata.userEmail = store.userEmail
        geodata.newPassword = data.newPassword
        geodata.domainName = window.location.host
        const res = await patchData(getSwitchQuery('/personal_area/security/change_password'), geodata)
        if (res.status === 200) {
            setPasswordModal(true)
            setState({...state, isStatus: 'complete'})
        }
    }

    const disable2FA = async () => {
        let geodata =  await getGeoData()
        delete geodata.id
        delete geodata.email
        geodata.userId = store.user.id
        geodata.userEmail = store.userEmail
        geodata.userAction = '2FA Turned Off'
        const res = await patchData(getSwitchQuery('/personal_area/security/disable_two_step_status/'), geodata)
        if (res.status === 200) {
            setStatus(false)
        }
    }

    const onClickSelect = async (e, val) => {
        e.preventDefault()
        setFaType(val)
        let geodata = await getGeoData()
        const obj = {
            domainName: window.location.host,
            userEmail: store.userEmail,
            userId: store.user.id,
            twoFaType: val,
            twoFaStatus: true,
            currentTime: dateToTimestamp(),
            companyYear: store.domain.companyYear,
            deviceName: checkDeviece(),
            ipAddress: geodata.ipAddress
        }

        try {
            const res = await patchData(getSwitchQuery('/personal_area/security/'), obj)
            if (!res.data.bot) {
                setState({
                    ...state,
                    twoFaCode: res.data.userCode ? res.data.userCode : res.data,
                    fieldShow: true,
                })
                setShowBot(false)
            } else {
                setShowBot(true)
                setCodeFromTg(res.data.code)
                setBotCode(res.data.code)
            }
        } catch(e) {
            navigate('/error-400')
        }
    }

    const onSubmit = async (data) => {
        const geodata = await getGeoData()
        geodata.userId = store.user.id
        geodata.userEmail = store.userEmail
        geodata.domainName = window.location.host
        geodata.twoFaStatus = true
        geodata.twoFaType = 'telegram'
        geodata.enableDate = dateToTimestamp()


        const res = await postData(getSwitchQuery('/personal_area/security/two_step_enable/'), geodata)
        setCodeFromTg(res.data.code)
        if (res.status === 200) {
            setStatus(true)
            store.setTwoFactor(true)
            checkTgTwoStep()
        }
        handleModalClose()
        if (data.code === state.twoFaCode) {

        } else {
            console.log('error')
        }
    }

    const handleModalClose = () => {
        setState({
            isModal: false,
            isStatus: '',
            type2FA: '',
            twoFaCode: '',
            fieldShow: false,
            modal2FA: false
        })
        checkTgTwoStep()
    }

    const onConfirmChange = () => {
        navigate('/')
        store.logout()
    }

    // const onChangeVal = (e) => {
    //     setFaType(e.target.value)
    //     console.log('value',  e.target.value)
    // }

    const checkTgTwoStep = async () => {
        let geodata =  await getGeoData()
        geodata.currentDate = getCurrentDate(dateToTimestamp())
        geodata.domainName = window.location.host
        delete geodata.id
        delete geodata.email
        geodata.userId = store.user.id
        geodata.userEmail = store.userEmail
        let userLocation = location.pathname.split(/[\\\/]/)
        if (geodata) geodata.userAction = userLocation[userLocation.length - 1]

        const res = await postData(getSwitchQuery('/personal_area/profile/'), geodata)
        setStatus(res.data.user.twoStepStatus)
    }

    useEffect(() => {
        checkTgTwoStep()
    }, [])

    const validateGoogleCode = async (e) => {
        e.preventDefault()
        await getData(`${getSwitchQuery('/personal_area/security/validate_google_code/')}${tgCode}`)
        checkTgTwoStep()
    }

    return (
        <>

            <CustomModal
                title={'Password'}
                show={passwordModal}
                size={'md'}
                btnClose={'Close'}
                handleClose={() => setPasswordModal(false)}>
                Password was changed
            </CustomModal>

            <div className='mb-5 d-flex align-items-center'>
                <h2>TwoFA status</h2>
                <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8', marginLeft: 10}}
                     className="badge d-none d-xl-flex">{status ? 'Enabled' : 'Disabled'}</div>
            </div>
            {
                status ? (
                    <Row className='align-items-center'>
                        <Col>
                            <span style={{display: 'inline-block', fontSize: 20, color: 'rgb(108, 112, 128)'}}> Disable Two Factor Authentication</span>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button style={{height: 50}} classname='btnBlue' onClick={disable2FA}>Disable</Button>
                        </Col>
                    </Row>
                ) :
                    (
                        <div style={{margin: 0, padding: 0}} classnames={['formFullWidth', 'mb-5']}>
                            <Row className='align-items-center mb-3'>
                                <Col className='d-flex align-items-center p-0 mb-2'>
                                    <div 
                                    className='d-flex justify-content-center align-items-center'
                                    style={{height: 40, width: 40, backgroundColor: 'rgb(86, 178, 255)', borderRadius: 5, marginRight: 10}}>
                                      <img src={'/img/email-at.svg'} alt='Image' />
                                    </div>
                                    <span style={{fontSize: 18}}>Email Authentication</span>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button style={{height: 40}} classname='btnBlue' onClick={(e) => onClickSelect(e, 'email')}>Select</Button>
                                </Col>
                            </Row>


                            <Row className='align-items-center mb-3'>
                                <Col className='d-flex align-items-center p-0 mb-2'>
                                    <div
                                      className='d-flex justify-content-center align-items-center'
                                      style={{height: 40, width: 40, backgroundColor: 'rgb(109, 231, 182)', borderRadius: 5, marginRight: 10}}>
                                        <img src={'/img/telegram.svg'} alt='Image' />
                                    </div>
                                    <span style={{fontSize: 18}}>Telegram Authentication</span>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button style={{height: 40}} classname='btnBlue'  onClick={(e) => onClickSelect(e, 'telegram')}>Select</Button>
                                </Col>
                            </Row>


                            <Row className='align-items-center mb-3'>
                                <Col className='d-flex align-items-center p-0 mb-2'>
                                    <div
                                      className='d-flex justify-content-center align-items-center'
                                      style={{height: 40, width: 40, backgroundColor: 'rgb(248, 112, 112)', borderRadius: 5, marginRight: 10}}>
                                        <img src={'/img/google.svg'} alt='Image' />
                                    </div>
                                    <span style={{fontSize: 18}}>Google Authentication</span>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button style={{height: 40}} classname='btnBlue'  onClick={(e) => onClickSelect(e, 'google')}>Select</Button>
                                </Col>
                            </Row>


                            <Row>
                                {
                                    state.fieldShow && faType !== 'google' && faType !== 'telegram' ?  <Input classname='inputTransparent' {...twoFaReg('code')} placeholder='Code'/>
                                     : faType === 'google' ?
                                       
                                      <Row>
                                        <Row className='mb-3'>
                                            <Col>
                                                <div style={{color: 'rgb(108, 112, 128)'}}>Scan QR code to get verification code</div>
                                                <img style={{width: 200, height: 'auto'}} src={state.twoFaCode} alt='qr-code' />
                                            </Col>
                                        </Row>
                                        <Row className='d-flex'>
                                            <Col>
                                                <Input classname='inputTransparent' value={googleCode} onChange={(e) => setGoogleCode(e.target.value)} placeholder='Code'/>
                                            </Col>
                                            <Col>
                                                <Button classname={['btnBlue']} onClick={validateGoogleCode}>Validate</Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                      : null
                                }
                                {
                                    showBot ? <>
                                        <Row>
                                            <Row className='mb-3'>
                                                <Col>
                                                    <a style={{color: 'rgb(108, 112, 128)'}} href={'https://t.me/twoStepCodeSender_bot'} target='_blank'>Click this link to telegram Bot and paste this code</a> <b>{codeFromTg}</b>
                                                </Col>
                                            </Row>
                                        </Row>

                                    </> : null
                                }
                            </Row>

                            
                            { faType && faType !== 'telegram' && faType !== 'google' ?
                              !showBot && <Row className='mt-3 px-2 justify-content-end'>
                                  <Button style={{width: 140}} classname='btnBlue' onClick={twoFaHandle(onSubmit)}>Confirm</Button>
                              </Row> : null
                            }
                        </div>
                    )
            }


            <Row className='mb-4 mt-4'>
                <hr />
            </Row>

            <Form style={{padding: 0, margin: 0}} classnames={['formFullWidth', 'mb-3', 'mt-4']} onSubmit={handleSubmit(onChangePassword)}>
                <h2>Password</h2>
                <Row className='mb-4 mt-4'>
                    <div style={{color: theme === 'light' ? '#6C7080' : '#fff'}} className='mb-2'>Old password</div>
                    <Input classname={['inputTransparent', theme]} name='oldPassword'/>
                </Row>
                <Row className='mb-3'>
                    <div style={{color: theme === 'light' ? '#6C7080' : '#fff'}} className='mb-2'>New password</div>
                    <Input classname={['inputTransparent', theme]} {...register('newPassword')} name='newPassword'/>
                </Row>
                <Row className='p-0 align-items-center'>
                    <Col style={{color: 'rgb(108, 112, 128)', fontSize: 14}} className='col-12 col-md-8 p-0'>
                        To ensure your account is well protected, please use 8 or more characters with a mix of letters, numbers & symbols.
                    </Col>
                    <Col className='col-12 col-md-4 d-flex justify-content-end p-0'>
                        <Button classname='btnBlue'>Save password</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default observer(AccountSecurity)