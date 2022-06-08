import React from 'react'
import { NavLink } from 'react-router-dom'
import cls from './NavBtn.module.css'

const NavBtn = ({children, ...props}) => {
    return (
        <NavLink className={cls.nav_link} {...props}>
            {children}
        </NavLink>
    )
}

export default NavBtn