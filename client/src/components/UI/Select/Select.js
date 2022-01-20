import React, {forwardRef} from 'react'

const Select = forwardRef((props, ref) => {
    return (
        <select ref={ref} {...props}>
            <option value="Google">Google</option>
            <option value="Email">Email</option>
            <option value="Telegram">Telegram</option>
        </select>
    )
})

export default Select