import React, {useState} from 'react'
import PropTypes from 'prop-types'
import cls from './InternalAddressesCard.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Col, Row} from "react-bootstrap";
import Input from "../../../../../components/UI/Input/Input";
import InternalAddressCardForm from "../InternalAddressCardForm/InternalAddressCardForm";
import Button from "../../../../../components/UI/Button/Button";
import Image from "../../../../../components/UI/Image/Image";
import WAValidator from 'wallet-address-validator'
import {postData} from "../../../../../services/StaffServices";

const InternalAddressesCard = ({currency, sum, onCopy, wallet}) => {
    const [state, setState] = useState({
        isOpen: false,
        isValid: null
    })
    const checkAddress = (value) => {
        if (currency === 'USDT') currency = 'ETH'
        return WAValidator.validate(value, currency);
    }

    const makeTransaction = async (data) => {
        const res = await postData('/123', data)
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

    return (
        <div className={`${cls.internal_address_card} p-3`}>
            {
                state.isOpen ? <FontAwesomeIcon
                    onClick={() => setState({...state, isOpen: false})}
                    style={{position: 'absolute', right: 20, top: 10, cursor: 'pointer'}}
                    icon={faTimesCircle} /> : null
            }
            <Row className='mb-3'>
                <div>
                    <h4 className='d-flex align-items-center'>
                        <Image src={`/img/${currency}.svg`} height={20} width={20} alt={'crypto'} />
                        {currency} Address
                    </h4>
                </div>
                <div>Balance: {sum} {currency}</div>
                <div onClick={() => onCopy(wallet)}>
                    <FontAwesomeIcon
                        icon={faCopy} />
                    <span className='internal-address'>{wallet}</span>
                </div>
            </Row>
            {
                state.isOpen ?
                    <InternalAddressCardForm setFormData={setFormData} currency={currency} valid={state.isValid} checkAddress={checkAddress} />
                    : null
            }
            {
                state.isOpen ? null :
                    <Row>
                        <Button onClick={makeOpen} classname={['small_btn']}>Send</Button>
                    </Row>
            }
        </div>
    )
}

InternalAddressesCard.propTypes = {
    
}
InternalAddressesCard.defaultProps = {
    
}

export default InternalAddressesCard