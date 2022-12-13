import React from 'react'
import { useThemeContext } from '../../../context/ThemeContext'
import './PasswordStrength.scss'

const PasswordStrength = ({characters, numbers, uppercase, active}) => {
    const {theme} = useThemeContext()
    return (
        <div className={`password_match ${active ? 'active' : ''} ${theme}`}>
            <div className={characters ? 'match' : 'no_match'}>
                {characters ? <img width={15} height={15} src='/img/tick.svg' /> 
                : <img width={15} height={15} src='/img/close.svg' />}
                 min 8 characters
            </div>
            <div className={numbers ? 'match' : 'no_match'}>
                {numbers ? <img width={15} height={15} src='/img/tick.svg' /> 
                : <img width={15} height={15} src='/img/close.svg' />}
                contains numbers
            </div>
            <div className={uppercase ? 'match' : 'no_match'}>
                {uppercase ? <img width={15} height={15} src='/img/tick.svg' /> 
                : <img width={15} height={15} src='/img/close.svg' />}
                contains uppercase
            </div>
            {/*<div>password match</div>*/}
        </div>
    )
}

export default PasswordStrength