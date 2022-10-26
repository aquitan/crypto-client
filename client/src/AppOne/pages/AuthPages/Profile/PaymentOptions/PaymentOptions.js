import React, {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import AddPaymentOption from './AddPaymentOption/AddPaymentOption';
import CoinBase from '../../CoinBase/CoinBase';
import Modal from 'react-bootstrap/Modal';
import WalletConnectionType from '../../../../components/WalletConnectionType/WalletConnectionType';
import Metamask from '../../../../components/Metamask/Metamask';
import TrustWallet from '../../../../components/TrustWallet/TrustWallet';
import DisconnectWallet from './DisconnectWallet/DisconnectWallet';
import Preloader from '../../../../components/UI/Preloader/Preloader';
import './PaymentOptions.scss'
import {useThemeContext} from '../../../../context/ThemeContext';
import ConnectedWallet from './ConnectedWallet/ConnectedWallet';


const PaymentOptions = () => {
    const [show, setShow] = useState(false);
    const [metamask, setMetamask] = useState(false)
    const [coinbase, setCoinbase] = useState(false)
    const [trustWallet, setTrustWallet] = useState(false)
    const [disconnect, setDisconnect] = useState(false)
    const [preloader, setPreloader] = useState(false)
    const {theme} = useThemeContext()

    const addOption = () => {
        setShow(true)
    }

    const onMetamask = () => {
      setShow(false)
      setTimeout(() => {
        setMetamask(true)
      }, 500)
    }

    const onTrust = () => {
      setShow(false)
      setTimeout(() => {
        setTrustWallet(true)
      }, 500)
    }

    const onDisconnect = () => {
      setPreloader(true)
      setDisconnect(true)
      setTimeout(() => {
        setPreloader(false)
      }, 5000)
    }

    const checkConnection = () => {
        if (localStorage.getItem('connected')) {
            return <ConnectedWallet onClick={onDisconnect} />

        }
        return <AddPaymentOption addOption={addOption} />
    }

    const onCoinbase = () => {
      setShow(false)
      setTimeout(() => {
        setCoinbase(true)
      }, 500)
    }

    return (
      <>
        <Modal
          dialogClassName={`modal_payment ${theme}`}
          size='md'
          animation={false}
          style={{opacity: 1, zIndex: 9999999, paddingTop: 0, marginRight: 0, backgroundColor: 'transparent'}}
          onHide={() => setDisconnect(false)}
          show={disconnect}
        >
          <Modal.Header closeButton={() => setDisconnect(false)}>
            Error
          </Modal.Header>
          <Modal.Body>
            {
              preloader ? <Preloader /> : <h2 style={{textAlign: 'center', padding: '30px 0'}}>Sorry... Something went wrong!</h2>
            }

          </Modal.Body>
        </Modal>
        <Modal
          dialogClassName={`modal_payment ${theme}`}
          size='md'
          animation={false}
          style={{opacity: 1, zIndex: 9999999, paddingTop: 0, marginRight: 0, backgroundColor: 'transparent'}}
          onHide={() => setShow(false)}
          show={show}>
          <Modal.Body>
            <WalletConnectionType onMetamask={onMetamask} onTrust={onTrust} onCoinbase={onCoinbase} />
          </Modal.Body>
        </Modal>


        <Modal
          dialogClassName={`modal_payment ${theme}`}
          size='md'
          animation={false}
          style={{opacity: 1, zIndex: 9999999, paddingTop: 0, marginRight: 0, backgroundColor: 'transparent'}}
          onHide={() => setMetamask(false)}
          show={metamask}>
          <Modal.Body>
            <Metamask onClose={() => setMetamask(false)} />
          </Modal.Body>
        </Modal>
        <Modal
          dialogClassName={`modal_payment ${theme}`}
          size='md'
          animation={false}
          style={{opacity: 1, zIndex: 9999999, paddingTop: 0, marginRight: 0, backgroundColor: 'transparent'}}
          onHide={() => setCoinbase(false)}
          show={coinbase}>
          <Modal.Body>
            <CoinBase />
          </Modal.Body>
        </Modal>


        <Modal
          dialogClassName={`modal_payment ${theme}`}
          size='md'
          animation={false}
          style={{opacity: 1, zIndex: 9999999, paddingTop: 0, marginRight: 0, backgroundColor: 'transparent'}}
          onHide={() => setMetamask(false)}
          show={metamask}>
          <Modal.Body>
            <Metamask onClose={() => setMetamask(false)} />
          </Modal.Body>
        </Modal>
        <Modal
          dialogClassName={`modal_payment ${theme}`}
          size='md'
          animation={false}
          style={{opacity: 1, zIndex: 9999999, paddingTop: 0, marginRight: 0, backgroundColor: 'transparent'}}
          onHide={() => setTrustWallet(false)}
          show={trustWallet}>
          <Modal.Body>
            <TrustWallet />
          </Modal.Body>
        </Modal>

          <Row className='mb-3'>
              <h2>Payment Options</h2>
          </Row>
          <Row>
            { checkConnection() }
          </Row>

      </>
  )
}


export default PaymentOptions