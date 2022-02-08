import React from 'react'
import PropTypes from 'prop-types'
import currencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import Select from "react-select";

const CustomSelect = ({options, onChange}) => {
    const customStyles = {
       select: {
           maxWidth: '300px',
           width: '100%'
       }
    }



    return (
        <div>
            <Select
                defaultValue={ options[0] }
                options={ options }
                onChange={ onChange }
                components={ {SingleValue: currencyDropdown } }
                styles={customStyles}
            />
        </div>
    )
}

CustomSelect.propTypes = {

}
CustomSelect.defaultProps = {

}

export default CustomSelect