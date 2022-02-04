import React from 'react'
import PropTypes from 'prop-types'

const TableBody = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}

TableBody.propTypes = {
    children: PropTypes.node
}
TableBody.defaultProps = {

}

export default TableBody