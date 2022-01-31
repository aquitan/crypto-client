import React from 'react'
import cls from './AdminSidebar.module.scss'
import {NavLink} from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className={`${cls.admin_sidebar} bg-dark`}>
            <NavLink className={cls.link} to={'/'}>User Dashboard</NavLink>
            <NavLink className={cls.link} to={'/staff'}>Главная</NavLink>
            <NavLink className={cls.link} to={'/staff/users'}>Пользователи</NavLink>
            <NavLink className={cls.link} to={'/staff/create-user'}>Создать пользователя</NavLink>
            <NavLink className={cls.link} to={'/staff/staff-kyc'}>KYC</NavLink>
            <NavLink className={cls.link} to={'/staff/promocodes'}>Промокоды</NavLink>
            <NavLink className={cls.link} to={'/staff/wallets'}>Кошельки</NavLink>


        </div>
    )
}

export default AdminSidebar