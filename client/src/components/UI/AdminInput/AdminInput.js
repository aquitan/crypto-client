import React, {forwardRef} from 'react'
import './AdminInput.scss'
import classNames from "classnames";
import PropTypes from "prop-types";

const AdminInput = forwardRef(({className ,...attrs}, ref) => {
    let classes = classNames(
        'admin_input',
        className
    )

    return (
        <input ref={ref} className={classes} {...attrs}/>
    )
})

AdminInput.propTypes = {
    className: PropTypes.string
}

export default AdminInput