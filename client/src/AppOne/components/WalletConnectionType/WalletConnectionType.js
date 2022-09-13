import "./WalletConnectionType.scss";
import {useState} from 'react';
import {useThemeContext} from '../../context/ThemeContext';

const WalletConnectionType = ({ onMetamask, onTrust, onCoinbase }) => {
  const {theme} = useThemeContext()
  const [connected, setConnected] = useState({
    metamask: false,
    coinbase: false,
    trust: false
  })


  return (
  <div className={`w_connectionWrap ${theme}`}>
      <div style={{pointerEvents: connected.metamask ? 'none' : '' }} onClick={onMetamask} className="w_connectionItem">
        <img src="./img/fox.svg" alt="" className="fox" />
        <h2>Metamask</h2>
        <div className="w_connectionText">Connect Wallet via Metamask</div>
      </div>
      <div onClick={onCoinbase} className="w_connectionItem">
        <img src="./img/coinbase.png" alt="" className="fox" />
        <h2>Coinbase</h2>
        <div className="w_connectionText">Connect Wallet via Coinbase</div>
      </div>
      <div onClick={onTrust} className="w_connectionItem">
        <img src="./img/TWT.png" alt="" className="fox" />
        <h2>Trust Wallet</h2>
        <div className="w_connectionText">Connect Wallet via Trust Wallet</div>
      </div>
    </div>
  );
};
export default WalletConnectionType;
