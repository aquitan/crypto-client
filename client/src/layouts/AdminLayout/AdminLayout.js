import React from 'react'
import {Outlet} from "react-router-dom";
import cls from './AdminLayout.module.scss'
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import NavigationLink from "../../components/UI/NavigationLink/NavigationLink";
import {links} from "../../utils/staffConstants";
import {v4 as uuid} from 'uuid'


const AuthLayout = () => {
    return (
        <div className={`${cls.layout} bg-dark`}>
            <div className={cls.layout_inner}>
                <AdminSidebar>

                    {
                        links.map(link => {
                            return <NavigationLink key={uuid()} to={link.link}>{link.text}</NavigationLink>
                        })
                    }
                </AdminSidebar>
                <Outlet/>

            </div>
        </div>
    )
}

export default AuthLayout