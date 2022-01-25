import React from 'react'
import {Col, Form, Row} from "react-bootstrap";
import cls from '../../UserDetail.module.scss'
import {Link} from "react-router-dom";

const UserDetailTabLogs = ({data}) => {
    console.log('log user', data)
    if (!data) {
        return <h1>Loading</h1>
    }

    const reversedLogs = data.user_logs.slice(0).reverse()
    console.log('initial logs', data.user_logs)
    console.log('reversed', reversedLogs)
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
            <div className={cls.logs_container}>
                {
                    reversedLogs.map((log) => {
                        return (
                            <Row key={log.ID} className={cls.users_detail_table_row}>
                                <Col>{log.action_date}</Col>
                                <Col>Пользователь <b>{log.email}</b> перешел на <b>{log.user_action}</b> на <b>{log.user_domain}</b></Col>
                                <Col>{log.country_name} {log.request_city}, <a href={`https://google.com.ua/maps/place/${log.request_city}/@${log.location}`} target="_blank" rel="noopener noreferrer">map</a></Col>
                                <Col>{log.ip_address}</Col>
                            </Row>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserDetailTabLogs