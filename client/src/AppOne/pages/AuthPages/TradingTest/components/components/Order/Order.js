import React from 'react'
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