import React from 'react'
import './AdminButton.scss'
import PropTypes from "prop-types";
import classNames from "classnames";

const AdminButton = ({children, classname, onClick, disabled, active, ...attr}) => {
    let classes = classNames(
        'default',
        classname
    )

    const onClickAction = (e) => {
        console.log(e.target)
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