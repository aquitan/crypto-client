import React from 'react'
import cls from './ButtonCard.module.scss'
import classNames from "classnames/bind";

const ButtonCard = ({children, classname, theme, ...attrs}) => {
    const cx = classNames.bind(cls)
    const classes = cx('button-card', classname, theme)

    return (
        <div {...attrs} className={classes}>
            {children}
        </div>
    )
}

export default ButtonCard