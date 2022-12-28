import React, {useEffect, useRef, useState} from 'react';
import {Col, Overlay, Popover, Row} from 'react-bootstrap';
import NotificationItem from "./components/NotificationItem/NotificationItem";
import cls from './Notification.module.scss'
import {store} from "../../../../index";
import {observer} from "mobx-react-lite";
import {deleteData} from "../../../services/StaffServices";
import {NotifContext, useNotifContext} from "../../../context/notifContext";
import {useThemeContext} from '../../../context/ThemeContext';

const Notification = () => {
    const {notificationList, updateNotif} = useNotifContext(NotifContext)
    const [open, setOpen] = useState(false)
    const target = useRef(null);
    const {theme} = useThemeContext()

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
            <div style={{textAlign: 'center'}} ref={target} className={cls.notification_header} onClick={() => setOpen(!open)}>
                <img src={'/img/notification.svg'} height={25} alt=""/>
                {notificationList.length ? <div className={cls.notification_mark}>{notificationList.length}</div> : null}
            </div>
            {
                open ?
                  <Overlay rootClose onHide={() => setOpen(false)} id={theme} target={target.current} show={open} placement="right">
                      {(props) => (
                        <Popover style={{backgroundColor: theme === 'light' ? '#fff' : '#000'}} placement='bottom' id="overlay-example" {...props}>
                            <Popover.Header style={{backgroundColor: theme === 'light' ? '#fff' : '#000', color: theme === 'light' ? '#212529' : '#fff'}}>
                                <Row>
                                    <Col style={{fontSize: 13}}>Notifications</Col>
                                    <Col style={{fontSize: 13, cursor: 'pointer'}} onClick={onClearAll}>Clear all</Col>
                                </Row>
                            </Popover.Header>
                            <Popover.Body style={{overflowY: 'auto', height: 300, backgroundColor: theme === 'light' ? '#fff' : '#000'}} >
                                <div className={cls.notification_body}>
                                    <div>
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
                            </Popover.Body>
                        </Popover>
                      )}
                  </Overlay>

                    : null
            }
        </div>
    )
}

export default observer(Notification)