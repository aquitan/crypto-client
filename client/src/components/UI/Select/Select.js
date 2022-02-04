import React, {forwardRef} from 'react'
import PropTypes from "prop-types";
import classNames from "classnames";
import './Select.scss'

const Select = forwardRef((
    {
       options,
       classname,
       ...attr
   }, ref) => {

    const classes = classNames(
        'default-select',
        classname
    )

    return (
        <select ref={ref} className={classes} {...attr}>
            {
                options.map(option => {
                    return <option key={option.value} value={option.value}>{option.text}</option>
                })
            }
        </select>
    )
})

Select.propTypes = {
    options: PropTypes.array,
    classname: PropTypes.string
}

export default Select