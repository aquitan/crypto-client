import cls from './DisconnectWallet.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';

const DisconnectWallet = ({onClick}) => {
  return (
      <div onClick={onClick} className={cls.disconnectWallet}>
        <FontAwesomeIcon icon={faExclamation} /> Disconnect Wallet
      </div>
  )
}
export default DisconnectWallet;