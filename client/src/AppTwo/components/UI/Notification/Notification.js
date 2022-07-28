import React, {useEffect, useState} from 'react'
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Col, Row} from "react-bootstrap";
import NotificationItem from "./components/NotificationItem/NotificationItem";
import cls from './Notification.module.scss'
import {store} from "../../../../index";
import {observer} from "mobx-react-lite";
import {useQuery} from "react-query";
import {NotifContext, useNotifContext} from "../../../context/notifContext";
import {deleteData} from "../../../services/StaffServices";

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
    const onClearAll = async () => {
        const res = await deleteData(`/clear_all_notification/${store.user.id}`)
        updateNotif()
    }

    return (
        <div className={cls.notification}>
            <div className={cls.notification_header} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faBell} color='#fff' />
                {notificationList.length ? <div className={cls.notification_mark}>{notificationList.length}</div> : null}
            </div>
            {
                open ?
                    <div className={cls.notification_body}>
                        <div>
                            <Row className={cls.notification_body_top}>
                                <Col style={{fontSize: 13}}>Notifications</Col>
                                <Col style={{fontSize: 13, cursor: 'pointer'}} onClick={onClearAll}>Clear all</Col>
                            </Row>
                            {
                                notificationList.length  ?
                                    notificationList.slice(0).reverse().map(notif => {
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