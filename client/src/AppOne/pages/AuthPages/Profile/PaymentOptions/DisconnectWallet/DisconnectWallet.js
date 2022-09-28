import React from 'react'
import cls from './DisconnectWallet.module.scss';

const DisconnectWallet = ({onClick}) => {
  return (
      <div onClick={onClick} className={cls.disconnectWallet}>Disconnect Wallet</div>
  )
}
export default DisconnectWallet;