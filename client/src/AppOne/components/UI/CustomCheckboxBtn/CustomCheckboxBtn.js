import React from 'react'
import './CustomCheckboxBtn.scss'

const CustomCheckboxBtn = ({checked, onChange, id}) => {
    return (
        <div className="slideThree">
            <input type="checkbox" id={id} onChange={onChange} checked={checked}/>
            <label htmlFor={id}></label>
        </div>
    )
}

export default CustomCheckboxBtn