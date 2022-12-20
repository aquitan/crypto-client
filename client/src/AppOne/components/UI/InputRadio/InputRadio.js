import React, {forwardRef} from 'react'
import cls from './InputRadio.module.scss'
import classNames from "classnames/bind";

const InputRadio = forwardRef(({label, id, name, classname, img}, ref) => {
    const cx = classNames.bind(cls)
    const classes = cx(classname)
    return (
        <div className={classes}>
            <input name={name} id={id} ref={ref} type="radio"/>
            <label htmlFor={id}><img width={15} style={{marginRight: '10px'}} src={img} />{label}</label>
        </div>
    )
})

export default InputRadio