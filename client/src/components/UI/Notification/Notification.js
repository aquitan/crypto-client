import React, {useEffect, useState} from 'react'
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Col, Row} from "react-bootstrap";
import NotificationItem from "./components/NotificationItem/NotificationItem";
import cls from './Notification.module.scss'
import {store} from "../../../index";

const Notification = ({bell}) => {
    const [notification, setNotification] = useState(store.notifications)

    console.log('notification', notification)
    useEffect(() => {
        setNotification(store.notifications)
    }, [])

    return (
        <div className={cls.notification}>
            <div className={cls.notification_header} onClick={() => setNotification(!notification)}>
                <FontAwesomeIcon icon={faBell} color='#fff' />
                {
                    bell ? <div className={cls.notification_mark}></div> : null
                }
            </div>
            {
                notification ?
                    <div className={cls.notification_body}>
                        <div>
                            <Row className={cls.notification_body_top}>
                                <Col>ID</Col>
                                <Col>message</Col>
                            </Row>
                            {
                                notification ?
                                    <NotificationItem notif={notification} />
                                    : <p>No messages</p>
                            }

                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default Notification