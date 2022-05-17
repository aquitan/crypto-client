import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from "react-bootstrap";
import {store} from "../../index";
import {findPercent} from "../../utils/findPercent";
import cls from './CurrencyRates.module.scss'

const CurrencyRates = () => {
    const [state, setState] = useState()

    useEffect(() => {
        getRates()
    })

    const getRates = () => {
        setState(store.domain.domainParams.rateCorrectSum)
    }

    return (
        <Row className={`${cls.currencyRates} mb-3`} style={{maxWidth: 1000}}>
            <Col><b>BTC:</b> {findPercent(store.rates.btc, state).toFixed(5)}</Col>
            <Col><b>ETH:</b> {findPercent(store.rates.eth, state).toFixed(5)}</Col>
            <Col><b>BCH:</b> {findPercent(store.rates.bch, state).toFixed(5)}</Col>
            <Col><b>USDT:</b> {store.rates.usdt}</Col>
        </Row>
    )
}

CurrencyRates.propTypes = {

}
CurrencyRates.defaultProps = {

}

export default CurrencyRates