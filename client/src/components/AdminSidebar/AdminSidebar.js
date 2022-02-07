import React from 'react'
import cls from './AdminSidebar.module.scss'
import {NavLink} from "react-router-dom";
import Notification from '../UI/Notification/Notification';

const AdminSidebar = ({children}) => {
    return (
        <div className={`${cls.admin_sidebar} bg-dark`}>
            <Notification />
            {children}
        </div>
    )
}

export default AdminSidebar