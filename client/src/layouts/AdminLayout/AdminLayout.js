import React from 'react'
import { Outlet } from "react-router-dom";
import cls from './AdminLayout.module.scss'
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const AuthLayout = () => {
    return (
        <div className={`${cls.layout} bg-dark`}>

            <div className={cls.layout_inner}>
                <AdminSidebar />
                <Outlet/>

            </div>
        </div>
    )
}

export default AuthLayout