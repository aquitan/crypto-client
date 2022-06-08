import React, {useState} from 'react'
import {Outlet} from "react-router-dom";
import cls from './AdminLayout.module.scss'
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import NavigationLink from "../../components/UI/NavigationLink/NavigationLink";
import {links} from "../../utils/staffConstants";
import {v4 as uuid} from 'uuid'
import BurgerMenu from "../../components/UI/BurgerMenu/BurgerMenu";
import {store} from "../../../index";


const AuthLayout = () => {
    const [state, setState] = useState(false)

    const setInactive = () => {
        setState(false)
    }

    const onHandleClick = () => {
        setState(true)
    }

    return (
        <div className={`${cls.layout} bg-dark`}>
            <div className={cls.layout_inner}>
                <BurgerMenu onHandleClick={onHandleClick} open={state} />
                <AdminSidebar active={state} setInactive={setInactive}>
                    <NavigationLink to={'/'}>User Dashboard</NavigationLink>
                    <NavigationLink to={'/staff'}>Главная</NavigationLink>
                    <NavigationLink to={'/staff/users'}>Пользователи</NavigationLink>
                    <NavigationLink to={'/staff/create-user'}>Создать пользователя</NavigationLink>
                    <NavigationLink to={'/staff/staff-kyc'}>KYC</NavigationLink>
                    <NavigationLink to={'/staff/promocodes'}>Промокоды</NavigationLink>
                    <NavigationLink to={'/staff/wallets'}>Кошельки</NavigationLink>
                    <NavigationLink to={'/staff/staff-errors'}>Ошибки</NavigationLink>
                    <NavigationLink to={'/staff/domains'}>Домены</NavigationLink>
                    <NavigationLink to={'/staff/transactions'}>Создать транзакцию</NavigationLink>
                    <NavigationLink to={'/staff/domains'}>Домены</NavigationLink>
                    <NavigationLink to={'/staff/secure-deal'}>Защищенные сделки</NavigationLink>
                    {
                        store.isAdmin || store.fullAccess ?
                            <NavigationLink to={'/staff/recruiter-list'}>Рекрутинг</NavigationLink>
                            : null
                    }
                    <NavigationLink to={'/staff/create-news'}>Создать новости</NavigationLink>
                    <NavigationLink to={'/staff/chat'}>Чат</NavigationLink>
                    <NavigationLink to={'/staff/group-list'}>Список групп</NavigationLink>
                    <NavigationLink to={'/staff/project-support'}>Поддержка</NavigationLink>
                </AdminSidebar>
                <div className={cls.content_wrap}>
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export default AuthLayout