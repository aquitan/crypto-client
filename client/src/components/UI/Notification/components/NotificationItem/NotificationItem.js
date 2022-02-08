import React from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../Notification.module.scss'

const NotificationItem = ({notif}) => {
    return (
        <div className={cls.notification_item}>
            <Row>
                <Col className='col-3'>{notif.date}</Col>
                <Col>{notif.message}</Col>
            </Row>
        </div>
    )
}

export default NotificationItem