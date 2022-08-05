import {forwardRef} from 'react'
import cls from './InputRadio.module.scss'
import classNames from "classnames/bind";

const InputRadio = forwardRef(({label, id, name, classname}, ref) => {
    const cx = classNames.bind(cls)
    const classes = cx(classname)
    return (
        <div className={classes}>
            <input name={name} id={id} ref={ref} type="radio"/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
})

export default InputRadio