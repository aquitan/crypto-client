import React from 'react'
import { NavLink } from 'react-router-dom'
import cls from './HeaderLink.module.css'

const HeaderLink = (props) => {
    return (
        <NavLink className={cls.nav_link} to={props.to}>
            {props.children}
        </NavLink>
    )
}

export default HeaderLink