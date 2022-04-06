import React, {useEffect, useState} from 'react'
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Col, Row} from "react-bootstrap";
import NotificationItem from "./components/NotificationItem/NotificationItem";
import cls from './Notification.module.scss'
import {store} from "../../../index";
import {observer} from "mobx-react-lite";
import {postData} from "../../../services/StaffServices";

const Notification = () => {
    const [notification, setNotification] = useState(store.notifications)
    const [open, setOpen] = useState(false)
    let notif = JSON.parse(JSON.stringify(store.notifications))

    useEffect(() => {
        setNotification(notif)
        getNotification()
    }, [])

    const getNotification = async () => {
        const res = await postData('/staff/notifications/get_all_notifications/', {userId: store.userId})
    }

    return (
        <div className={cls.notification}>
            <div className={cls.notification_header} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faBell} color='#fff' />
                {notification.length ? <div className={cls.notification_mark}></div> : null}
            </div>
            {
                open ?
                    <div className={cls.notification_body}>
                        <div>
                            <Row className={cls.notification_body_top}>
                                <Col>ID</Col>
                                <Col>message</Col>
                            </Row>
                            {
                                notification.length  ?
                                    notification.map(notif => {
                                        return <NotificationItem notif={notif} />
                                    })
                                    : <p>No messages</p>
                            }

                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default observer(Notification)