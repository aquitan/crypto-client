import React from 'react'
import {Col, Row} from "react-bootstrap";
import cls from '../../Notification.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import { useThemeContext } from '../../../../../context/ThemeContext';

const NotificationItem = ({notif, removeNotif}) => {
    const {theme} = useThemeContext()

    return (
        <div className={cls.notification_item}>
            <Row style={{color: theme === 'light' ? '#212529' : '#fff' }}>
                <Col className='col-10'>
                    {notif.notifText}
                </Col>
                <Col className='col-2'>
                    <button style={{
                        height: 20,
                        width: 20,
                        borderRadius: '50%',
                        backgroundColor: 'tomato',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                            onClick={() => removeNotif(notif._id)}>
                        <FontAwesomeIcon icon={faTimes} color='#fff' />
                    </button>
                </Col>
            </Row>
        </div>
    )
}

export default NotificationItem