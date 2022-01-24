import React, {useState} from 'react'
import cls from '../../Users.module.scss'
import {Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const UsersTableItem = (props) => {
    const [isStaff, setIsStaff] = useState()
    return (
        <div className={cls.table_item}>
            <Row>
                <Col>{props.id}</Col>
                <Col>{props.registerDate}</Col>
                <Col>

                        {props.name}

                </Col>
                <Col>{props.email}</Col>
                <Col>{props.kycStatus ? 'Yes' : 'No'}</Col>
                <Col><NavLink exact to={`/admin/users/${props.id}`}>User details</NavLink></Col>
            </Row>
        </div>
    )
}

export default UsersTableItem