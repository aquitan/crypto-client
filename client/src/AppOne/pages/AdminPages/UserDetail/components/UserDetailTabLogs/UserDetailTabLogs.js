import React from 'react'
import {Col, Container, Form, Row} from "react-bootstrap";
import cls from '../../UserDetail.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {getCurrentDate} from "../../../../../utils/getCurrentDate";
import AdminButtonCard from "../../../../../components/AdminButtonCard/AdminButtonCard";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const UserDetailTabLogs = ({data}) => {
    if (!data) {
        return <Preloader />
    }
    const reversedLogs = data.user_logs.slice(0).reverse()
    return (
        <Container>
            <AdminButtonCard title={'Логи'}>
                {/*<Col className='col-12 col-md-3 mb-3 mt-3'>*/}
                {/*    <Form.Select aria-label="Default select example">*/}
                {/*        <option value="1">Сортировка по имени</option>*/}
                {/*        <option value="2">Сортировка по id</option>*/}
                {/*    </Form.Select>*/}
                {/*</Col>*/}
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
                                <Row key={log._id} className={cls.users_detail_table_row}>
                                    <Col>{getCurrentDate(+log.actionDate)}</Col>
                                    <Col className={cls.break_word}>
                                    <span>
                                        Пользователь <b>{log.userEmail}</b> <b>{log.userAction}</b> на <b>{log.userDomain}</b>
                                    </span>
                                    </Col>
                                    <Col>{log.countryName}, {log.requestCity === null ? 'город не определен' : log.requestCity},
                                        <a href={`https://google.com.ua/maps/place/${log.requestCity}/@${log.location}`}
                                           target="_blank" rel="noopener noreferrer">
                                            <FontAwesomeIcon icon={faMapMarkedAlt} color='green' />
                                        </a>
                                    </Col>
                                    <Col>{log.ipAddress}</Col>
                                </Row>
                            )
                        })
                    }
                </div>
            </AdminButtonCard>
        </Container>
    )
}

export default UserDetailTabLogs