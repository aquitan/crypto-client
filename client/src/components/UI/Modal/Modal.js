import React from 'react'
import cls from './Modal.module.scss'

const Modal = ({children, active, setActive}) => {
    let classes = [cls.modal]
    if (active) {
        classes.push(cls.modal_active)
    }

    return (
        <div className={classes.join(' ')} onClick={() => setActive(false)}>
            <div className={cls.modal_content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal