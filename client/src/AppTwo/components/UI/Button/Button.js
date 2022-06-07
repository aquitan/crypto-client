import React from 'react'
import cls from './Button.module.scss'
import PropTypes, {bool} from "prop-types";
import classNames from "classnames/bind";

const Button = ({children, onClick, classname, disabled, active, ...attrs}) => {
    let cx = classNames.bind(cls)
    let classes = cx('button', classname, {active})


    const onClickAction = (e) => {
        if (disabled) {
            e.preventDefault()
        } else {
            return onClick(e)
        }
    }

    const Tag = attrs.href ? 'a' : 'button'

    return (
        <Tag {...attrs} className={classes} onClick={onClickAction} disabled={disabled}>
            {children}
        </Tag>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: bool,
    active: bool
}

Button.defaultProps = {
    children: 'Submit',
    onClick: () => {},
    className: '',
    disabled: false,
    active: false
}

export default Button