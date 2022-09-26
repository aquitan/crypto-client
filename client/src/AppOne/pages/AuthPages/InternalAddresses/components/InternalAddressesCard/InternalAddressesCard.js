import {useState} from 'react'
import cls from './InternalAddressesCard.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Col, Row} from "react-bootstrap";
import InternalAddressCardForm from "../InternalAddressCardForm/InternalAddressCardForm";
import Button from "../../../../../components/UI/Button/Button";
import Image from "../../../../../components/UI/Image/Image";
// import WAValidator from 'wallet-address-validator'
import {postData} from "../../../../../services/StaffServices";
import addressValidator from '../../../../../utils/validateAddress';

const InternalAddressesCard = ({currency, sum, onCopy, wallet, theme}) => {
    const [state, setState] = useState({
        isOpen: false,
        isValid: null
    })
    const checkAddress = async (value) => {
        if (currency === 'USDT') currency = 'ETH'
        // return WAValidator.validate(value, currency);
        console.log(await addressValidator(value, currency.toLowerCase()))
    }

    const makeTransaction = async (data) => {

        const res = await postData('/internal_transfer/make_internal_transfer/', data)
    }

    const makeOpen = (data) => {
        if (state.isOpen) {
            makeTransaction(data)
        }
        setState({...state, isOpen: true})
    }

    const setFormData = (data) => {
        console.log('card data ---', data)
    }

    const imgMatch = (currency) => {
        if (currency === 'TRX/USDT') {
            return 'trx-usdt'
        } else {
            return currency
        }
    }

    return (
        <div className={`${cls.internal_address_card} p-3`}>
            {
                state.isOpen ? <FontAwesomeIcon
                    onClick={() => setState({...state, isOpen: false})}
                    style={{position: 'absolute', right: 20, top: 10, cursor: 'pointer'}}
                    icon={faTimesCircle} /> : null
            }
            <Row className='align-items-center my-2'>
                <Col className='mb-2'>
                    <Image src={`/img/${imgMatch(currency)}.svg`} height={40} alt={'crypto'} />
                    <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className='badge'>{currency}</div>
                </Col>
                <Col className='mb-2'>
                    <div>{sum.toFixed(5)} {currency}</div>
                </Col>
                <Col className='mb-2'>
                    <div className='d-flex align-items-center' onClick={() => onCopy(wallet)}>
                        <FontAwesomeIcon
                            style={{marginRight: 20}}
                            icon={faCopy} />
                        <span style={{wordBreak: 'break-all', display: 'inline-block', margin: '0 10px 0 0'}} className='internal-address'>{wallet}</span>
                    </div>
                </Col>
                {
                    state.isOpen ? null :
                        <Col>
                            <Button style={{marginBottom: 5}} classname={['btnLink', theme]} onClick={makeOpen} >Send</Button>
                        </Col>
                }
            </Row>
            {
                state.isOpen ?
                    <InternalAddressCardForm setFormData={setFormData} sum={sum} wallet={wallet} currency={currency} valid={state.isValid} checkAddress={checkAddress} />
                    : null
            }

        </div>
    )
}

InternalAddressesCard.propTypes = {
    
}
InternalAddressesCard.defaultProps = {
    
}

export default InternalAddressesCard