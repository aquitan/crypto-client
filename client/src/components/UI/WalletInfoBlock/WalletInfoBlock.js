import React from 'react'
import PropTypes from 'prop-types'
import cls from './WalletInfoBlock.module.scss'
import classNames from "classnames/bind";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

const WalletInfoBlock = ({currency, color, status, amount}) => {
    const cx = classNames.bind(cls)
    const classes = cx('wallet-block', color.toLowerCase(), status)

    return (
        <div className={classes}>
            <div><FontAwesomeIcon icon={status === 'up' ? faArrowUp : faArrowDown} /> {currency}</div>
            <div><b>{amount}</b></div>
        </div>
    )
}

WalletInfoBlock.propTypes = {

}
WalletInfoBlock.defaultProps = {

}

export default WalletInfoBlock