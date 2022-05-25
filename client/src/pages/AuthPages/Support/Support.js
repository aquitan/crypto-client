import React from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ChatRules from "./components/ChatRules/ChatRules";
import {supportRulesText} from "../../../utils/userConstants";
import ButtonCard from "../../../components/ButtonCard/ButtonCard";

const Support = () => {
    return (
        <Container>
            <ButtonCard>
                <Row>
                    <Col className='col-12 col-lg-8'>
                        <ChatWindow />
                    </Col>
                    <Col className='col-12 col-lg-4'>
                        <ChatRules rulesDisclamer={supportRulesText} />
                    </Col>
                </Row>
            </ButtonCard>
        </Container>
    )
}

Support.propTypes = {
    
}
Support.defaultProps = {
    
}

export default Support