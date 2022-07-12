import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Col, Container, Row} from "react-bootstrap";
import WalletItem from "./components/WalletItem/WalletItem";
import {getData} from "../../../services/StaffServices";
import {store} from "../../../../index";
import Preloader from "../../../components/UI/Preloader/Preloader";

const Wallet = () => {
    const [state, setState] = useState([])

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
                {
                    state ?
                        state.map(item => {
                            console.log('item', item)
                            return <Col className={'col-12 col-sm-6 col-lg-4 mb-5'}>
                                <WalletItem
                                    coinFullName={item.coinFullName}
                                    balanceUsd={124124}
                                    coin={item.coinName}
                                    coinsBalance={item.coinBalance.toFixed(5)} />
                            </Col>
                        }) :
                        <Preloader />
                }
            </Row>
        </Container>
    )
}

Wallet.propTypes = {

}
Wallet.defaultProps = {

}

export default Wallet