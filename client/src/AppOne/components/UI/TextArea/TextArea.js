import React, {forwardRef} from 'react'
import cls from './TextArea.module.scss'
import PropTypes from "prop-types";
import classNames from "classnames";

const TextArea = forwardRef(({classnames, ...attr}, ref) => {
    let cx = classNames.bind(cls)
    let classes = cx('textarea', classnames)

    return (
        <textarea ref={ref} className={classes} {...attr}/>
    )
})

TextArea.propTypes = {
    classnames: PropTypes.string
}

export default TextArea