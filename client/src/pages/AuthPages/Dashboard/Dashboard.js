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

const Dashboard = () => {
    const getDashboard = async () => {
        let geodata = await getGeoData()
        geodata.domainName = window.location.host
        geodata.id = store.userId
        console.log('----geodata', geodata)
        const res = await postData('/dashboard/', geodata)
    }
    const navigate = useNavigate()
    useEffect(() => {
        getDashboard()
    }, [])

    return (
        <Container>
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
                    <Col className='col-12 col-md-4 mb-3'>
                        <WalletInfoBlock currency='BTC' amount='00.0123' status='up' color='BTC' />
                    </Col>
                    <Col className='col-12 col-md-4 mb-3'>
                        <WalletInfoBlock currency='ETH' amount='00.12312' status='down' color='ETH' />
                    </Col>
                    <Col className='col-12 col-md-4 mb-3'>
                        <WalletInfoBlock currency='BCH' amount='00.0123' status='up' color='BCH' />
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