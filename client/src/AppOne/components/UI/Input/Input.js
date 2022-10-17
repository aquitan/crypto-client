import React, { forwardRef } from 'react'
import cls from './Input.module.scss'
import classNames from "classnames/bind";
import {useThemeContext} from '../../../context/ThemeContext';

const Input = forwardRef(({classname, ...attr}, ref) => {
    const {theme} = useThemeContext()
    let cx = classNames.bind(cls)
    let classes = cx('input', classname, theme)

    return (
        <div className={cls.input_wrap}>
            <input {...attr}  className={classes} ref={ref} />
        </div>
    )
})

export default Input