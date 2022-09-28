import React from 'react'
import {forwardRef} from 'react'
import './DatePickerCustom.scss'
import classNames from 'classnames'

const DatePickerCustom = forwardRef(({ value, onClick, placeholder, classname }, ref) => {
    let classes = classNames(
        "date_picker",
        classname
    )
    return(
        <input className={classes} placeholder={placeholder} onClick={onClick} ref={ref} readOnly={true} value={value}/>
    )
});

export default DatePickerCustom