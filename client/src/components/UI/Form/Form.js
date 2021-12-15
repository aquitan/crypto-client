import React from 'react'
import cls from './Form.module.css'

const Form = ({children, ...props}) => {
    return (
        <form className={cls.form} {...props}>
            {children}
        </form>
    )
}

export default Form