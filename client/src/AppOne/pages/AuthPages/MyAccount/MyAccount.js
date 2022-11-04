import React, {useState} from 'react'
import {Col, Row} from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";
import UserService from "../../../services/UserService";
import {store} from "../../../../index";
import {getGeoData} from "../../../queries/getSendGeoData";
import Modal from "../../../components/UI/Modal/Modal";
import {observer} from "mobx-react-lite";
import Input from "../../../components/UI/Input/Input";
import {postData} from "../../../services/StaffServices";
import {useNavigate} from "react-router-dom";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";
import { getSwitchQuery } from '../../../utils/getSwitchQuery';

const MyAccount = (props) => {
    const [name, setName] = useState(props.name)
    const [promo, setPromo] = useState()
    const [changeName, setChangeName] = useState(false)
    const [learnMore, setLearnMore] = useState(false)
    const navigate = useNavigate()
    const {theme} = useThemeContext(ThemeContext)

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onPromocodeChange = (e) => {
        setPromo(e.target.value)
    }

    const promoUse = async () => {
        let geodata =  await getGeoData()
        geodata.code = promo
        geodata.userId = store.user.id
        geodata.userEmail = store.userEmail
        geodata.domainName = window.location.host
        delete geodata.id
        delete geodata.email
        geodata.userId = store.user.id
        geodata.userEmail = store.userEmail

        const res = await postData(getSwitchQuery('/use_promocode_in_profile/'), geodata)
    }


    return (
        <>
            <Modal active={learnMore} setActive={setLearnMore}>
                <Row className='mb-3 text-center'>
                    <h4>For more info please contact our support!</h4>
                </Row>
                <Row className='mb-3 justify-content-center'>
                    <Col className='col-12 col-sm-6'>
                        <Button onClick={() => setLearnMore(false)}>Ok</Button>
                    </Col>
                </Row>
            </Modal>
            <Row className='mb-5'>
                <h2>My Profile</h2>
            </Row>
            <Row style={{color: 'rgb(109, 112, 119)', fontWeight: 'bold'}} className='mb-2'>
                <div>Personal information</div>
            </Row>
            <Row className=''>
                <Col className='col-12 col-md-6 mb-4'>
                    <div style={{color: theme === 'light' ? '#6C7080' : '#fff'}} className='mb-2'>Your Email</div>
                    <Input classname={['inputTransparent', theme]} value={props.data.email} disabled/>
                </Col>
                <Col className='col-12 col-md-6 mb-4'>
                    <div style={{color: theme === 'light' ? '#6C7080' : '#fff'}} className='mb-2'>Your Display Name</div>
                    <Input classname={['inputTransparent', theme]} value={props.data.name ? props.data.name : '-'} disabled/>
                </Col>
            </Row>
            <Row className='mb-4'>
                <Col>
                    <div style={{color: theme === 'light' ? '#6C7080' : '#fff'}} className='mb-2'>Your Phone Number</div>
                    <Input classname={['inputTransparent', theme]} value={props.data.phoneNumber ? props.data.phoneNumber : '-'} disabled/>
                </Col>
            </Row>
            <Row className='mt-5 mb-4'>
                <hr />
            </Row>
            <Row style={{color: 'rgb(109, 112, 119)', fontWeight: 'bold'}} className='mb-4'>
                <div>Account information</div>
            </Row>
            <Row className='mb-4'>
                <Col className='d-flex align-items-center'>
                    <div style={{fontSize: 18, fontWeight: 'bold'}}>Account status</div>
                    <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8', marginLeft: 10}} className="badge d-none d-xl-flex">{store.premiumStatus ? 'Premium' : 'Base'}</div>
                </Col>
                <Col className='d-flex align-items-center'>

                </Col>
            </Row>
            <Row className='mb-4'>
                {
                    !store.premiumStatus ?
                        <Col className='mb-4 col-12 col-md-6'>
                            <div style={{marginBottom: 10}}>Upgrade your account to unlock full features and increase your limit of transaction amount.&nbsp;
                                <b style={{cursor: 'pointer', color: '#ccc', marginBottom: 10}} onClick={() => setLearnMore(true)}> Learn more &nbsp;</b>
                            </div>
                            {/* <div>
                                <Button style={{height: 50}} classname='btnBlue' onClick={() => navigate('/premium-benefits')}>Upgrade</Button>
                            </div> */}

                        </Col> : null
                }
                <Col className='d-flex col-12 col-md-6'>
                    <div className='d-flex align-items-baseline flex-wrap'>
                        <Input style={{width: '100%'}} classname={['inputTransparent', theme]} onChange={onPromocodeChange} placeholder='Use promocode' />
                        <Button onClick={promoUse}  style={{height: 50, marginLeft: 10, marginTop: 5}} classname='btnBlue'>Confirm</Button>
                    </div>
                </Col>

            </Row>

        </>
    )
}

export default observer(MyAccount)