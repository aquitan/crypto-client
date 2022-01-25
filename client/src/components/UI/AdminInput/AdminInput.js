import React, {forwardRef} from 'react'
import cls from './AdminInput.module.scss'

const AdminInput = forwardRef((props, ref) => {
    return (
        <input ref={ref} className={cls.admin_input} {...props} />
    )
})

export default AdminInput