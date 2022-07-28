import React, {useEffect, useState} from 'react'
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Col, Row} from "react-bootstrap";
import NotificationItem from "./components/NotificationItem/NotificationItem";
import cls from './Notification.module.scss'
import {store} from "../../../../index";
import {observer} from "mobx-react-lite";
import {deleteData, getData, postData} from "../../../services/StaffServices";
import {useQuery} from "react-query";
import {NotifContext, useNotifContext} from "../../../context/notifContext";

const Notification = () => {
    const {notificationList, updateNotif} = useNotifContext(NotifContext)
    const [notification, setNotification] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!store.fullAccess) {
            getNotification()
        }
    }, [])

    const getNotification = async () => {
        updateNotif()
        // setNotification(res.data.listForUser)
    }
    const removeNotif = (id) => {
        const res = deleteData(`/notification/remove_notification/${id}/`)
        getNotification()
    }

    return (
        <div className={cls.notification}>
            <div className={cls.notification_header} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faBell} color='#fff' />
                {notificationList.length ? <div className={cls.notification_mark}></div> : null}
            </div>
            {
                open ?
                    <div className={cls.notification_body}>
                        <div>
                            <Row className={cls.notification_body_top}>
                                <Col>Notifications</Col>
                            </Row>
                            {
                                notificationList.length  ?
                                    notificationList.map(notif => {
                                        return <NotificationItem
                                            removeNotif={removeNotif}
                                            key={notif._id}
                                            notif={notif} />
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