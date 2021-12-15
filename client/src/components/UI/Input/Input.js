import React, { forwardRef } from 'react'
import cls from './Input.module.css'

const Input = forwardRef((props, ref) => {
    return (
        <div className={cls.input_wrap}>
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} className={cls.input} ref={ref} {...props} />
        </div>
    )
})

export default Input