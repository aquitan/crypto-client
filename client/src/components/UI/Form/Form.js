import React from 'react'
import './Form.scss'
import classNames from "classnames";

const Form = ({children, classnames, ...props}) => {
    let classes = classNames(
        'form',
        classnames
    )

    return (
        <form className={classes} {...props}>
            {children}
        </form>
    )
}

export default Form