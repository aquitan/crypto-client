import React, { forwardRef } from 'react'
import './Input.scss'
import classNames from "classnames";

const Input = forwardRef(({classname, ...attr}, ref) => {
    let classes = classNames(
        'input',
        classname
    )

    return (
        <div className={'input_wrap'}>
            <input {...attr}  className={classes} ref={ref} />
        </div>
    )
})

export default Input