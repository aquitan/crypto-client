import React, {useEffect} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import {getData, postData} from "../../../services/StaffServices";
import {store} from "../../../index";
import AdminButtonCard from "../../../components/AdminButtonCard/AdminButtonCard";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";
import WalletInfoBlock from "../../../components/UI/WalletInfoBlock/WalletInfoBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {getGeoData} from "../../../queries/getSendGeoData";
import {currencyRateChangeIndicator} from "../../../utils/currencyRateChangeIndicator";
import CurrencyRates from "../../../components/CurrencyRates/CurrencyRates";

const Dashboard = () => {
    const getDashboard = async () => {
        let geodata = await getGeoData()
        geodata.domainName = window.location.host
        geodata.id = store.userId
        const res = await postData('/dashboard/', geodata)
    }
    const navigate = useNavigate()
    useEffect(() => {
        getDashboard()
    }, [])

    if (store.isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Container>
            <CurrencyRates/>
            <Row className='mb-3'>
                <Col className='col-1'>
                    <h5>Welcome!</h5>
                </Col>
                <Col>
                    <span>{store.user.name ? store.user.name : store.userEmail}</span>
                </Col>
            </Row>

            <ButtonCard>
                <Row>
                    <Col className='col-12 col-md-3 mb-3'>
                        <WalletInfoBlock
                            currency='BTC'
                            amount={store.ratesChange.btc.toFixed()}
                            status={currencyRateChangeIndicator(store.ratesChange.btc.toFixed())}
                            color='BTC' />
                    </Col>
                    <Col className='col-12 col-md-3 mb-3'>
                        <WalletInfoBlock
                            currency='ETH'
                            amount={store.ratesChange.eth.toFixed()}
                            status={currencyRateChangeIndicator(store.ratesChange.eth.toFixed())}
                            color='ETH' />
                    </Col>
                    <Col className='col-12 col-md-3 mb-3'>
                        <WalletInfoBlock
                            currency='BCH'
                            amount={store.ratesChange.bch.toFixed()}
                            status={currencyRateChangeIndicator(store.ratesChange.bch.toFixed())}
                            color='BCH' />
                    </Col>
                    <Col className='col-12 col-md-3 mb-3'>
                        <WalletInfoBlock
                            currency='USDT'
                            amount={store.ratesChange.usdt.toFixed()}
                            status={currencyRateChangeIndicator(store.ratesChange.usdt.toFixed())}
                            color='BCH' />
                    </Col>
                </Row>
            </ButtonCard>
            <ButtonCard>
                <Row>
                    <Col className='col-12 col-md-2 align-items-center'>
                        <FontAwesomeIcon icon={faEnvelope} size='lg' />
                    </Col>
                    <Col className='col-12 col-md-8'>
                        Ask a question or file a support ticket, manage requests or report an issues. Our Support team will get back to you by chat.
                    </Col>
                    <Col className='col-12 col-md-2'>
                        <Button onClick={() => navigate('/support')}>Go to support</Button>
                    </Col>
                </Row>
            </ButtonCard>
        </Container>
    )
}

export default Dashboard