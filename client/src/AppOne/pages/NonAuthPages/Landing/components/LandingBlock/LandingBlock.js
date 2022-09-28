import React from 'react'
import cls from './LandingBlock.module.scss'
import classNames from "classnames/bind";
import {ThemeContext, useThemeContext} from "../../../../../context/ThemeContext";

const LandingBlock = ({children, classname, ...attrs}) => {
    const {theme} = useThemeContext(ThemeContext)

    let cx = classNames.bind(cls)
    let classes = cx(classname, theme)
    return (
        <div {...attrs} className={classes}>
            {children}
        </div>
    )
}

LandingBlock.defaultProps = {

}

export default LandingBlock