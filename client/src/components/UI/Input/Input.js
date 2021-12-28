import React, { forwardRef } from 'react'
import cls from './Input.module.scss'

const Input = forwardRef((props, ref) => {
    console.log('props', props)
    return (
        <div className={cls.input_wrap}>
            <input id={props.id} className={cls.input} ref={ref} {...props} />
        </div>
    )
})

export default Input