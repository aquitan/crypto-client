import React from 'react'
import PropTypes from 'prop-types'
import cls from './WalletItem.module.scss'
import {Accordion, Col, Row} from "react-bootstrap";
import Button from "../../../../../components/UI/Button/Button";
import Image from "../../../../../components/UI/Image/Image";
import {imgMatch} from "../../../../../utils/imgMatch";
import {Link, NavLink, useNavigate} from "react-router-dom";

const WalletItem = ({coinsBalance, balanceUsd, coin, coinFullName}) => {
    const navigate = useNavigate()

    return (
        <Accordion defaultActiveKey="0" className={cls.walletItem}>
            <Accordion.Item eventKey="0" className={cls.walletItem}>
                <Accordion.Header className={cls.walletItem}>{coin}</Accordion.Header>
                <Accordion.Body className={cls.walletItem}>
                    <Row className={'mb-3'}>
                        <Col>
                            <Image src={`/img/${imgMatch(coin.toLowerCase())}.svg`} height={30} width={30} alt={''} />
                            <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{coinFullName}</span>
                        </Col>
                    </Row>
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
                        <Col>
                            <Button onClick={() => navigate('/withdraw', {state: {
                                    coin, coinsBalance
                                }})} classname={['user-red']}>
                                Withdraw
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => navigate('/deposit', {state: {
                                coin, coinsBalance
                                }})} classname={['user-green']}>
                                Deposit
                            </Button>
                        </Col>
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