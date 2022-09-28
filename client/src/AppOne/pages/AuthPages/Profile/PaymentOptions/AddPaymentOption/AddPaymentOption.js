import React from 'react'
import cls from './AddPaymentOption.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useThemeContext} from '../../../../../context/ThemeContext';
import classNames from 'classnames/bind';

const AddPaymentOption = ({addOption}) => {
  const {theme} = useThemeContext()
  const cx = classNames.bind(cls)
  const classes = cx('addPayment', theme)

    return (
        <div onClick={addOption} className={classes}>
            <FontAwesomeIcon icon={faPlus} /> Connect Wallet
        </div>
    )
}

export default AddPaymentOption