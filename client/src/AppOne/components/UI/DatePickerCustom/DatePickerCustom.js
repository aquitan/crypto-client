import React from 'react'
import {forwardRef} from 'react'
import './DatePickerCustom.scss'
import classNames from 'classnames'
import { useThemeContext } from '../../../context/ThemeContext';

const DatePickerCustom = forwardRef(({ value, onClick, placeholder, classname }, ref) => {
    const {theme} = useThemeContext()
    let classes = classNames(
        "date_picker", 
        theme,
        classname
    )
    return(
        <input className={classes} placeholder={placeholder} onClick={onClick} ref={ref} readOnly={true} value={value}/>
    )
});

export default DatePickerCustom