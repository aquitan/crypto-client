import './MetamaskSuccess.css'


const MetamaskSuccess = ({handleClose}) => {
  return (
    <div className="ieWBpP">
      <div className="igVQFl">
        <div className="yas5">
          <div className="All">
            <svg className="svgWrapper">
              <path
                d="M196.6,27.6C179.1,18.3,159.2,13,138,13C69,13,13,69,13,138s56,125,125,125s125-56,125-125 c0-8.5-0.9-16.8-2.5-24.9"
                className="circleGray"></path>
              <path
                d="M196.6,27.6C179.1,18.3,159.2,13,138,13C69,13,13,69,13,138s56,125,125,125s125-56,125-125 c0-8.5-0.9-16.8-2.5-24.9"
                className="circleLightBlue"></path>
              <path
                d="M196.6,27.6C179.1,18.3,159.2,13,138,13C69,13,13,69,13,138s56,125,125,125s125-56,125-125 c0-8.5-0.9-16.8-2.5-24.9"
                className="circleDarkBlue"></path>
              <polyline points="72.5,123.5 131.5,179.5 284.5,18.5" className="tick-gray"></polyline>
              <polyline points="72.5,123.5 131.5,179.5 284.5,18.5" className="tick-B"></polyline>
              <polyline points="72.5,123.5 131.5,179.5 284.5,18.5" className="tickC"></polyline>
            </svg>
          </div>
        </div>
        <div className='modal-pass'>
          <h3 style={{textAlign: 'center'}}>Wallet successfully connected!</h3>
          <button onClick={handleClose} className="modal-btn">Close</button>
        </div>
      </div>
    </div>
  )
}
export default MetamaskSuccess;