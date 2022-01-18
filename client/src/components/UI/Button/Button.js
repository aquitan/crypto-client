import React from 'react'
import cls from './Button.module.scss'

const Button = ({children, ...props}) => {
    let classes = [cls.button]

    if (props.type === 'transparent') {
        classes.push(cls.transparent)
    } else if (props.type === 'filled') {
        classes.push(cls.filled)
    }


    return (
        <button className={classes.join(' ')} onClick={props.onClick}>
            {children}
        </button>
    )
}

export default Button