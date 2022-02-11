import React, {forwardRef} from 'react'
import './DatePickerCustom.scss'
import PropTypes from 'prop-types'

const DatePickerCustom = forwardRef(({ value, onClick, placeholder }, ref) => (
    <input className="date_picker" placeholder={placeholder} onClick={onClick} ref={ref} value={value}/>
));

DatePickerCustom.propTypes = {
    
}
DatePickerCustom.defaultProps = {
    
}

export default DatePickerCustom