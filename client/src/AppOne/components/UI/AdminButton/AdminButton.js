import React from 'react'
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import cls from './AdminButton.module.scss'

const AdminButton = ({children, classname, onClick, disabled, active, ...attr}) => {
    let cx = classNames.bind(cls)
    let classes = cx('default', classname)

    const onClickAction = (e) => {
        if (disabled) {
            e.preventDefault()
        } else {
            return onClick(e)
        }
    }


    return (
        <button {...attr} className={classes} onClick={onClickAction}>
            {children}
        </button>
    )
}

AdminButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool

}

AdminButton.defaultProps = {
    children: 'изменить',
    classNames: '',
    onClick: () => {},
    disabled: false,
    active: false
}

export default AdminButton