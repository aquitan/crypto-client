import React from 'react'
import cls from './Form.module.scss'
import classNames from "classnames/bind";

const Form = ({children, classnames, ...props}) => {
    let cx = classNames.bind(cls)
   let classes = cx ('form', classnames)

    return (
        <form className={classes} {...props}>
            {children}
        </form>
    )
}

export default Form