import React, {useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import cls from './MyAccount.module.scss'
import Button from "../../../components/UI/Button/Button";
import UserService from "../../../services/UserService";

const MyAccount = (props) => {

    const [name, setName] = useState(props.data.name)
    const [changeName, setChangeName] = useState(false)
    console.log('my acc', props)

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const setNewName = async () => {
        if (changeName) {
            const response = await UserService.editUser({name})
            setChangeName(false)
        } else {
            setChangeName(true)
        }

    }

    return (
        <Container>
            <h1>My Account</h1>
            <Row className={cls.account_row}>
                <Col>
                    <div>Name</div>
                </Col>
                <Col>
                    {!changeName ? <div>{name === '' ? '-' : name}</div> : <input onChange={onChangeName} />}
                    <button onClick={setNewName}>{changeName ? 'Change' : 'Change name'}</button>
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
        </Container>
    )
}

export default MyAccount