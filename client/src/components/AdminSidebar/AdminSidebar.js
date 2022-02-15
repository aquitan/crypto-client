import React from 'react'
import cls from './AdminSidebar.module.scss'
import Notification from '../UI/Notification/Notification';
import {Row} from "react-bootstrap";
import {store} from "../../index";
import {useNavigate} from "react-router-dom";
import AdminButton from "../UI/AdminButton/AdminButton";

const AdminSidebar = ({children}) => {
    const navigate = useNavigate()
    const onLogout = () => {
        store.logout()
        navigate('/')
    }
    return (
        <div className={`${cls.admin_sidebar} bg-dark`}>
            <Row className='mb-3'>
                <AdminButton classname='green' onClick={onLogout}>Выйти</AdminButton>
            </Row>
            <Notification />
            {children}
        </div>
    )
}

export default AdminSidebar