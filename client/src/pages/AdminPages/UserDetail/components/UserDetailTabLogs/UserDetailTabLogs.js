import React from 'react'
import {Col, Form, Row} from "react-bootstrap";
import cls from '../../UserDetail.module.scss'
import {Link} from "react-router-dom";

const UserDetailTabLogs = () => {
    return (
        <div>
            <Col className='col-2'>
                <Form.Select aria-label="Default select example">
                    <option value="1">Сортировка по имени</option>
                    <option value="2">Сортировка по id</option>
                </Form.Select>
            </Col>
            <Row className={`${cls.users_detail_table_header} ${cls.users_detail_table_row}`}>
                <Col>Time</Col>
                <Col>Info</Col>
                <Col>Location</Col>
                <Col>IP address</Col>
            </Row>
            <Row className={cls.users_detail_table_row}>
                <Col>Jan. 21, 2022, 11:06 a.m.</Col>
                <Col>Staff User super go to staff index</Col>
                <Col>Russia Lipetsk, <Link to={'/'} target="_blank" rel="noopener noreferrer">map</Link></Col>
                <Col>None</Col>
            </Row>
        </div>
    )
}

export default UserDetailTabLogs