import React from 'react'
import PropTypes from 'prop-types'
import cls from './Order.module.scss'

const Order = ({children}) => {
    return (
        <div className={cls.order}>
            {children}
        </div>
    )
}

Order.propTypes = {

}
Order.defaultProps = {

}

export default Order