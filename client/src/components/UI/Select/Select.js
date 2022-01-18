import React, {forwardRef} from 'react'

const Select = forwardRef(({}) => {
    return (
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    )
})

export default Select