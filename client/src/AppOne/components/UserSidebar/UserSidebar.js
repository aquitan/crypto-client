import React from 'react'
import PropTypes from 'prop-types'
import cls from './UserSidebar.module.scss'
import classNames from "classnames/bind";

const UserSidebar = ({children, active, onClick}) => {
    const cx = classNames.bind(cls)
    const classes = cx('sidebarWrap', active)

    return (
        <div className={classes} onClick={onClick}>
            <div/>
            <div className={cls.user_sidebar}>
                {children}
            </div>
        </div>
    )
}

UserSidebar.propTypes = {
    children: PropTypes.node
}
UserSidebar.defaultProps = {
    
}

export default UserSidebar