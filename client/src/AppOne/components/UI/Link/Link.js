import React from 'react'
import cls from './Link.module.scss'
import classNames from "classnames/bind";
import {NavLink} from 'react-router-dom';

const Link = ({href, value, classnames, nav}) => {
    const cx = classNames.bind(cls)
    const classes = cx('landingHeaderLink', classnames)

    return (
        <>
            {nav ? <NavLink className={classes} to={href}>{value}</NavLink> : <a href={href} className={classes}>{value}</a>}
        </>
    )
}

export default Link