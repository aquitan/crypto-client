import React from 'react'
import './LandingContent.scss'

const LandingContent = ({children}) => {
    return (
        <div className='landing_content'>
            {children}
        </div>
    )
}

export default LandingContent