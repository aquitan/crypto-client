import React from 'react'
import './CoinBase.scss'

const CoinBaseFirstPage = ({ onConnectFirst }) => {
  return (
    <div className="coinbaseWrap_inner">
      <div className="coinbaseWrap_topBlock">
        <div className="coinbaseWrap_header">
          <div>
            <div>
              <div style={{ overflow: "hidden", width: 58, borderRadius: 16 }}>
                <svg
                  viewBox="0 0 1024 1024"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="#0052FF" height="1024" width="1024"></rect>
                  <path
                    clipRule="evenodd"
                    d="M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z"
                    fill="white"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <h1 style={{marginTop: 30}} className="coinbaseWrap_h1">Coinbase Wallet</h1>
            <h2 className="coinbaseWrap_h2">Extension</h2>
            <div className="coinbaseWrap_headerText">
              To get started, create a new wallet or use one you already have.
            </div>
            <div className="coinbaseWrap_headerIcons">
              <div className="hint_img">
                <div style={{ overflow: "hidden", width: 22, borderRadius: 2 }}>
                  <svg
                    viewBox="0 0 1024 1024"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect fill="#0052FF" height="1024" width="1024"></rect>
                    <path
                      clipRule="evenodd"
                      d="M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z"
                      fill="white"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="hint">
                  <span>Coinbase Wallet</span>
                </div>
              </div>
              <div className="hint-img">
                <img
                  alt="Metamask"
                  height="22"
                  src="data:image/png;base64,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"
                  width="22"
                />
                <div className="hint">
                  <span>Metamask</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="coinbaseWrap_bottomBlock">
        <div>
          <button
            onClick={onConnectFirst}
            style={{
              backgroundColor: "blue",
              color: "#fff",
              border: "none",
              padding: "15px 20px",
              borderRadius: 40,
              width: "100%",
              cursor: "pointer"
            }}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};
export default CoinBaseFirstPage;
