import React from 'react'
import cls from "./BurgerMenu.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faGripLinesVertical} from "@fortawesome/free-solid-svg-icons";

const BurgerMenu = ({onHandleClick, open}) => {
    return (
        <div onClick={onHandleClick} className={cls.burger_btn} >
            <FontAwesomeIcon icon={!open ? faBars : faGripLinesVertical} color={'#fff'} />
        </div>
    )
}

export default BurgerMenu