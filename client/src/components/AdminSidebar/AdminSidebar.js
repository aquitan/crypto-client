import React from 'react'
import cls from './AdminSidebar.module.scss'
import {NavLink} from "react-router-dom";

const AdminSidebar = ({children}) => {
    return (
        <div className={`${cls.admin_sidebar} bg-dark`}>
            {children}
        </div>
    )
}

export default AdminSidebar