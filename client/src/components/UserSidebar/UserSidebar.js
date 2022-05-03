import React from 'react'
import PropTypes from 'prop-types'
import cls from './UserSidebar.module.scss'

const UserSidebar = ({children}) => {
    return (
        <>
            <div className={cls.user_sidebar}/>
            <div>
                {children}
            </div>
        </>
    )
}

UserSidebar.propTypes = {
    children: PropTypes.node
}
UserSidebar.defaultProps = {
    
}

export default UserSidebar