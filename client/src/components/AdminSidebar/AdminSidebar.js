import React from 'react'
import cls from './AdminSidebar.module.scss'
import Notification from '../UI/Notification/Notification';
import {Button, Row} from "react-bootstrap";
import {store} from "../../index";
import {useNavigate} from "react-router-dom";

const AdminSidebar = ({children}) => {
    const navigate = useNavigate()
    const onLogout = () => {
        store.logout()
        navigate('/')
    }
    return (
        <div className={`${cls.admin_sidebar} bg-dark`}>
            <Row className='mb-3'>
                <Button onClick={onLogout}>Выйти</Button>
            </Row>
            <Notification />
            {children}
        </div>
    )
}

export default AdminSidebar