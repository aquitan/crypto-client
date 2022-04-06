import React, {forwardRef} from 'react'
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import cls from './Select.module.scss'
import {v4 as uuid} from 'uuid'

const Select = forwardRef((
    {
       options,
       classname,
       ...attr
   }, ref) => {
    let cx = classNames.bind(cls)

    const classes = cx(
        'default-select',
        classname
    )

    return (
        <select ref={ref} className={classes} {...attr}>
            {
                options.map(option => {
                    return <option key={uuid()} value={option.value}>{option.text}</option>
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