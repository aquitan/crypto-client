import React from 'react'
import PropTypes from 'prop-types'
import {Card, Col, Container, Row} from "react-bootstrap";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ChatRules from "./components/ChatRules/ChatRules";
import {supportRulesText} from "../../../utils/userConstants";

const Support = () => {
    return (
        <Container>
            <Card className='p-3 bg-dark'>
                <Row>
                    <Col>
                        <ChatWindow />
                    </Col>
                    <Col>
                        <ChatRules rulesDisclamer={supportRulesText} />
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

Support.propTypes = {
    
}
Support.defaultProps = {
    
}

export default Support