import React, {useState} from 'react'
import {Outlet} from "react-router-dom";
import cls from './AdminLayout.module.scss'
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import NavigationLink from "../../components/UI/NavigationLink/NavigationLink";
import {links} from "../../utils/staffConstants";
import {v4 as uuid} from 'uuid'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


const AuthLayout = () => {
    const [state, setState] = useState(false)

    const setInactive = () => {
        setState(false)
    }

    return (
        <div className={`${cls.layout} bg-dark`}>
            <div className={cls.layout_inner}>
                <div onClick={() => setState(!state)} className={cls.burger_btn} >
                    <FontAwesomeIcon icon={faBars} />
                </div>
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