import React from 'react'
import cls from './Footer.module.scss'
import {useThemeContext} from '../../context/ThemeContext';
import classNames from 'classnames/bind';

const Footer = ({children}) => {
    const {theme} = useThemeContext()
    const cx = classNames.bind(cls)
    const classes = cx('footer', theme)


    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Footer