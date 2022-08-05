import React from 'react'

const CurrencyDropdown = ({data}) => {
    console.log('props data', data)
    return (
        <div className="input-select">
            { data.label } { data.icon && <span className="input-select__icon">{ data.icon }</span> }
            <div>Current amount: {data.amount}</div>
        </div>
    )
}

export default CurrencyDropdown