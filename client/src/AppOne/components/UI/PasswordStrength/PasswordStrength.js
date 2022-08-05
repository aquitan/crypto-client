import React from 'react'
import './PasswordStrength.scss'

const PasswordStrength = ({characters, numbers, uppercase, active}) => {

    return (
        <div className={`password_match ${active ? 'active' : ''}`}>
            <div className={characters ? 'match' : 'no_match'}>min 8 characters</div>
            <div className={numbers ? 'match' : 'no_match'}>contains numbers</div>
            <div className={uppercase ? 'match' : 'no_match'}>contains uppercase</div>
            {/*<div>password match</div>*/}
        </div>
    )
}

export default PasswordStrength