const CoinBaseSecondPage = ({ onGoBackFirst, toFrasePage }) => {
  return (
    <div className="coinbaseWrap_inner">
      <div>
        <div style={{ width: "100%", position: "relative" }}>
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
              <div className="paginationItem"></div>
              <div className="paginationItem"></div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginTop: 40 }} className="secondPageHeader">
            <h1 className="coinbaseWrap_h1">Connect existing wallet</h1>
            <div className="coinbaseWrap_headerText">
              Select how you'd like to access your existing wallet. We support
              Ethereum or Solana wallets at this time.
            </div>
          </div>
          <div onClick={toFrasePage} className="optionBlock">
            <div className="optionBlock_text">
              <div className="optionBlock_header">
                Link existing Coinbase Wallet
              </div>
              <div className="optionBlock_p">
                Approve transactions by linking your wallet to the Web
                Application
              </div>
            </div>
            <img
              alt="seedPhrase"
              height="38"
              src="https://static-assets.coinbase.com/design-system/illustrations/light/seedPhrase-0.svg"
              width="38"
            />
          </div>
          <div className="optionBlock">
            <div className="optionBlock_text">
              <div className="optionBlock_header">
                Link existing Coinbase Wallet
              </div>
              <div className="optionBlock_p">
                Approve transactions by linking your wallet to the Web
                Application
              </div>
            </div>
            <img
              alt="seedPhrase"
              height="38"
              src="https://static-assets.coinbase.com/design-system/illustrations/light/seedPhrase-0.svg"
              width="38"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinBaseSecondPage;
