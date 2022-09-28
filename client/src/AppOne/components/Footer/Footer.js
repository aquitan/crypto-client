import React from 'react'
import cls from './Footer.module.scss'

const Footer = ({children}) => {
    return (
        <div className={`${cls.footer}`}>
            {children}
        </div>
    )
}

export default Footer