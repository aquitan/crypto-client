import React from 'react'

const TableBody = ({children}) => {
    return (
        <div style={{maxHeight: 400, overflowY: 'auto', padding: '0'}}>
            {children}
        </div>
    )
}

export default TableBody