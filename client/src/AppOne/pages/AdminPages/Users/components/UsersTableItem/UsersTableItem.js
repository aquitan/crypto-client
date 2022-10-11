import React, {useState} from 'react'
import cls from '../../Users.module.scss'
import {Col, Row} from "react-bootstrap";
import AdminButton from "../../../../../components/UI/AdminButton/AdminButton";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";

const UsersTableItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className={cls.table_item}>
            <Row>
                <Col className='d-none d-md-block col-2 text-center'>{getCurrentDate(props.registerDate)}</Col>
                <Col className='d-none d-md-block col-2 col-md-2 text-center'>{props.name}</Col>
                <Col className='col-6 col-md-2 text-center'><span onClick={() => navigate(`/staff/users/${props.id}`)}>{props.email}</span></Col>
                <Col className='d-none d-md-block col-8 col-sm-2 text-center'>
                    {props.userDomain}
                </Col>
                <Col className='d-none d-md-block col-4 col-sm-1 text-center'>
                    {props.kycStatus !== 'empty'
                        ? <FontAwesomeIcon color='green' icon={faCheck} />
                        : <FontAwesomeIcon color='tomato' icon={faTimesCircle} />}
                </Col>
                <Col className='d-none d-md-block col-4 col-sm-1 text-center'>
                    {props.userStatus ? 'staff' : 'user'}
                </Col>
                <Col className='col-6 col-md-2 text-center'><AdminButton classname='green' onClick={() => navigate(`/staff/users/${props.id}`)}>User details</AdminButton></Col>
            </Row>
        </div>
    )
}

export default UsersTableItem