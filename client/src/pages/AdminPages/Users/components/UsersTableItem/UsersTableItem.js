import React, {useState} from 'react'
import cls from '../../Users.module.scss'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const UsersTableItem = (props) => {
    const navigate = useNavigate()
    console.log('user props', props)
    return (
        <div className={cls.table_item}>
            <Row>
                <Col>{props.id}</Col>
                <Col>{props.registerDate}</Col>
                <Col>{props.name}</Col>
                <Col>{props.email}</Col>
                <Col>{props.kycStatus ? <FontAwesomeIcon color='green' icon={faCheck} /> : <FontAwesomeIcon color='tomato' icon={faTimesCircle} />}</Col>
                <Col><AdminButton classname='green' onClick={() => navigate(`/staff/users/${props.id}`)}>User details</AdminButton></Col>
            </Row>
        </div>
    )
}

export default UsersTableItem