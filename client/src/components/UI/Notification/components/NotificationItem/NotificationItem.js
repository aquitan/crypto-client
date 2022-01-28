import React from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../Notification.module.scss'

const NotificationItem = (props) => {
    return (
        <div className={cls.notification_item}>
            <Row>
                <Col className='col-3'>12</Col>
                <Col>ывлаывлалдыва</Col>
            </Row>
        </div>
    )
}

export default NotificationItem