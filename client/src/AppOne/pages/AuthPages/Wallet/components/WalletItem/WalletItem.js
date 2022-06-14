import React from 'react'
import PropTypes from 'prop-types'
import cls from './WalletItem.module.scss'
import {Accordion, Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";

const WalletItem = ({coinsBalance, balanceUsd, coin}) => {
    return (
        <Accordion defaultActiveKey="0" className={cls.walletItem}>
            <Accordion.Item eventKey="0" className={cls.walletItem}>
                <Accordion.Header className={cls.walletItem}>{coin}</Accordion.Header>
                <Accordion.Body className={cls.walletItem}>
                    <Row className={'mb-3'}>
                        <Col>
                            <span className={cls.txt}>Balance in coins:</span> {coinsBalance}
                        </Col>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col>
                            <span className={cls.txt}>Balance in USDT:</span> {balanceUsd} USDT
                        </Col>
                    </Row>
                    <Row className={'mb-3 mt-3'}>
                        <Button className={['user-green']}>Withdraw</Button>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

WalletItem.propTypes = {
    
}
WalletItem.defaultProps = {
    
}

export default WalletItem