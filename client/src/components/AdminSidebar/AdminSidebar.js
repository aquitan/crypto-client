import React from 'react'
import cls from './AdminSidebar.module.scss'
import {NavLink} from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className={`${cls.admin_sidebar} bg-dark`}>
            <NavLink className={cls.link} to={'/'}>User Dashboard</NavLink>
            <NavLink className={cls.link} to={'/admin'}>Главная</NavLink>
            <NavLink className={cls.link} to={'/admin/users'}>Пользователи</NavLink>
            <NavLink className={cls.link} to={'/admin/create-user'}>Создать пользователя</NavLink>
            <NavLink className={cls.link} to={'/admin/admin-kyc'}>KYC</NavLink>
            <NavLink className={cls.link} to={'/admin/promocodes'}>Промокоды</NavLink>
            <NavLink className={cls.link} to={'/admin/wallets'}>Кошельки</NavLink>


        </div>
    )
}

export default AdminSidebar