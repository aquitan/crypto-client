import React from 'react'
import cls from './AdminButton.module.scss'

const AdminButton = ({children, ...props}) => {
    let classes = [cls.default]
    if (props.color === 'green') {
        classes.push(cls.green)
    } else if (props.color === 'red') {
        classes.push(cls.red)
    } else if (props.color === 'blue') {
        classes.push(cls.blue)
    } else {
       return classes
    }

    return (
        <button className={classes.join(' ')} onClick={props.onClick}>
            {children}
        </button>
    )
}

export default AdminButton