import React, {useState} from 'react'
import './Dropdown.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import DropdownLink from "./components/DropdownLink/DropdownLink";
import {dropdownLinks} from "../../../utils/dropdownLinks";
import {v4 as uuid} from 'uuid'

const Dropdown = () => {
    const [dropdown, setDropdown] = useState(false)

    const onDropdownHandler = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className='dropdown'>
            <div className='dropdown_head' onClick={onDropdownHandler}>
                <span className='me-2'>My Wallet</span>
                <FontAwesomeIcon icon={faChevronDown} color={'#cecece'} />
            </div>
            <div className='dropdown_body'>
                {
                    dropdownLinks.map(link => {
                        return <DropdownLink key={uuid()} onClick={() => setDropdown(!dropdown)} to={link.to} name={link.name} />
                    })
                }
            </div>
            {/*{*/}
            {/*    dropdown*/}
            {/*        ?*/}
            {/*        <div className='dropdown_body'>*/}
            {/*            {*/}
            {/*                dropdownLinks.map(link => {*/}
            {/*                    return <DropdownLink key={uuid()} onClick={() => setDropdown(!dropdown)} to={link.to} name={link.name} />*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*        : null*/}
            {/*}*/}
        </div>
    )
}

export default Dropdown