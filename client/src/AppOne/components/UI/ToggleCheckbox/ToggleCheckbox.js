import React from 'react'
import './ToggleCheckbox.css'

const ToggleCheckbox = ({onChange}) => {
    return (
        <label className="checkbox-ios">
            <input type="checkbox" onChange={onChange} />
            <span className="checkbox-ios-switch"></span>
        </label>
    )
}

export default ToggleCheckbox;