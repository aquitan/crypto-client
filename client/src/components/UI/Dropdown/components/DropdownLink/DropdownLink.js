import React from 'react'
import cls from "../../Dropdown.module.scss";
import {NavLink} from "react-router-dom";

const DropdownLink = (props) => {
    return (
        <NavLink onClick={props.onClick} className={cls.dropdown_link} to={props.to}>{props.name}</NavLink>
    )
}

export default DropdownLink