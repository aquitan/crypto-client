import React from 'react'
import "../../Dropdown.scss";
import {NavLink} from "react-router-dom";

const DropdownLink = (props) => {
    return (
        <NavLink onClick={props.onClick} className='dropdown_link' to={props.to}>{props.name}</NavLink>
    )
}

export default DropdownLink