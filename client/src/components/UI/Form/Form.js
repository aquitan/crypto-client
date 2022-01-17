import React from 'react'
import cls from './Form.module.scss'

const Form = ({children, ...props}) => {
    let classes = [cls.form]

    if (props.type === 'big') {
        classes.push(cls.form_big)
    }

    return (
        <form className={classes} {...props}>
            {children}
        </form>
    )
}

export default Form