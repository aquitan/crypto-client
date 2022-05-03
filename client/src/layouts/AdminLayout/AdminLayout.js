import React, {useState} from 'react'
import {Outlet} from "react-router-dom";
import cls from './AdminLayout.module.scss'
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import NavigationLink from "../../components/UI/NavigationLink/NavigationLink";
import {links} from "../../utils/staffConstants";
import {v4 as uuid} from 'uuid'
import BurgerMenu from "../../components/UI/BurgerMenu/BurgerMenu";


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
                    {
                        links.map(link => {
                            return <NavigationLink key={uuid()} to={link.link}>{link.text}</NavigationLink>
                        })
                    }
                </AdminSidebar>
                <div className={cls.content_wrap}>
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export default AuthLayout