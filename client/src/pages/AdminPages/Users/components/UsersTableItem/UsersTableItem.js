import React, {useState} from 'react'
import cls from '../../Users.module.scss'
import {Col, Row} from "react-bootstrap";

const UsersTableItem = (props) => {
    const [isStaff, setIsStaff] = useState()
    return (
        <div className={cls.table_item}>
            <Row>
                <Col>{props.id}</Col>
                <Col>{props.registerDate}</Col>
                <Col>{props.name}</Col>
                <Col>{props.email}</Col>
                <Col>{props.kycStatus ? 'Yes' : 'No'}</Col>
                <Col>{props.staff ? 'Make regular' : 'Make staff'}</Col>
            </Row>
        </div>
    )
}

export default UsersTableItem