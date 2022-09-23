import React, {useEffect, useState} from 'react'
import {Col, Nav, Row, Tab, Tabs} from 'react-bootstrap';
import MyAccount from "../MyAccount/MyAccount";
import AccountSecurity from "../AccountSecurity/AccountSecurity";
import KYC from "../KYC/KYC";
import {getGeoData} from "../../../queries/getSendGeoData";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {postData} from "../../../services/StaffServices";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {store} from "../../../../index";
import {dateToTimestamp} from "../../../utils/dateToTimestamp";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import cls from './Profile.module.scss'
import Button from "../../../components/UI/Button/Button";
import PaymentOptions from "./PaymentOptions/PaymentOptions";
import classNames from "classnames/bind";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {faFile, faHeadset, faLock, faPhone, faUser, faWallet} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import UserService from '../../../services/UserService';

const Profile = () => {
    const [profileData, setProfileData] = useState()
    const [state, setState] = useState(false)
    const {theme} = useThemeContext(ThemeContext)
    const [currentLink, setCurrentLink] = useState('account')
    const [nameEdit, setNameEdit] = useState(false)
    const [changeName, setChangeName] = useState('')
    const [newName, setNewName] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const cx = classNames.bind(cls)
    const classes = cx('profileLink', theme)


    const getProfile = async () => {
        let geodata =  await getGeoData()
        geodata.currentDate = getCurrentDate(dateToTimestamp())
        geodata.domainName = window.location.host
        delete geodata.id
        delete geodata.email
        delete geodata.logTime
        geodata.userId = store.user.id
        geodata.userEmail = store.userEmail
        let userLocation = location.pathname.split(/[\\\/]/)
        if (geodata) geodata.userAction = userLocation[userLocation.length - 1]

        const res = await postData('/personal_area/profile/', geodata)
        setProfileData(res.data)
        const data = await res.data
        setProfileData(data)
        setChangeName(res.data.user.name)

    }

    const checkPromocodeProfile = async () => {
        const obj = {
            domainName: window.location.host
        }
        const res = await postData('/get_promocodes_before_signup/', obj)
        setState(res.data.promocode)
    }

    useEffect(() => {
        getProfile()
        checkPromocodeProfile()
    }, [])

    if (!profileData) {
        return <Preloader />
    }

    const onLogout= async () => {
        await store.logout()
        await store.setIsStaff(false)
        navigate('/')
    }

    const renderProfilePages = () => {
        if (currentLink === 'account') {
            return <MyAccount promocode={state} data={profileData?.user}/>
        } else if (currentLink === 'security') {
            return <AccountSecurity data={profileData?.user} />
        } else if (currentLink === 'payment') {
            return <PaymentOptions />
        } else {
            return <KYC status={profileData?.user}/>
        }
    }

    const onEditNameHandler = async () => {
        setNameEdit(!nameEdit)
        if (newName.length > 3) {
            let geodata =  await getGeoData()
            geodata.userName = newName
            delete geodata.id
            delete geodata.email
            geodata.userEmail = store.userEmail
            geodata.userId = store.user.id
            const response = await UserService.editUser(geodata)
        }
    }


    return (
        <>
            <Row>
                <Col className='col-12 col-lg-4'>
                    <ButtonCard theme={theme}>
                        <Row className='text-center mb-5'>
                            <Row className='mb-3'>
                                <div>
                                    <img height={70} width={'auto'} src={'/img/avatar-svg-round.svg'} alt=""/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <div style={{display: 'flex', justifyContent: 'center', fontSize: 20, fontWeight: 'bold'}}>
                                    <span style={{cursor: 'pointer'}} onClick={onEditNameHandler}>
                                        <img src={'/img/edit.svg'} alt=""/>
                                    </span>
                                    <div>
                                        {
                                            !nameEdit ? profileData?.user === '' ? '-' : profileData?.user.name :
                                              <input onChange={e => setNewName(e.target.value)} style={{backgroundColor: 'transparent', border: 'none'}} type="text" value={newName} />
                                        }
                                    </div>
                                </div>
                                <div>{profileData?.user === '' ? '-' : profileData?.user.email}</div>
                            </Row>
                            <Row className='mb-2'>
                                <Button classname={['btnBlue', 'btnSmall', 'btnRed']} onClick={onLogout}>Logout</Button>
                            </Row>
                        </Row>
                        <Row className='d-flex flex-column align-items-start'>
                            <div className={classes} onClick={() => setCurrentLink('account')}>
                                <FontAwesomeIcon icon={faUser} />
                                <div style={{marginLeft: 20}}>My Profile</div>
                            </div>
                            <div className={classes} onClick={() => setCurrentLink('security')}>
                                <FontAwesomeIcon icon={faLock} />
                                <div style={{marginLeft: 20}}>Security</div>
                            </div>
                            <div className={classes} onClick={() => setCurrentLink('kyc')}>
                                <FontAwesomeIcon icon={faFile} />
                                <div style={{marginLeft: 20}}>KYC Verification</div>
                            </div>
                            <div className={classes} onClick={() => setCurrentLink('payment')}>
                                <FontAwesomeIcon icon={faWallet} />
                                <div style={{marginLeft: 20}}>Payment Options</div>
                            </div>
                            <div className={classes}>
                                <FontAwesomeIcon icon={faHeadset} />
                                <Nav.Link className={classes} style={{padding: 0, marginLeft: 20}} to={'/support'} as={NavLink}>Profile Support</Nav.Link>
                            </div>
                            <div className={classes}>
                                <FontAwesomeIcon icon={faPhone} />
                                <Nav.Link className={classes} style={{padding: 0, marginLeft: 20}} to={'/support-us'} as={NavLink}>Support Us</Nav.Link>
                            </div>
                        </Row>
                    </ButtonCard>
                </Col>
                <Col>
                    <ButtonCard theme={theme}>
                        {renderProfilePages()}
                    </ButtonCard>
                </Col>
            </Row>
            {/*<Tabs>*/}
            {/*    <Tab eventKey='profile' title='My Account'>*/}
            {/*        <MyAccount promocode={state} data={profileData?.user}/>*/}
            {/*    </Tab>*/}
            {/*    <Tab eventKey='security' title='Security'>*/}
            {/*        <AccountSecurity data={profileData?.user}/>*/}
            {/*    </Tab>*/}
            {/*    <Tab eventKey='kyc' title='Verification'>*/}
            {/*        <KYC status={profileData?.user}/>*/}
            {/*    </Tab>*/}
            {/*</Tabs>*/}
        </>
    )
}

export default Profile