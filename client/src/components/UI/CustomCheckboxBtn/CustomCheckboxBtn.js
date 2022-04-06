import React from 'react'
import PropTypes from 'prop-types'
import './CustomCheckboxBtn.scss'

const CustomCheckboxBtn = ({checked, onChange, id}) => {
    return (
        <div className="slideThree">
            <input type="checkbox" id={id} onChange={onChange} checked={checked}/>
            <label htmlFor={id}></label>
        </div>
    )
}

CustomCheckboxBtn.propTypes = {
    
}
CustomCheckboxBtn.defaultProps = {
    
}

export default CustomCheckboxBtn