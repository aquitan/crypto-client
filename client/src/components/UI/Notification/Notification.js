import React, {useState} from 'react'
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Col, Row} from "react-bootstrap";
import NotificationItem from "./components/NotificationItem/NotificationItem";
import cls from './Notification.module.scss'

const Notification = () => {
    const [notification, setNotification] = useState()

    setTimeout(() => {

    })


    return (
        <div className={cls.notification}>
            <div className={cls.notification_header} onClick={() => setNotification(!notification)}>
                <FontAwesomeIcon icon={faBell} color='#fff' />
            </div>
            {
                notification ?
                    <div className={cls.notification_body}>
                        <div>
                            <Row className={cls.notification_body_top}>
                                <Col>ID</Col>
                                <Col>message</Col>
                            </Row>
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default Notification