import React, {useState} from 'react'
import cls from './InternalAddressesCard.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Col, Row} from "react-bootstrap";
import InternalAddressCardForm from "../InternalAddressCardForm/InternalAddressCardForm";
import Button from "../../../../../components/UI/Button/Button";
import Image from "../../../../../components/UI/Image/Image";
import {postData} from "../../../../../services/StaffServices";
import addressValidator from '../../../../../utils/validateAddress';
import classNames from 'classnames/bind';

const InternalAddressesCard = ({currency, sum, onCopy, wallet, theme, onUpdateHistory}) => {
    const [state, setState] = useState({
        isOpen: false,
        isValid: null
    })

    const cx = classNames.bind(cls)
    const classes = cx('internal_address_card', theme)

    const checkAddress = async (value, currency) => {
        if (currency === 'USDT') currency = 'ETH'
        return await addressValidator(value, currency.toLowerCase())
    }

    const makeTransaction = async (data) => {

        const res = await postData('/internal_transfer/make_internal_transfer/', data)
        onUpdateHistory()
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
        <div className={classes}>
            {
                state.isOpen ? <FontAwesomeIcon
                    onClick={() => setState({...state, isOpen: false})}
                    style={{position: 'absolute', right: 20, top: 10, cursor: 'pointer'}}
                    icon={faTimesCircle} /> : null
            }

            <Row>
                <Row className='mb-4 pb-4 flex-column align-items-center flex-sm-row' style={{borderBottom: '1px solid #cecece'}}>
                    <Col className='d-flex align-items-center justify-content-center justify-content-sm-start mb-2'>
                        <Image src={`${window.location.origin}/img/${imgMatch(currency).toLowerCase()}.svg`} height={60} alt={'crypto'} />
                        <div style={{backgroundColor: 'rgb(227, 228, 232)', color: '#0083f8'}} className='badge'>{currency}</div>
                        <div style={{marginLeft: 10, fontSize: 18}}>{sum.toFixed(5)} {currency}</div>
                    </Col>
                    <Col className='d-flex align-items-center justify-content-center justify-content-sm-start mb-2'>
                        <div className='d-flex align-items-center' onClick={() => onCopy(wallet)}>
                            <FontAwesomeIcon
                              style={{marginRight: 20}}
                              icon={faCopy} />
                            <span style={{wordBreak: 'break-all', display: 'inline-block', margin: '0 10px 0 0'}} className='internal-address'>{wallet}</span>
                        </div>
                    </Col>

                </Row>
                {
                    state.isOpen ? null :
                      <Row className='justify-content-center'>
                          <Button style={{marginBottom: 5, width: 200}} classname={['btnBlue', theme]} onClick={makeOpen} >Send</Button>
                      </Row>
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

export default InternalAddressesCard