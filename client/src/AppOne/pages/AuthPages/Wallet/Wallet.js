import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import WalletItem from "./components/WalletItem/WalletItem";
import {getData} from "../../../services/StaffServices";
import {store} from "../../../../index";

const Wallet = () => {
    const [state, setState] = useState()

    useEffect(() => {
        getBalance()
    }, [])


    const getBalance = async () => {
        const res = await getData(`/get_user_balance/${store.user.id}`)
        console.log('balance', res.data)
        setState(res.data)
    }

    return (
        <Container>
            <Row>
                <Col className={'col-4'}>
                    <WalletItem balanceUsd={124124} coin={'BTC'} coinsBalance={123} />
                </Col>
                <Col className={'col-4'}>
                    <WalletItem balanceUsd={124124} coin={'BTC'} coinsBalance={123}  />
                </Col>
                <Col className={'col-4'}>
                    <WalletItem balanceUsd={124124} coin={'BTC'} coinsBalance={123}  />
                </Col>
            </Row>
        </Container>
    )
}

Wallet.propTypes = {

}
Wallet.defaultProps = {

}

export default Wallet