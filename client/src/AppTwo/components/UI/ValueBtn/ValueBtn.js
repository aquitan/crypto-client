import React from 'react'
import './ValueBtn.css'

const ValueBtn = ({value, ...attr}) => {
    return (
        <button className='value-btn' {...attr}>{value}</button>
    )
}

export default ValueBtn