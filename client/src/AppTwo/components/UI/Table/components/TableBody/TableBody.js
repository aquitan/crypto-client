import React from 'react'
import PropTypes from 'prop-types'

const TableBody = ({children}) => {
    return (
        <div style={{maxHeight: 400, overflowY: 'auto'}}>
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