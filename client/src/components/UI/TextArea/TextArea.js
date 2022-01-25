import React, {forwardRef} from 'react'
import cls from './TextArea.module.scss'

const TextArea = forwardRef((props, ref) => {
    return (
        <textarea className={cls.textarea} {...props}/>
    )
})

export default TextArea