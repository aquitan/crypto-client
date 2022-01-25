import React, {forwardRef} from 'react'

const InputRadio = forwardRef((props, ref) => {
    const {label} = props
    return (
        <label>
            <input {...props} ref={ref} type="radio"/>
            {label}
        </label>
    )
})

export default InputRadio