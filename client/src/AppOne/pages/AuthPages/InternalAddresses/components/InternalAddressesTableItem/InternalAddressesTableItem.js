import React from 'react'
import {Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";

const InternalAddressesTableItem = ({date, id, amount, currency, status, onClick, cryptoAmount, toAddress, fromAddress}) => {
    const obj = {
        date,
        amount,
        currency,
        id,
        toAddress,
        fromAddress
    }

    
    return (
        <Row className='mt-3 mb-3'>
            <Col style={{fontSize: '12px'}} className={'d-none d-md-block text-center'}>
                {date}
            </Col>
            <Col style={{fontSize: '12px'}} className={'text-center align-items-center d-flex justify-content-center'}>
                <Button style={{height: 30, fontSize: 12, minWidth: 100}} onClick={() => onClick(obj)} classname={[`${status === 'complete' ? 'btnBlue' : 'btnRed'}`, 'btnOrange'] }>Show address</Button>
            </Col>
            <Col style={{fontSize: '12px'}} className={'text-center'}>
                {amount.toFixed(3)} USD <br/> {cryptoAmount.toFixed(3)} {currency}
            </Col>
        </Row>
    )
}

export default InternalAddressesTableItem