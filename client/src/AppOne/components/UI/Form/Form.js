import React from 'react'
import cls from './Form.module.scss'
import classNames from "classnames/bind";
import {ThemeContext, useThemeContext} from "../../../context/ThemeContext";

const Form = ({children, classnames, ...props}) => {
    const {theme} = useThemeContext(ThemeContext)
    let cx = classNames.bind(cls)
    let classes = cx ('form', classnames, theme)

    return (
        <form className={classes} {...props}>
            {children}
        </form>
    )
}

export default Form