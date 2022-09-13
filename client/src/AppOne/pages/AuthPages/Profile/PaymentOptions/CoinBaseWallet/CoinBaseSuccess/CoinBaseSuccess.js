import './CoinBaseSuccess.scss'

const CoinBaseSuccess = () => {
  return (
    <div>
      <svg className="checkmark success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className="checkmark_circle_success" cx="26" cy="26" r="25" fill="none"/>
        <path className="checkmark_check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" stroke-linecap="round"/>
      </svg>
      <div style={{textAlign: 'center', marginTop: 50}}>
        <h2>Wallet connected successfully!</h2>
      </div>
    </div>
  )
}
export default CoinBaseSuccess;