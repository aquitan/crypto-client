import React, {forwardRef} from 'react'
import './DatePickerCustom.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const DatePickerCustom = forwardRef(({ value, onClick, placeholder, classname }, ref) => {
    let classes = classNames(
        "date_picker",
        classname
    )
    console.log('value', value)
    return(
        <input className={classes} placeholder={placeholder} onClick={onClick} ref={ref} readOnly={true} value={value}/>
    )
});

DatePickerCustom.propTypes = {
    
}
DatePickerCustom.defaultProps = {
    
}

export default DatePickerCustom