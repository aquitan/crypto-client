import React, {useState} from 'react'
import PropTypes from 'prop-types'
import AppTwo from "../AppTwo/components/App/App";
import AppOne from "../AppOne/components/App/App";

const AppPicker = () => {
    const [state, setState] = useState(1)
    return (
        <>
            {
                state === 1 ? <AppOne /> :<AppTwo />
            }
        </>
    )
}

AppPicker.propTypes = {
    
}
AppPicker.defaultProps = {
    
}

export default AppPicker