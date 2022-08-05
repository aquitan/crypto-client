import React from 'react'
import cls from './Section.module.scss'
import classNames from "classnames/bind";

const Section = ({children, classnames}) => {
    const cx = classNames.bind(cls)
    const classes = cx('section', classnames)


    return (
        <div className={classes}>
            {children}
        </div>
    )
}
export default Section