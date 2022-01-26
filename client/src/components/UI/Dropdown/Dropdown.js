import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import cls from './Dropdown.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import DropdownLink from "./components/DropdownLink/DropdownLink";
import {dropdownLinks} from "../../../utils/dropdownLinks";

const Dropdown = () => {
    const [dropdown, setDropdown] = useState(false)

    const onDropdownHandler = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className={cls.dropdown}>
            <div className={cls.dropdown_head} onClick={onDropdownHandler}>
                Menu
                <FontAwesomeIcon icon={faChevronDown} color={'#cecece'} />
            </div>
            {
                dropdown
                    ?
                    <div className={cls.dropdown_body}>
                        {
                            dropdownLinks.map(link => {
                                return <DropdownLink key={link.id} onClick={() => setDropdown(false)} to={link.to} name={link.name} />
                            })
                        }
                    </div>
                    : null
            }
        </div>
    )
}

export default Dropdown