import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import {store} from "../../index";

const CurrencyRates = () => {
    return (
        <Row className='mb-3' style={{maxWidth: 500}}>
            <Col><b>BTC:</b> {store.rates.btc?.usd}</Col>
            <Col><b>ETH:</b> {store.rates.eth?.usd}</Col>
            <Col><b>BCH:</b> {store.rates.bch?.usd}</Col>
            <Col><b>USDT:</b> {store.rates.usdt?.usd}</Col>
        </Row>
    )
}

CurrencyRates.propTypes = {

}
CurrencyRates.defaultProps = {

}

export default CurrencyRates