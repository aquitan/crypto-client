import React from 'react'
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'

const CurrencyDropdown = ({data}) => {
    console.log('props data', data)
    return (
        <div className="input-select">
            { data.label } { data.icon && <span className="input-select__icon">{ data.icon }</span> }
            <div>Current amount: {data.amount}</div>
        </div>
    )
}

CurrencyDropdown.propTypes = {

}
CurrencyDropdown.defaultProps = {

}

export default CurrencyDropdown