import React, {forwardRef} from 'react'
import './TextArea.scss'
import PropTypes from "prop-types";
import classNames from "classnames";

const TextArea = forwardRef(({classnames, ...attr}, ref) => {
    let classes = classNames(
        'textarea',
        classnames
    )

    return (
        <textarea className={classes} {...attr}/>
    )
})

TextArea.propTypes = {
    classnames: PropTypes.string
}

export default TextArea