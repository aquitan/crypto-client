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

const MyAccount = (props) => {
    console.log('my acc', props)
    const [name, setName] = useState(props.name)
    const [changeName, setChangeName] = useState(false)
    const [learnMore, setLearnMore] = useState(false)

    const onChangeName = (e) => {
        setName(e.target.value)
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

    return (
        <Container>
            <h1>My Account</h1>
            <Modal active={learnMore} setActive={setLearnMore}>
                <Row>
                    <h4>For more info please contact our support!</h4>
                </Row>
                <Row>
                    <Button onClick={() => setLearnMore(false)}>Ok</Button>
                </Row>
            </Modal>
            <Row className='mb-3 mt-3'>
                <div className='d-flex'>
                    <div>Upgrade your account to unlock full features and increase your limit of transaction amount.&nbsp;</div>
                    <b onClick={() => setLearnMore(true)}> Learn more &nbsp;</b>
                    <Button classname='small'>Upgrade</Button>
                </div>
            </Row>
            <Row className={cls.account_row}>
                <Col>
                    <div>Name</div>
                </Col>
                <Col className='d-flex align-items-center'>
                    <span>{!changeName ? <div>{name === '' ? '-' : name} &nbsp;</div> : <Input classname='input_small' onChange={onChangeName} />}</span>
                    <Button classname='small' onClick={setNewName}>{changeName ? 'Change' : 'Change name'}</Button>
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
                    <div>-</div>
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
            <Row className={cls.account_row}>
                <Col>
                    <div>Premium status</div>
                </Col>
                <Col>
                    <div>{store.premiumStatus ? 'Premium' : 'Base'}</div>
                </Col>
            </Row>
        </Container>
    )
}

export default observer(MyAccount)