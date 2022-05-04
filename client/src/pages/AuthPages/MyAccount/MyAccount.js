import React, {useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import cls from './MyAccount.module.scss'
import Button from "../../../components/UI/Button/Button";
import UserService from "../../../services/UserService";
import {store} from "../../../index";
import {getGeoData} from "../../../queries/getSendGeoData";
import Modal from "../../../components/UI/Modal/Modal";
import {observer} from "mobx-react-lite";
import Input from "../../../components/UI/Input/Input";
import {postData} from "../../../services/StaffServices";
import {useNavigate} from "react-router-dom";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";

const MyAccount = (props) => {
    const [name, setName] = useState(props.name)
    const [promo, setPromo] = useState()
    const [changeName, setChangeName] = useState(false)
    const [learnMore, setLearnMore] = useState(false)
    const navigate = useNavigate()

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onPromocodeChange = (e) => {
        setPromo(e.target.value)
    }
    const setNewName = async () => {
        let geodata =  await getGeoData()
        if (changeName) {
            geodata.userName = name
            delete geodata.id
            delete geodata.email
            geodata.userEmail = store.userEmail
            geodata.userId = store.userId
            const response = await UserService.editUser(geodata)
            setChangeName(false)
            if (response.status === 200) {
                store.setNotification({
                    date: geodata.currentDate,
                    message: 'name changed successfully'
                })
            }
        } else {
            setChangeName(true)
        }

    }

    const promoUse = async () => {
        let geodata =  await getGeoData()
        geodata.code = promo
        geodata.userId = store.userId
        geodata.userEmail = store.userEmail
        geodata.domainName = window.location.host
        delete geodata.id
        delete geodata.email
        geodata.userId = store.userId
        geodata.userEmail = store.userEmail

        const res = await postData('/use_promocode_in_profile/', geodata)
    }

    console.log('props.data', props.data)

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
            <h2 className='mt-3 mb-3'>My Account</h2>

            <ButtonCard>
                <Row className='mb-3 mt-3'>
                    {
                        !store.premiumStatus ?
                            <div className='d-flex'>
                                <div>Upgrade your account to unlock full features and increase your limit of transaction amount.&nbsp;</div>
                                <b onClick={() => setLearnMore(true)}> Learn more &nbsp;</b>
                                <Button classname='small' onClick={() => navigate('/premium-benefits')}>Upgrade</Button>
                            </div>
                            : null
                    }
                </Row>
            </ButtonCard>
            <ButtonCard>
                <Row>
                    <Col>
                        <Row className={cls.account_row}>
                            <Col>
                                <div>Name</div>
                            </Col>
                            <Col className='d-flex align-items-center'>
                                <span>{props.data.name === '' ? '-' : props.data.name}</span>
                                {/*<Button classname='small' onClick={setNewName}>{changeName ? 'Change' : 'Change name'}</Button>*/}
                            </Col>
                        </Row>
                        <Row className={cls.account_row}>
                            <Col>
                                <div>Email</div>
                            </Col>
                            <Col>
                                <div>{props.data.email === '' ? '-' : props.data.email}</div>
                            </Col>
                        </Row>
                        <Row className={cls.account_row}>
                            <Col>
                                <div>Phone</div>
                            </Col>
                            <Col>
                                <div>{props.data.phoneNumber === null ? '-' : props.data.phoneNumber}</div>
                            </Col>
                        </Row>
                        <Row className={cls.account_row}>
                            <Col>
                                <div>Registration date</div>
                            </Col>
                            <Col>
                                <div>01.01.2020</div>
                            </Col>
                        </Row>
                        {
                            props.promocode ?
                                <Row className={cls.account_row}>
                                    <Col>
                                        <div>Use promocode</div>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Input classname='input_small' onChange={onPromocodeChange} placeholder='enter promocode' />
                                            </Col>
                                            <Col>
                                                <Button classname='small' onClick={promoUse}>Use</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                : null
                        }
                        <Row className={cls.account_row}>
                            <Col>
                                <div>Premium status</div>
                            </Col>
                            <Col>
                                <div>{store.premiumStatus ? 'Premium' : 'Base'}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ButtonCard>
        </>
    )
}

export default observer(MyAccount)