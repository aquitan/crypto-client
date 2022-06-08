import React from 'react'
import PropTypes from 'prop-types'

const Table = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}

Table.propTypes = {
    children: PropTypes.node
}
Table.defaultProps = {
    
}

export default Table