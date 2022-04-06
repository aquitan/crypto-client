import React from 'react'
import cls from './AdminSidebar.module.scss'
import Notification from '../UI/Notification/Notification';
import {Row} from "react-bootstrap";
import {store} from "../../index";
import {useNavigate} from "react-router-dom";
import AdminButton from "../UI/AdminButton/AdminButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = ({children, active, setInactive}) => {
    const navigate = useNavigate()
    const onLogout = async () => {
       await store.logout()
        if (!store.isAuth) {
            navigate('/')
        }
    }
    return (
        <div className={`${cls.admin_sidebar} bg-dark ${active ? cls.active_sidebar : ''}`}>
            <div className={cls.sidebar_close}>
                <FontAwesomeIcon onClick={setInactive} icon={faTimesCircle} />
            </div>
            <Row>
                <AdminButton classname='green' onClick={onLogout}>Выйти</AdminButton>
            </Row>
            {children}
        </div>
    )
}

export default AdminSidebar