import React, { forwardRef } from 'react'
import cls from './Input.module.scss'
import classNames from "classnames/bind";

const Input = forwardRef(({classname, ...attr}, ref) => {
    let cx = classNames.bind(cls)
    let classes = cx('input', classname)

    return (
        <div className={cls.input_wrap}>
            <input {...attr}  className={classes} ref={ref} />
        </div>
    )
})

export default Input