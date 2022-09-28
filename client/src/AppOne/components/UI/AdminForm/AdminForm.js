import React from 'react'
import cls from "./AdminForm.module.scss";

const AdminForm = ({children, ...props}) => {

    return (
        <form className={cls.admin_form} {...props}>
            {children}
        </form>
    )
}

export default AdminForm