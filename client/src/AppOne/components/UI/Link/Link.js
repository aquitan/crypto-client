import React from 'react'
import cls from './Link.module.scss'
import classNames from "classnames/bind";

const Link = ({href, value, classnames}) => {
    const cx = classNames.bind(cls)
    const classes = cx('landingHeaderLink', classnames)

    return (
        <a href={href} className={classes}>{value}</a>
    )
}

export default Link